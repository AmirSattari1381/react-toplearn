import _, { slice, take } from "lodash";

export const paginate = (courses, currentPage, perPage) => {
    const startIndex = (currentPage - 1) * perPage; //از indexفلان شروع میکنه به گرفتن و شموردن دوره ها و از اون به بعد رو میده
    // console.log(startIndex); // برابر صفر
    return _(courses)
        .slice(startIndex) // از courses تیکه میکنه
        .take(perPage) // مقدار ابجکتی رو میگیره و تعداد صفحه گفته شده رو میگیره
        .value(); // مقادیر رو بده به value
};
