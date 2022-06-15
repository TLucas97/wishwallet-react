import React from 'react'
import { TextField } from '@material-ui/core'
import Button from '@mui/material/Button'

function Form(props) {
    function Buttons() {
        const buttonsVision = props.buttons
        // Condition to show buttons
        if (buttonsVision) {
            return (
                <>
                    <div className="d-flex justify-content-end mt-3">
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                        >
                            Save
                        </Button>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="d-flex justify-content-between mt-3">
                        <Button
                            type="submit"
                            variant="contained"
                            color="error"
                            onClick={props.removeToken}
                        >
                            Remove
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                        >
                            Save
                        </Button>
                    </div>
                </>
            )
        }
    }
    return (
        // Form to add or edit tokens and balances in the wallet. Props will be used for actions
        <>
            <div className="home-width pt-4">
                <h5>{props.formTitle}</h5>
                <form onSubmit={props.submit}>
                    <div className="d-flex justify-content-between">
                        <TextField
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '5px',
                            }}
                            label="Token"
                            placeholder="USD"
                            variant="filled"
                            className="input-size"
                            color="success"
                            onChange={props.tokenTarget}
                            value={props.tokenValue}
                            error={props.tokenError}
                            helperText={props.tokenErrorText}
                            {...props.tokenRegister}
                        />
                        <TextField
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '5px',
                            }}
                            label="Balance"
                            placeholder="0.00"
                            variant="filled"
                            className="input-size"
                            color="success"
                            onChange={props.balanceTarget}
                            value={props.balanceValue}
                            error={props.balanceError}
                            helperText={props.balanceErrorText}
                            {...props.balanceRegister}
                        />
                    </div>
                    <Buttons type="submit" buttonsVision={props.buttons} />
                </form>
            </div>
        </>
    )
}

export default Form
