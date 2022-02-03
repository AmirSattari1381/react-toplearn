import { getCourse } from "../services/courseService";

export const getSingleCourse = (courseId) => {
    return async (dispatch) => {
        const { data } = await getCourse(courseId);  // از سمت سرور اون id رو میگیره و data ان را دریافت میکنه 
        await dispatch({ type: "GET_COURSE", payload: data.course });
        console.log(data); // کل ابجکت یا مقادیر دوره هست
    };
};
