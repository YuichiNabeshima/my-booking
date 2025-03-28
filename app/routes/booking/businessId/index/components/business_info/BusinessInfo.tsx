import { useState } from "react"
import { ChevronLeft, ChevronRight, Info, ImageIcon, MapPin, Utensils, Clock, Calendar, X } from "lucide-react"
import { Card, CardContent } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs"
import { Dialog, DialogContent, DialogClose } from "~/components/ui/dialog"
import { useLoaderData } from "react-router"
import type { LoaderDTO } from "../../.server/dtos/LoaderDTO"
import { isLoaderSuccess } from "../../utils/guards/isLoaderSuccess"
import type { Gallery } from "../../types/BusinessGallery"
import { DialogTitle } from "@radix-ui/react-dialog"

// type SelectedImage = {
//   url: string;
//   caption: string;
// };

export function BusinessInfo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentGalleryPage, setCurrentGalleryPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null)

  const data = useLoaderData<LoaderDTO>();
  const galleryImages = isLoaderSuccess(data) ? data.images : [];

  // Hero slider images
  const images = [
    "/booking/placeholder.png?height=600&width=800",
    "/booking/placeholder.png?height=600&width=800",
    "/booking/placeholder.png?height=600&width=800",
    "/booking/placeholder.png?height=600&width=800",
  ]

  // // Gallery images with captions - In a real implementation, this would be fetched asynchronously
  // const galleryImages = [
  //   {
  //     src: "/booking/placeholder.png?height=800&width=800&text=Gallery+1",
  //     thumbnail: "/booking/placeholder.png?height=300&width=300&text=Gallery+1",
  //     caption: "Our signature Fat Burger with cheese and special sauce",
  //   },
  //   {
  //     src: "/booking/placeholder.png?height=800&width=800&text=Gallery+2",
  //     thumbnail: "/booking/placeholder.png?height=300&width=300&text=Gallery+2",
  //     caption: "Interior view of our restaurant",
  //   },
  //   {
  //     src: "/booking/placeholder.png?height=800&width=800&text=Gallery+3",
  //     thumbnail: "/booking/placeholder.png?height=300&width=300&text=Gallery+3",
  //     caption: "Selection of craft beers on tap",
  //   },
  //   {
  //     src: "/booking/placeholder.png?height=800&width=800&text=Gallery+4",
  //     thumbnail: "/booking/placeholder.png?height=300&width=300&text=Gallery+4",
  //     caption: "Our outdoor seating area",
  //   },
  //   {
  //     src: "/booking/placeholder.png?height=800&width=800&text=Gallery+5",
  //     thumbnail: "/booking/placeholder.png?height=300&width=300&text=Gallery+5",
  //     caption: "Chef's special burger of the month",
  //   },
  //   {
  //     src: "/booking/placeholder.png?height=800&width=800&text=Gallery+6",
  //     thumbnail: "/booking/placeholder.png?height=300&width=300&text=Gallery+6",
  //     caption: "Homemade desserts selection",
  //   },
  //   {
  //     src: "/booking/placeholder.png?height=800&width=800&text=Gallery+7",
  //     thumbnail: "/booking/placeholder.png?height=300&width=300&text=Gallery+7",
  //     caption: "Premium beef patties being prepared",
  //   },
  //   {
  //     src: "/booking/placeholder.png?height=800&width=800&text=Gallery+8",
  //     thumbnail: "/booking/placeholder.png?height=300&width=300&text=Gallery+8",
  //     caption: "Our bar area with premium spirits",
  //   },
  //   {
  //     src: "/booking/placeholder.png?height=800&width=800&text=Gallery+9",
  //     thumbnail: "/booking/placeholder.png?height=300&width=300&text=Gallery+9",
  //     caption: "Weekend brunch special",
  //   },
  //   {
  //     src: "/booking/placeholder.png?height=800&width=800&text=Gallery+10",
  //     thumbnail: "/booking/placeholder.png?height=300&width=300&text=Gallery+10",
  //     caption: "Private dining area for events",
  //   },
  //   {
  //     src: "/booking/placeholder.png?height=800&width=800&text=Gallery+11",
  //     thumbnail: "/booking/placeholder.png?height=300&width=300&text=Gallery+11",
  //     caption: "Seasonal menu items",
  //   },
  //   {
  //     src: "/booking/placeholder.png?height=800&width=800&text=Gallery+12",
  //     thumbnail: "/booking/placeholder.png?height=300&width=300&text=Gallery+12",
  //     caption: "Our team of chefs",
  //   },
  // ]

  // Pagination settings
  const imagesPerPage = 6
  const totalPages = Math.ceil(galleryImages.length / imagesPerPage)

  // Get current page images
  const getCurrentPageImages = () => {
    const startIndex = (currentGalleryPage - 1) * imagesPerPage
    const endIndex = startIndex + imagesPerPage
    return galleryImages.slice(startIndex, endIndex)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextGalleryPage = () => {
    if (currentGalleryPage < totalPages) {
      setCurrentGalleryPage((prev) => prev + 1)
    }
  }

  const prevGalleryPage = () => {
    if (currentGalleryPage > 1) {
      setCurrentGalleryPage((prev) => prev - 1)
    }
  }

  const goToGalleryPage = (pageNumber: number) => {
    setCurrentGalleryPage(pageNumber)
  }

  const openImageModal = (image: Gallery) => {
    setSelectedImage(image)
    setModalOpen(true)
  }

  return (
    <div className="container mx-auto max-w-6xl">
      {/* Store Information Section */}
      <Card className="mb-8 overflow-hidden border-none shadow-lg">
        <div className="relative h-[40vh] sm:h-[50vh] w-full bg-black">
          <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/30 text-white hover:bg-black/50"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/30 text-white hover:bg-black/50"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </Button>
          </div>
          <img
            src={images[currentImageIndex] || "/booking/placeholder.png"}
            alt="Fat Burger Interior"
            className="h-full w-full object-cover opacity-90 transition-opacity duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 text-white">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Fat Burger</h1>
            <p className="text-sm md:text-lg opacity-90">Premium Burgers & Craft Beer</p>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-1.5 md:h-2 w-4 md:w-8 rounded-full transition-all ${
                  currentImageIndex === index ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <CardContent className="p-4 md:p-6">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="info" className="text-xs md:text-base px-1 md:px-4">
                <Info className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Information</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger value="gallery" className="text-xs md:text-base px-1 md:px-4">
                <ImageIcon className="h-4 w-4 mr-1 md:mr-2" />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="hours" className="text-xs md:text-base px-1 md:px-4">
                <Clock className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Hours</span>
                <span className="sm:hidden">Hrs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    Address
                  </h2>
                  <p className="text-muted-foreground mb-2 text-sm md:text-base">106-0032</p>
                  <p className="text-muted-foreground mb-4 text-sm md:text-base">
                    Roppongi Hills Mori Tower 2F, 6-10-1 Roppongi, Minato-ku, Tokyo
                  </p>
                  <Button variant="outline" className="w-full sm:w-auto">
                    View on Map
                  </Button>
                </div>

                <div className="md:mt-0">
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-primary" />
                    Details
                  </h2>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-sm md:max-w-xs">
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground break-words">03-1234-5678</div>

                    <div className="font-medium">Seating</div>
                    <div className="text-muted-foreground">60 seats</div>

                    <div className="font-medium">Payment</div>
                    <div className="text-muted-foreground">Cash, Cards, Digital</div>

                    <div className="font-medium">Parking</div>
                    <div className="text-muted-foreground">Roppongi Hills</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 flex items-center">
                  <Utensils className="h-5 w-5 mr-2 text-primary" />
                  About Us
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Fat Burger is an authentic hamburger restaurant using 100% premium Japanese beef patties and freshly
                  baked homemade buns every morning. Enjoy our exceptional burgers crafted with dedication to quality
                  ingredients and culinary expertise. We also offer over 20 varieties of craft beer to complement your
                  dining experience.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {getCurrentPageImages().map((image, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-lg bg-muted/20 group cursor-pointer"
                    onClick={() => openImageModal(image)}
                  >
                    <img
                      src={image.url || "/booking/placeholder.png"}
                      alt={image.caption}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
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
            </TabsContent>

            <TabsContent value="hours" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Business Hours
                  </h2>
                  <div className="space-y-2 text-sm md:max-w-xs">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="font-medium w-24">Lunch</span>
                      <span className="text-muted-foreground">11:00 - 15:00 (L.O. 14:30)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="font-medium w-24">Dinner</span>
                      <span className="text-muted-foreground">17:00 - 23:00 (L.O. 22:00)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="font-medium w-24">Bar Time</span>
                      <span className="text-muted-foreground">15:00 - 17:00 / 23:00 - 24:00</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    Open Days
                  </h2>
                  <div className="md:max-w-xs">
                    <div className="flex mb-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                        <div
                          key={day}
                          className={`flex-1 text-center py-1 font-medium text-xs md:text-sm ${
                            i === 0 ? "text-red-600" : i === 6 ? "text-blue-600" : ""
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      {["Closed", "Open", "Open", "Open", "Open", "Open", "Open"].map((status, i) => (
                        <div
                          key={i}
                          className={`flex-1 text-center py-1 text-xs rounded-md ${
                            i === 0 ? "bg-red-100 text-red-600" : i === 6 ? "bg-blue-100 text-blue-600" : ""
                          }`}
                        >
                          {status}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-4">
                    *Holidays follow Sunday schedule. Please contact us for New Year holidays and temporary closures.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

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
                  src={selectedImage.url || "/booking/placeholder.png"}
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
    </div>
  )
}

