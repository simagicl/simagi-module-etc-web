import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SimagiEtcModule from './simagi-etc-module.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SimagiEtcModule userId="" apiUrl="" authToken="" />
  </StrictMode>,
)
