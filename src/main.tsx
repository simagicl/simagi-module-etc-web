import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SimagiEtcModule from './simagi-etc-module.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="container mx-auto my-20">
      <SimagiEtcModule />
    </div>
  </StrictMode>,
)