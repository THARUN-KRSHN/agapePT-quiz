import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import path from 'path'; // Import path module

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const submissionId = searchParams.get('submissionId');

  if (!submissionId) {
    return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
  }

  try {
    const submission = await prisma.submission.findUnique({
      where: { id: parseInt(submissionId) },
      include: {
        userResponses: {
          include: { question: true },
        },
      },
    });

    if (!submission) {
      console.error(`PDF Error: Submission with ID ${submissionId} not found.`);
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    // Use pdf-lib to generate PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    let y = height - 40;
    const lineHeight = 18;
    const fontSize = 12;

    // Simple word-wrap for long lines
    function drawWrappedLine(text: string, maxWidth = width - 80) {
      // Remove newlines, as WinAnsi cannot encode them
      text = text.replace(/\n/g, ' ');
      const words = text.split(' ');
      let line = '';
      for (let i = 0; i < words.length; i++) {
        const testLine = line ? line + ' ' + words[i] : words[i];
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (testWidth > maxWidth && line) {
          page.drawText(line, { x: 40, y, size: fontSize, font, color: rgb(0,0,0) });
          y -= lineHeight;
          line = words[i];
        } else {
          line = testLine;
        }
      }
      if (line) {
        page.drawText(line, { x: 40, y, size: fontSize, font, color: rgb(0,0,0) });
        y -= lineHeight;
      }
    }

    drawWrappedLine(`Personality Development Test Results for ${submission.name}`);
    drawWrappedLine(`Age: ${submission.age}`);
    drawWrappedLine(`Date: ${new Date(submission.submissionDate).toLocaleString()}`);
    y -= lineHeight;
    drawWrappedLine('Summary of Your Child\'s Learning & Personality Profile:');
    drawWrappedLine(submission.dominantType);
    y -= lineHeight;
    drawWrappedLine('Your Answers:');
    submission.userResponses.forEach((userResponse, index) => {
      const questionText = userResponse.question?.text || '[Question not found]';
      drawWrappedLine(`${index + 1}. ${questionText}`);
      drawWrappedLine(`   Answer: ${userResponse.response}`);
    });
    y -= lineHeight;
    drawWrappedLine('Detailed Scores:');
    try {
      const scores = JSON.parse(submission.scores);
      for (const key in scores) {
        drawWrappedLine(`${key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}: ${scores[key]}`);
      }
    } catch (jsonError) {
      console.error('Error parsing scores JSON:', jsonError);
      drawWrappedLine('Scores data unavailable or corrupted.');
    }

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="results_${submission.name}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error generating PDF (outer catch):', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
