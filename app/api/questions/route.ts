import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export async function GET() {
  try {
    const allQuestions = await prisma.question.findMany();
    // Remove duplicates by question text
    const uniqueQuestions = Array.from(new Map(allQuestions.map(q => [q.text, q])).values());
    const shuffledQuestions = shuffleArray(uniqueQuestions);
    const limitedQuestions = shuffledQuestions.slice(0, 16); // Limit to 16 questions per session

    return NextResponse.json(limitedQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
