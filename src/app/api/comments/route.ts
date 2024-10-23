import { NextResponse } from 'next/server';
import prisma from '../../../../lib/db'; // Adjust the import path as needed
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions'; // Adjust the import path as needed

// POST: Create a new comment
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    console.log('POST SESSION:', session);

    try {
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Not AUTH' }, { status: 401 });
        }

        const { content, postId } = await req.json();
        console.log('Received comments:', { content, postId });

        const newComment = await prisma.comment.create({
            data: {
                content: content,
                post: { connect: { id: postId } },
                user: { connect: { email: session.user.email } },
            },
            include: {
                user: true,
            },
        });

        return NextResponse.json({ newComment }, { status: 200 });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({ error: 'SOMETHING WENT WRONG' }, { status: 500 });
    }
}

// PUT: Update a comment by ID
export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    console.log('PUT SESSION:', session);

    try {
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Not AUTH' }, { status: 401 });
        }

        const { id, content } = await req.json();
        const updatedComment = await prisma.comment.update({
            where: { id },
            data: { content },
        });
        return NextResponse.json(updatedComment, { status: 200 });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({ error: 'SOMETHING WENT WRONG' }, { status: 500 });
    }
}

// DELETE: Delete a comment by ID
export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    console.log('DELETE SESSION:', session);

    try {
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Not AUTH' }, { status: 401 });
        }

        const { id } = await req.json();
        await prisma.comment.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Comment deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({ error: 'SOMETHING WENT WRONG' }, { status: 500 });
    }
}

// GET: Fetch comments by post ID
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    try {
        if (postId) {
            const comments = await prisma.comment.findMany({
                where: { postId: postId },
                include: { 
                    post: true,
                    user: true,
                },
            });
            return NextResponse.json(comments, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
        }
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({ error: 'SOMETHING WENT WRONG' }, { status: 500 });
    }
}