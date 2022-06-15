import React from 'react'
import Header from '../components/Header'
import Form from '../components/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'react-simple-snackbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { v4 as uuidv4 } from 'uuid'

// Defining modal style.
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    color: 'black',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
}

// Defining toast error style.
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

// Defining toast success style.
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

function AddToken() {
    const LOCAL_STORAGE_KEY = 'token'
    const mainToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    const [openErrorSnackbar] = useSnackbar(error)
    const [openSuccessSnackbar] = useSnackbar(success)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const addToken = (e) => {
        // Getting values from form and also adding the uuid.
        const newToken = {
            id: uuidv4(),
            token: e.token.toUpperCase(),
            balance: e.balance,
        }
        // Checking if the token already exists.
        if (mainToken) {
            const currentTokens = mainToken.map((token) => token.token)
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
            // If the token doesn't exist, it will be added to the local storage.
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newToken]))
            openSuccessSnackbar('Token successfully added to your wallet!')
            navigate('/')
        }
    }
    // Removing current manager state from localStorage
    const removeState = () => {
        localStorage.removeItem('stateManager')
    }
    return (
        <>
            <Header
                stateManager={removeState}
                buttonName="Back"
                easyRoutes="/"
                btnClass="forcedColor"
            />
            <Form
                submit={handleSubmit(addToken)}
                buttons={true}
                formTitle="Add token"
                buttonType="submit"
                // Adding validations to the form.
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
                    min: {
                        value: 1,
                        message: `Balance must be positive`,
                    },
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        message: 'Balance must be a number',
                    },
                })}
                // Adding error messages to the form.
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
function EditToken() {
    const LOCAL_STORAGE_KEY = 'token'
    const changableToken = JSON.parse(localStorage.getItem('changableToken'))
    const mainToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    const id = changableToken.id
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const navigate = useNavigate()
    const [openErrorSnackbar] = useSnackbar(error)
    const [openSuccessSnackbar] = useSnackbar(success)
    let [token, setToken] = useState(changableToken.token)
    let [balance, setBalance] = useState(changableToken.balance)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const changeToken = (e) => {
        // Getting values from form and adding the existing uuid.
        const newToken = {
            id: id,
            token: e.token,
            balance: e.balance,
        }
        // Checking if changable token and main token matches for balance only saves.
        if (changableToken.token === newToken.token) {
            mainToken.map((item) => {
                if (item.id === id) {
                    item.token = newToken.token.toUpperCase()
                    item.balance = newToken.balance
                    localStorage.setItem('token', JSON.stringify(mainToken))
                }
                openSuccessSnackbar('Token successfully saved!')
                return navigate('/')
            })
        } else {
            // Checking if the token already exists.
            const currentTokens = mainToken.map((item) => item.token)
            if (currentTokens.includes(newToken.token)) {
                openErrorSnackbar('This token already exists.')
            } else {
                // If the token doesn't exist, it will be added to the local storage.
                mainToken.map((item) => {
                    if (item.id === id) {
                        item.token = newToken.token.toUpperCase()
                        item.balance = newToken.balance
                        localStorage.setItem('token', JSON.stringify(mainToken))
                    }
                    openSuccessSnackbar('Token successfully saved!')
                    return navigate('/')
                })
            }
        }
    }
    const deleteToken = () => {
        mainToken.map((item) => {
            // Comparing the uuid of the token to be deleted.
            if (item.id === id) {
                const newToken = mainToken.splice(mainToken.indexOf(item), 1)
                console.log(newToken)
                localStorage.setItem('token', JSON.stringify(mainToken))
            }
            openSuccessSnackbar('Token successfully deleted!')
            return navigate('/')
        })
    }
    // Removing current manager state from localStorage
    const removeState = () => {
        localStorage.removeItem('stateManager')
    }
    return (
        <>
            <Header
                stateManager={removeState}
                buttonName="Back"
                btnClass="forcedColor"
                easyRoutes="/"
            />
            <Form
                submit={handleSubmit(changeToken)}
                // Adding validations to the form.
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
                    min: {
                        value: 1,
                        message: `Balance must be positive`,
                    },
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        message: 'Balance must be a number',
                    },
                })}
                buttons={false}
                tokenTarget={(event) => setToken(event.target.value)}
                balanceTarget={(event) => setBalance(event.target.value)}
                removeToken={handleOpen}
                // Adding error messages to the form.
                tokenError={!!errors?.token}
                tokenErrorText={errors?.token ? errors.token.message : null}
                balanceError={!!errors?.balance}
                balanceErrorText={
                    errors?.balance ? errors.balance.message : null
                }
            />
            <div>
                {/* Modal for token removal confirmation. */}
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Are you sure about this?
                        </Typography>
                        <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                            mb={4}
                        >
                            This action{' '}
                            <span style={{ fontWeight: 'bold' }}>
                                can't be undone
                            </span>{' '}
                            and your token will be deleted.
                        </Typography>
                        <div className="d-flex justify-content-between">
                            <Button
                                onClick={handleClose}
                                variant="contained"
                                color="primary"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={deleteToken}
                                variant="contained"
                                color="error"
                            >
                                Confirm removal
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

// Both functions will be used in the home section.
export { AddToken, EditToken }
