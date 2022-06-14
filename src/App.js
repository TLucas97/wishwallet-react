import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Logo from './components/Logo'
import Home from './pages/Home.js'
import TokenManager from './pages/TokenManager.js'
import SnackbarProvider from 'react-simple-snackbar'

function App() {
    return (
        <div className="App">
            <SnackbarProvider>
                <Router>
                    <Logo />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/manager" element={<TokenManager />} />
                    </Routes>
                </Router>
            </SnackbarProvider>
        </div>
    )
}

export default App
