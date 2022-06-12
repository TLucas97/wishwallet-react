import React from 'react'
import Actions from '../components/Actions'
import { useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'react-hook-form'

function AddToken() {
    const LOCAL_STORAGE_KEY = 'token'
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const addToken = (e) => {
        const newToken = {
            id: uuidv4(),
            token: e.token,
            balance: e.balance,
        }
        console.log(newToken)
        if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newToken]))
            navigate('/')
        } else {
            const getToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
            getToken.push(newToken)
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(getToken))
            navigate('/')
        }
    }
    return (
        <>
            <Actions buttonName="Back" easyRoutes="/" btnClass="forcedColor" />
            <Form
                submit={handleSubmit(addToken)}
                buttons={true}
                formTitle="Add token"
                buttonType="submit"
                tokenRegister={register('token', {
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
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        message: 'Balance must be a number',
                    },
                })}
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

export default AddToken
