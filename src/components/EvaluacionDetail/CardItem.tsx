import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface CardItemProps {
    title: string;
    value?: string;    
    unit?: string;
    className?: string;
}

export const CardItem = ({ title, value, unit, className }: CardItemProps) => {
    return (
        <Card className="pt-0 border-1 border-slate-300 shadow-lg">
            <CardHeader className={className + " flex items-center justify-center rounded-t-lg min-h-8 p-1 text-sm "}>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="min-w-36">
                <p className="text-center text-2xl font-bold">{value}</p>
                <p className="text-center text-sm">{unit}</p>       
            </CardContent>    
        </Card>
    )
}