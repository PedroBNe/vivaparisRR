'use client'

import Link from "next/link";
import Airplane from "@/assets/Airplane";
import Faders from "@/assets/Faders";
import ShieldCheck from "@/assets/ShieldCheck";
import Arrow from "@/assets/Arrow";
import { Button } from "@/components/ui/button";
import MyButton from "@/components/buttons";
import { useEffect, useState } from "react";
import Image from "next/image";
import French from "@/assets/Frech";
import Header from "@/components/common/header";
import Idea from "@/assets/idea";
import Map from "@/assets/map";
import useWindowSize from "@/components/getWindow";

const Card = ({ title, text, id }) => (
    <div className="flex flex-col items-center lg:items-start gap-5 p-5">
        <div className="w-full">0{id}</div>
        <h3 className="w-full font-bold">{title}</h3>
        <p className="w-full">{text}</p>
    </div>
)

const Carousel = ({carousel}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, carousel.length - 1));
        }, 5000);
    
        return () => clearInterval(interval);
    }, [carousel.length]);    

    return (
        <div className="w-full h-[360px] sm:h-[400px] md:h-[350px] flex justify-center items-center">
            <div className="w-full flex justify-center items-center relative">
                {carousel.map((item, index) => (
                    <div
                    key={index}
                    className={`w-full h-full flex items-center justify-center transition duration-1000 ease-in-out absolute ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
                    >
                        <div className="w-full h-full bg-black bg-opacity-40 flex flex-col gap-4 items-center justify-end relative z-20">
                            <div className="flex flex-col items-center">
                                <h3 className="font-bold text-white">{item.title}</h3>
                                <p className="text-white">{item.text}</p>
                            </div>
                        </div>
                    </div>
                ))} 
            </div>
        </div>
    )
}

const TravelsCard = ({ title, text, img, color }) => (
    <div className="flex flex-col gap-8 p-5 items-center">
        <Image src={img} alt={title} width={100} height={100} quality={100} className="w-[100px] h-[100px] rounded-xl shadow-2xl" />
        <div className="flex flex-col gap-5 items-center">
            <h3 className="font-bold">{title}</h3>
            <p>{text}</p>
        </div>
    </div>
);

const DestinationCard = ({ destination }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bool, setBool] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, destination.length - 1));
    };
    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const windowWidth = useWindowSize();

    useEffect(() => {
        const handleResize = () => {
            if (windowWidth <= 425) setBool(9);
            else if (windowWidth <= 1024 && windowWidth > 425) setBool(8);
            else setBool(5);
        };
    
        window.addEventListener("resize", handleResize);
        handleResize(); // Chamar inicialmente
    
        return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth]);
    

    return (
        <div className="w-full flex flex-col gap-5 relative">
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
                        <Image src={destiny.img} alt={destiny.destino} width={327} height={452} quality={100} className="w-[327px] h-[452px] absolute top-2 opacity-90 rounded-xl z-10" />
                    </div>
                ))}
            </div>
            <div className="w-full sm:w-fit sm:absolute top-[-55px] right-5 flex justify-center gap-5">
                <Button disabled={currentIndex === 0} onClick={handlePrev} size={'largeIcon'} className={`flex items-center px-3 rounded-3xl bg-[#1E1E1E] hover:opacity-80 transition ease-in`}>
                    <Arrow rotate={180} stroke="#ffffff" />
                </Button>
                <Button disabled={currentIndex === bool} onClick={handleNext} size={'largeIcon'} className={`flex items-center px-3 rounded-3xl bg-[#1E1E1E] hover:opacity-80 transition ease-in`}>
                    <Arrow stroke="#ffffff" />
                </Button>
            </div>
        </div>
    );
};

const GaleryCard = ({ galery }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {galery.map((galery, index) => (
            <div key={index} className="w-[350px] h-[350px] p-2 rounded-xl flex-shrink-0 relative text-white">
                <div className="w-[350px] h-[350px] bg-black text-start rounded-xl p-8 bg-opacity-40 flex flex-col gap-2 items-start justify-end relative z-20">
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-bold">{galery.destino}</h3>
                        <p>{galery.local}</p>
                    </div>
                    <div className="flex items-center text-sm gap-2">
                        <p>Viajens: </p>
                        {galery.trips}
                    </div>
                </div>
                <Image src={galery.img} alt={galery.destino} width={350} height={350} quality={100} className="w-[350px] h-[350px] absolute top-2 opacity-90 rounded-xl z-10" />
            </div>
        ))}
    </div>
);

export default function Home() {
    const windowWidth = useWindowSize();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://bucket-data-json.s3.us-east-2.amazonaws.com/data.json");
                const jsonData = await response.json();
                setData(jsonData[0]); // Pega o primeiro elemento da lista
            } catch (error) {
                console.error("Erro ao buscar os dados do S3:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </div>
        );
    }
    

    const {
        banner,
        travels,
        destiny,
        plan,
        galery,
        colorPrimary,
        colorSecondary,
    } = data || {};

    return(
        <div className="h-auto flex flex-col overflow-x-hidden relative bg-backImagePage bg-cover bg-center">
            <Header />
            <Image src={banner.image} alt="back" width={1000} height={950} quality={100} className="w-full h-[950px] absolute z-10" />
            <div className={`h-[950px] pt-[200px] p-[20px] xl:px-[130px] flex flex-col gap-[110px] text-white z-20 relative bg-black bg-opacity-50`}>
                <div className="flex flex-col gap-[90px]">
                    <div className="flex flex-col gap-12">
                        <h1 className="w-full xl:w-[65%] items-center text-3xl lg:text-6xl font-bold">{banner.title}</h1>
                        <h2 className="text-sm md:text-md">{banner.subtitle}</h2>
                    </div>
                    <Link href={''} className="w-fit">
                        <MyButton color={colorPrimary}>Saiba mais</MyButton>
                    </Link>
                </div>
                {windowWidth > 1024 && (
                    <div className="w-full">
                        <hr />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                            {banner.carousel.map((item) => (
                                <Card key={item.id} title={item.title} text={item.text} id={item.id} />
                            ))}
                        </div>
                    </div>
                )}
                {windowWidth <= 1024 && (
                    <div className="w-full">
                        <hr />
                        <Carousel carousel={banner.carousel} />
                    </div>
                )}
            </div>
            <div className="w-full py-[35px] flex justify-center items-center bg-[#1E1E1E] text-[#D9D9D9] relative">
                <div className="w-[105%] h-[8vh] flex gap-5 items-center justify-around absolute left-[-10px] top-0 font-semibold text-3xl rotate-2 z-20" style={{ backgroundColor: colorSecondary }}>
                    <p>Explore</p>
                    <p>Descubra</p>
                    <p>Aprecie</p>
                    <p>Experimente</p>
                    <p>Vivencie</p>
                </div>
                <div className="w-full h-[8vh] absolute top-0 z-10" style={{ backgroundColor: colorPrimary }}></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-[35px] pt-[80px] px-[20px] lg:px-[130px]">
                    {travels.map((item) => (
                        <TravelsCard key={item.id} title={item.title} text={item.text} img={item.img} color={colorPrimary} />
                    ))}
                </div>
            </div>
            <div className="px-[20px] xl:px-[130px] py-[120px] flex flex-col gap-4 font" style={{ color: colorSecondary }}>
                <p className="text-lg font-semibold">Para onde voce gostaria de ir?</p>
                <h2 className="text-5xl font-bold">Destinos Populares</h2>
                <DestinationCard color={colorSecondary} destination={destiny} />
            </div>
            <div className="px-[20px] xl:px-[130px] flex flex-col gap-10 font pb-[40px]" style={{ color: colorSecondary }}>
                <div className="flex flex-col gap-4">
                    <p className="text-lg font-semibold">Para onde voce gostaria de ir?</p>
                    <div className="flex flex-col gap-[30px] xl:flex-row items-center lg:items-start lg:justify-between">
                        <h2 className="text-5xl font-bold">Deixe seus planos conosco e vá às alturas</h2>
                        <MyButton>
                            Saiba mais
                        </MyButton>
                    </div>
                </div>
                <div className="w-full flex flex-col xl:flex-row justify-center items-center gap-[70px] p-5">
                    <Image src={plan.image} alt="viagem" width={550} height={480} quality={100} className="w-[550px] h-[480px] rounded-xl shadow-2xl"/>
                    <div className="w-full xl:w-[50%] flex flex-col gap-[80px] p-0 xl:p-10">
                        <div className="flex flex-col gap-7">
                            <Map width={80} height={80} fill={colorSecondary} />
                            <h2 className="text-4xl font-semibold">{plan.title1}</h2>
                            <p>{plan.subtitle1}</p>
                            <Link href={''} className="w-fit flex gap-1 items-center underline font-extrabold hover:opacity-70 transition ease-in">
                                Clique aqui <Arrow stroke={colorSecondary} />
                            </Link>
                        </div>
                        <div className="flex flex-col gap-7">
                            <Idea width={80} height={80} fill={colorSecondary} />
                            <h2 className="text-4xl font-semibold">{plan.title2}</h2>
                            <p>{plan.subtitle2}</p>
                            <Link href={''} className="w-fit flex gap-1 items-center underline font-extrabold hover:opacity-70 transition ease-in">
                                Clique aqui <Arrow stroke={colorSecondary} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-start font mb-14" style={{ color: colorSecondary }}>
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-semibold">Galeria de viajens</p>
                    <h2 className="text-5xl font-bold">Viajens feitas</h2>
                    <div className="flex flex-col gap-[100px] items-center">
                        <GaleryCard galery={galery} />
                        <Link href={''}>
                            <MyButton className="flex items-center gap-2">
                                Ver todas as viajens <Arrow stroke="#000000" width={40} height={40} />
                            </MyButton>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[80px] justify-center items-center text-center font py-8" style={{ backgroundColor: colorSecondary }}>
                <div className="flex flex-col gap-4 justify-center items-center text-white text-5xl font-bold">
                    <h1>Pronto para viajar?</h1>
                    <p>Entre em contato com a gente</p>
                </div>
                <Link href={''}>
                    <MyButton className="flex items-center gap-2">
                        Entre em contato <Arrow stroke="#000000" width={20} height={20} />
                    </MyButton>
                </Link>
            </div>
        </div>
    )
}