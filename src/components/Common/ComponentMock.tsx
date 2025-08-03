
interface ComponentMockProps {
    className?: string
}

export const ComponentMock = ({ className }: ComponentMockProps) => {
    return (
        <div className={className + " sm-component-mock"}></div>
    )
}