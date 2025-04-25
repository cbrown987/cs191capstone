'use client';

import { Suspense } from "react";
import { Menu } from "@/app/components/menu/menu";

export const MenuWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Menu />
    </Suspense>
  );
};