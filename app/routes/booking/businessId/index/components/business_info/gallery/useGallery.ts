import { useState } from "react"
import { useLoaderData } from "react-router"
import { ITEMS_IN_PAGE } from "~/routes/booking/index/constants/ITEMS_IN_PAGE"
import type { Gallery } from "../../../types/BusinessGallery"
import type { loader } from "../../../route"

export function useGallery() {
  const [currentGalleryPage, setCurrentGalleryPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null)

  const data = useLoaderData<typeof loader>();
  const galleryImages = data?.images ?? [];

  // Pagination settings
  const totalPages = Math.ceil(galleryImages.length / ITEMS_IN_PAGE)

  // Get current page images
  const getCurrentPageImages = () => {
    const startIndex = (currentGalleryPage - 1) *ITEMS_IN_PAGE 
    const endIndex = startIndex +ITEMS_IN_PAGE 
    return galleryImages.slice(startIndex, endIndex)
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

  return {
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
  };
}