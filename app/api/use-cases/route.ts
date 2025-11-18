import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import UseCase from '@/lib/models/UseCase';

// GET all use cases
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const industry = searchParams.get('industry');
    const published = searchParams.get('published') !== 'false';

    const query: any = { published };
    if (industry) {
      query.industry = industry;
    }

    const useCases = await UseCase.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: useCases.length,
      data: useCases,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new use case
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const useCase = await UseCase.create(body);

    return NextResponse.json(
      {
        success: true,
        data: useCase,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
