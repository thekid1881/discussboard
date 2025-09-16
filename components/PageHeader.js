import Image from "next/image";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function PageHeader() {
    return (
        <div className="flex flex-row bg-transparent">
          <div className="absolute top-12 right-12">
            <SignOutButton />
          </div>
          <Link
            href="/"
          >
            <Image
              src="/kollagelogo.png"
              href="/"
              width={300}
              height={100}
              alt="globe"
              className="absolute top-12 left-12"
            />
          </Link>
        </div>
    );
}