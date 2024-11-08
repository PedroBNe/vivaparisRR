"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const header = {
    link: "/home",
};

const nav = [
    { link: '/home', text: 'Inicio' },
    { link: '/about', text: 'Sobre' },
    { link: '/home', text: 'Visitas' },
    { link: '/home', text: 'Aulas' },
    { link: '/home', text: 'Na Midia' },
    { link: '/home', text: 'Blog' },
];

export default function HeaderFixo() {
    const pathname = usePathname();

    const [logo, setLogo] = useState(`/logo.png?${Date.now()}`);

    // Rotas onde o Header não deve aparecer
    const hideHeaderRoutes = ["/home", "/"]; 

    if (hideHeaderRoutes.includes(pathname) || pathname.startsWith('/dashboard')) return null;

    return (
        <header className="w-full h-[12vh] px-[130px] bg-[#1E1E1E] flex justify-between items-center text-white">
            <Link href={header.link}>
                <Image src={logo} alt="logo" width={150} height={80} />
            </Link>
            <nav>
                <ul className="flex gap-12 font-semibold">
                    {nav.map((item, index) => (
                        <li key={index}>
                            <Link href={item.link} className="hover:opacity-70 transition ease-in">{item.text}</Link>
                        </li>
                    ))}
                    <li>
                        <Link href="" className="border-[1px] p-2 px-4 rounded-3xl hover:bg-white hover:text-black transition ease-in border-white">Contato</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
