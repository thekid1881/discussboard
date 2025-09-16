import Image from "next/image";

export default function HomeHeader() {
    return (
        <div className="bg-transparent border-transparent rounded-md text-center justify-items-center text-8xl">
          <Image
            src="/kollagelogo.png"
            alt="kid kraft logo"
            width={600}
            height={200}
          />
        </div>
    );
}