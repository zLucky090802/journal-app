import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/authFixtures";

describe("Pruebas en authSlice", () => {
  test('debe de regresar el estado inicial y llamarse "auth"', () => {
    expect(authSlice.name).toBe("auth");
    const state = authSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("debe de regresar el estado autenticado", () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      status: "authenticated", // checking, not-authenticated, authenticated
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test('debe de realizar el logout sin argumentos', () => {  
    const state = authSlice.reducer( authenticatedState, logout());
    
    expect(state).toEqual({
        status: "not-authenticated", // checking, not-authenticated, authenticated
        uid: notAuthenticatedState.uid,
        email: notAuthenticatedState.email,
        displayName: notAuthenticatedState.displayName,
        photoURL: notAuthenticatedState.photoURL,
        errorMessage: undefined,
      
    })
  });

  test('debe de realizar el logout y mostrar el mensaje de error', () => {  
    const errorMessage = 'credenciales no correctas'
    const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
    expect(state).toEqual({
        status: "not-authenticated", // checking, not-authenticated, authenticated
        uid: notAuthenticatedState.uid,
        email: notAuthenticatedState.email,
        displayName: notAuthenticatedState.displayName,
        photoURL: notAuthenticatedState.photoURL,
        errorMessage: errorMessage,
      
    })
  });

  test('debe de cambiar el estado a checking', () => {  
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe('checking')
  })
});
