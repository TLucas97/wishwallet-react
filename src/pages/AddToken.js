import React from 'react'
import Actions from '../components/Actions'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import { v4 as uuidv4 } from 'uuid';

function AddToken() {
    const navigate = useNavigate()
    let [token, setToken] = useState('')
    let [balance, setBalance] = useState('')
    const createToken = {
        id: uuidv4(),
        token: token,
        balance: balance,
    }

    const sendLocalStorage = () => {
        if (token !== '' && balance !== '') {
            const LOCAL_STORAGE_KEY = 'token'

            if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
                localStorage.setItem(
                    LOCAL_STORAGE_KEY,
                    JSON.stringify([createToken])
                )
                alert('token created!')
                navigate('/')
            } else {
                const getToken = JSON.parse(
                    localStorage.getItem(LOCAL_STORAGE_KEY)
                )
                getToken.push(createToken)
                localStorage.setItem(
                    LOCAL_STORAGE_KEY,
                    JSON.stringify(getToken)
                )
                setToken((createToken.token = ''))
                setBalance((createToken.balance = ''))
                alert('token created!')
                navigate('/')
            }
        } else {
            alert('friendly tooltip')
        }
    }
    return (
        <>
            <Actions buttonName="Back" easyRoutes="/" btnClass="forcedColor" />
            <Form
                buttons={true}
                formTitle="Add token"
                tokenTarget={(event) => setToken(event.target.value)}
                balanceTarget={(event) => setBalance(event.target.value)}
                tokenValue={token}
                balanceValue={balance}
                addToken={sendLocalStorage}
            />
        </>
    )
}

export default AddToken
