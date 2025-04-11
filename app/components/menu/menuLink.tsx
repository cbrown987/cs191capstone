import {MenuLinkProps} from "@/app/interfaces";
import Link from "next/link";

export const MenuLink: React.FC<MenuLinkProps> = ({linkText, link, description}) => {
    let n_link = "/recipes/" + description + "/" + link;
    return (
        <li className="border-b border-gray-200 last:border-b-0 pb-2">
            <Link
    href={n_link}
    className="group block py-3"
>
    <div className="flex justify-between items-center">
        <span className="font-serif tracking-wide text-lg group-hover:text-gray-600 transition-colors duration-300">
            {linkText}
        </span>
        <span className="text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            view →
        </span>
    </div>
    <span className="text-sm text-gray-500 italic block mt-1">{description}</span>
</Link>
        </li>
    );
};