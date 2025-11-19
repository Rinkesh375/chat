export interface DataPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
