export const ELLIPSIS = '...';

export const mobilePagination = (currentPage: number, totalPages: number) => {
    if (totalPages < 6) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage < 4) {
        return [ 1, 2, 3, ELLIPSIS, totalPages ];
    }

    if (currentPage > totalPages - 3) {
        return [ 1, ELLIPSIS, totalPages - 2, totalPages - 1, totalPages ];
    }

    return [ 1, ELLIPSIS, currentPage, ELLIPSIS, totalPages ];
};

export const desktopPagination = (currentPage: number, totalPages: number) => {
    if (totalPages < 10) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage < 6) {
        return [ 1, 2, 3, 4, 5, 6, ELLIPSIS, totalPages - 1, totalPages ];
    }

    if (currentPage > totalPages - 5) {
        return [
            1,
            2,
            ELLIPSIS,
            totalPages - 5,
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
        ];
    }

    return [
        1,
        2,
        ELLIPSIS,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        ELLIPSIS,
        totalPages - 1,
        totalPages
    ];
};
