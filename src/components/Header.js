import React from 'react'
import Star from '../assets/shooting-star.svg'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

function Header(props) {
    const setStateManager = () => {
        const state = 'AddToken'
        localStorage.setItem('stateManager', state)
    }
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center pt-5 home-width">
                <div className="d-flex">
                    <div>
                        <img src={Star} width={50} alt="shooting-star" />
                    </div>
                    <h2>Wish Wallet</h2>
                </div>
                <div>
                    <Link to={props.easyRoutes ?? '/manager'}>
                        <Button
                            onClick={props.stateManager ?? setStateManager}
                            variant="contained"
                            color={props.btnColor ?? 'secondary'}
                            className={props.btnClass}
                        >
                            {props.buttonName ?? 'Add token'}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
