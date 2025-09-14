import Link from "next/link";

export default function Footer() {
    return (
<       footer className="items-center text-center justify-center bg-transparent w-screen overflow-x-hidden">
            <Link
                href="/about"
                className="text-2xl hover:underline"
            >
                About
            </Link>
        </footer>
    );
}