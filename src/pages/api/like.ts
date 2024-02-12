import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

import Joi from "joi";
import validate from "@/util/middlewares/validate";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";



const schema = Joi.object({
    post_id: Joi.string().required(),
})

type LikeRequest = {
    post_id: string,
}

export default validate({body: schema}, async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST") {
        return res.status(405).json({
            status: false,
            message: "Method Not Allowed"
        })
    }

    try {
        const session = await getServerSession(req, res, authOptions);
        const request = req.body as LikeRequest;

        return res.json({
            status: true,
            like: await prisma.user.userLikePost({
                session: session,
                post_id: request.post_id
            })
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