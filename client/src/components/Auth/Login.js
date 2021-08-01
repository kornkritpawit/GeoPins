import React, {useContext} from 'react';
import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import dotenv from 'dotenv';
import Context from '../../context'
import {ME_QUERY} from '../../graphql/queries'



dotenv.config();

const Login = ({ classes }) => {
  const {dispatch} = useContext(Context)

  const onSuccess = async (googleUser) => {
    console.log({googleUser})
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient('http://localhost:4000/graphql', {
        headers: { authorization: idToken },
      });
      const {me} = await client.request(ME_QUERY);
      console.log(me)
      // console.log({data});
      console.log(googleUser.isSignedIn())
      dispatch({type: "LOGIN_USER", payload: me})
      dispatch({type: "IS_LOGGED_IN", payload: googleUser.isSignedIn()})
    } catch (err) {
      onFailer(err)
    }
  };

  const onFailer = err => {
    console.error("Error logging in ", err)
  }   

  return (
    <div className = {classes.root}>

      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: "rgb(66, 133, 244"}}
      >
        Welcome
      </Typography>
    <GoogleLogin
      clientId="1020921091478-b4fg5e5uj6q9og87rinos21g7708lhiq.apps.googleusercontent.com"
      onSuccess={onSuccess}
      onFailure={onFailer}
      isSignedIn={true}
      buttonText="Login with Google"
      theme="dark"
    />
    </div>
  );
};

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default withStyles(styles)(Login);
