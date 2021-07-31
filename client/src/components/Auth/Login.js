import React from "react";
import {GoogleLogin} from 'react-google-login'
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import dotenv from 'dotenv'
dotenv.config()

const Login = ({ classes }) => {

  const onSuccess = googleUser => {
    // console.log({googleUser})
    const idToken = googleUser.getAuthResponse().id_token
    console.log({idToken})
  }

  return (<GoogleLogin 
    clientId="1020921091478-b4fg5e5uj6q9og87rinos21g7708lhiq.apps.googleusercontent.com"
    onSuccess = {onSuccess} isSignedIn={true}
    />)
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
