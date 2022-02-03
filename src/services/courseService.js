import http from "./httpService";
import config from "./config.json";

export const getCourses = () => {
    return http.get(`${config.localapi}/api/courses`);
};

export const getCourse = (courseId) => {
    return http.get(`${config.localapi}/api/course/${courseId}`);
};

export const newCourse = (course) => {
    return http.post(`${config.localapi}/api/course`, course); // این مقدار دوم به این معنی هست ک دوره جدید رو میفرسته
};

export const deleteCourse = (courseId) => {
    return http.delete(`${config.localapi}/api/course/${courseId}`);
};

export const updateCourse = (courseId, course) => {  // مقدار بروز شده رو در پارامتر دوم میدهیم
    return http.put(`${config.localapi}/api/course/${courseId}`, course); // این مقدار دوم به این معنی هست ک دوره جدید رو میفرسته
};
