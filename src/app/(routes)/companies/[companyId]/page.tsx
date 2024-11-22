import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from 'next/navigation'

import { Header } from "./components/Header/Header"
import { CompanyInformation } from "./components/CompanyInformation"
import { FooterCompany } from "./components/FooterCompany"


export default async function CompanyIdPage({ params }: { params: { companyId: string } }) {
    const { userId } = await auth()

    if (!userId) {
        return redirect("/")
    }


    const company = await db.company.findUnique({
        where: {
            id: params.companyId,
            userId
        }
    })

    if (!company) {
        return redirect("/")
    }

    return (
        <div>
            <Header />
            <CompanyInformation company={company} />
            <FooterCompany companyId={company.id} />
        </div>
    )
}