import { User } from "@prisma/client"
import { create } from "zustand"

interface UserState {
    user: User | null
    setUser: (newUser: User) => void
}
  
export const useUserStore = create<UserState>()((set) => ({
    user: null,
    setUser: (newUser) => set((state) => ({ user: newUser})),
}))

interface UsersState {
    users: User[]
    addUser: (user: User) => void
}

export const useAvatarStore = create<UsersState>()((set) => ({
    users: [],
    addUser: (user) => set((state) => ({ users: [...state.users, user]})),
}))