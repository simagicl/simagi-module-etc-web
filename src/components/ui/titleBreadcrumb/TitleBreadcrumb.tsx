import { useState } from "react";

interface TitleBreadcrumbProps {
    textClassName?: string;
    items: {
        label: string;
        href: string;
    }[];
}

export const TitleBreadcrumb = ({ textClassName, items }: TitleBreadcrumbProps) => {
    const [currentItems, setCurrentItems] = useState(items);
    return (
        <div className="flex items-center justify-between">
            <ul className="flex items-center gap-2">
                {currentItems.map((item, index) => (
                    <li key={index}>
                        <a href={item.href} className={textClassName}>{item.label}</a>
                        {index < currentItems.length - 1 && (
                            <span className="text-gray-500"> /</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};