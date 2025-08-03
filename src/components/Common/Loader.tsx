

export interface loaderProps {
    size?: "sm" | "md" | "lg"
    noText?: boolean
}

export const Loader = ({ size = "md", noText = false }: loaderProps) => {
    const sizes = {
        sm: "min-h-64",
        md: "min-h-96",
        lg: "min-h-128"
    }
    return (
        <div className={`flex gap-4 justify-center items-center $ {sizes[size]}`}>
            <div className={`sm-loader sm-loader-${size}`}></div>
            {!noText && <p className="text-lg font-bold text-gray-500">Cargando...</p>}
        </div>
    )
}   