import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

import Joi from "joi";
import validate from "@/util/middlewares/validate";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { allowedChannels } from "@/lib/allowedChannels";



const schema = Joi.object({
    content: Joi.string().required(),
    attachments: Joi.array().optional().items(Joi.string().optional()),
    channel_id: Joi.string().required()
})

type PostRequest = {
    content: string,
    attachments: string[],
    channel_id: string
}

export default validate({body: schema}, async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST") {
        return res.status(405).json({
            status: false,
            message: "Method Not Allowed"
        })
    }

    try {
        const request = req.body as PostRequest;
        
        if(allowedChannels.includes(request.channel_id) === false) {
            throw new Error("You dont have access to this channel.");
        }

        const post = await prisma.user.createPost({
            session: await getServerSession(req, res, authOptions),
            content: request.content,
            channel: request.channel_id
        })

        return res.json({
            status: true,
            post: post
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
});