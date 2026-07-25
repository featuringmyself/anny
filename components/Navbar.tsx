import Link from "next/link";
import Image from "next/image";
import logoImg from "@/public/logo.png"
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4 border-b">
            {/* logo */}
            <Link href="/" className="flex items-center gap-2 text-2xl font-medium tracking-tight"><Image src={logoImg} alt="logo" width={30} height={30} /><h1>Anny</h1></Link>

            {/* menu items */}
            <div className="flex items-center gap-12 font-medium text-sm text-zinc-500">
                <Link href="/docs" className="hover:text-zinc-900 transition-colors">Product</Link>
                <Link href="/pricing" className="hover:text-zinc-900 transition-colors">Pricing</Link>
                <Link href="/careers" className="hover:text-zinc-900 transition-colors">Careers</Link>

            </div>

            {/* auth buttons */}
            <div className="flex items-center gap-4">
                <Button className="px-3">Talk to sales</Button>
            </div>
        </nav>
    )
}