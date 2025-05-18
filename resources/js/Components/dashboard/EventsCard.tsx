import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Calendar } from 'lucide-react';

interface Event {
  title: string;
  date: Date;
  time: string;
}

interface EventsCardProps {
  events: Event[];
}

const EventsCard: React.FC<EventsCardProps> = ({ events }) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-3 border-b pt-4">
        <CardTitle className="text-base sm:text-lg font-semibold">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="pt-3 sm:pt-4 pb-4">
        <div className="space-y-3 sm:space-y-4">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 rounded-lg bg-yellow-50 border border-yellow-100"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mx-auto sm:mx-0">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {event.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })} • {event.time}
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 w-full sm:w-auto">
                    Add to Calendar
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-3 border border-dashed border-gray-200 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600">
                There are no events scheduled in the next 30 days.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCard;
