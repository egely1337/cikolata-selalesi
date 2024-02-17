import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET") {
        return res.status(405).json({
            status: false,
            message: "Method Not Allowed"
        })
    }

    try { 
        const user_id = req.query.user_id as string;
        
        const session = await getServerSession(req, res, authOptions);
        const user = await prisma.user.getUserCommentsByUsername(user_id, session);

        return res.json({
            status: true,
            user: user
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