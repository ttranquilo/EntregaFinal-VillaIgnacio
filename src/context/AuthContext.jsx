import { createContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";

export const authContext = createContext();

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const AuthContextProvider = (props) => {

    //Email and password states

    const [loggedIn, setLogIn] = useState(localStorage.getItem("isLoggedIn") != null ? localStorage.getItem("isLoggedIn") : false);

    const [email, setEmail] = useState(localStorage.getItem("stored-email") ? isValidEmail(localStorage.getItem('stored-email')) ? localStorage.getItem('stored-email') : "" : "");
    const [password, setPassword] = useState("");

    //Guest states 
    const [userName, setUserName] = useState(localStorage.getItem("stored-name") ? localStorage.getItem('stored-name') : "")

    useEffect(() => {
        localStorage.setItem("stored-name", userName);
        localStorage.setItem("isLoggedIn", loggedIn);
        localStorage.setItem("stored-email", email);
    }, [userName, email, loggedIn]);

    useEffect(() => {
        const storedName = localStorage.getItem("stored-name");
        const storedEmail = localStorage.getItem("stored-email");
        const storedLogin = localStorage.getItem("isLoggedIn");

        if (storedName) {
            setUserName(storedName);
        }

        if (storedEmail) {
            setEmail(storedEmail);
        }

        if (storedLogin) {
            setLogIn(storedLogin);
        }
    }, [])


    const signOutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            setLogIn(false);
            setEmail("");
            setUserName("");
            console.log("signed out")
        }).catch((error) => {

        });
    }


    return (
        <authContext.Provider value={{ email, setEmail, password, setPassword, userName, setUserName, loggedIn, setLogIn, signOutUser }}>
            {props.children}
        </authContext.Provider>
    );
}

export default AuthContextProvider;

