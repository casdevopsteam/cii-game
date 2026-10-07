import PDFDocument from 'pdfkit';

export interface CertificateData {
  playerName: string;
  company: string;
  score: number;
  inclusionScore: number;
  brandEquity: number;
  personaTitle: string;
  completedAt: string;
}

export function generateCertificatePDF(data: CertificateData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ layout: 'landscape', size: 'A4', margin: 40 });
      const chunks: Buffer[] = [];

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Border frame
      doc.rect(20, 20, 802, 555).lineWidth(4).stroke('#1e3a8a');
      doc.rect(28, 28, 786, 539).lineWidth(1.5).stroke('#b45309');

      // Title
      doc.fillColor('#1e3a8a').fontSize(26).text('CII CENTRE FOR WOMEN LEADERSHIP', { align: 'center' });
      doc.moveDown(0.2);
      doc.fillColor('#475569').fontSize(14).text('INCLUSIVE TYCOON - DIGITAL LEARNING CERTIFICATE', { align: 'center' });
      doc.moveDown(1);

      // Recipient
      doc.fillColor('#0f172a').fontSize(16).text('This certificate is proudly awarded to:', { align: 'center' });
      doc.moveDown(0.5);
      doc.fillColor('#1e3a8a').fontSize(28).text(data.playerName, { align: 'center' });
      if (data.company) {
        doc.fillColor('#475569').fontSize(14).text(`(${data.company})`, { align: 'center' });
      }

      doc.moveDown(1);
      doc.fillColor('#334155').fontSize(13).text(
        'For successfully completing the 10-turn Workplace Inclusion Strategy Simulation & Assessment.',
        { align: 'center' }
      );

      doc.moveDown(1.2);

      // Performance Stats Box
      const startX = 170;
      const startY = doc.y;
      doc.rect(startX, startY, 502, 80).fillAndStroke('#f8fafc', '#cbd5e1');

      doc.fillColor('#1e3a8a').fontSize(12)
        .text(`Leadership Archetype: ${data.personaTitle}`, startX + 20, startY + 15)
        .text(`Final Enterprise Score: ${data.score} Pts`, startX + 20, startY + 35)
        .text(`Inclusion Impact Index: ${data.inclusionScore}/100`, startX + 260, startY + 15)
        .text(`Brand Equity Index: ${data.brandEquity}/100`, startX + 260, startY + 35)
        .text(`Completion Date: ${data.completedAt}`, startX + 20, startY + 55);

      doc.moveDown(5);

      // Signatures
      doc.fillColor('#64748b').fontSize(11)
        .text('CII CWL Certification Board', 150, doc.y, { width: 200, align: 'center' })
        .text('Inclusive Tycoon Engine', 490, doc.y - 12, { width: 200, align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
