import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Tutorial from '@/lib/models/Tutorial';

// GET all tutorials or filter by category
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const published = searchParams.get('published') !== 'false';

    const query: any = { published };
    
    if (category) {
      query.category = category;
    }
    
    if (subcategory) {
      query.subcategory = subcategory;
    }

    const tutorials = await Tutorial.find(query).sort({ category: 1, order: 1 });

    return NextResponse.json({
      success: true,
      count: tutorials.length,
      data: tutorials,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new tutorial
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const tutorial = await Tutorial.create(body);

    return NextResponse.json(
      {
        success: true,
        data: tutorial,
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
