import Link from "next/link"
import Logo from '@/assets/Ativo 9.png';
import Image from "next/image";
import Face from "@/assets/Face";
import Insta from "@/assets/Insta";
import Whats from "@/assets/Whats";

const header = {
    link: "/home",
    image: Logo
};

const nav = [
    {
        link: '/home',
        text: 'Inicio'
    },
    {
        link: '/home',
        text: 'Sobre'
    },
    {
        link: '/home',
        text: 'Visitas'
    },
    {
        link: '/home',
        text: 'Aulas'
    },
    {
        link: '/home',
        text: 'Na Midia'
    },
    {
        link: '/home',
        text: 'Blog'
    },
]

const redes = [
    {
        link: "",
        botao: <Face width={36} height={36} className="w-fit hover:opacity-70 transition ease-in" />,
    },
    {
        link: "",
        botao: <Insta width={43} height={43} className="w-fit hover:opacity-70 transition ease-in" />,
    },
    {
        link: "",
        botao: <Whats width={42} height={43} className="w-fit hover:opacity-70 transition ease-in" />,
    },
]

const ButtonsFooter = () => {
    return(
        <ul className="flex items-center gap-4">
            {redes.map((rede, index) => (
                <li key={index}>
                    <Link href={rede.link}>
                        {rede.botao}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default function Footer() {
    return(
        <footer className="flex flex-col gap-[50px] bg-[#1E1E1E] text-white px-[150px] py-[40px]">
            <nav className="flex items-center justify-between">
                <Link href={header.link}>
                    <Image src={header.image} alt="logo" width={150} height={80} />
                </Link>
                <div>
                    <ul className="flex gap-12 font-semibold">
                        {nav.map((item, index) => (
                            <li key={index}>
                                <Link href={item.link} className="hover:opacity-70 transition ease-in">{item.text}</Link>
                            </li>
                        ))}
                        <li>
                            <Link href={''} className="border-[1px] p-2 px-4 rounded-3xl hover:bg-white hover:text-black transition ease-in border-white">Contato</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <hr className="opacity-85" />
            <div className="flex justify-between items-center">
                <p>	&copy;VivaParis 2024 todos os direitos reservados</p>
                <div>
                    <ButtonsFooter />
                </div>
            </div>
        </footer>
    )
}