"use client"; // This page uses a client hook

import { useSearchParams } from 'next/navigation';
import React from 'react';

const Recipes: React.FC = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    return (
        <>
        </>
    );
};

export default Recipes;
