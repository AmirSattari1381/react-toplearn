import React from "react";
import { range } from "lodash";

const Pagination = ({ totalCourse, currentPage, perPage, onPageChange }) => {
    const pageCount = Math.ceil(totalCourse / perPage); // تعداد کل دوره ها رو تقسیم بر تعدادی ک باید نمایش داده بشه میکنیم
    if (pageCount === 1) return null; // یعنی وقتی یک صفحه بود نیازی به نمایش دادن نداره

    const pages = range(1, pageCount + 1); //متدrangeارایه هست و مثالا میگوییم از1تا5رو برام بساز و با این کار ان دامنه رو میسازه

    // console.log(pages);

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {pages.map(
                    (
                        page //این پارامتر ورودی page تکراری نیست و عدد هست و چون دو صفحه داریم پس برابر دو هست
                    ) => (
                        <li
                            key={page}
                            className={
                                page === currentPage
                                    ? "page-item active"
                                    : "page-item"
                            }
                        >
                            <a
                                className="page-link"
                                style={{ cursor: "pointer" }}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </a>
                        </li>
                    )
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
