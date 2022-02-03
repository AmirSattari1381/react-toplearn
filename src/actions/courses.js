import {
    getCourses,
    newCourse,
    updateCourse,
    deleteCourse,
} from "./../services/courseService";
import { successMessage } from "./../utils/message";

export const getAllCourses = () => {
    return async (dispatch) => {
        const { data } = await getCourses(); // data را از سرور میگیره
        await dispatch({ type: "INIT", payload: data.courses });
        // console.log(data); // 24 courses Object
    };
};

export const createNewCourse = (course) => {
    return async (dispatch, getState) => {
        const { data, status } = await newCourse(course);
        if (status === 201) successMessage("دوره با موفقیت ساخته شد");
        await dispatch({
            type: "ADD_COURSE",
            payload: [...getState().courses, data.course], // اول گفتیم همه دوره های قبلی رو بگیر و دوره جدید رو هم بده
        });
    };
};

export const handleCourseUpdate = (courseId, updatedCourse) => {
    return async (dispatch, getState) => {
        const courses = [...getState().courses]; // در این جا کاری میکنیم ک اگر برای ویرایش خطایی پیش امد از مقادیر قبلی استفاده کن

        const filteredCourses = courses.filter(
            (course) => course._id !== courseId
        );

        // const updatedCourses = [...courses];
        // const courseIndex = updatedCourses.findIndex(
        //     (course) => course._id === courseId
        // );

        // let course = updatedCourses[courseIndex]; //  الان این یک ابجکت دوره رو می گیره

        // // ما در spread از نوع ابجکت میزاریم چون مواردی ک از قبل موجوده رو با موارد جدید بروز میکنه و موارد قدیم رو برمیداره و مقادیر جدید رو میزاره
        // course = { ...Object.fromEntries(updatedCourse) }; // چون نوع داده formdata هست در این جا به شکل object تبدیل میکنیم
        // updatedCourses[courseIndex] = course; // با این کار دوباره اون دوره ای ک بروز شده رو توی ارایه گذاشتیم

        try {
            // با این ساختار اول مقدار رو بروز میکنه و بعد اگر 200 بود پیام میده و اگر نبود همون قبلی رو برمیگردونه
            const { data, status } = await updateCourse(courseId, updatedCourse);
            // console.log(data);
            if (status === 200) {
                successMessage("دوره با موفقیت ویرایش شد.");
                await dispatch({
                    type: "UPDATE_COURSE",
                    // payload: [...updatedCourses],
                    payload: [...filteredCourses, data.course],
                });
            }
        } catch (ex) {
            await dispatch({ type: "UPDATE_COURSE", payload: [...courses] }); // برای وقتیه ک خطا داد و  مقدار قبلی رو برگردونه
        }
    };
};

export const handleCourseDelete = (courseId) => {
    return async (dispatch, getState) => {
        const courses = [...getState().courses];
        const filteredCourses = courses.filter(
            (course) => course._id !== courseId
        );

        try {
            await dispatch({
                type: "DELETE_COURSE",
                payload: [...filteredCourses],
            });
            const { status } = await deleteCourse(courseId);

            if (status === 200) successMessage("دوره با موفقیت پاک شد.");
        } catch (ex) {
            await dispatch({ type: "DELETE_COURSE", payload: [...courses] });
        }
    };
};
