import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET") {
        return res.status(405).json({
            status: false,
            message: "Method Not Allowed"
        })
    }

    try { 
        const post_id = req.query.post_id as string;
        const comments = await prisma.user.getCommentsPost(post_id);

        return res.json({
            status: true,
            comments: comments
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