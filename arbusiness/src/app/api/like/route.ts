import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { postId } = await request.json();

    // Here you would connect to your database (e.g., WordPress, MongoDB, etc.)
    // and update the like count for the given postId.
    // Example: await db.posts.update({ where: { id: postId }, data: { likes: { increment: 1 } } });
    
    console.log(`Like received for post: ${postId}`);

    return NextResponse.json({ success: true, message: 'Like counted.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error updating like count.' }, { status: 500 });
  }
}