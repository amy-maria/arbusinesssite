import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { postId } = await request.json();

    // Here you would connect to your database and update the dislike count.
    // Example: await db.posts.update({ where: { id: postId }, data: { dislikes: { increment: 1 } } });

    console.log(`Dislike received for post: ${postId}`);

    return NextResponse.json({ success: true, message: 'Dislike counted.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error updating dislike count.' }, { status: 500 });
  }
}