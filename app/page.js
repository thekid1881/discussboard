import HomeHeader from "@/components/HomeHeader";
import SignInButton from "@/components/SignInButton";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans flex grid-rows-3 items-center justify-items-center bg-gradient-to-r from-[#f69537] via-[#EB6E58] to-[#DF3267] to-90%">
      <main className="h-screen w-screen overflow-x-hidden overflow-y-hidden">
        <div className="row-start-1 h-1/4 pt-12">
          <HomeHeader />
        </div>
        <div className="row-start-2 h-1/2 mb-12 items-center overflow-x-hidden overflow-y-hidden grid grid-cols-2 justify-self-center">
          <div className="col-start-1 mr-32 py-28 pr-22 border-r-4 border-solid border-r-gray-900">
            <SignInButton />
          </div>
          <div className="col-start-2 pl-24">
            <Image
              src="/paperscissors.png"
              alt="paper and scissors"
              width={350}
              height={600}
            />
          </div>
        </div>
        <div className="row-start-3 h-1/4">
          <Footer />
        </div>
      </main>
    </div>
  );
}
