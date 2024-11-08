"use client";

import Image from "next/image";
import Link from "next/link";
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
    { link: '/blog', text: 'Blog' },
];

export default function Header() {

    const [logo, setLogo] = useState(`/logo.png?${Date.now()}`);


    return (
        <header className="w-full p-10 px-[130px] bg-transparent flex justify-between text-white absolute z-30">
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
