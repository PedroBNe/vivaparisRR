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
        <div className="min-h-screen w-full flex flex-col items-center py-[40px] gap-10 overflow-x-hidden relative bg-backImagePage bg-cover bg-center">
            <div className="p-[20px] xl:px-[130px]">
                <motion.div
                    className="rounded-xl p-3 lg:p-10 flex justify-center items-center"
                    variants={gradientVariants}
                    animate={currentGradient}
                    transition={{ duration: 2 }}
                >
                    <div className="w-full flex gap-[180px] justify-center items-center">
                        {firstPlace.image && (
                            <Image
                                src={firstPlace.image}
                                alt="Perfil"
                                width={400}
                                height={427}
                                quality={100}
                                className="w-[367px] h-[427px]"
                            />
                        )}
                        <div className="w-fit flex items-center">
                            <div className="w-full flex flex-col items-center">
                                <h2 className="Itim text-4xl font-semibold">{firstPlace.title2}</h2>
                                <h1 className="Itim text-6xl mb-4 font-bold text-[#C4C4C4]">{firstPlace.title1}</h1>
                                <p className="Roboco w-[45em] break-words whitespace-pre-line mb-10">
                                    {firstPlace.text}
                                </p>
                                <MyButton color="#1E1E1E" className="w-[150px] h-[40px] text-white text-sm rounded-lg p-0">
                                    Ver mais
                                </MyButton>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div className="px-[130px] flex items-center justify-center text-white text-center font">
                <p className="bg-[#1E1E1E] p-10 rounded-xl bg-fitaImage bg-cover bg-center">
                    {secondPlace.text}
                </p>
            </div>
        </div>
    );
}
