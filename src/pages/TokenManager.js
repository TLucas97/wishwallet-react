import React from 'react'
import { AddToken, EditToken } from '../components/Actions'
import { useState } from 'react'

function TokenManager() {
    const actualState = localStorage.getItem('stateManager')
    const [state] = useState([actualState])
    console.log(state)
    if (state[0] === null) {
        return <EditToken />
    } else {
        return <AddToken />
    }
}

export default TokenManager
