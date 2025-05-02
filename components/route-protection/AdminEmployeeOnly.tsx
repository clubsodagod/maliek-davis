/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
import PageTransition from '../PageTransition';



const AdminEmployeeOnly = <P extends object>(WrappedComponent: React.ComponentType<P>) => {


    return function LoginProtection(props: P) {

        const { status, data:session } = useSession();

        useEffect(() => {
            if (status === "loading") {
                return
            } else if (status === "unauthenticated") {
                return redirect("/")
            } else {
                if (session?.user?.role === "employee" || session?.user?.role === "admin") {
                    return 
                } else {
                    return redirect("/")
                }                
            }

        }, [session]);



        return (status == "loading" ? <div>Loading</div> : <PageTransition><WrappedComponent {...props} /></PageTransition>)
    }
}



export default AdminEmployeeOnly;