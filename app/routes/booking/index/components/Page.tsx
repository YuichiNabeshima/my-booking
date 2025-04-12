import { RestaurantList } from "./restaurant_list/RestaurantList";
import { FilterBar } from "./restaurant_list/filter_bar/FilterBar";

export function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <section className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Vancouver Dining</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Discover and book the perfect restaurant for any occasion in Vancouver
          </p>
        </section>
        <FilterBar />
        <RestaurantList />
      </div>
    </main>
  )
}

