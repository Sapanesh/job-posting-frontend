import { useForm } from "react-hook-form";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import WebService from "../../utility/WebService";
import { toast } from "react-toastify";
import { USER_LOGIN_SUCCESS } from "../../action/Action";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<any>({ mode: "onChange" });

    const submit = (data: any) => {
        WebService.postAPI({
            action: `users/login`,
            body: data,
            isShowError: true,
        })
            .then((res: any) => {
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: { access_token: res.token },
                });
                localStorage.setItem("token", res.token);
                navigate("/dashboard");
            })
            .catch((err: any) => {
                toast.error(err);
            });
    }

    return (
        <div className="login-page">
            <section className="container">
                <div className="login-container">
                    <div className="circle circle-one"></div>
                    <div className="form-container">
                        <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />
                        <h1 className="opacity">LOGIN</h1>
                        <form>
                            <input type="text" placeholder="USERNAME"
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    }, pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address"
                                    }
                                })} />
                            {typeof errors?.email?.message === "string" && <span className="error-message">{errors.email.message}</span>}
                            <input type="password" placeholder="PASSWORD" className="mt-3"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: "Password is required"
                                    }, minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })} />
                            {typeof errors?.password?.message === "string" && <span className="error-message">{errors.password.message}</span>}
                            <button className="opacity mt-3" onClick={handleSubmit(submit)}>SUBMIT</button>
                        </form>
                        <div className="register-forget opacity">
                            <a href="">REGISTER</a>
                            <a href="">FORGOT PASSWORD</a>
                        </div>
                    </div>
                    <div className="circle circle-two"></div>
                </div>
                <div className="theme-btn-container"></div>
            </section>
        </div>
    );
};

export default Login;
