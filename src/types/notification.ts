import { Notification, User } from "@prisma/client";


export type NotificationType = Notification & {
    fromUser: User,
}