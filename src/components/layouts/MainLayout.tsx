
interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="container mx-auto border border-gray-200 p-4 rounded-lg shadow-lg">
            {children}
        </div>
    )
}