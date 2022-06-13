import React from 'react'
import Actions from '../components/Actions'
import Form from '../components/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'react-simple-snackbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { fontWeight } from '@mui/system'

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

function Settings() {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
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
        const newToken = {
            id: id,
            token: e.token,
            balance: e.balance,
        }
        const changableTokens = JSON.parse(
            localStorage.getItem('changableToken')
        )
        if (changableTokens.token === newToken.token) {
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
            const currentTokens = mainToken.map((item) => item.token)
            if (currentTokens.includes(newToken.token)) {
                openErrorSnackbar('This token already exists.')
            } else {
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
            if (item.id === id) {
                const newToken = mainToken.splice(mainToken.indexOf(item), 1)
                console.log(newToken)
                localStorage.setItem('token', JSON.stringify(mainToken))
            }
            openSuccessSnackbar('Token successfully deleted!')
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
                removeToken={handleOpen}
                tokenError={!!errors?.token}
                tokenErrorText={errors?.token ? errors.token.message : null}
                balanceError={!!errors?.balance}
                balanceErrorText={
                    errors?.balance ? errors.balance.message : null
                }
            />
            <div>
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

export default Settings
