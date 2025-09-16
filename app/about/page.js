import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default async function About() {
  return (
    <div className="font-sans flex grid-rows-2 items-center justify-items-center bg-gradient-to-r from-[#f69537] via-[#EB6E58] to-[#DF3267] to-90%">
      <main className="h-screen w-screen overflow-x-hidden overflow-y-hidden">
        <div className="row-start-1 h-1/4 pt-12">
          <PageHeader />
        </div>
        <div className="row-start-2 h-1/2 mb-12 items-center overflow-x-hidden overflow-y-hidden justify-self-center">
          <div className="grid grid-rows-2">
            <div className="row-start-1">
              <h1 className="text-6xl text-center justify-items-center">
                About Us
              </h1>
            </div>
            <div className="row-start-2">
                <h3 className="mt-12 text-xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu ipsum elementum, bibendum velit<br/>
                    pharetra, pulvinar velit. Proin viverra tellus ut odio luctus porta. Nulla facilisi. Duis ultrices massa<br/>
                    risus, in lacinia purus feugiat ut. Donec suscipit tortor sit amet lectus congue lobortis. Aliquam sem<br/>
                    arcu, elementum id purus et, hendrerit suscipit urna. Pellentesque non nunc eget neque porttitor vulputate.<br/>
                </h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}