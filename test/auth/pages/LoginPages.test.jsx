import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixtures";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../src/store/auth/thunks";

const mockStartGoogleSiginIn = jest.fn();
const mockStarLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () =>({
    startGoogleSignIn: () => mockStartGoogleSiginIn,
    startLoginWithEmailPassword: ({email, password}) => {
        return () => mockStarLoginWithEmailPassword({email, password})
    },
}));



jest.mock('react-redux', () =>({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) =>fn(),
}))


const store = configureStore({
    reducer:{
        auth: authSlice.reducer
    },
    preloadedState:{
        auth: notAuthenticatedState
    }
});



describe("Pruebas en el LoginPage", () => {
  test("debe de mostrar el componente correctamente", () => {
    render(
        
        <Provider store={store}>
            <MemoryRouter>

            <LoginPage />
            </MemoryRouter>

        </Provider>      
        
    );

    expect( screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('boton de google debe de llamar el starGoogleSingIn', () => {  
      render(
          
          <Provider store={store}>
            <MemoryRouter>

            <LoginPage />
            </MemoryRouter>

        </Provider>      
        
    );
    console.log(store.getState())
    const googlebtn = screen.getByLabelText('btn-google');
    fireEvent.click(googlebtn);
    expect(mockStartGoogleSiginIn).toHaveBeenCalled()
  })

  test('submit debe llamar startLoginWithEmailPassword', () => { 
    const email = 'canalesdeyt12@gmail.com';
    const password = '123456';
    render(
          
        <Provider store={store}>
          <MemoryRouter>

          <LoginPage />
          </MemoryRouter>

      </Provider>      
      
    );

    const emailField = screen.getByRole('textbox', {name: 'Correo'})
    
    fireEvent.change(emailField, {target: {name: 'email', value: email}});
    
    const passwordField = screen.getByLabelText('password')
    
    fireEvent.change(passwordField, {target: {name: 'password', value: password}});

    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit(loginForm);

    expect( mockStarLoginWithEmailPassword ).toHaveBeenCalledWith({
        email: email,
        password: password
    })


  })
});
