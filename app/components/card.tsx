import Image from 'next/image';
import React from "react";
import {CardProps} from "@/app/interfaces";

const Card: React.FC<CardProps> = ({ imageSrc, title }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
            <div className="relative w-full h-40">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-4 flex-grow">
                <h2 className="text-xl font-serif tracking-wide text-[#902425] line-clamp-2">
                    {title}
                </h2>
            </div>
        </div>
    );
};

export default Card;