import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

import Joi from "joi";
import validate from "@/util/middlewares/validate";



const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

type RegisterRequest = {
    username: string,
    password: string
}

export default validate({body: schema}, async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST") {
        return res.status(405).json({
            status: false,
            message: "Method Not Allowed"
        })
    }

    try {
        const request = req.body as RegisterRequest;
        const user = await prisma.user.register(request.username, request.password);

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
});