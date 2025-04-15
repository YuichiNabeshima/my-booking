import { useEffect, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router';

import type { loader } from '../../route';

export function useRestaurantList() {
  const data = useLoaderData<typeof loader>();
  const totalPages = data?.totalPages || 1;
  const [searchParams] = useSearchParams();
  const [filteredRestaurants, setFilteredRestaurants] = useState(data ? data.cards : []);

  // Get current page from URL or default to 1
  const currentPage = Number.parseInt(searchParams.get('page') || '1', 10);

  // Get filter values from URL
  const cuisineFilter = searchParams.get('cuisine') || 'all';
  const priceFilter = searchParams.get('price') || 'all';
  const neighborhoodFilter = searchParams.get('neighborhood') || 'all';
  const searchQuery = searchParams.get('search') || '';

  // Apply filters when URL parameters change
  useEffect(() => {
    let results = [...(data ? data.cards : [])];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.cuisine.toLowerCase().includes(query) ||
          restaurant.priceLevel?.toString().includes(query) ||
          restaurant.neighborhood.toLowerCase().includes(query),
      );
    }

    setFilteredRestaurants(results);
  }, [cuisineFilter, priceFilter, neighborhoodFilter, searchQuery, data]);

  // Get current page restaurants
  const currentRestaurants = filteredRestaurants;

  return {
    filteredRestaurants,
    currentRestaurants,
    totalPages,
    currentPage,
  };
}
