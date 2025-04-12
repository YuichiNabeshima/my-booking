import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Image } from "~/components/ui/image/image";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "~/components/ui/dialog";
import { useGallery } from "./useGallery";

export function Gallery() {
  const {
    currentGalleryPage,
    modalOpen,
    selectedImage,
    totalPages,
    prevGalleryPage,
    nextGalleryPage,
    goToGalleryPage,
    openImageModal,
    getCurrentPageImages,
    setModalOpen,
  } = useGallery();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {getCurrentPageImages().map((image, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-lg bg-muted/20 group cursor-pointer"
            onClick={() => openImageModal(image)}
          >
            <Image
              src={image.url || "/img/booking/placeholder.png"}
              alt={image.caption || "Gallery Image"}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <p className="text-white text-sm font-medium line-clamp-2">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">
            Page {currentGalleryPage} of {totalPages}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevGalleryPage}
            disabled={currentGalleryPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentGalleryPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToGalleryPage(page)}
                className="h-8 w-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextGalleryPage}
            disabled={currentGalleryPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
            <X className="h-6 w-6 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogTitle>{selectedImage?.caption}</DialogTitle>

          {selectedImage && (
            <div className="relative flex flex-col items-center">
              <div className="w-full h-[80vh] relative">
                <img
                  src={selectedImage.url || "/img/booking/placeholder.png"}
                  alt={selectedImage.caption}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-full bg-black p-4">
                <p className="text-white text-center">{selectedImage.caption}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
