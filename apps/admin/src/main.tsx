import '@/assets/styles/main.scss'
import '@/shared/ag-grid'

import { enableMapSet, setAutoFreeze } from 'immer'
import { createRoot } from 'react-dom/client'

import App from '@/apps'

enableMapSet()
setAutoFreeze(false)

createRoot(document.getElementById('root')!).render(<App />)
