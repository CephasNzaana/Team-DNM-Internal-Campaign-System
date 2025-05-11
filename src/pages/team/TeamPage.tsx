
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Mail, Phone, Calendar, CheckSquare, MessageSquare, AlertTriangle, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const TEAM_MEMBERS = [
  { id: 1, name: 'Levis', role: 'Team Coordinator', email: 'levis@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'online', taskCount: 8, completedTasks: 5 },
  { id: 2, name: 'Cephas', role: 'Field Operations', email: 'cephas@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'online', taskCount: 6, completedTasks: 3 },
  { id: 3, name: 'Paul', role: 'Voter Relations', email: 'paul@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'away', taskCount: 5, completedTasks: 4 },
  { id: 4, name: 'Sunday', role: 'Media Liaison', email: 'sunday@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'offline', taskCount: 7, completedTasks: 7 },
  { id: 5, name: 'Shammy', role: 'Event Planner', email: 'shammy@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'online', taskCount: 9, completedTasks: 6 },
  { id: 6, name: 'Nick', role: 'Community Outreach', email: 'nick@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'offline', taskCount: 4, completedTasks: 2 },
  { id: 7, name: 'Edwin', role: 'Logistics Coordinator', email: 'edwin@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'online', taskCount: 7, completedTasks: 4 },
  { id: 8, name: 'Joseph', role: 'Financial Officer', email: 'joseph@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'away', taskCount: 5, completedTasks: 3 },
  { id: 9, name: 'Alfa', role: 'Security Coordinator', email: 'alfa@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'online', taskCount: 6, completedTasks: 5 },
  { id: 10, name: 'Mima', role: 'Data Analyst', email: 'mima@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'online', taskCount: 8, completedTasks: 7 },
  { id: 11, name: 'Vallence', role: 'Youth Coordinator', email: 'vallence@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'offline', taskCount: 6, completedTasks: 3 },
  { id: 12, name: 'Precious', role: 'Women Affairs', email: 'precious@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'away', taskCount: 5, completedTasks: 3 },
  { id: 13, name: 'Cliton', role: 'IT Support', email: 'cliton@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'online', taskCount: 7, completedTasks: 6 },
  { id: 14, name: 'Seth', role: 'Training Coordinator', email: 'seth@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'offline', taskCount: 4, completedTasks: 2 },
  { id: 15, name: 'Lambert', role: 'Special Projects', email: 'lambert@example.com', phone: '+256 70000000', avatar: '/placeholder.svg', status: 'online', taskCount: 6, completedTasks: 4 }
];

// Mock tasks data
const TEAM_TASKS = [
  { id: 1, title: 'Organize community meeting', assignedTo: 'Levis', dueDate: '2025-05-15', priority: 'high', status: 'in_progress' },
  { id: 2, title: 'Update voter database', assignedTo: 'Mima', dueDate: '2025-05-13', priority: 'medium', status: 'completed' },
  { id: 3, title: 'Coordinate transport for rally', assignedTo: 'Edwin', dueDate: '2025-05-20', priority: 'high', status: 'pending' },
  { id: 4, title: 'Prepare campaign materials', assignedTo: 'Paul', dueDate: '2025-05-18', priority: 'medium', status: 'in_progress' },
  { id: 5, title: 'Media interview preparations', assignedTo: 'Sunday', dueDate: '2025-05-14', priority: 'urgent', status: 'completed' },
  { id: 6, title: 'Youth engagement strategy', assignedTo: 'Vallence', dueDate: '2025-05-25', priority: 'medium', status: 'pending' },
  { id: 7, title: 'Financial report preparation', assignedTo: 'Joseph', dueDate: '2025-05-10', priority: 'high', status: 'delayed' },
  { id: 8, title: 'Team training session', assignedTo: 'Seth', dueDate: '2025-05-22', priority: 'medium', status: 'in_progress' }
];

// Mock team announcements
const TEAM_ANNOUNCEMENTS = [
  { id: 1, title: 'Team Meeting Tomorrow', content: 'All team members are required to attend the strategy meeting tomorrow at 9:00 AM.', date: '2025-05-12', author: 'Hon. Dan Nabaasa' },
  { id: 2, title: 'New Campaign Materials', content: 'New campaign materials are available for collection at the headquarters.', date: '2025-05-10', author: 'Levis' },
  { id: 3, title: 'Updated Campaign Schedule', content: 'Please check the updated campaign schedule for the next two weeks.', date: '2025-05-08', author: 'Cephas' }
];

const TeamPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('members');
  
  // Filter team members based on search query
  const filteredTeamMembers = TEAM_MEMBERS.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'urgent': return <Badge variant="destructive">Urgent</Badge>;
      case 'high': return <Badge className="bg-orange-500">High</Badge>;
      case 'medium': return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'low': return <Badge className="bg-blue-500">Low</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>;
      case 'in_progress': return <Badge variant="outline" className="border-blue-500 text-blue-500">In Progress</Badge>;
      case 'completed': return <Badge variant="outline" className="border-green-500 text-green-500">Completed</Badge>;
      case 'delayed': return <Badge variant="outline" className="border-red-500 text-red-500">Delayed</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Team</h1>
          <p className="text-muted-foreground">
            Manage campaign staff and volunteers for the Kabale Municipality campaign.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/team/add">
            <Button className="bg-[#306030] hover:bg-[#306030]/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search team members..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="members" className="w-full" onValueChange={setCurrentTab}>
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="members">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Team Members</span>
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <CheckSquare className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="chat">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Communications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="members">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeamMembers.map((member) => (
              <Card key={member.id} className="border-l-4 border-l-[#306030] hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          {member.name}
                          <span className={`ml-2 h-2 w-2 rounded-full ${getStatusColor(member.status)}`}></span>
                        </CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                    <Link to={`/team/${member.id}`}>
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center text-sm mb-1">
                    <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span>{member.phone}</span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Tasks Completion</span>
                      <span>{member.completedTasks}/{member.taskCount}</span>
                    </div>
                    <Progress 
                      value={(member.completedTasks / member.taskCount) * 100} 
                      className="h-2" 
                    />
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <Button variant="outline" size="sm" className="w-full">
                    <MessageSquare className="h-3.5 w-3.5 mr-2" />
                    Message
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {filteredTeamMembers.length === 0 && (
              <div className="col-span-3 text-center py-8">
                <Search className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No team members found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search to find what you are looking for.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Team Tasks</CardTitle>
                <Link to="/tasks/add">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Task
                  </Button>
                </Link>
              </div>
              <CardDescription>Current tasks assigned to team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {TEAM_TASKS.map((task) => (
                      <tr key={task.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{task.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {task.assignedTo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {task.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getPriorityBadge(task.priority)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(task.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/tasks" className="w-full">
                <Button variant="outline" className="w-full">View All Tasks</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Team Schedule</CardTitle>
              <CardDescription>Upcoming events and meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* This would ideally be a calendar component */}
                <div className="h-80 flex items-center justify-center border rounded-md bg-gray-50">
                  <p className="text-gray-500">Team schedule calendar coming soon</p>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Upcoming Events</h3>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 border rounded-md">
                      <Calendar className="h-5 w-5 mr-4 text-[#306030]" />
                      <div className="flex-1">
                        <p className="font-medium">Strategy Meeting</p>
                        <p className="text-xs text-gray-500">Tomorrow, 9:00 AM • Campaign Headquarters</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-md">
                      <Calendar className="h-5 w-5 mr-4 text-[#306030]" />
                      <div className="flex-1">
                        <p className="font-medium">Community Outreach</p>
                        <p className="text-xs text-gray-500">May 15, 2025, 2:00 PM • Central Ward</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-md">
                      <Calendar className="h-5 w-5 mr-4 text-[#306030]" />
                      <div className="flex-1">
                        <p className="font-medium">Youth Rally</p>
                        <p className="text-xs text-gray-500">May 22, 2025, 4:00 PM • Kabale Stadium</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/events" className="w-full">
                <Button variant="outline" className="w-full">View All Events</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="chat">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Team Announcements</CardTitle>
                <CardDescription>Important updates for all team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {TEAM_ANNOUNCEMENTS.map((announcement) => (
                    <div key={announcement.id} className="border rounded-md p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{announcement.title}</h3>
                        <span className="text-xs text-gray-500">{announcement.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                      <p className="text-xs text-gray-500">Posted by {announcement.author}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#306030] hover:bg-[#306030]/90">Create Announcement</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Messages</CardTitle>
                <CardDescription>Send messages to team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {TEAM_MEMBERS.slice(0, 5).map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                      <span className={`h-2 w-2 rounded-full ${getStatusColor(member.status)}`}></span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/communication/messages/compose" className="w-full">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Compose Message
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamPage;
