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
        const session = await getServerSession(req, res, authOptions);
        const notifications = await prisma.user.getUserNotifactions(session);

        return res.json({
            status: true,
            notifications: notifications
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