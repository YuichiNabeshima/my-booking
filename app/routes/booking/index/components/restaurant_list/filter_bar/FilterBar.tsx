import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export function FilterBar() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Get filter values from URL or use defaults
  const [cuisine, setCuisine] = useState(searchParams.get("cuisine") || "all")
  const [price, setPrice] = useState(searchParams.get("price") || "all")
  const [neighborhood, setNeighborhood] = useState(searchParams.get("neighborhood") || "all")

  // Update URL when filters change
  const updateFilters = (key: string, value: string) => {
    // Create a new URLSearchParams object from the current params
    const params = new URLSearchParams(searchParams.toString())

    // Set the page back to 1 when filters change
    params.set("page", "1")

    // Update the filter parameter
    if (value === "all") {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    // Update the URL
    navigate(`?${params.toString()}`)
  }

  // Handle cuisine change
  const handleCuisineChange = (value: string) => {
    setCuisine(value)
    updateFilters("cuisine", value)
  }

  // Handle price change
  const handlePriceChange = (value: string) => {
    setPrice(value)
    updateFilters("price", value)
  }

  // Handle neighborhood change
  const handleNeighborhoodChange = (value: string) => {
    setNeighborhood(value)
    updateFilters("neighborhood", value)
  }

  // Reset all filters
  const handleReset = () => {
    setCuisine("all")
    setPrice("all")
    setNeighborhood("all")

    // Remove all filter parameters but keep search if present
    const params = new URLSearchParams()
    const searchQuery = searchParams.get("search")
    if (searchQuery) {
      params.set("search", searchQuery)
    }
    params.set("page", "1")

    navigate(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-3 mb-8 items-center">
      <div className="flex items-center mr-2">
        <span className="text-sm font-medium mr-2">Filters:</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={cuisine !== "all" ? "default" : "outline"} 
            className="rounded-full"
          >
            {cuisine === "all" ? "Cuisine" : cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Cuisine</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={cuisine} onValueChange={handleCuisineChange}>
            <DropdownMenuRadioItem value="all">All Cuisines</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="canadian">Canadian</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="italian">Italian</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="asian">Asian Fusion</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="seafood">Seafood</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="mexican">Mexican</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="vegan">Vegan</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={price !== "all" ? "default" : "outline"} 
            className="rounded-full"
          >
            {price === "all" ? "Price Range" : 
              price === "1" ? "Under $30" :
              price === "2" ? "$30-$60" :
              price === "3" ? "$60-$100" :
              "Over $100"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Price Range</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={price} onValueChange={handlePriceChange}>
            <DropdownMenuRadioItem value="all">All Prices</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="1">$ (Under $30)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="2">$$ ($30-$60)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="3">$$$ ($60-$100)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="4">$$$$ (Over $100)</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={neighborhood !== "all" ? "default" : "outline"} 
            className="rounded-full"
          >
            {neighborhood === "all" ? "Neighborhood" : 
              neighborhood.charAt(0).toUpperCase() + neighborhood.slice(1)}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Neighborhood</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={neighborhood} onValueChange={handleNeighborhoodChange}>
            <DropdownMenuRadioItem value="all">All Areas</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="downtown">Downtown</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="gastown">Gastown</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="yaletown">Yaletown</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="westend">West End</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="kitsilano">Kitsilano</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="mainst">Main Street</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="chinatown">Chinatown</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" className="rounded-full ml-auto" onClick={handleReset}>
        Reset
      </Button>
    </div>
  )
}

