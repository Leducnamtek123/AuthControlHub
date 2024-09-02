// PagedDto.ts
export interface PagedDto<T> {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    items: T[];
}
// BaseResponse.ts
export interface BaseResponse<T> {
    isSuccess: boolean;
    data: T;
    errors: string[];
    timeStamp?: string; // Using string to match the ISO date format
    statusCode?: number;
}

