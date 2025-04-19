import { Clock, ImageIcon, Info } from 'lucide-react';

import { Card, CardContent } from '~/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

import { BusinessHours } from './business_hours/BusinessHours';
import { Gallery } from './gallery/Gallery';
import { Hero } from './hero/Hero';
import { Information } from './information/Information';

export function BusinessInfo() {
  return (
    <div className="container mx-auto max-w-6xl">
      {/* Store Information Section */}
      <Card className="mb-8 overflow-hidden border-none shadow-lg py-0">
        <Hero />

        <CardContent className="p-4 md:p-6">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger
                value="info"
                className="text-xs md:text-base px-1 md:px-4 cursor-pointer"
              >
                <Info className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Information</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className="text-xs md:text-base px-1 md:px-4 cursor-pointer"
              >
                <ImageIcon className="h-4 w-4 mr-1 md:mr-2" />
                Gallery
              </TabsTrigger>
              <TabsTrigger
                value="hours"
                className="text-xs md:text-base px-1 md:px-4 cursor-pointer"
              >
                <Clock className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Hours</span>
                <span className="sm:hidden">Hrs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              <Information />
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4">
              <Gallery />
            </TabsContent>

            <TabsContent value="hours" className="space-y-6">
              <BusinessHours />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
