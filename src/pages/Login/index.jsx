import LoginForm from "../../components/LoginForm/LoginForm";
import Layout from "../../components/Layout/Layout";

const Login = () => {
    return (
        <Layout>
            <h1>Log in</h1>
            <p>To place your order, we need your name to know who we have to deliver this order to.</p>
            <LoginForm />
        </Layout>
    )
}

export default Login;