import { Google, Password } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { loginWithEmailPassword } from "../../firebase/providers";

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  
  const {status, errorMessage} = useSelector( state => state.auth)
  const dispatch = useDispatch();

  const {onInputChange, email, password} = useForm(formData);

  
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  const onSubmit = (event) =>{
    event.preventDefault();
    dispatch(startLoginWithEmailPassword ({email, password}));
    
  }

  const onGoogleSignIn= () =>{
    
    dispatch(startGoogleSignIn());
  }

  return (
 
    <AuthLayout title="Login">

        <form 
        aria-label="submit-form"
        onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                onChange={onInputChange}
                value={email}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="contraseña"
                fullWidth
                inputProps={{ "aria-label": "password" }} 
                name="password"
                onChange={onInputChange}
                value={password}
              />
            </Grid>
            <Grid container display={!!errorMessage ? '':'none'}
            sx={{mt:1}}
            >
              <Grid
              item
              xs={12}
              
              >
                <Alert severity="error">{errorMessage}</Alert>

              </Grid>

            </Grid>
            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Button 
                variant="contained" 
                fullWidth 
                type="submit"
                disabled={isAuthenticating}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                variant="contained" 
                fullWidth 
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
                aria-label="btn-google"
                >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
      
  );
};
