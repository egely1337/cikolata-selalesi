import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET") {
        return res.status(405).json({
            status: false,
            message: "Method Not Allowed"
        })
    }

    try { 
        const username = req.query.username as string;
        const user = await prisma.user.getUserByUsername(username);
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