import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET") {
        return res.status(405);
    }

    try {
        const session = await getServerSession(req, res, authOptions);

        return res.json({
            status: true,
            user: await prisma.user.getUser(session) 
        })
    } catch(err) {
        if(err instanceof Error) {
            return res.json({
                status: false,
                error: err.message
            })
        }
    }
}