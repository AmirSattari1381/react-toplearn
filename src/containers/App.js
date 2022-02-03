import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Toplearn from "./Toplearn";

const App = () => {
    useEffect(() => {
        require("../utils/script"); // وقتی return ما اوکی شد میاد اینو اجرا میکنه
    }, []);

    return (
        <BrowserRouter>
            <Toplearn />
            <ToastContainer />
        </BrowserRouter>
    );
};

export default App;
