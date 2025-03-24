import { Alert } from "antd"
import LoginForm from "./LoginForm";


const Login = () => {

    const errorMessage = "Invalid Email Id"

    return (
        <>
            <div  id="login" className="right-wrapper">
                <div>
                    <LoginForm />
                </div>
            </div>
        </>
    )
}

export default Login;