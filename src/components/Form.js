import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function Form(props) {
    function Buttons() {
        const buttonsVision = props.buttons
        if (buttonsVision) {
            return (
                <>
                    <div className="d-flex justify-content-end mt-3">
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            onClick={props.addToken}
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
                            onClick={props.editToken}
                        >
                            Save
                        </Button>
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <div className="home-width pt-4">
                <h5>{props.formTitle}</h5>
                <form onSubmit={props.submit}>
                    <div className="d-flex justify-content-between">
                        <TextField
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
                    <Buttons type='submit' buttonsVision={props.buttons} />
                </form>
            </div>
        </>
    )
}

export default Form
