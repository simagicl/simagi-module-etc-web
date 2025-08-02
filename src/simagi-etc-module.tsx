import './simagi-etc-module.css'
import { MainLayout } from './components/layouts/MainLayout'
import { TitleBreadcrumb } from './components/ui/titleBreadcrumb/TitleBreadcrumb'
import { EvaluacionList } from './components/EvaluacionList/EvaluacionList'
import { EvaluacionDetail } from './components/EvaluacionDetail/EvaluacionDetail'
import { useState } from 'react'
import type { IEvaluacion } from '@/interfaces/evaluacion.interface'

const step = {
    list: 1,
    detail: 2
}

export const SimagiEtcModule = () => {
    const [currentStep, setCurrentStep] = useState(step.list)
    const [currentEvaluacion, setCurrentEvaluacion] = useState<IEvaluacion | null>(null)

    const handleEvaluacionEdit = (evaluacion: IEvaluacion) => {
        setCurrentEvaluacion(evaluacion)
        setCurrentStep(step.detail)
    }

    const handleEvaluacionDelete = (id: number) => {
        console.log("handleEvaluacionDelete", id)
        setCurrentStep(step.list)
    }


    return (
        <MainLayout>
            <TitleBreadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Evaluaciones", href: "/evaluaciones" },
            ]} />
            {currentStep === step.list && <EvaluacionList title="Evaluaciones" proceso_id={1} onEdit={handleEvaluacionEdit} onDelete={handleEvaluacionDelete} />}
            {currentStep === step.detail && <EvaluacionDetail evaluacion={currentEvaluacion!} onExit={() => setCurrentStep(step.list)} />}
        </MainLayout>
    )
}

export default SimagiEtcModule
