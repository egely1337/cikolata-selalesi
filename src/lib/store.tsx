import { NotificationType } from "@/types/notification"
import { User } from "@prisma/client"
import { create } from "zustand"

interface UserState {
    user: User | null | {}
    setUser: (newUser: User) => void
}
  
export const useUserStore = create<UserState>()((set) => ({
    user: null,
    setUser: (newUser) => set((state) => ({ user: newUser})),
}))

interface NotificationState {
    notifications: NotificationType[]
    setNotifications: (notifications: NotificationType[]) => void
}

export const useNotificationStore = create<NotificationState>()((set) => ({
    notifications: [],
    setNotifications: (notifications) => set((state) => ({ notifications: notifications})),
}))