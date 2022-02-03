import React, { useContext } from "react";
import { withRouter } from "react-router-dom";

import Helmet from "react-helmet";
import { context } from "./../context/context";

const Login = () => {
    const loginContext = useContext(context);

    const { email, setEmail, password, setPassword, handleLogin, validator } =
        loginContext;

    // const user1 = useSelector((state) => state.user);
    // const dispatch = useDispatch();

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const [, forceUpdate] = useState();

    // const validator = useRef(
    //     new SimpleReactValidator({
    //         messages: {
    //             required: "پر کردن این فیلد الزامی میباشد",
    //             min: "کمتر از 5 کاراکتر نباید باشد",
    //             email: "ایمیل نوشته شده صحیح نمی باشد",
    //         },
    //         element: (message) => <div style={{ color: "red" }}>{message}</div>,
    //     })
    // );

    // const reset = () => {
    //     setEmail("");
    //     setPassword("");
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const user = { email, password };

    //     try {
    //         if (validator.current.allValid()) {
    //             const { status, data } = await loginUser(user);
    //             if (status === 200) {
    //                 toast.success("ورود موفقیت آمیز بود.", {
    //                     position: "top-right",
    //                     closeOnClick: true,
    //                 });
    //                 console.log(data); // token رو میده
    //                 localStorage.setItem("token", data.token); // برای گرفتن token
    //                 dispatch(addUser(decodeToken(data.token).payload.user));
    //                 history.replace("/"); // یعنی بعد از موفق بودن کاربر
    //                 // رو به صفحه اصلی میبره  البته روش راحت تر همینه ک خود Redirect رو از router بگیریم
    //                 reset();
    //             }
    //         } else {
    //             validator.current.showMessages();
    //             forceUpdate(1);
    //         }
    //     } catch (ex) {
    //         // console.log(ex);
    //         toast.error("مشکلی پیش امده.", {
    //             position: "top-right",
    //             closeOnClick: true,
    //         });
    //     }
    // };
    

    // if (!isEmpty(user1)) return <Redirect to="/" />; // این یعنی وقتی کاربر login کرده پس بره توی صفحه اصلی

    return (
        <main className="client-page">
            <div className="container-content">
                <header>
                    <h2> ورود به سایت </h2>
                </header>

                <Helmet>
                    <title>تاپلرن / ورود به سایت</title>
                </Helmet>

                <div className="form-layer">
                    <form onSubmit={(e) => handleLogin(e)}>
                        <div className="input-group">
                            <span
                                className="input-group-addon"
                                id="email-address"
                            >
                                <i className="zmdi zmdi-email"></i>
                            </span>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="ایمیل"
                                aria-describedby="email-address"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validator.current.showMessageFor("email");
                                }}
                            />
                            {validator.current.message(
                                "email",
                                email,
                                "required|email"
                            )}
                        </div>

                        <div className="input-group">
                            <span className="input-group-addon" id="password">
                                <i className="zmdi zmdi-lock"></i>
                            </span>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="رمز عبور "
                                aria-describedby="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validator.current.showMessageFor(
                                        "password"
                                    );
                                }}
                            />
                            {validator.current.message(
                                "password",
                                password,
                                "required|min:5"
                            )}
                        </div>

                        <div className="remember-me">
                            <label>
                                <input type="checkbox" name="" /> مرا بخاطر
                                بسپار{" "}
                            </label>
                        </div>

                        <div className="link">
                            <a href="">
                                {" "}
                                <i className="zmdi zmdi-lock"></i> رمز عبور خود
                                را فراموش کرده ام !
                            </a>
                            <a href="">
                                {" "}
                                <i className="zmdi zmdi-account"></i> عضویت در
                                سایت{" "}
                            </a>
                        </div>

                        <button className="btn btn-success">
                            {" "}
                            ورود به سایت{" "}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default withRouter(Login);
