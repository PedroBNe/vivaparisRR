"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useWindowWidth from "../getwid";
import Menu from "@/assets/Menu";

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
    const window = useWindowWidth();
    const [logo, setLogo] = useState(`/logo.png?${Date.now()}`);
    const [hidden, setHidden] = useState(true);

    const handleScroll = () => (document.body.style.position = "sticky"); // Can scroll down

    const handleNoScroll = () => (document.body.style.position = "fixed"); // Can not scroll down

    useEffect(() => {
        function ApplyFixed() {
            body
        }
    }, [])

    return (
        <header className="w-full p-10 lg:px-[130px] bg-transparent flex justify-between text-white absolute z-30">
            <Link href={header.link}>
                <Image src={logo} alt="logo" width={150} height={80} />
            </Link>
            {window > 1024 && (
                <nav>
                    <ul className="flex gap-12 font-semibold">
                        {nav.map((item, index) => (
                            <li key={index}>
                                <Link href={item.link} className="hover:opacity-70 transition ease-in">{item.text}</Link>
                            </li>
                        ))}
                        <li>a
                            <Link href="" className="border-[1px] p-2 px-4 rounded-3xl hover:bg-white hover:text-black transition ease-in border-white">Contato</Link>
                        </li>
                    </ul>
                </nav>
            )}
            {window <= 1024 && (
                <div>
                    <button onClick={() => {setHidden(!hidden), handleNoScroll()}}>
                        <Menu  />
                    </button>
                    <nav className={`${hidden ? 'hidden' : ''} flex flex-col items-center justify-center gap-4 absolute bg-[#1E1E1E] w-screen h-screen top-0 left-0`}>
                        <button onClick={() => {setHidden(!hidden), handleScroll()}} className="absolute right-4 top-4 text-3xl font-bold">x</button>
                        <ul className="flex flex-col items-center lg:items-start lg:flex-row gap-12 font-semibold">
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
                </div>
            )}
        </header>
    );
}
