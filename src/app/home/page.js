'use client'

import Link from "next/link";
import Airplane from "@/assets/Airplane";
import Faders from "@/assets/Faders";
import ShieldCheck from "@/assets/ShieldCheck";
import Arrow from "@/assets/Arrow";
import { Button } from "@/components/ui/button";
import MyButton from "@/components/buttons";
import { useState } from "react";
import Imagem from '@/assets/teste.jpeg'
import Image from "next/image";
import French from "@/assets/Frech";
import Viagem from '@/assets/viagem.jpeg'

const infoSite = {
    colorPrimary: '#f2c249',
}

const carousel = [
    {
        id: 1,
        title: "Chose a place, activity and time",
        text: "We help people find co travellers and also structure their travel plans "
    },
    {
        id: 2,
        title: "Chose a place, activity and time",
        text: "We help people find co travellers and also structure their travel plans "
    },
    {
        id: 3,
        title: "Chose a place, activity and time",
        text: "We help people find co travellers and also structure their travel plans "
    },
]

const Card = ({ title, text, id }) => (
    <div className="flex flex-col gap-5 p-5">
        <div>0{id}</div>
        <h3 className="font-bold">{title}</h3>
        <p>{text}</p>
    </div>
)

const travels = [
    {
        img: <Airplane stroke={infoSite.colorPrimary} />,
        title: "Chose a place, activity and time",
        text: "We help people find co travellers and also structure their travel plans "
    },
    {
        img: <ShieldCheck stroke={infoSite.colorPrimary} />,
        title: "Chose a place, activity and time",
        text: "We help people find co travellers and also structure their travel plans "
    },
    {
        img: <Faders fill={infoSite.colorPrimary} />,
        title: "Chose a place, activity and time",
        text: "We help people find co travellers and also structure their travel plans "
    },
]

const TravelsCard = ({ title, text, img }) => (
    <div className="flex flex-col gap-8 p-5">
        {img}
        <div className="flex flex-col gap-5">
            <h3 className="font-bold">{title}</h3>
            <p>{text}</p>
        </div>
    </div>
)

const destination = [
    {
        destino: "Museu do Louvre",
        local: "Paris, França",
        estilo: "Clássico",
        img: Imagem
    },
    {
        destino: "Museu do Louvre",
        local: "Paris, França",
        estilo: "Egito",
        img: Imagem
    },
    {
        destino: "Museu do Louvre",
        local: "Paris, França",
        estilo: "Kids (em breve)",
        img: Imagem
    },
    {
        destino: "Museu d’Orsay",
        local: "Paris, França",
        img: Imagem
    },
    {
        destino: "Museu Rodin",
        local: "Paris, França",
        img: Imagem
    },
    {
        destino: 'Montmartre',
        local: "Paris, França",
        rua: 'Île de la Cité + Quartier Latin',
        img: Imagem
    },
    {
        destino: 'Montmartre',
        local: "Paris, França",
        rua: 'Île de la Cité + Le Marais',
        img: Imagem
    },
    {
        destino: 'Montmartre',
        local: "Paris, França",
        rua: 'Eixo histórico',
        img: Imagem
    },
    {
        destino: 'Montmartre',
        local: "Paris, França",
        rua: 'Revolução Francesa (em breve !)',
        img: Imagem
    },
    {
        destino: 'Castelo de Versalhes',
        local: 'Versalhes, França',
        img: Imagem
    },
]

