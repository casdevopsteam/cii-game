pipeline {
    agent any
    environment {
        DOCKER_BUILDKIT = '1'
       
        // ── Credentials IDs ─────────────────────────────────────────────────
        VM_SSH_CRED_ID = "cii-game-ssh" 
        VM_SUDO_CRED_ID = "vm-sudo-password" 
        GITHUB_CRED_ID = "github-cred" 
        DOCKERHUB_CRED_ID = "dockerhub-creds" 
        ENV_FILE_CRED_ID = "cii-game-env" 
        
        // ── Docker Image Names ──────────────────────────────────────────────
        BACKEND_IMAGE = "casdevops/cii-inclusive-tycoon-backend"
        FRONTEND_IMAGE = "casdevops/cii-inclusive-tycoon-frontend"
        
        // ── VM Deployment Target ────────────────────────────────────────────
        VM_USER = "deploy"
        VM_HOST = "192.168.1.34" # Replace with your Proxmox VM IP
        VM_APP_DIR = "/home/cubeai/cii-inclusive-tycoon"
        
        // ── Git Configuration ───────────────────────────────────────────────
        GIT_BRANCH = "main"
        GIT_URL = "https://github.com/your-org/cii-inclusive-tycoon.git"
        
        // ── Source Directories ──────────────────────────────────────────────
        BACKEND_DIR = "backend"
        FRONTEND_DIR = "frontend"

        // ── Smoke Test: Container Names ─────────────────────────────────────
        BACKEND_CONTAINER = "cii_backend"
        FRONTEND_CONTAINER = "cii_nginx"
        PROXY_CONTAINER = "cii_caddy"
        TUNNEL_CONTAINER = "cii_cloudflared"
        DB_CONTAINER = "cii_postgres"
    }
    
    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }
    
    stages {
        stage('🔌 Verify VM SSH Connection') {
            steps {
                echo '🔌 Testing SSH connection to VM...'
                withCredentials([sshUserPrivateKey(
                    credentialsId: "${VM_SSH_CRED_ID}",
                    keyFileVariable: 'SSH_KEY'
                )]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no -o ConnectTimeout=20 -i "$SSH_KEY" \
                            ${VM_USER}@${VM_HOST} 'echo "🔑 SSH OK — $(hostname)"'
                    '''
                }
                echo '✅ SSH connection verified.'
            }
        }
        
        stage('🛠️ Ensure Docker on VM') {
            steps {
                echo '🛠️ Checking and installing Docker & Docker Compose on VM if missing...'
                withCredentials([
                    sshUserPrivateKey(credentialsId: "${VM_SSH_CRED_ID}", keyFileVariable: 'SSH_KEY'),
                    string(credentialsId: "${VM_SUDO_CRED_ID}", variable: 'SUDO_PASS')
                ]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" ${VM_USER}@${VM_HOST} "SUDO_PASS='${SUDO_PASS}' bash -s" << 'REMOTE_SCRIPT'
set -e

echo '🔍 Checking Docker installation...'
if ! command -v docker >/dev/null 2>&1; then
    echo '🐳 Docker not found. Installing via official get.docker.com script...'
    echo "$SUDO_PASS" | sudo -S rm -f /etc/apt/sources.list.d/docker.list || true
    curl -fsSL https://get.docker.com -o get-docker.sh
    echo "$SUDO_PASS" | sudo -S sh get-docker.sh
    rm -f get-docker.sh
    echo "$SUDO_PASS" | sudo -S systemctl enable --now docker
    echo '✅ Docker installed successfully.'
else
    echo "🐳 Docker is already installed: $(docker --version)"
fi

if ! docker compose version >/dev/null 2>&1; then
    echo '📦 Installing Docker Compose plugin...'
    echo "$SUDO_PASS" | sudo -S apt-get update -y
    echo "$SUDO_PASS" | sudo -S apt-get install -y docker-compose-plugin
    echo '✅ Docker Compose plugin installed.'
else
    echo "🐳 Docker Compose is already installed: $(docker compose version)"
fi

TARGET_USER=$(whoami)
if ! id -nG "$TARGET_USER" | grep -qw docker; then
    echo "👤 Adding user '$TARGET_USER' to docker group..."
    echo "$SUDO_PASS" | sudo -S usermod -aG docker "$TARGET_USER"
    echo '⚠️ Added user to docker group.'
fi

echo '🔬 Final verification:'
docker --version && echo '✅ Docker OK'
docker compose version && echo '✅ Docker Compose OK'
REMOTE_SCRIPT
                    '''
                }
                echo '✅ Docker & Docker Compose are ready on the VM.'
            }
        }
        
        stage('📥 Checkout Code') {
            steps {
                echo '📥 Fetching source code...'
                git branch: "${GIT_BRANCH}",
                    url: "${GIT_URL}",
                    credentialsId: "${GITHUB_CRED_ID}"
                echo "✅ Checked out branch '${GIT_BRANCH}' from ${GIT_URL}"
            }
        }
        
        stage('🔨 Build & Push Backend Image') {
            steps {
                echo '🔨 Building backend Docker image...'
                dir("${BACKEND_DIR}") {
                    sh "docker build --no-cache -t ${BACKEND_IMAGE}:latest ."
                }
                echo '📦 Backend image built. Logging in to Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKERHUB_CRED_ID}",
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_PASSWORD'
                )]) {
                    sh """
                        echo \$DOCKERHUB_PASSWORD | docker login -u \$DOCKERHUB_USER --password-stdin
                        echo '⬆️ Pushing backend image to Docker Hub...'
                        docker push ${BACKEND_IMAGE}:latest
                    """
                }
                echo "✅ Backend image pushed: ${BACKEND_IMAGE}:latest"
            }
        }
        
        stage('🎨 Build & Push Frontend Image') {
            steps {
                echo '🎨 Building frontend Docker image...'
                dir("${FRONTEND_DIR}") {
                    sh "docker build --no-cache -t ${FRONTEND_IMAGE}:latest ."
                }
                echo '📦 Frontend image built. Logging in to Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKERHUB_CRED_ID}",
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_PASSWORD'
                )]) {
                    sh """
                        echo \$DOCKERHUB_PASSWORD | docker login -u \$DOCKERHUB_USER --password-stdin
                        echo '⬆️ Pushing frontend image to Docker Hub...'
                        docker push ${FRONTEND_IMAGE}:latest
                    """
                }
                echo "✅ Frontend image pushed: ${FRONTEND_IMAGE}:latest"
            }
        }
        
        stage('📁 Copy Config to VM') {
            steps {
                echo '📁 Copying project files to VM...'
                withCredentials([
                    sshUserPrivateKey(credentialsId: "${VM_SSH_CRED_ID}", keyFileVariable: 'SSH_KEY'),
                    file(credentialsId: "${ENV_FILE_CRED_ID}", variable: 'SECRET_ENV_FILE')
                ]) {
                    sh '''
                        echo "📂 Ensuring destination directory exists on VM..."
                        ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" \
                            ${VM_USER}@${VM_HOST} "mkdir -p ${VM_APP_DIR}"
                        
                        echo "🔄 Syncing deploy/ directory and configurations..."
                        rsync -avz --delete \
                            -e "ssh -o StrictHostKeyChecking=no -i \\"$SSH_KEY\\"" \\
                            ./deploy/ ${VM_USER}@${VM_HOST}:${VM_APP_DIR}/deploy/
                        
                        echo "🔐 Securely copying the .env secret file to the VM..."
                        scp -o StrictHostKeyChecking=no -i "$SSH_KEY" \
                            "$SECRET_ENV_FILE" ${VM_USER}@${VM_HOST}:${VM_APP_DIR}/deploy/.env
                        
                        echo "🔒 Locking down .env permissions (chmod 600)..."
                        ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" \
                            ${VM_USER}@${VM_HOST} "chmod 600 ${VM_APP_DIR}/deploy/.env"
                    '''
                }
                echo '✅ Configs and .env synced to VM.'
            }
        }
        
        stage('🚀 Deploy to Proxmox VM') {
            steps {
                echo '🚀 Deploying application on VM...'
                withCredentials([
                    sshUserPrivateKey(credentialsId: "${VM_SSH_CRED_ID}", keyFileVariable: 'SSH_KEY'),
                    usernamePassword(credentialsId: "${DOCKERHUB_CRED_ID}",
                                    usernameVariable: 'DOCKERHUB_USER',
                                    passwordVariable: 'DOCKERHUB_PASSWORD')
                ]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" ${VM_USER}@${VM_HOST} "VM_APP_DIR='${VM_APP_DIR}' DOCKERHUB_USER='${DOCKERHUB_USER}' DOCKERHUB_PASSWORD='${DOCKERHUB_PASSWORD}' BACKEND_IMAGE='${BACKEND_IMAGE}' FRONTEND_IMAGE='${FRONTEND_IMAGE}' bash -s" << 'REMOTE_SCRIPT'
                            set -e

                            echo "🔍 Running pre-deployment sanity checks..."
                            if [ ! -f "${VM_APP_DIR}/deploy/.env" ]; then
                                echo "❌ FATAL: .env file not found at ${VM_APP_DIR}/deploy/.env — aborting deployment." >&2
                                exit 1
                            fi
                            if [ ! -f "${VM_APP_DIR}/deploy/docker-compose.yml" ]; then
                                echo "❌ FATAL: docker-compose.yml not found at ${VM_APP_DIR}/deploy/docker-compose.yml — aborting." >&2
                                exit 1
                            fi
                            echo "✅ Pre-flight checks passed."

                            echo "🔑 Authenticating with Docker Hub on VM..."
                            echo "${DOCKERHUB_PASSWORD}" | docker login -u "${DOCKERHUB_USER}" --password-stdin

                            echo "⬇️ Pulling latest images from Docker Hub..."
                            docker pull ${BACKEND_IMAGE}:latest
                            docker pull ${FRONTEND_IMAGE}:latest

                            cd "${VM_APP_DIR}/deploy"

                            # Sanitize line endings
                            sed -i 's/\r$//' "${VM_APP_DIR}/deploy/.env" || true

                            echo "🛑 Stopping existing containers gracefully..."
                            docker compose --env-file "${VM_APP_DIR}/deploy/.env" down --timeout 30 2>/dev/null || \
                            docker-compose --env-file "${VM_APP_DIR}/deploy/.env" down --timeout 30 2>/dev/null || true

                            echo "▶️ Starting containers with latest images..."
                            if docker compose version >/dev/null 2>&1; then
                                COMPOSE_CMD="docker compose"
                            else
                                COMPOSE_CMD="docker-compose"
                            fi

                            if ! $COMPOSE_CMD --env-file "${VM_APP_DIR}/deploy/.env" up -d --force-recreate --remove-orphans; then
                                echo "❌ FATAL: Container startup failed. Dumping backend logs..." >&2
                                docker logs --tail 100 cii_backend 2>&1 || true
                                exit 1
                            fi

                            echo "⏳ Waiting 15 seconds for services to initialize..."
                            sleep 15

                            docker logout
                            echo "🧹 Pruning dangling images older than 12 hours..."
                            docker image prune -af --filter "until=12h" || true

                            echo "✅ Deployment completed successfully."
REMOTE_SCRIPT
                    '''
                }
                echo '✅ Deployment to VM completed.'
            }
        }
        
        stage('🩺 Post-Deploy Smoke Test') {
            steps {
                echo '🩺 Running smoke test via SSH...'
                withCredentials([sshUserPrivateKey(
                    credentialsId: "${VM_SSH_CRED_ID}",
                    keyFileVariable: 'SSH_KEY'
                )]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" ${VM_USER}@${VM_HOST} 'bash -s' \
                            "${VM_APP_DIR}/deploy" "${BACKEND_CONTAINER}" "${FRONTEND_CONTAINER}" "${DB_CONTAINER}" "${PROXY_CONTAINER}" "${TUNNEL_CONTAINER}" << 'EOF'
                            APP_DIR="$1"
                            BACKEND_CONTAINER="$2"
                            FRONTEND_CONTAINER="$3"
                            DB_CONTAINER="$4"
                            PROXY_CONTAINER="$5"
                            TUNNEL_CONTAINER="$6"

                            cd "$APP_DIR"
                            echo '--- Container Status ---'
                            (docker compose ps || docker-compose ps)

                            FAILED=0

                            check_container() {
                                local NAME="$1"
                                local LABEL="$2"
                                if [ -z "$NAME" ]; then
                                    return 0
                                fi
                                STATUS=$(docker inspect --format='{{.State.Status}}' "$NAME" 2>/dev/null || echo 'missing')
                                echo "$LABEL ($NAME): $STATUS"
                                if [ "$STATUS" != 'running' ]; then
                                    echo "❌ $LABEL container is not running!"
                                    docker logs --tail 50 "$NAME" 2>/dev/null || echo "(no logs available)"
                                    FAILED=1
                                fi
                            }

                            check_container "$DB_CONTAINER" "Database"
                            check_container "$BACKEND_CONTAINER" "Backend API"
                            check_container "$FRONTEND_CONTAINER" "Nginx/Frontend"
                            check_container "$PROXY_CONTAINER" "Caddy Proxy"
                            check_container "$TUNNEL_CONTAINER" "Cloudflare Tunnel"

                            if [ "$FAILED" -eq 1 ]; then
                                echo '❌ Smoke test failed — one or more critical containers are not running.'
                                exit 1
                            fi

                            echo '✅ All critical services are running.'
EOF
                    '''
                }
                echo '✅ Smoke test passed.'
            }
        }
    }
    
     post {
        always {
            echo '🧹 Cleaning up Jenkins workspace...'
            sh 'docker image prune -f || true'
            cleanWs()
        }
        success {
            echo """
            ╔══════════════════════════════════════╗
            ║  ✅ Project Deployment SUCCESSFUL! 🎉  ║
            ║  Build: #${BUILD_NUMBER}             ║
            ║  Branch: ${GIT_BRANCH}               ║
            ╚══════════════════════════════════════╝
            """
        }
        failure {
            echo """
            ╔══════════════════════════════════════╗
            ║  ❌ Project Deployment FAILED! 🔥      ║
            ║  Build: #${BUILD_NUMBER}             ║
            ║  Check logs above for details.       ║
            ╚══════════════════════════════════════╝
            """
        }
    }
}
