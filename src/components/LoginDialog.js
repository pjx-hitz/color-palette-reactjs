import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@material-ui/core";

import grey from "@material-ui/core/colors/grey";
import Email from "./FormField/Email";
import Password from "./FormField/Password";

import { login } from "../redux/user/actions";

class LoginDialog extends Component {
    state = {
        email: "",
        password: "",
        errors: {},
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ errors: {} }, () => {
            this.props
                .login(this.state.email, this.state.password)
                .then(() => {
                    this.props.closeDialog();
                })
                .catch((e) => {
                    if (e.error && e.error.errors) {
                        this.setState({ errors: e.error.errors });
                    } else {
                        console.log(e);
                    }
                });
        });
    };
    render() {
        const { open, closeDialog } = this.props;
        const { errors, email, password } = this.state;
        return (
            <Dialog aria-labelledby="login-dialog-title" open={open}>
                <form onSubmit={this.handleSubmit}>
                    <DialogTitle id="login-dialog-title">
                        Login to create palettes
                    </DialogTitle>
                    <DialogContent>
                        <Email
                            color={grey[500]}
                            handleChange={this.handleChange}
                            value={email}
                            errorMsg={errors.email}
                        />
                        <Password
                            color={grey[500]}
                            handleChange={this.handleChange}
                            value={password}
                            errorMsg={errors.password}
                        />
                    </DialogContent>
                    <DialogActions style={{ margin: "10px 20px 20px 20px" }}>
                        <Button onClick={closeDialog} color="primary">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

export default connect(null, { login })(LoginDialog);
