export interface FilterBase {
    // Từ khóa tìm kiếm
    keyword?: string;

    // Tên cột để sắp xếp
    sortBy?: string;

    // Có phải sắp xếp giảm dần hay không
    isSortDescending?: boolean;

    // Chỉ số trang hiện tại (1-based)
    pageIndex?: number;

    // Kích thước trang (số lượng bản ghi trên mỗi trang)
    pageSize?: number;
}
