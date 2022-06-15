import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function WalletList() {
    const navigate = useNavigate()
    const mainToken = JSON.parse(localStorage.getItem('token'))
    const goToSettings = (i) => {
        // Make a copy of the current token for comparison
        const changableToken = {
            id: i.id,
            token: i.token,
            balance: i.balance,
        }
        localStorage.setItem('stateManager', 'EditToken')
        localStorage.setItem('changableToken', JSON.stringify(changableToken))
        navigate('/manager')
    }
    const tokensList = mainToken?.map((item) => {
        return (
            // Current tokens rendered in the list
            <div className="pb-2 d-flex items-render" key={item.token}>
                <FaEdit
                    style={{width: '25px', cursor: 'pointer'}}
                    onClick={() => {
                        goToSettings(item)
                    }}
                />{' '}
                <li>{item.token}</li>
            </div>
        )
    })
    const balanceList = mainToken?.map((item) => {
          // Current balances formated in the list
        const formatedBalance = parseFloat(item.balance).toLocaleString('pt-br')
        return (
            <li className="pb-2" key={item.balance}>
                {formatedBalance}
            </li>
        )
    })
    return (
        <>
            <div className="d-flex justify-content-between home-width">
                <div>
                    <h4>{tokensList ?? ''}</h4>
                </div>
                <div>
                    <h4 className="text-end">{balanceList ?? ''}</h4>
                </div>
            </div>
        </>
    )
}

export default WalletList
