import { ArrowLeft, Home, Utensils } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '~/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          <Utensils className="h-24 w-24 text-primary" />
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</h2>

        <p className="text-gray-600 mb-8">
          Oops! Looks like this table hasn't been reserved. The page you're looking for doesn't
          exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return to Top
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link to="/booking" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Restaurants
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
