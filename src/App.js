import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home.js'
import Form from './pages/AddToken.js'
import Settings from './pages/Settings.js'
import SnackbarProvider from 'react-simple-snackbar'

function App() {
    return (
        <div className="App">
            <SnackbarProvider>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/form" element={<Form />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </Router>
            </SnackbarProvider>
        </div>
    )
}

export default App
