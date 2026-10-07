import bcrypt from 'bcryptjs';
import { db, initDatabase } from './index';

export function seedData() {
  initDatabase();

  // 1. Seed Users (Super Admin, Admin, Standard Users)
  const passwordHash = bcrypt.hashSync('Admin@123456', 10);
  const userPasswordHash = bcrypt.hashSync('User@123456', 10);

  const insertUser = db.prepare(`
    INSERT OR REPLACE INTO users (id, name, email, password_hash, age, company, country, role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run(
    'usr_superadmin',
    'CII CWL Super Admin',
    'admin@cii.in',
    passwordHash,
    38,
    'CII Centre for Women Leadership',
    'India',
    'superadmin'
  );

  insertUser.run(
    'usr_instadmin',
    'Anita Roy (HR VP)',
    'anita.roy@tata.com',
    passwordHash,
    42,
    'Tata Consultancy Services',
    'India',
    'admin'
  );

  insertUser.run(
    'usr_player1',
    'Rahul Sharma',
    'rahul.s@techcorp.io',
    userPasswordHash,
    29,
    'TechCorp Global',
    'India',
    'user'
  );

  insertUser.run(
    'usr_player2',
    'Priya Sundaram',
    'priya.s@innovate.org',
    userPasswordHash,
    34,
    'Innovate Solutions',
    'India',
    'user'
  );

  // 2. Seed Investment Cards
  const insertCard = db.prepare(`
    INSERT OR REPLACE INTO investment_cards 
    (id, title, category, cost, yield_points, equity_impact, inclusion_impact, talent_impact, description, real_world_case, learning_insight)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const investmentCards = [
    {
      id: 'inv_1',
      title: 'Equal Pay Audit & Restructuring',
      category: 'pay_parity',
      cost: 150,
      yield_points: 220,
      equity_impact: 15,
      inclusion_impact: 25,
      talent_impact: 20,
      description: 'Conduct a third-party audit across all bands to close unadjusted gender wage gaps and standardize compensation bands.',
      real_world_case: 'Companies addressing pay equity experience 27% lower voluntary turnover among female mid-level managers within 18 months.',
      learning_insight: 'Pay parity directly impacts organizational trust and employee retention, mitigating costly talent drain.'
    },
    {
      id: 'inv_2',
      title: 'Returnship Program for Career Breaks',
      category: 'hiring',
      cost: 120,
      yield_points: 190,
      equity_impact: 12,
      inclusion_impact: 20,
      talent_impact: 25,
      description: 'Launch a 6-month paid returnship with upskilling & mentorship for women re-entering the workforce after maternity or caregiving breaks.',
      real_world_case: 'Returnship initiatives unlock an untapped talent pool of senior women professionals at 40% lower recruitment cost.',
      learning_insight: 'Re-entry programs bridge structural career gaps, rapidly filling mid-senior engineering and managerial roles.'
    },
    {
      id: 'inv_3',
      title: 'On-Site Childcare & Subsidized Daycare',
      category: 'retention',
      cost: 200,
      yield_points: 310,
      equity_impact: 18,
      inclusion_impact: 30,
      talent_impact: 28,
      description: 'Partner with top daycare providers to offer full/subsidized childcare near major office hubs.',
      real_world_case: 'McKinsey research shows access to childcare increases post-maternity retention of female executives by up to 35%.',
      learning_insight: 'Caregiving responsibilities disproportionately affect working mothers; childcare support boosts long-term career continuity.'
    },
    {
      id: 'inv_4',
      title: 'Executive Women Mentorship & Sponsorship Pipeline',
      category: 'leadership',
      cost: 100,
      yield_points: 180,
      equity_impact: 20,
      inclusion_impact: 18,
      talent_impact: 15,
      description: 'Pair high-potential female managers with C-suite sponsors responsible for championing their advancement to board/VP roles.',
      real_world_case: 'Sponsored women are 23% more likely to advance to VP level than mentored women without active executive sponsorship.',
      learning_insight: 'Mentorship advises, but sponsorship opens doors to high-visibility strategic projects and promotions.'
    },
    {
      id: 'inv_5',
      title: 'Flexible & Hybrid Work Directive',
      category: 'policy',
      cost: 80,
      yield_points: 150,
      equity_impact: 10,
      inclusion_impact: 22,
      talent_impact: 18,
      description: 'Implement core flex hours and location independence without performance penalty or proximity bias.',
      real_world_case: 'Flexibility is cited by 80% of women as a top 3 decision factor when selecting employer offers.',
      learning_insight: 'Focusing on outcomes rather than desk time creates equitable opportunity across diverse family arrangements.'
    },
    {
      id: 'inv_6',
      title: 'Blind Resume Screening & AI Recruiter Audit',
      category: 'hiring',
      cost: 90,
      yield_points: 140,
      equity_impact: 8,
      inclusion_impact: 15,
      talent_impact: 15,
      description: 'Anonymize names, photos, and age from candidate profiles during initial candidate screening rounds.',
      real_world_case: 'Blind screening increases the likelihood of female candidate shortlist selection by 25-46%.',
      learning_insight: 'Unconscious bias occurs in milliseconds; structured anonymization ensures merit-based candidate evaluation.'
    },
    {
      id: 'inv_7',
      title: 'Paternity & Equal Parental Leave (16 Weeks)',
      category: 'policy',
      cost: 160,
      yield_points: 240,
      equity_impact: 14,
      inclusion_impact: 26,
      talent_impact: 19,
      description: 'Offer equal paid parental leave for non-birthing parents to normalize caregiving across all genders.',
      real_world_case: 'Equal parental leave reduces the "motherhood penalty" by redistributing home caregiving responsibilities evenly.',
      learning_insight: 'Normalizing paternity leave removes the stigma associated with female maternity absences.'
    },
    {
      id: 'inv_8',
      title: 'Inclusive Leadership & Microaggression Training',
      category: 'policy',
      cost: 70,
      yield_points: 120,
      equity_impact: 7,
      inclusion_impact: 14,
      talent_impact: 10,
      description: 'Interactive mandatory workshops for managers on Psychological Safety, Microaggressions, and Allyship.',
      real_world_case: 'Teams led by inclusive leaders score 17% higher in overall performance and 29% higher in collaborative behavior.',
      learning_insight: 'Culture change requires continuous skill-building, setting clear expectations for team leaders.'
    },
    {
      id: 'inv_9',
      title: 'Supplier Diversity & Women-Owned Enterprise Network',
      category: 'hiring',
      cost: 110,
      yield_points: 170,
      equity_impact: 16,
      inclusion_impact: 19,
      talent_impact: 12,
      description: 'Allocate 15% of corporate procurement spending to accredited women-led businesses and vendors.',
      real_world_case: 'Diverse supplier ecosystems build stronger community brand equity and unlock resilient supply chains.',
      learning_insight: 'Extending DEI principles beyond internal HR to procurement multiplies societal business impact.'
    },
    {
      id: 'inv_10',
      title: 'Zero-Tolerance Harassment & Hotline Governance',
      category: 'retention',
      cost: 130,
      yield_points: 200,
      equity_impact: 12,
      inclusion_impact: 24,
      talent_impact: 22,
      description: 'Establish an independent ethics committee with anonymous whistleblowing channels and fast-track resolution.',
      real_world_case: 'Psychological safety is the #1 driver of retention among underrepresented employees in high-stress sectors.',
      learning_insight: 'Swift accountability for toxic behavior preserves institutional trust and prevents talent attrition.'
    }
  ];

  for (const card of investmentCards) {
    insertCard.run(
      card.id,
      card.title,
      card.category,
      card.cost,
      card.yield_points,
      card.equity_impact,
      card.inclusion_impact,
      card.talent_impact,
      card.description,
      card.real_world_case,
      card.learning_insight
    );
  }

  // 3. Seed Event Cards (Chance Cards)
  const insertEvent = db.prepare(`
    INSERT OR REPLACE INTO event_cards
    (id, title, category, points_effect, equity_effect, inclusion_effect, narrative, takeaway)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const eventCards = [
    {
      id: 'evt_1',
      title: 'Viral Media Exposure on Gender Pay Divide',
      category: 'scandal',
      points_effect: -120,
      equity_effect: -15,
      inclusion_effect: -10,
      narrative: 'An investigative report highlighted significant wage disparities in your technical product divisions.',
      takeaway: 'Failing to proactively audit pay equity leaves your brand vulnerable to reputational crises and customer boycotts.'
    },
    {
      id: 'evt_2',
      title: 'National DEI Corporate Excellence Award',
      category: 'opportunity',
      points_effect: 180,
      equity_effect: 20,
      inclusion_effect: 15,
      narrative: 'Your organization won the CII National Award for Outstanding Gender Parity & Inclusive Work Environment!',
      takeaway: 'Public recognition for inclusion boosts your employer brand, attracting top-tier talent without recruitment premiums.'
    },
    {
      id: 'evt_3',
      title: 'Poaching of Top Female Senior Directors',
      category: 'talent_war',
      points_effect: -100,
      equity_effect: -8,
      inclusion_effect: -12,
      narrative: 'A rival firm offered executive sponsorship and remote flexibility, poaching 3 of your key female leaders.',
      takeaway: 'Competitive salary alone cannot retain top talent if sponsorship pipelines and flexibility are lacking.'
    },
    {
      id: 'evt_4',
      title: 'ESG Investor Mandate for Board Parity',
      category: 'market',
      points_effect: 150,
      equity_effect: 18,
      inclusion_effect: 10,
      narrative: 'Major institutional investors conditioned further funding on meeting 35% female representation in leadership.',
      takeaway: 'Capital allocation is increasingly tied to ESG and diversity benchmarks in modern corporate finance.'
    },
    {
      id: 'evt_5',
      title: 'Maternity Attrition Spike',
      category: 'scandal',
      points_effect: -110,
      equity_effect: -12,
      inclusion_effect: -14,
      narrative: 'Due to lack of childcare support, 40% of mothers returning from maternity leave resigned within 60 days.',
      takeaway: 'Unsupported transitions after life events result in costly loss of domain expertise and institutional memory.'
    },
    {
      id: 'evt_6',
      title: 'Government Gender Quota Incentive Scheme',
      category: 'policy_change',
      points_effect: 130,
      equity_effect: 10,
      inclusion_effect: 12,
      narrative: 'Government launched tax incentives for companies maintaining over 40% female managerial presence.',
      takeaway: 'Proactive compliance with inclusion standards positions companies to capitalize on regulatory tax benefits.'
    }
  ];

  for (const evt of eventCards) {
    insertEvent.run(
      evt.id,
      evt.title,
      evt.category,
      evt.points_effect,
      evt.equity_effect,
      evt.inclusion_effect,
      evt.narrative,
      evt.takeaway
    );
  }

  // 4. Seed Pre & Post Assessment Questions
  const insertAssessment = db.prepare(`
    INSERT OR REPLACE INTO assessments
    (id, question, options, correct_option, explanation, category)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const assessments = [
    {
      id: 'asm_1',
      question: 'What is the primary difference between Mentorship and Sponsorship for women in corporate settings?',
      options: JSON.stringify([
        'Mentorship involves financial aid, while sponsorship is unpaid guidance',
        'Mentors give advice and perspective; Sponsors actively advocate for job opportunities and promotions',
        'Sponsorship is for junior employees only; mentorship is for executives',
        'There is no functional difference between the two terms'
      ]),
      correct_option: 1,
      explanation: 'Sponsors use their organizational capital to advocate for candidates behind closed doors during promotion and assignment discussions.',
      category: 'both'
    },
    {
      id: 'asm_2',
      question: 'According to corporate studies, how does pay equity audit impact employee turnover?',
      options: JSON.stringify([
        'It has no measurable effect on employee turnover',
        'It increases turnover by causing wage envy',
        'It reduces voluntary turnover by up to 27% among mid-level managers',
        'It only benefits executive-level leadership'
      ]),
      correct_option: 2,
      explanation: 'Proactive pay audits build institutional trust, significantly reducing voluntary resignations among high-performing mid-level talent.',
      category: 'both'
    },
    {
      id: 'asm_3',
      question: 'Why do returnship programs yield high ROI for technical and managerial roles?',
      options: JSON.stringify([
        'They allow companies to hire senior experienced talent at lower acquisition costs',
        'They replace the need for graduate hiring completely',
        'They bypass standard background verification processes',
        'They are purely tax write-offs with no performance benefits'
      ]),
      correct_option: 0,
      explanation: 'Returnships tap into skilled professionals re-entering after career breaks, providing structured upskilling at lower sourcing costs.',
      category: 'both'
    },
    {
      id: 'asm_4',
      question: 'What is "Proximity Bias" in remote and hybrid workplaces?',
      options: JSON.stringify([
        'Favoring candidates who live in the same city as company headquarters',
        'Unconsciously favoring employees who are physically present in the office over remote workers',
        'Prioritizing client meetings over internal team check-ins',
        'Promoting employees based solely on their total working hours'
      ]),
      correct_option: 1,
      explanation: 'Proximity bias disadvantages remote or flexible workers (often primary caregivers) by favoring in-person visibility over actual merit.',
      category: 'both'
    },
    {
      id: 'asm_5',
      question: 'What business outcome is strongly correlated with gender diversity in corporate executive teams?',
      options: JSON.stringify([
        'Higher probability of outperforming financial profitability benchmarks',
        'Instant reduction in operating software costs',
        'Zero employee turnover across all divisions',
        'Automatic immunity from legal disputes'
      ]),
      correct_option: 0,
      explanation: 'McKinsey research shows companies in the top quartile for executive team gender diversity are 25-39% more likely to outperform industry profitability averages.',
      category: 'both'
    }
  ];

  for (const asm of assessments) {
    insertAssessment.run(
      asm.id,
      asm.question,
      asm.options,
      asm.correct_option,
      asm.explanation,
      asm.category
    );
  }

  console.log('Seeded database with initial users, investment cards, event cards, and assessments.');
}

if (require.main === module) {
  seedData();
}
