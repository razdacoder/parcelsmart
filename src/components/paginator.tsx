import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { useLocation } from "react-router-dom";

// Props for the Pagination Component
type PaginationProps = {
  pagination: Pagination;
};

const Paginator: React.FC<PaginationProps> = ({ pagination }) => {
  const { current_page, last_page, has_previous_page, has_next_page } =
    pagination;

  // Generate dynamic page numbers
  const pageNumbers = [];
  for (let i = 1; i <= last_page; i++) {
    pageNumbers.push(i);
  }
  const location = useLocation();

  const createPageUrl = (pageNumber: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", pageNumber.toString());
    return `${location.pathname}?${searchParams.toString()}`;
  };

  return (
    <Pagination className="md:justify-end mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={createPageUrl(current_page - 1)}
            className={`text-primary hover:text-primary ${
              !has_previous_page ? "cursor-not-allowed opacity-50" : ""
            }`}
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              to={createPageUrl(pageNumber)}
              isActive={pageNumber === current_page}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis for better UX when there are many pages */}
        {last_page > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Page Button */}
        <PaginationItem>
          <PaginationNext
            to={createPageUrl(current_page + 1)}
            className={`text-primary hover:text-primary ${
              !has_next_page ? "cursor-not-allowed opacity-50" : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginator;
