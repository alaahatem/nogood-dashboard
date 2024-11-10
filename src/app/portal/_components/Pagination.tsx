import { Button } from "@/components/ui/button";

type PaginationProps = {
  page: number;
  onPageChange: (newPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, onPageChange }) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button variant="outline" size="sm" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        Previous
      </Button>
      <Button variant="outline" size="sm" onClick={() => onPageChange(page + 1)}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
