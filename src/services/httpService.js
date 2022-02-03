import axios from "axios";
import { errorMessage } from "../utils/message";

axios.defaults.headers.post["Content-Type"] = "application/json"; //این یعنی مقادیر پیشفرضت داخلheaders برای postاین رو بزار ک دیگه کلا اعمال شده

const token = localStorage.getItem("token");

if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

axios.interceptors.response.use(null, (error) => {
    //interceptors ها مواردی هستند که axios تنها برای جواب از ان استفاده میکند
    const expectedError =
        error.response &&
        // بین بازه 400 تا 500 ارور هایی داریم ک خودمان اونهارو چک میکنیم و بیشتر از 500 برای اشکال از سرور
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedError) {
        console.log(error);
        errorMessage("مشکلی از سمت سرور رخ داده است.")
    }

    // اگر قسمت بالا مشکلی نداشت قسمت پایین رو return میکنه

    return Promise.reject(error);//حالا اگه هیچ کدوم از اینا نبود بیا promiseرو reject کنه تا با tryو catch اونو بتونیم هندل کنیمش
});


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
