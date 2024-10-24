import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/getCurrentUser";
import prisma from "../../../../lib/db";
import { authOptions } from "../../../../lib/authOptions";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

// POST: Create a new post
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    console.log('POST SESSION :', session);

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
    console.log('PUT SESSION :', session);

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
export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    console.log('DELETE request received');
    const session = await getServerSession(req, res, authOptions);
    console.log('DELETE SESSION :', session);

    try {
        if (!session || !session.user?.email) {
            console.log('Not authenticated');
            return res.status(401).json({ error: "Not AUTH" });
        }

        const { id } = req.query;
        console.log('Post ID to delete:', id);

        const post = await prisma.post.findUnique({
            where: { id: String(id) },
        });

        if (!post) {
            console.log('Post not found');
            return res.status(404).json({ error: 'Post not found' });
        }

        await prisma.post.delete({
            where: { id: String(id) },
        });

        console.log('Post deleted successfully');
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ error: "SOMETHING WENT WRONG?" });
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
