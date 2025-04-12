import { Link } from "react-router"
import { MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { PRICE_LABEL } from "~/constants/PRICE_LABEL"
import { NEIGHBORHOOD } from "~/constants/enums/NEIGHBORHOOD"
import { type PriceLevel } from "~/types/PriceLabel"
import { Pagination } from "./pagenation/Pagenation"
import { useRestaurantList } from "./useRestaurantList"
import { Image } from "~/components/ui/image/image"

export function RestaurantList() {
  const {
    filteredRestaurants,
    currentRestaurants,
    totalPages,
    currentPage,
  } = useRestaurantList();

  return (
    <>
      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRestaurants.map((restaurant, idx) => (
              <Card key={idx} className="overflow-hidden transition-all duration-300 hover:shadow-lg py-0">
                <div className="relative h-48 w-full overflow-hidden">
                  <Link to={`/booking/${restaurant.id}`} className="cursor-pointer">
                    {/* <img
                      src={restaurant.thumbnail || "/img/common/no_image_01.png"}
                      alt={restaurant.name}
                      className="object-cover transition-transform duration-300 hover:scale-105 h-full w-full"
                    /> */}
                    <Image
                      src={restaurant.thumbnail || "/img/common/no_image_01.png"}
                      alt={restaurant.name}
                      className="object-cover transition-transform duration-300 hover:scale-105 h-full w-full"
                    />
                  </Link>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {PRICE_LABEL[restaurant.priceLevel as PriceLevel]}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{restaurant.name}</h3>
                  </div>

                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {NEIGHBORHOOD[restaurant.neighborhood as keyof typeof NEIGHBORHOOD]}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{restaurant.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {restaurant.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Link to={`/booking/${restaurant.id}`} className="w-full">
                    <Button className="w-full cursor-pointer">
                      Book a Table
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Only show pagination if we have more than one page */}
          {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
        </>
      )}
    </>
  )
}

