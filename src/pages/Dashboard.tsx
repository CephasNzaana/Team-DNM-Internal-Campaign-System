
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Users, Calendar, CheckSquare, MessageSquare } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for dashboard
  const voterStats = {
    total: 45280,
    supporters: 28432,
    undecided: 12645,
    opposed: 4203,
    supportPercentage: 62.8
  };
  
  const upcomingEvents = [
    { id: 1, title: 'Community Meeting', date: '2025-05-10', location: 'Kabale Town Hall', type: 'meeting' },
    { id: 2, title: 'Door-to-door Campaign', date: '2025-05-12', location: 'Central Ward', type: 'canvassing' },
    { id: 3, title: 'Youth Rally', date: '2025-05-15', location: 'Kabale Stadium', type: 'rally' },
  ];
  
  const taskStats = {
    total: 124,
    completed: 87,
    inProgress: 29,
    pending: 8,
    completionRate: 70.2
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Campaign Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Team DNM Campaign System</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Voters</CardTitle>
            <Users size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{voterStats.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Registered in Kabale Municipality</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supporter Rate</CardTitle>
            <BarChart size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{voterStats.supportPercentage}%</div>
            <Progress value={voterStats.supportPercentage} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
            <p className="text-xs text-muted-foreground">Next: {upcomingEvents[0].title}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
            <CheckSquare size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.completionRate}%</div>
            <Progress value={taskStats.completionRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events scheduled for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex items-center">
                  <div className="mr-4 bg-green-100 p-2 rounded-md">
                    <Calendar className="h-5 w-5 text-green-700" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} - {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Task Overview</CardTitle>
            <CardDescription>Current task status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 bg-green-100 p-2 rounded-md">
                  <CheckSquare className="h-5 w-5 text-green-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Completed</p>
                    <span className="text-sm font-medium">{taskStats.completed}</span>
                  </div>
                  <Progress value={(taskStats.completed / taskStats.total) * 100} className="h-2 mt-2" />
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="mr-4 bg-yellow-100 p-2 rounded-md">
                  <CheckSquare className="h-5 w-5 text-yellow-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">In Progress</p>
                    <span className="text-sm font-medium">{taskStats.inProgress}</span>
                  </div>
                  <Progress value={(taskStats.inProgress / taskStats.total) * 100} className="h-2 mt-2" />
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="mr-4 bg-gray-100 p-2 rounded-md">
                  <CheckSquare className="h-5 w-5 text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Pending</p>
                    <span className="text-sm font-medium">{taskStats.pending}</span>
                  </div>
                  <Progress value={(taskStats.pending / taskStats.total) * 100} className="h-2 mt-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
