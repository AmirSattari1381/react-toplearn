import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./../reducers/index";
import { getAllCourses } from "./../actions/courses";
import { loadingBarMiddleware } from "react-redux-loading-bar";

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk, loadingBarMiddleware()),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

//Initialize
store.dispatch(getAllCourses());

//Subscribe
store.subscribe(() => console.log(store.getState()));
