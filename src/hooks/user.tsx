import React from "react";
import { User } from "@prisma/client";

type MeResponse = {
    status: boolean,
    user: User
}

export default function useUser() {
    const [user, setUser] = React.useState<User>();

    React.useEffect(() => {
        fetch("/api/me", {
            method: "GET"
        }).then(async res => {
            const json: MeResponse = await res.json();

            if(json.status) {
                setUser(json.user);
            }
        })
    }, [])

    return user;
}