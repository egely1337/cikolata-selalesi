import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET") {
        return res.status(405).json({
            status: false,
            message: "Method Not Allowed"
        })
    }

    try { 
        const thread_id = req.query.thread_id as string;
        
        const session = await getServerSession(req, res, authOptions);
        const thread = await prisma.user.getThreadById(thread_id, session);

        return res.json({
            status: true,
            thread: thread
        })
    } catch(err) {
        if(err instanceof Error) {
            res.status(500).json({
                status: false,
                error: err.message
            })
        }

        console.error(err);
    }
}