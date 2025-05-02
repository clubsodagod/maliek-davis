"use client"

import React from 'react'
import AdminEmployeeOnly from '@/components/route-protection/AdminEmployeeOnly'

const DashboardPage = () => {
    return (
        <div>DashboardPage</div>
    )
}

export default AdminEmployeeOnly(DashboardPage)