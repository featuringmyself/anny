import Link from "next/link";
import Image from "next/image";
import logoImg from "@/public/logo.png"
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4">
            {/* logo */}
            <Link href="/" className="flex items-center gap-2 font-space-grotesk text-2xl font-medium"><Image src={logoImg} alt="logo" width={30} height={30} />Anny</Link>

            {/* menu items */}
            <div className="flex items-center gap-5">
                <Link href="/">Product</Link>
                <Link href="/">Pricing</Link>
                <Link href="/">Careers</Link>

            </div>

            {/* auth buttons */}
            <div className="flex items-center gap-4">
                <Button variant="outline">Login</Button>
                <Button>Signup</Button>
            </div>
        </nav>
    )
}