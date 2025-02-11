import Image from 'next/image';
import React from "react";

interface CardProps {
    imageSrc: string;
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description }) => {
    return (
        <div className="max-w-sm bg-white border rounded-lg shadow-lg overflow-hidden">
            {/* Image */}
            <Image
                src={imageSrc}
                alt={title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
            />

            {/* Text Section */}
            <div className="p-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-600 mt-2">{description}</p>
            </div>
        </div>
    );
};

export default Card;
