import { createTheme, ThemeProvider } from '@mui/material'
import { FC } from "react"
import { createRoot } from 'react-dom/client'

const theme = createTheme()

export const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <div>1</div>
        </ThemeProvider>
    )
}
const root = createRoot(document.getElementById("app")!)
root.render(<App />)