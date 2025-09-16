import PageHeader from "@/components/PageHeader";
import Posts from "@/components/Posts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PostsPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/");
    }

    return (
        <div className="font-sans flex grid-rows-2 items-center justify-items-center bg-gradient-to-r from-[#f69537] via-[#EB6E58] to-[#DF3267] to-90%">
            <main className="h-full w-screen overflow-x-hidden overflow-y-hidden">
                <div className="w-full row-start-1 h-1/4 pt-12">
                    <PageHeader />
                </div>
                <div className="w-full row-start-2 h-3/4 items-center overflow-x-hidden overflow-y-hidden justify-self-center">
                    <div className="grid grid-rows-[1fr_3fr] h-full">
                        <div className="row-start-1 flex flex-col justify-self-center">
                            <h1 className="text-6xl text-center justify-items-center h-full py-2">
                                Kollage Board
                            </h1>
                            <Link
                                className="text-xl text-center mx-20 max-w-60 py-1 px-2 m-2 cursor-pointer bg-gray-300 border-solid border-1 border-gray-700 hover:bg-gray-500 hover:text-white hover:underline rounded-md"
                                href="/dashboard"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                        <div className="w-full row-start-2 pt-4 pr-2">
                            <Posts />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}