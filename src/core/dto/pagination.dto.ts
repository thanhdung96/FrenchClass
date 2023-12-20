export interface PaginationDto {
  page: number;
  pages?: number;
  size: number;
}

export interface StudentPaginationDto extends PaginationDto {}
