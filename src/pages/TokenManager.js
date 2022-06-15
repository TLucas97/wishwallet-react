import React from 'react'
import { AddToken, EditToken } from '../components/Actions'
import { useState } from 'react'

function TokenManager() {
    // Token manager for additions and edits. Visibility will rely on the current localStorage value.
    const actualState = localStorage.getItem('stateManager')
    const [state] = useState([actualState])
    console.log(state)
    if (state[0] === 'AddToken') {
        return <AddToken />
    } else {
        return <EditToken />
    }
}

export default TokenManager
