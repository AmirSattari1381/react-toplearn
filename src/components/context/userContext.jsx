import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import SimpleReactValidator from "simple-react-validator";
import { context } from "./context";
import { addUser } from "./../../actions/user";
import { decodeToken } from "./../../utils/decodeToken";
import { loginUser, registerUser } from "../../services/userService";
import { successMessage, errorMessage } from "./../../utils/message";

const UserContext = ({ children, history }) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [policy, setPolicy] = useState();
    const [, forceUpdate] = useState();

    useEffect(() => {
        return (
            () => {
                setFullname();
                setEmail();
                setPassword();
                setPolicy();
                forceUpdate();
            },
            []
        );
    }, []);

    const dispatch = useDispatch();

    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "پر کردن این فیلد الزامی میباشد",
                min: "کمتر از 5 کاراکتر نباید باشد",
                email: "ایمیل نوشته شده صحیح نمی باشد",
            },
            element: (message) => <div style={{ color: "red" }}>{message}</div>,
        })
    );

    // const resetStates = () => {
    //     setFullname("");
    //     setEmail("");
    //     setPassword("");
    //     setPolicy();
    // };

    const handleLogin = async (event) => {
        event.preventDefault();
        const user = { email, password };

        try {
            if (validator.current.allValid()) {
                dispatch(showLoading());
                const { status, data } = await loginUser(user);
                if (status === 200) {
                    successMessage("ورود موفقیت آمیز بود.");
                    // console.log(data); // token رو میده
                    localStorage.setItem("token", data.token); // برای گرفتن token
                    dispatch(addUser(decodeToken(data.token).payload.user));
                    dispatch(hideLoading());
                    history.replace("/"); // یعنی بعد از موفق بودن کاربر
                    // رو به صفحه اصلی میبره  البته روش راحت تر همینه ک خود Redirect رو از router بگیریم
                    // resetStates();
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1);
            }
        } catch (ex) {
            errorMessage("مشکلی پیش آمده.");
            dispatch(hideLoading());
            // console.log(ex);
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const user = {
            //در es7 وقتی کلید با مقدار برار باشه کافیه یکیش رو بنویسیم الان در این جا کلید با کقدار state برابره
            fullname,
            email,
            password,
        };

        try {
            if (validator.current.allValid()) {
                dispatch(showLoading());
                const { status } = await registerUser(user); // این مانند پارامتر ورودی then یعنی همون response هست
                if (status === 201) {
                    successMessage("کاربر با موفقیت ساخته شد.");
                    // console.log(data);
                    dispatch(hideLoading());
                    history.replace("/login");
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1);
            }
        } catch (ex) {
            errorMessage("مشکلی در ثبت نام پیش آمده.");
            dispatch(hideLoading());
            // console.log(ex);
        }
    };
    return (
        <context.Provider
            value={{
                fullname,
                setFullname,
                email,
                setEmail,
                password,
                setPassword,
                policy,
                setPolicy,
                validator,
                handleLogin,
                handleRegister,
            }}
        >
            {children}
        </context.Provider>
    );
};

export default withRouter(UserContext);
