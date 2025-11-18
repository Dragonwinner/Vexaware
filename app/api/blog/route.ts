import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';

// GET all blog posts
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published') !== 'false';

    const blogPosts = await BlogPost.find({ published }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: blogPosts.length,
      data: blogPosts,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const blogPost = await BlogPost.create(body);

    return NextResponse.json(
      {
        success: true,
        data: blogPost,
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
