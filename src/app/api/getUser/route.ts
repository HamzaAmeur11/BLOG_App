import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { NextResponse } from "next/server";
import { error } from "console";

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({error: "Not AUTH"}, {status: 400 })
    return NextResponse.json({success: session}, {status: 200})
}