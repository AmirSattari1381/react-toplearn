import React, { useEffect, useRef, useState } from "react";
import { dashContext } from "./dashContext";
import { orderBy } from "lodash";
import { paginate } from "./../../utils/paginate";
import NewCourseDialog from "./../admin/dialogs/NewCourseDialog";
import EditCourseDialog from "../admin/dialogs/EditCourseDialog";
import DeleteCourseDialog from "../admin/dialogs/DeleteCourseDialog";
import SimpleReactValidator from "simple-react-validator";

const AdminContext = ({ courses, children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);
    //وقتی درجدول روی دکمه ویرایش دوره کلیک شداین stateپربشه با اون دوره ای ک انتخاب شده
    const [currentCourse, setCurrentCourse] = useState({});
    const [courseList, setCourseList] = useState([]);
    const [search, setSearch] = useState("");

    const [newCourseDialog, setNewCourseDialog] = useState(false);
    const [editCourseDialog, setEditCourseDialog] = useState(false);
    const [deleteCourseDialog, setDeleteCourseDialog] = useState(false);

    useEffect(() => {
        // برای این ما بتونیم دوره ها رو ست کنیم
        setCourseList(courses);
        // console.log("دوره ها بروز شدن"); // موقعی ک بریم توی قسمت دوره های داشبرد این کامپوننت بروز میشه و همه دوره هارو میگیره
    }, [courses]);

    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "پر کردن این فیلد الزامی میباشد",
                min: "کمتر از 5 کاراکتر نباید باشد",
                email: "ایمیل نوشته شده صحیح نمی باشد",
                integer: "قیمت باید عدد باشد",
            },
            element: (message) => <div style={{ color: "red" }}>{message}</div>,
        })
    );

    const openNewCourseDialog = () => setNewCourseDialog(true);
    const closeNewCourseDialog = () => setNewCourseDialog(false);

    const openEditCourseDialog = (course) => {
        setEditCourseDialog(true);
        setCurrentCourse(course);
    };
    const closeEditCourseDialog = () => setEditCourseDialog(false);

    const openDeleteCourseDialog = (course) => {
        setDeleteCourseDialog(true);
        setCurrentCourse(course); // مقادیر پیشفرض اون دوره ای ک برای ویرایش انتخاب کردیم رو میزاره توی این و همون اول نشون میده
    };
    const closeDeleteCourseDialog = () => setDeleteCourseDialog(false);

    const sortCoursesAsc = () => {
        setCourseList(orderBy(courseList, "price", "asc")); //یعنی مرتب کن توسط دوره یا همون لیست و مقدار دوم میگه بر اساس قیمت مرتب کن و به صورت نزولی باشه
    };

    const sortCoursesDes = () => {
        setCourseList(orderBy(courseList, "price", "desc"));
    };

    const filteredCourses = courseList.filter(
        (course) => course.title.includes(search) // این یعنی ببین ایا چیزی ک توی course هست رو search داره یا ن اگه داره فیلتر میکنه و اونو نشون میده
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const courseData = paginate(filteredCourses, currentPage, perPage);

    return (
        <dashContext.Provider
            value={{
                currentPage,
                perPage,
                handlePageChange,
                courseData,
                openNewCourseDialog,
                openEditCourseDialog,
                openDeleteCourseDialog,
                setSearch,
                filteredCourses,
                sortCoursesAsc,
                sortCoursesDes,
                validator,
            }}
        >
            <NewCourseDialog
                showDialog={newCourseDialog}
                closeDialog={closeNewCourseDialog}
            />
            <EditCourseDialog
                showDialog={editCourseDialog}
                closeDialog={closeEditCourseDialog}
                course={currentCourse}
            />
            <DeleteCourseDialog
                showDialog={deleteCourseDialog}
                closeDialog={closeDeleteCourseDialog}
                course={currentCourse}
            />
            {children}
        </dashContext.Provider>
    );
};

export default AdminContext;
