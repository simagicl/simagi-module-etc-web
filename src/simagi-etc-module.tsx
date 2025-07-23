import './simagi-etc-module.css'
import { MainLayout } from './components/layouts/MainLayout'
import { TitleBreadcrumb } from './components/ui/titleBreadcrumb/TitleBreadcrumb'
import { EvaluacionList } from './components/EvaluacionList/EvaluacionList'

export const SimagiEtcModule = () => {
    return (
        <MainLayout>
            <TitleBreadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Evaluaciones", href: "/evaluaciones" },
            ]} />
            
            <EvaluacionList title="Evaluaciones" />



        </MainLayout>
    )
}

export default SimagiEtcModule
