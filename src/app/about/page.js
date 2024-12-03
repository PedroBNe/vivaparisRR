'use client'

import MyButton from "@/components/buttons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const gradientVariants = {
    gradient1: { background: "linear-gradient(to right, #055647, #db6e4e)" },
    gradient2: { background: "linear-gradient(to right, #db6e4e, #f3b6b6)" },
    gradient3: { background: "linear-gradient(to right, #f3b6b6, #c59bc7)" },
    gradient4: { background: "linear-gradient(to right, #c59bc7, #f2c261)" },
    gradient5: { background: "linear-gradient(to right, #f2c261, #ddc1b6)" },
    gradient6: { background: "linear-gradient(to right, #ddc1b6, #055647)" },
};

export default function About() {
    const [currentGradient, setCurrentGradient] = useState("gradient1");
    const [firstPlace, setFirstPlace] = useState({});
    const [secondPlace, setSecondPlace] = useState({});

    useEffect(() => {
        // Fetch JSON data from S3
        const fetchData = async () => {
            try {
                const response = await fetch('https://bucket-data-json.s3.us-east-2.amazonaws.com/data.json');
                const jsonData = await response.json();

                // Set data for firstPlace and secondPlace
                setFirstPlace(jsonData[1]?.firstPlace);
                setSecondPlace(jsonData[1]?.secondPlace);
            } catch (error) {
                console.error("Erro ao carregar dados do S3:", error);
            }
        };

        fetchData();

        // Change gradient every 3 seconds
        const interval = setInterval(() => {
            setCurrentGradient((prev) => {
                const gradientKeys = Object.keys(gradientVariants);
                const currentIndex = gradientKeys.indexOf(prev);
                return gradientKeys[(currentIndex + 1) % gradientKeys.length];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-auto w-full flex flex-col items-center py-[40px] px-[20px] xl:px-[130px] gap-10 overflow-x-hidden relative bg-backImagePage bg-cover bg-center">
            <div className="w-full min-h-screen flex flex-col items-center xl:items-start relative overflow-hidden">
                {firstPlace.image && (
                    <div className="xl:absolute right-0  top-[150px] z-10">
                        <Image
                            src={firstPlace.image}
                            alt="Perfil"
                            width={400}
                            height={427}
                            quality={100}
                            className="w-[367px] sm:w-[567px] h-[427px] sm:h-[627px]"
                        />
                    </div>
                )}
                <div className="w-full lg:w-[90%] flex flex-col items-center md:items-start bg-transparent xl:items-start mt-5 xl:mt-0 z-20">
                    <h2 className="font-bold text-3xl xl:text-8xl">{firstPlace.title2}</h2>
                    <h2 className="font-bold text-xl xl:text-3xl dancing-script">{firstPlace.title1}</h2>
                </div>
                <div className="md:w-[80%] xl:w-[50%] h-auto flex flex-col items-center justify-between gap-5 mt-14">
                    <p className="w-fit">{firstPlace.text}</p>
                    <hr className="w-[80%] border-[1px] border-[#1E1E1E]" />
                    <p className="w-fit">{secondPlace.text}</p>
                </div>
            </div>
        </div>
    );
}
