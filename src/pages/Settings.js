import React from 'react'
import Actions from '../components/Actions'
import Form from '../components/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function Settings() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate()
    const tokens = JSON.parse(localStorage.getItem('changableToken'))
    const mainToken = JSON.parse(localStorage.getItem('token'))
    let id = tokens.id
    let [token, setToken] = useState(tokens.token)
    let [balance, setBalance] = useState(tokens.balance)
    const changeToken = (e) => {
        mainToken.map((item) => {
            const newToken = {
                id: id,
                token: e.token,
                balance: e.balance,
            }
            if (item.id === id) {
                item.token = newToken.token
                item.balance = newToken.balance
                localStorage.setItem('token', JSON.stringify(mainToken))
            }
            return navigate('/')
        })
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
                submit={handleSubmit(changeToken)}
                tokenRegister={register('token', {
                    value: token,
                    required: 'Required field',
                    maxLength: {
                        value: 5,
                        message: `Can't be more than 5 characters`,
                    },
                    minLength: {
                        value: 2,
                        message: `Can't be less than 2 characters`,
                    },
                })}
                balanceRegister={register('balance', {
                    required: 'Required field',
                    value: balance,
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        message: 'Balance must be a number',
                    },
                })}
                buttons={false}
                tokenTarget={(event) => setToken(event.target.value)}
                balanceTarget={(event) => setBalance(event.target.value)}
                removeToken={deleteToken}
                tokenError={!!errors?.token}
                tokenErrorText={errors?.token ? errors.token.message : null}
                balanceError={!!errors?.balance}
                balanceErrorText={
                    errors?.balance ? errors.balance.message : null
                }
            />
        </>
    )
}

export default Settings
