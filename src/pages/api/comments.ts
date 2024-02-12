import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

import Joi from "joi";
import validate from "@/util/middlewares/validate";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";



const schema = Joi.object({
    postId: Joi.string().required()
})

type CommentRequest = {
    postId: string
}

export default validate({body: schema}, async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST") {
        return res.status(405).json({
            status: false,
            message: "Method Not Allowed"
        })
    }

    try {
        const request = req.body as CommentRequest;
        const comments = await prisma.user.getCommentsPost(request.postId);

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
});