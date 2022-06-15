import React from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.svg'

function Logo() {
    // Removing current manager state from localStorage
    const removeState = () => { 
        localStorage.removeItem('stateManager')
     }
    return (
        <div className="d-flex justify-content-center pt-4">
            <Link to="/">
                <img onClick={removeState} src={logoImg} width={200} alt="klever-logo" />
            </Link>
        </div>
    )
}

export default Logo
