import {MenuLinkProps} from "@/app/interfaces";
import React from "react";
import Link from "next/link";

export const MenuLink: React.FC<MenuLinkProps> = ({linkText, link, description}) => {
    let n_link = "/recipes/" + description+ "/" + link
    return (
            <>
                <li className="flex justify-between border-b border-gray-300 pb-1">
                  <span>
                    <Link href={n_link}>{linkText}</Link>
                  </span>
                  {/*<span className="text-sm text-gray-500 italic"> with thyme, black truffle, and lemon zest</span>*/}
                </li>
            </>
        );
    };
