import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

import Joi from "joi";
import validate from "@/util/middlewares/validate";
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
        const channel_id = req.query.channel_id as string;
        const session = await getServerSession(req, res, authOptions);

        const post = await prisma.user.getChannelPosts(channel_id, session);

        return res.json({
            status: true,
            posts: post
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