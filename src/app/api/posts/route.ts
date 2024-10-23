import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/getCurrentUser";
import prisma from "../../../../lib/db";
import { authOptions } from "../../../../lib/authOptions";
import { getServerSession } from "next-auth";
import { log } from "console";

// POST: Create a new post
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    log('POST SESSION :', session);

    try {
        if (!session || !session.user?.email)
            return NextResponse.json({ error: "Not AUTH" }, { status: 401 })
        const { title, content } = await req.json();
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorEmail: session.user.email,
            }
        })
        return NextResponse.json({ newPost }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "SOMETHING WENT WRONG?" }, { status: 500 })
    }
}

// PUT: Update a post by ID
export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    log('PUT SESSION :', session);

    try {
        if (!session || !session.user?.email)
            return NextResponse.json({ error: "Not AUTH" }, { status: 401 });

        const { id, title, content } = await req.json();
        const updatedPost = await prisma.post.update({
            where: { id },
            data: { title, content }
        });
        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SOMETHING WENT WRONG?" }, { status: 500 });
    }
}

// DELETE: Delete a post by ID
export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    log('DELETE SESSION :', session);

    try {
        if (!session || !session.user?.email)
            return NextResponse.json({ error: "Not AUTH" }, { status: 401 });

        const { id } = await req.json();
        await prisma.post.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "SOMETHING WENT WRONG?" }, { status: 500 });
    }
}

// GET: Fetch a post by ID
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            const post = await prisma.post.findUnique({
                where: { id },
                include:{
                    user:true,
                    comments:{
                        include: {
                            user:true
                        }
                    },
                }
            });
            if (!post) {
                return NextResponse.json({ error: 'Post not found' }, { status: 404 });
            }
            return NextResponse.json(post, { status: 200 });
        } else {
            // Fetch all posts
            const posts = await prisma.post.findMany({
                orderBy:{
                    createdAt: 'desc',
                },
                include: {
                    user: true,
                }
            });
            return NextResponse.json(posts, { status: 200 });
        }
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({ error: 'SOMETHING WENT WRONG' }, { status: 500 });
    }
}

// GET: Fetch all posts
