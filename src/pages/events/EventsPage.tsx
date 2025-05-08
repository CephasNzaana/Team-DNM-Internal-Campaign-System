
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, MapPin, Users, Clock, Plus } from 'lucide-react';

interface CampaignEvent {
  id: string;
  title: string;
  description: string;
  eventType: 'rally' | 'meeting' | 'canvassing' | 'fundraiser' | 'media' | 'other';
  startTime: Date;
  endTime: Date;
  location: {
    name: string;
    address: string;
    parish: string;
  };
  expectedAttendance: number;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
}

const EventsPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample event data
  const events: CampaignEvent[] = [
    {
      id: '1',
      title: 'Community Town Hall Meeting',
      description: 'Discussing local issues and presenting campaign platform to the community.',
      eventType: 'meeting',
      startTime: new Date('2025-05-10T14:00:00'),
      endTime: new Date('2025-05-10T16:00:00'),
      location: {
        name: 'Kabale Town Hall',
        address: 'Central Road',
        parish: 'Central Parish',
      },
      expectedAttendance: 150,
      status: 'planned'
    },
    {
      id: '2',
      title: 'Door-to-door Campaign',
      description: 'Canvassing in Central Ward to meet voters directly.',
      eventType: 'canvassing',
      startTime: new Date('2025-05-12T09:00:00'),
      endTime: new Date('2025-05-12T17:00:00'),
      location: {
        name: 'Central Ward',
        address: 'Various locations',
        parish: 'Central Parish',
      },
      expectedAttendance: 200,
      status: 'planned'
    },
    {
      id: '3',
      title: 'Youth Rally',
      description: 'Engaging with young voters and discussing education and employment opportunities.',
      eventType: 'rally',
      startTime: new Date('2025-05-15T15:00:00'),
      endTime: new Date('2025-05-15T18:00:00'),
      location: {
        name: 'Kabale Stadium',
        address: 'Stadium Road',
        parish: 'Western Parish',
      },
      expectedAttendance: 500,
      status: 'planned'
    },
    {
      id: '4',
      title: 'Media Interview',
      description: 'Interview with local radio station about campaign platform.',
      eventType: 'media',
      startTime: new Date('2025-05-05T10:00:00'),
      endTime: new Date('2025-05-05T11:00:00'),
      location: {
        name: 'Kabale FM',
        address: 'Main Street',
        parish: 'Northern Parish',
      },
      expectedAttendance: 10,
      status: 'completed'
    },
  ];
  
  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case 'rally':
        return <Badge className="bg-red-600">Rally</Badge>;
      case 'meeting':
        return <Badge className="bg-blue-600">Meeting</Badge>;
      case 'canvassing':
        return <Badge className="bg-green-600">Canvassing</Badge>;
      case 'fundraiser':
        return <Badge className="bg-purple-600">Fundraiser</Badge>;
      case 'media':
        return <Badge className="bg-yellow-600">Media</Badge>;
      default:
        return <Badge>Other</Badge>;
    }
  };
  
  const upcomingEvents = events.filter(event => 
    event.startTime > new Date() && event.status !== 'cancelled'
  ).sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  
  const pastEvents = events.filter(event => 
    event.startTime <= new Date() || event.status === 'completed'
  ).sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaign Events</h1>
          <p className="text-muted-foreground">Manage and schedule campaign activities</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>
      
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border pointer-events-auto"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Events on {date?.toLocaleDateString()}</CardTitle>
                <CardDescription>
                  Campaign activities scheduled for this date
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events
                    .filter(event => 
                      date && 
                      event.startTime.toDateString() === date.toDateString()
                    )
                    .map(event => (
                      <div key={event.id} className="flex flex-col space-y-2 p-4 border rounded-md">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{event.title}</h3>
                          {getEventTypeBadge(event.eventType)}
                        </div>
                        <p className="text-sm text-gray-500">{event.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            {event.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                            {event.endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{event.location.name}, {event.location.address}</span>
                        </div>
                      </div>
                    ))}
                  {date && events.filter(event => 
                    event.startTime.toDateString() === date.toDateString()
                  ).length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                      No events scheduled for this date
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map(event => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    {getEventTypeBadge(event.eventType)}
                  </div>
                  <CardDescription>{event.startTime.toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{event.description}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        {event.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                        {event.endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{event.location.name}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Expected: {event.expectedAttendance}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" size="sm">View Details</Button>
                </CardFooter>
              </Card>
            ))}
            {upcomingEvents.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No upcoming events scheduled</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastEvents.map(event => (
              <Card key={event.id} className="opacity-90">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    {getEventTypeBadge(event.eventType)}
                  </div>
                  <CardDescription>{event.startTime.toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{event.description}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{event.location.name}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" size="sm">View Report</Button>
                </CardFooter>
              </Card>
            ))}
            {pastEvents.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No past events</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsPage;
