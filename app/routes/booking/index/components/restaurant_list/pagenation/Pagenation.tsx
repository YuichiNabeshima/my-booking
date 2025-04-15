import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router';

import { Button } from '~/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const [, setSearchParams] = useSearchParams();

  // Handle page change
  const handlePageChange = (page: number) => {
    // Update search params
    setSearchParams((prev) => {
      prev.set('page', page.toString());
      return prev;
    });

    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to display
  const generatePages = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Calculate range of pages to show around current page
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis if there's a gap after page 1
    if (rangeStart > 2) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Add pages in the calculated range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis if there's a gap before the last page
    if (rangeEnd < totalPages - 1) {
      pages.push(-2); // -2 represents ellipsis (using different key)
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {pages.map((page, i) => {
        // Render ellipsis
        if (page < 0) {
          return (
            <Button key={`ellipsis-${i}`} variant="ghost" size="icon" disabled>
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More pages</span>
            </Button>
          );
        }

        // Render page number
        return (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size="icon"
            onClick={() => handlePageChange(page)}
          >
            {page}
            <span className="sr-only">Page {page}</span>
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
}
