import { Password } from "@mui/icons-material";
import {
  loginWithEmailPassword,
  logoutFireBase,
  registerUserWithEMailPassword,
  signInWithGoogle,
} from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import {
  checkingAuthentication,
  starCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";

jest.mock("../../../src/firebase/providers");

describe("Pruebas en AuthThunks", () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  test("debe invocar el checkingCredentials", async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSignIn debe de llamar checkingCredentials y login - exito", async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSignIn debe de llamar checkingCredentials y logout - error", async () => {
    const loginData = { ok: false, errorMessage: "Un error en google" };
    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startLoginWithEmailPassword debe de llamar checkingCredentials y login - exito", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(formData));
  });
  test("startLoginWithEmailPassword debe de llamar checkingCredentials y login - error", async () => {
    const loginData = { ok: false, errorMessage: "un error a iniciar session" };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: loginData.errorMessage })
    );
  });

  test("startLogout debe de llamar logout firebase, clearNotes y logout", async () => {
    await startLogout()(dispatch);
    expect(logoutFireBase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout({}));
  });

  test("starCreatingUserWithEmailPassword debe llamar checkingCredentials y logint - exito", async () => {
    const data = {
      email: demoUser.email,
      password: "123456",
      displayName: demoUser.displayName,
    };
    const registerData = {
      ok: true,
      uid: "ABC123",
      photoURL: "https://foto.jpg",
      errorMessage: null,
    };

    await registerUserWithEMailPassword.mockResolvedValue(registerData);
    await starCreatingUserWithEmailPassword(data)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      login({
        uid: registerData.uid,
        displayName: data.displayName,
        email: data.email,
        photoURL: registerData.photoURL,
      })
    );
  });
  test("starCreatingUserWithEmailPassword debe llamar checkingCredentials y logout - error", async () => {
    const data = {
      email: demoUser.email,
      password: "123456",
      displayName: demoUser.displayName,
    };
    const registerData = {
      ok: false,
      uid: "ABC123",
      photoURL: "https://foto.jpg",
      errorMessage: 'Error al crear usuario',
    };

    await registerUserWithEMailPassword.mockResolvedValue(registerData);
    await starCreatingUserWithEmailPassword(data)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout ({errorMessage: registerData.errorMessage}))
  });
});
