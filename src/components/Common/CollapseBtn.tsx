import { Button } from "../ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

type CollapseBtnProps = {
    className?: string
    open: boolean
    onClick: () => void
}
export const CollapseBtn = ( { open, className, onClick }: CollapseBtnProps) => {
    return (
        <div className={className}>
            <Button onClick={onClick}>
                {open ? <ChevronDown /> : <ChevronRight />}
            </Button>
        </div>
    )
}