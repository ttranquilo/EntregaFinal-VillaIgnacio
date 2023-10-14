import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from 'react';
import './LoginForm.css'
import { authContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    //Email and password states
    const { email, setEmail, password, setPassword, userName, setUserName, setLogIn } = useContext(authContext);

    const [currentStep, setStep] = useState("none")
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const auth = getAuth();

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSignIn = () => {
        if (!isValidEmail(email)) {
            setError("Invalid email format");
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setLogIn(true);
                navigate("/checkout/success")
                setError(null);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLogIn(false);
                setError(`Invalid credentials, check email or password.`);
            });
    };

    return (
        <div>
            {currentStep === "none" ? (
                <div className="button_container">
                    <button onClick={() => setStep("email")}> Log in with email </button>
                    <button onClick={() => setStep("guest")}> Continue as guest </button>
                    <Link to={"/checkout"}>
                        <button> Return</button>
                    </Link>
                </div>
            ) : currentStep === "email" ? (
                <div>
                    {error && <p className="login__error-text">{error}</p>}
                    <div className="button_container">
                        <strong><label htmlFor="email">E-mail</label></strong>
                        <input
                            autoComplete="on"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            onInput={() => setError(null)}
                        />

                        <strong><label htmlFor="password">Password</label></strong>
                        <input
                            autoComplete="on"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button onClick={handleSignIn}>Sign In</button>
                        <button onClick={() => {
                            setEmail(isValidEmail(email) ? email : "")
                            setStep("none")
                            setError(null);
                        }}>Return</button>
                    </div>
                </div>
            ) : (
                <div className="button_container">
                    <strong><label htmlFor="username">Please type your name</label></strong>
                    <input
                        type="text"
                        autoComplete="on"
                        id="username"
                        name="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <Link to={"/checkout/success"}>
                        <button onClick={(e) => {
                            setLogIn(true);
                        }}>Continue</button>
                    </Link>

                    <button onClick={() => {
                        setStep("none");
                        setUserName(userName);
                        setLogIn(false);

                    }}>Return</button>
                </div>
            )}
        </div>
    );
}

export default LoginForm;