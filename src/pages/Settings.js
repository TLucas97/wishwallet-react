import React from 'react'
import Actions from '../components/Actions'
import Form from '../components/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Settings() {
    const navigate = useNavigate()
    const tokens = JSON.parse(localStorage.getItem('changableToken'))
    const mainToken = JSON.parse(localStorage.getItem('token'))
    let [id, setId] = useState(tokens.id)
    let [token, setToken] = useState(tokens.token)
    let [balance, setBalance] = useState(tokens.balance)
    const changeToken = () => {
        const newToken = {
            id: id,
            token: token,
            balance: balance,
        }
        mainToken.map((item) => {
            if (item.id === id) {
                const newToken = {
                    token: token,
                    balance: balance,
                }
                item.token = newToken.token
                item.balance = newToken.balance
                localStorage.setItem('token', JSON.stringify(mainToken))
            }
            return navigate('/')
        })
        localStorage.setItem('changableToken', JSON.stringify(newToken))
    }
    const deleteToken = () => { 
        mainToken.map((item) => { 
            if (item.id === id) { 
                const newToken = mainToken.splice(mainToken.indexOf(item), 1)
                console.log(newToken)
                localStorage.setItem('token', JSON.stringify(mainToken))
            }
            return navigate('/')
         })
     }
    return (
        <>
            <Actions buttonName="Back" btnClass="forcedColor" easyRoutes="/" />
            <Form
                buttons={false}
                tokenValue={token}
                balanceValue={balance}
                tokenTarget={(event) => setToken(event.target.value)}
                balanceTarget={(event) => setBalance(event.target.value)}
                editToken={changeToken}
                removeToken={deleteToken}
            />
        </>
    )
}

export default Settings
