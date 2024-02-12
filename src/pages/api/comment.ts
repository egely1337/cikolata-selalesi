import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

import Joi from "joi";
import validate from "@/util/middlewares/validate";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";



const schema = Joi.object({
    content: Joi.string().required(),
    postId: Joi.string().required(),
})

type CommentRequest = {
    content: string,
    postId: string,
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
        const session = await getServerSession(req, res, authOptions);
        const comment = await prisma.user.createComment(session!, request.postId, request.content);

        return res.json({
            status: true,
            comment: comment
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