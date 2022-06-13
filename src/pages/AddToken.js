import React from 'react'
import Actions from '../components/Actions'
import { useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'react-simple-snackbar'

function AddToken() {
    const error = {
        position: 'top-center',
        style: {
            backgroundColor: '#F94C66',
            color: 'white',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '20px',
            textAlign: 'center',
        },
        closeStyle: {
            color: 'white',
            fontSize: '16px',
        },
    }
    const success = {
        position: 'top-center',
        style: {
            backgroundColor: '#53BF9D',
            color: 'white',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '20px',
            textAlign: 'center',
        },
        closeStyle: {
            color: 'white',
            fontSize: '16px',
        },
    }
    const [openErrorSnackbar] = useSnackbar(error)
    const [openSuccessSnackbar] = useSnackbar(success)
    const LOCAL_STORAGE_KEY = 'token'
    const getTokens = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const addToken = (e) => {
        const newToken = {
            id: uuidv4(),
            token: e.token.toUpperCase(),
            balance: e.balance,
        }

        if (getTokens) {
            const currentTokens = getTokens.map((token) => token.token)
            if (currentTokens.includes(newToken.token)) {
                openErrorSnackbar('This token already exists.')
            } else {
                const getToken = JSON.parse(
                    localStorage.getItem(LOCAL_STORAGE_KEY)
                )
                getToken.push(newToken)
                localStorage.setItem(
                    LOCAL_STORAGE_KEY,
                    JSON.stringify(getToken)
                )
                openSuccessSnackbar('Token successfully added to your wallet!')
                navigate('/')
            }
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newToken]))
            openSuccessSnackbar('Token successfully added to your wallet!')
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
