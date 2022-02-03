import { combineReducers } from "redux";
import { courseReducer } from "./course";
import { coursesReducer } from "./courses";
import { userReducer } from "./user";
import { loadingBarReducer } from "react-redux-loading-bar";

export const reducers = combineReducers({
    courses: coursesReducer,
    course: courseReducer,
    user: userReducer,
    loadingBar: loadingBarReducer
});
