import PageHeader from "@/components/PageHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="font-sans flex grid-rows-3 items-center justify-items-center bg-gradient-to-r from-[#f69537] via-[#EB6E58] to-[#DF3267] to-90%">
      <main className="h-screen w-screen overflow-x-hidden overflow-y-hidden">
        <div className="row-start-1 h-1/4 pt-12">
          <PageHeader />
        </div>
        <div className="row-start-2 h-1/2 mb-12 items-center overflow-x-hidden overflow-y-hidden justify-self-center">
          <div className="grid grid-rows-2">
            <div className="row-start-1">
              <h1 className="text-6xl text-center justify-items-center">
                Dashboard
              </h1>
              <h3 className="text-3xl text-center justify-items-center">
                Welcome, {session.user.name}!
              </h3>
            </div>
            <div className="row-start-2 grid grid-cols-2 mt-12">
              <div className="col-start-1 mr-32 py-12 pr-22 border-r-4 border-solid border-r-gray-900">
                <p>Placeholder</p>
              </div>
              <div className="col-start-2 px-18 py-12">
                <Link
                  href="/posts"
                  className="border-solid border-3 rounded-md border-[#fa8616] bg-transparent hover:bg-gray-500 hover:text-white hover:underline hover:border-transparent p-4"
                >
                  Go to Discussion Board
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row-start-3 h-1/4 pt-12">
          <Footer />
        </div>
      </main>
    </div>
  );
}