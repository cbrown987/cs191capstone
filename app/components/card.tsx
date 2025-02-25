import Image from 'next/image';
import React from "react";
import {CardProps} from "@/app/interfaces";

const Card: React.FC<CardProps> = ({ imageSrc, title, description }) => {
    return (
        <div className="bg-white text-gray-900 min-h-screen p-8 font-playfair max-w-4xl mx-auto border-deco">
            <header className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
                    {title}
                </h2>
            </header>

            <Image
                src={imageSrc}
                alt={title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                <p className="text-gray-600 mt-2">{description}</p>
            </div>
        </div>
    );
};

export default Card;
