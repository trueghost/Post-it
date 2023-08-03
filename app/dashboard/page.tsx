import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import MyPosts from "./MyPosts"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    if(!session) {
        redirect("api/auth/signin")
    }
    return (
        <main>
            <h3 className="text-md">Welcome Back</h3>
            <h1 className="text-2xl font-bold">{ session?.user?.name }</h1>
            <MyPosts />
        </main>
    )
}