const DestinationCard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? destination.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === destination.length - 1 ? 0 : prevIndex + 1
        );
    };

    return(
        <div className="w-full relative">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 340}px)` }}
            >
                {destination.map((destiny, index) => (
                    <div key={index} className="w-[327px] h-[452px] p-2 rounded-xl flex-shrink-0 mx-2 relative text-white">
                        <div className="w-[327px] h-[452px] bg-black rounded-xl p-2 bg-opacity-40 flex flex-col gap-4 items-center justify-end relative z-20">
                            <div className="flex flex-col items-center">
                                <h3 className="text-2xl font-bold">{destiny.destino}</h3>
                                {destiny.estilo && <p>{destiny.estilo}</p>}
                                {destiny.rua && <p>{destiny.rua}</p>}
                            </div>
                            <div className="flex items-center text-sm gap-2">
                                <French />
                                <p>{destiny.local}</p>
                            </div>
                        </div>
                        <Image src={destiny.img} alt={destiny.destino} className="w-[327px] h-[452px] absolute top-2 opacity-90 rounded-xl z-10" />
                    </div>
                ))}
            </div>
            <div className="absolute top-[-55px] right-5 flex gap-5">
                <Button disabled={currentIndex === 0} onClick={handlePrev} size={'largeIcon'} className="flex items-center bg-[#112F38] px-3 rounded-3xl hover:opacity-80 transition ease-in">
                    <Arrow rotate={180} />
                </Button>
                <Button disabled={currentIndex === 5} onClick={handleNext} size={'largeIcon'} className="flex items-center bg-[#112F38] px-3 rounded-3xl hover:opacity-80 transition ease-in">
                    <Arrow />
                </Button>
            </div>
        </div>
    )
}

const galery = [
    {
        destino: "Museu do Louvre",
        local: "Paris, França",
        estilo: "Clássico",
        img: Imagem
    },
]

const GaleryCard = () => (
    <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 340}px)` }}
    >
        {destination.map((destiny, index) => (
            <div key={index} className="w-[327px] h-[452px] p-2 rounded-xl flex-shrink-0 mx-2 relative text-white">
                <div className="w-[327px] h-[452px] bg-black rounded-xl p-2 bg-opacity-40 flex flex-col gap-4 items-center justify-end relative z-20">
                    <div className="flex flex-col items-center">
                        <h3 className="text-2xl font-bold">{destiny.destino}</h3>
                        {destiny.estilo && <p>{destiny.estilo}</p>}
                        {destiny.rua && <p>{destiny.rua}</p>}
                    </div>
                    <div className="flex items-center text-sm gap-2">
                        <French />
                        <p>{destiny.local}</p>
                    </div>
                </div>
                <Image src={destiny.img} alt={destiny.destino} className="w-[327px] h-[452px] absolute top-2 opacity-90 rounded-xl z-10" />
            </div>
        ))}
    </div>
)

export default function Home() {
    return(
        <div className="flex flex-col overflow-hidden">
            <div className="h-[950px] pt-[200px] px-[130px] flex flex-col gap-[110px] bg-black text-white">
                <div className="flex flex-col gap-[90px]">
                    <div className="flex flex-col gap-12">
                        <h1 className="w-[45%] items-center text-6xl font-bold">Explore o mundo, conquistando pessoas</h1>
                        <h2>Ajudamos pessoas com seus destinos e viajens</h2>
                    </div>
                    <Link href={''}>
                        <MyButton color="f2c249">Saiba mais</MyButton>
                    </Link>
                </div>
                <div>
                    <hr />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                        {carousel.map((item) => (
                            <Card key={item.id} title={item.title} text={item.text} id={item.id} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full min-h-[50vh] flex items-end bg-[#1E1E1E] text-[#D9D9D9] relative pb-10">
                <div className="w-[105%] h-[8vh] bg-[#141B34] flex items-center justify-around absolute left-[-10px] top-0 font-semibold text-3xl rotate-2 z-20">
                    <p>explore</p>
                    <p>adventure</p>
                    <p>luxury</p>
                    <p>enjoy</p>
                    <p>explore</p>
                </div>
                <div className="w-full h-[8vh] bg-[#f2c249] absolute top-0 z-10"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-8 px-[130px]">
                    {travels.map((item) => (
                        <TravelsCard key={item.id} title={item.title} text={item.text} img={item.img} />
                    ))}
                </div>
            </div>
            <div className="h-[90vh] text-[#0E3D4D] px-[130px] py-[120px] flex flex-col gap-4">
                <p className="text-lg font-semibold">Para onde voce gostaria de ir?</p>
                <h2 className="text-5xl font-bold">Destinos Populares</h2>
                <DestinationCard />
            </div>
            <div className="h-[90vh] text-[#0E3D4D] px-[130px] flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <p className="text-lg font-semibold">Para onde voce gostaria de ir?</p>
                    <div className="flex justify-between">
                        <h2 className="text-5xl font-bold">Deixe seus planos conosco e vá às alturas</h2>
                        <MyButton>
                            Saiba mais
                        </MyButton>
                    </div>
                </div>
                <div className="w-full flex justify-center gap-[70px] p-5">
                    <Image src={Viagem} alt="viagem" className="w-[550px] h-[480px] rounded-xl shadow-2xl"/>
                    <div className="w-[50%] flex flex-col gap-[140px] p-10">
                        <div className="flex flex-col gap-5">
                            <h2 className="text-5xl font-semibold">Lorem nasjdhd</h2>
                            <p>jasdjahsdhasdhkjashdjkassssssssssssdfsdfsdf</p>
                            <Link href={''} className="w-fit underline font-bold hover:opacity-70 transition ease-in">
                                Clique aqui
                            </Link>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h2 className="text-5xl font-semibold">Lorem nasjdhd</h2>
                            <p>jasdjahsdhasdhkjashdjkassssssssssssdfsdfsdf</p>
                            <Link href={''} className="w-fit underline font-bold hover:opacity-70 transition ease-in">
                                Clique aqui
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center text-[#0E3D4D]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-semibold">Galeria de viajens</p>
                    <h2 className="text-5xl font-bold">Viajens feitas</h2>
                </div>
            </div>
        </div>
    )
}