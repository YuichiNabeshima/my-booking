import { AlertCircle } from 'lucide-react';

import { Card } from '~/components/ui/card';

interface ErrorDisplayProps {
  message: string;
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <Card className="mx-auto max-w-6xl">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg">
        <div className="flex items-center justify-center w-12 h-12 mb-4 bg-red-100 rounded-full">
          <AlertCircle className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">An error occurred</h3>
        <p className="text-sm text-gray-500 text-center">{message}</p>
      </div>
    </Card>
  );
}
