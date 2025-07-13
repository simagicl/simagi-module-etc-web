import type { AppProps } from './interfaces/app.inteface'

import './simagi-etc-module.css'

export const SimagiEtcModule = (props: AppProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Simagi Etc Module</h1>
            {props.userId}
        </div>
    )
}

export default SimagiEtcModule
