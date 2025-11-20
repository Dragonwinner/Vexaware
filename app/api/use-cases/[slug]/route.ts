import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import UseCase from '@/lib/models/UseCase';

// GET a single use case by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    
    const { slug } = await params;
    const useCase = await UseCase.findOne({ slug, published: true });

    if (!useCase) {
      return NextResponse.json(
        { success: false, error: 'Use case not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: useCase,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update a use case
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    
    const { slug } = await params;
    const body = await request.json();
    const useCase = await UseCase.findOneAndUpdate(
      { slug },
      body,
      { new: true, runValidators: true }
    );

    if (!useCase) {
      return NextResponse.json(
        { success: false, error: 'Use case not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: useCase,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE a use case
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    
    const { slug } = await params;
    const useCase = await UseCase.findOneAndDelete({ slug });

    if (!useCase) {
      return NextResponse.json(
        { success: false, error: 'Use case not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {},
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
