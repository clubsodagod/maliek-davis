'use client'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
import PageTransition from '../PageTransition';


const UnauthenticatedOnly = <P extends object>(WrappedComponent: React.ComponentType<P>) => {


    return function LoginProtection(props: P) {

        const { status } = useSession();

        useEffect(() => {
            if (status === "authenticated") {
                return redirect("/")
            }
            else if (status === "loading") {
                return
            }
        }, [status]);



        return (status == "loading" ? <div>Loading</div> : <PageTransition><WrappedComponent {...props} /></PageTransition>)
    }
}



export default UnauthenticatedOnly;