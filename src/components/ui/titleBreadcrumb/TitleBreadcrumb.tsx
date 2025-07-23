
interface TitleBreadcrumbProps {
    textClassName?: string;
    items: {
        label: string;
        href: string;
    }[];
}

export const TitleBreadcrumb = ({ textClassName, items }: TitleBreadcrumbProps) => {
    return (
        <div className="flex items-center justify-between">
            <ul className="flex items-center gap-2">
                {items.map((item, index) => (
                    <li key={index}>
                        <a href={item.href} className={textClassName}>{item.label}</a>
                        {index < items.length - 1 && (
                            <span className="text-gray-500"> /</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};