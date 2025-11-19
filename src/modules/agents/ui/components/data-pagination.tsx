import { Button } from "@/components/ui/button";
import { DataPaginationProps } from "@/types/data-pagination-type";

export default function DataPagination({
  page,
  totalPages,
  onPageChange,
}: DataPaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          onClick={() => {
            const minPage = Math.max(1, page - 1);
            onPageChange(minPage);
          }}
          disabled={page <= 1}
          variant={"outline"}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            const maxPage = Math.min(totalPages, page + 1);
            onPageChange(maxPage);
          }}
          disabled={page >= totalPages || totalPages <= 1}
          variant={"outline"}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
