'use client';

import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '~/components/ui/button';

interface ErrorDisplayProps {
  message: string;
  details?: string;
  stack?: string;
  onReset?: () => void;
}

export function ErrorDisplay({
  message = 'Something went wrong',
  details = 'We apologize for the inconvenience. Please try again or return to the homepage.',
  stack,
  onReset,
}: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          <AlertTriangle className="h-24 w-24 text-primary" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{message}</h1>

        <p className="text-gray-600 mb-8">{details}</p>

        {stack && (
          <pre className="w-full p-4 overflow-x-auto bg-gray-100 rounded-md text-left text-sm mb-8">
            <code>{stack}</code>
          </pre>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onReset && (
            <Button onClick={onReset} className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
          )}

          <Button variant="outline" asChild>
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return to Top
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
