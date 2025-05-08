
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Users, Calendar, CheckSquare, MessageSquare, BarChart2, TrendingUp, Clock, MapPin } from 'lucide-react';
import { PieChart } from '@/components/ui/charts';
import { Button } from '@/components/ui/button';
import { DNM_THEME } from '@/lib/theme';

const Dashboard: React.FC = () => {
  // Mock data for dashboard with real campaign messaging
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

  const issueData = [
    { name: 'Education', value: 35 },
    { name: 'Infrastructure', value: 25 },
    { name: 'Healthcare', value: 20 },
    { name: 'Youth Employment', value: 15 },
    { name: 'Security', value: 5 },
  ];
  
  return (
    <div className="space-y-6">
      {/* Campaign Hero Section */}
      <div className="bg-gradient-to-r from-[#306030] to-[#4A5D23] rounded-lg p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 bottom-0 w-1/4 overflow-hidden">
          <img 
            src="/lovable-uploads/4b0e8586-29c8-409e-a86c-4a005c2130fd.png" 
            alt="Dan Musinguzi Nabaasa"
            className="h-full w-full object-contain object-right-top"
          />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <div className="h-5 flex flex-shrink-0 overflow-hidden rounded">
              <div className="h-full w-5 bg-black"></div>
              <div className="h-full w-5 bg-[#FFCE00]"></div>
              <div className="h-full w-5 bg-[#D90000]"></div>
            </div>
            <h2 className="text-sm uppercase font-bold tracking-wider">Kabale Municipality Campaign</h2>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Team DNM Campaign Dashboard</h1>
          <p className="text-xl opacity-90 mb-4 font-medium">"Tureebe Omumeisho, Tureebe Hare"</p>
          <p className="text-white/80 mb-6 max-w-lg">
            Tracking campaign progress for Dan Musinguzi Nabaasa's 2026 MP campaign for Kabale Municipality. 
            Building support across all wards with a focus on community engagement.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button className="bg-[#FFCE00] text-black font-medium hover:bg-[#FFCE00]/90">Campaign Updates</Button>
            <Button variant="outline" className="text-white border-white hover:bg-white/20 hover:text-black">Voter Database</Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[#306030]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Voters</CardTitle>
            <Users size={18} className="text-[#306030]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{voterStats.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Registered in Kabale Municipality</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-[#FFCE00]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supporter Rate</CardTitle>
            <BarChart size={18} className="text-[#FFCE00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{voterStats.supportPercentage}%</div>
            <Progress value={voterStats.supportPercentage} className="h-2 mt-2 bg-gray-200" 
              style={{background: DNM_THEME.colors.lightGray}} />
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-[#D90000]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar size={18} className="text-[#D90000]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
            <p className="text-xs text-muted-foreground">Next: {upcomingEvents[0].title}</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-[#4A5D23]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
            <CheckSquare size={18} className="text-[#4A5D23]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.completionRate}%</div>
            <Progress value={taskStats.completionRate} className="h-2 mt-2 bg-gray-200" />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-[#FEF7CD]/50">
          <CardHeader>
            <CardTitle>Campaign Priority Issues</CardTitle>
            <CardDescription>Top 5 issues important to Kabale Municipality voters</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="p-4 h-full flex justify-center">
              <PieChart
                data={issueData}
                index="name"
                category="value"
                colors={[
                  DNM_THEME.colors.green, 
                  DNM_THEME.colors.oliveGreen, 
                  DNM_THEME.colors.yellow, 
                  DNM_THEME.colors.warmCream,
                  DNM_THEME.colors.cream
                ]}
              />
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Based on voter interviews and community meetings</p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events scheduled for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex items-center">
                  <div className="mr-4 bg-[#FEF7CD] p-2 rounded-md">
                    <Calendar className="h-5 w-5 text-[#306030]" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{event.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock size={12} className="mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {event.location}
                    </p>
                  </div>
                  <Badge
                    variant={
                      event.type === 'meeting' ? 'outline' :
                      event.type === 'rally' ? 'destructive' : 'default'
                    }
                    className="ml-2"
                  >
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Events</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Progress</CardTitle>
            <CardDescription>Tracking key metrics and goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Voter Outreach</p>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Target: 60,000 voters</p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Fundraising Goal</p>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <Progress value={62} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Target: 250M UGX</p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Campaign Events</p>
                  <span className="text-sm font-medium">48%</span>
                </div>
                <Progress value={48} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Target: 150 total events</p>
              </div>
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

// I need to create a Badge component for the event types
const Badge = ({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}: { 
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'destructive';
  className?: string;
}) => {
  const variantClasses = {
    default: 'bg-[#306030] text-white',
    outline: 'border border-[#306030] text-[#306030]',
    destructive: 'bg-[#D90000] text-white',
  };
  
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Dashboard;
