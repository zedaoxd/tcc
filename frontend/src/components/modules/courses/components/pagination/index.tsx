import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  previousPage: () => void;
  nextPage: () => void;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  maxPages?: number;
  disabled?: boolean;
};

export function PaginationCourses({
  nextPage,
  page,
  previousPage,
  totalPages,
  setPage,
  maxPages = 5,
  disabled = false,
}: Props) {
  const middlePage = Math.ceil(maxPages / 2);
  let startPage = page - middlePage + 1;
  let endPage = page + middlePage - 1;

  if (totalPages <= maxPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    } else if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={previousPage}
            disabled={page === 1 || disabled}
          />
        </PaginationItem>

        {startPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(1)} disabled={disabled}>
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {startPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              onClick={() => setPage(pageNumber)}
              isActive={page === pageNumber}
              disabled={disabled}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {endPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {endPage < totalPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() => setPage(totalPages)}
              disabled={disabled}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext onClick={nextPage} disabled={page === totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
