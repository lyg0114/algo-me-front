// PaginationUtil.js

const PaginationUtil = (response, sectionSize) => {
    const currentPage = response.data.number;
    const totalPageCount = response.data.totalPages;
    const tmpStartPage = Math.floor((currentPage) / sectionSize) * sectionSize + 1;
    const startPage = tmpStartPage;
    const endPage = Math.min(tmpStartPage + sectionSize - 1, totalPageCount);

    return {startPage, endPage};
};

export default PaginationUtil;
