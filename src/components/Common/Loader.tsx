

export interface loaderProps {
    size?: "small" | "large"
}

export const Loader = ({ size = "large" }: loaderProps) => {
    return (
        <div className={`flex gap-4 justify-center items-center $  {size === "small" ? "min-h-64" : "min-h-96 flex-col"}`}>
            <div className="sm-loader"></div>
            <p className="text-lg font-bold text-gray-500">Cargando...</p>
        </div>
    )
}   