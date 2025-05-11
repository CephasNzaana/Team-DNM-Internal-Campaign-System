
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Plus, Users, MapPin, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { DNM_THEME } from '@/lib/theme';

// Mock data for events
const events = [
  { 
    id: 1, 
    title: 'Community Meeting', 
    date: new Date('2025-05-15'), 
    location: 'Kabale Town Hall', 
    type: 'meeting',
    description: 'Discussion on local infrastructure development and community needs.',
    attendees: 45,
  },
  { 
    id: 2, 
    title: 'Door-to-door Campaign', 
    date: new Date('2025-05-18'), 
    location: 'Central Ward', 
    type: 'canvassing',
    description: 'Direct voter outreach to understand key issues and build support.',
    attendees: 12,
  },
  { 
    id: 3, 
    title: 'Youth Rally', 
    date: new Date('2025-05-22'), 
    location: 'Kabale Stadium', 
    type: 'rally',
    description: 'Engaging young voters on education and employment opportunities.',
    attendees: 220,
  },
  { 
    id: 4, 
    title: 'Fundraising Dinner', 
    date: new Date('2025-06-05'), 
    location: 'White Horse Hotel', 
    type: 'fundraiser',
    description: 'Key fundraising event for campaign activities and materials.',
    attendees: 80,
  },
  { 
    id: 5, 
    title: 'Market Visit', 
    date: new Date('2025-06-12'), 
    location: 'Kabale Central Market', 
    type: 'canvassing',
    description: 'Meeting traders and discussing economic policies.',
    attendees: 55,
  },
];

const EventsPage: React.FC = () => {
  const location = useLocation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Determine which tab should be active based on URL
  const getDefaultTab = () => {
    if (location.pathname.includes('/events/upcoming')) return 'upcoming';
    if (location.pathname.includes('/events/past')) return 'past';
    return 'calendar';
  };

  // Filter events
  const today = new Date();
  const upcomingEvents = events.filter(event => event.date > today);
  const pastEvents = events.filter(event => event.date <= today);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Events</h1>
          <p className="text-muted-foreground">
            Manage all campaign activities and engagements across Kabale Municipality.
          </p>
        </div>
        <Link to="/events/new">
          <Button className="bg-[#306030] hover:bg-[#306030]/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue={getDefaultTab()} className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 gap-4">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Event Calendar</CardTitle>
                <CardDescription>Select a date to view events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border rounded-md"
                />
              </CardContent>
            </Card>
            
            <Card className="col-span-1 md:col-span-3">
              <CardHeader>
                <CardTitle>Events for {date?.toDateString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.filter(event => 
                    date && 
                    event.date.getDate() === date.getDate() && 
                    event.date.getMonth() === date.getMonth() && 
                    event.date.getFullYear() === date.getFullYear()
                  ).length > 0 ? (
                    events.filter(event => 
                      date && 
                      event.date.getDate() === date.getDate() && 
                      event.date.getMonth() === date.getMonth() && 
                      event.date.getFullYear() === date.getFullYear()
                    ).map(event => (
                      <EventCard key={event.id} event={event} />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
                      <p className="mt-1 text-sm text-gray-500">No events scheduled for this day.</p>
                      <div className="mt-6">
                        <Link to="/events/new">
                          <Button variant="outline" className="text-sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Event
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
            {upcomingEvents.length === 0 && (
              <div className="col-span-full text-center py-8">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming events</h3>
                <p className="mt-1 text-sm text-gray-500">Create your first event to get started.</p>
                <div className="mt-6">
                  <Link to="/events/new">
                    <Button variant="outline" className="text-sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Event
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map(event => (
              <EventCard key={event.id} event={event} isPast />
            ))}
            {pastEvents.length === 0 && (
              <div className="col-span-full text-center py-8">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No past events</h3>
                <p className="mt-1 text-sm text-gray-500">Your completed events will appear here.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: Date;
    location: string;
    type: string;
    description: string;
    attendees: number;
  };
  isPast?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isPast = false }) => {
  const eventTypeColors: Record<string, string> = {
    meeting: `${DNM_THEME.colors.green}`,
    canvassing: `${DNM_THEME.colors.yellow}`,
    rally: `${DNM_THEME.colors.red}`,
    fundraiser: `${DNM_THEME.colors.oliveGreen}`,
    media: '#0EA5E9',
    other: '#6C757D'
  };
  
  return (
    <Card className={`overflow-hidden ${isPast ? 'opacity-75' : ''}`}>
      <div 
        className="h-2" 
        style={{ backgroundColor: eventTypeColors[event.type] || DNM_THEME.colors.green }}
      />
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span>{event.title}</span>
          <Badge type={event.type} />
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Clock size={14} />
          {event.date.toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin size={14} className="mr-2 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users size={14} className="mr-2 text-muted-foreground" />
            <span>{event.attendees} attendees</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/events/${event.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Badge: React.FC<{ type: string }> = ({ type }) => {
  const getTypeStyle = () => {
    switch (type) {
      case 'meeting':
        return 'bg-[#306030]/10 text-[#306030] border-[#306030]';
      case 'canvassing':
        return 'bg-[#FFCE00]/10 text-[#806600] border-[#FFCE00]';
      case 'rally':
        return 'bg-[#D90000]/10 text-[#D90000] border-[#D90000]';
      case 'fundraiser':
        return 'bg-[#4A5D23]/10 text-[#4A5D23] border-[#4A5D23]';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <span className={`text-xs px-2 py-1 rounded-full border ${getTypeStyle()}`}>
      {type}
    </span>
  );
};

export default EventsPage;
