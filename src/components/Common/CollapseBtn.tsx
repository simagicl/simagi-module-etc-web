import { Button } from "../ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

type CollapseBtnProps = {
    className?: string;
    open: boolean;
    onClick: () => void;
};
export const CollapseBtn = ({ open, className, onClick }: CollapseBtnProps) => {
    return (
        <Button className={"w-8 h-8 " + className} onClick={onClick}>
            {open ? <ChevronDown /> : <ChevronRight />}
        </Button>
    );
};