import React from "react";

import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Page(props: {

}) {
    const router = useRouter();


    React.useEffect(() => {
       (async() => {
        await signOut();
        window.location.href = "/login";
       })();
    }, [])

    return(
        <>
        </>
    )
}