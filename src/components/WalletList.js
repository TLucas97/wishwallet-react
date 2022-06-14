import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function WalletList() {
    const navigate = useNavigate()
    const tokens = JSON.parse(localStorage.getItem('token'))
    const goToSettings = (i) => {
        console.log(i.balance, i.token)
        const changableToken = {
            id: i.id,
            token: i.token,
            balance: i.balance,
        }
        localStorage.removeItem('stateManager')
        localStorage.setItem('changableToken', JSON.stringify(changableToken))
        navigate('/manager')
    }
    const tokensList = tokens?.map((item) => {
        return (
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
    const balanceList = tokens?.map((item) => {
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
