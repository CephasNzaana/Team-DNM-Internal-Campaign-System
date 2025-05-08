
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter, Calendar, CheckSquare, AlertTriangle } from "lucide-react";

interface CampaignTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  createdBy: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  dueDate: Date;
  completionDate?: Date;
  category: 'voter_outreach' | 'event_planning' | 'media' | 'fundraising' | 'logistics' | 'other';
  progress?: number;
}

const TasksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample tasks data
  const tasks: CampaignTask[] = [
    {
      id: '1',
      title: 'Prepare voter outreach materials',
      description: 'Design and print flyers for door-to-door canvassing.',
      assignedTo: ['John Doe', 'Mary Smith'],
      createdBy: 'Campaign Manager',
      priority: 'high',
      status: 'in_progress',
      dueDate: new Date('2025-05-15'),
      category: 'voter_outreach',
      progress: 60
    },
    {
      id: '2',
      title: 'Book venue for town hall meeting',
      description: 'Reserve Kabale Town Hall for community meeting.',
      assignedTo: ['Jane Wilson'],
      createdBy: 'Event Coordinator',
      priority: 'medium',
      status: 'completed',
      dueDate: new Date('2025-04-30'),
      completionDate: new Date('2025-04-28'),
      category: 'event_planning',
      progress: 100
    },
    {
      id: '3',
      title: 'Coordinate media interview',
      description: 'Set up radio interview with Kabale FM.',
      assignedTo: ['Robert Johnson'],
      createdBy: 'Media Coordinator',
      priority: 'urgent',
      status: 'pending',
      dueDate: new Date('2025-05-03'),
      category: 'media',
      progress: 20
    },
    {
      id: '4',
      title: 'Fundraising dinner planning',
      description: 'Organize supporters dinner at Grand Hotel.',
      assignedTo: ['Sarah Brown', 'Michael Green'],
      createdBy: 'Finance Director',
      priority: 'medium',
      status: 'delayed',
      dueDate: new Date('2025-05-01'),
      category: 'fundraising',
      progress: 40
    },
    {
      id: '5',
      title: 'Transport logistics for rally',
      description: 'Arrange transportation for team members to youth rally.',
      assignedTo: ['David Wilson'],
      createdBy: 'Logistics Manager',
      priority: 'low',
      status: 'in_progress',
      dueDate: new Date('2025-05-14'),
      category: 'logistics',
      progress: 30
    },
  ];
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-600">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-500">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-green-500 text-green-500">Completed</Badge>;
      case 'delayed':
        return <Badge variant="outline" className="border-red-500 text-red-500">Delayed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const pendingTasks = filteredTasks.filter(task => task.status === 'pending');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in_progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');
  const delayedTasks = filteredTasks.filter(task => task.status === 'delayed');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage and track campaign tasks</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-1">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Pending</h3>
            <Badge variant="outline" className="bg-yellow-50">{pendingTasks.length}</Badge>
          </div>
          <div className="space-y-2">
            {pendingTasks.slice(0, 3).map(task => (
              <div key={task.id} className="p-3 border rounded-md text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{task.title}</span>
                  {getPriorityBadge(task.priority)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Due: {task.dueDate.toLocaleDateString()}</div>
              </div>
            ))}
            {pendingTasks.length > 3 && (
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View {pendingTasks.length - 3} more
              </Button>
            )}
            {pendingTasks.length === 0 && (
              <div className="py-6 text-center text-gray-500">
                No pending tasks
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">In Progress</h3>
            <Badge variant="outline" className="bg-blue-50">{inProgressTasks.length}</Badge>
          </div>
          <div className="space-y-2">
            {inProgressTasks.slice(0, 3).map(task => (
              <div key={task.id} className="p-3 border rounded-md text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{task.title}</span>
                  {getPriorityBadge(task.priority)}
                </div>
                <div className="mt-2">
                  <Progress value={task.progress} className="h-1" />
                </div>
                <div className="text-xs text-gray-500 mt-1">Due: {task.dueDate.toLocaleDateString()}</div>
              </div>
            ))}
            {inProgressTasks.length > 3 && (
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View {inProgressTasks.length - 3} more
              </Button>
            )}
            {inProgressTasks.length === 0 && (
              <div className="py-6 text-center text-gray-500">
                No tasks in progress
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Completed</h3>
            <Badge variant="outline" className="bg-green-50">{completedTasks.length}</Badge>
          </div>
          <div className="space-y-2">
            {completedTasks.slice(0, 3).map(task => (
              <div key={task.id} className="p-3 border rounded-md text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{task.title}</span>
                  <CheckSquare className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Completed: {task.completionDate?.toLocaleDateString()}
                </div>
              </div>
            ))}
            {completedTasks.length > 3 && (
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View {completedTasks.length - 3} more
              </Button>
            )}
            {completedTasks.length === 0 && (
              <div className="py-6 text-center text-gray-500">
                No completed tasks
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Delayed</h3>
            <Badge variant="outline" className="bg-red-50">{delayedTasks.length}</Badge>
          </div>
          <div className="space-y-2">
            {delayedTasks.slice(0, 3).map(task => (
              <div key={task.id} className="p-3 border rounded-md text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{task.title}</span>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Due: {task.dueDate.toLocaleDateString()}
                </div>
              </div>
            ))}
            {delayedTasks.length > 3 && (
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View {delayedTasks.length - 3} more
              </Button>
            )}
            {delayedTasks.length === 0 && (
              <div className="py-6 text-center text-gray-500">
                No delayed tasks
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Tasks</h2>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="my">My Tasks</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>
                          {task.category.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                        </TableCell>
                        <TableCell>{task.dueDate.toLocaleDateString()}</TableCell>
                        <TableCell>{task.assignedTo.join(', ')}</TableCell>
                        <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>
                          <div className="w-24">
                            <Progress value={task.progress} className="h-2" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No tasks found matching your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="my" className="mt-4">
            <div className="text-center py-8">
              <p className="text-gray-500">Configure your user profile to view your assigned tasks</p>
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Days Left</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks
                    .filter(task => task.status !== 'completed' && task.dueDate > new Date())
                    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
                    .map((task) => {
                      const today = new Date();
                      const daysLeft = Math.ceil((task.dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      
                      return (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.title}</TableCell>
                          <TableCell>
                            {task.category.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                          </TableCell>
                          <TableCell>{task.dueDate.toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`${
                              daysLeft <= 2 ? 'border-red-500 text-red-500' :
                              daysLeft <= 5 ? 'border-yellow-500 text-yellow-500' :
                              'border-green-500 text-green-500'
                            }`}>
                              {daysLeft} day{daysLeft !== 1 ? 's' : ''}
                            </Badge>
                          </TableCell>
                          <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                          <TableCell>{getStatusBadge(task.status)}</TableCell>
                        </TableRow>
                      );
                    })
                  }
                  {filteredTasks.filter(task => task.status !== 'completed' && task.dueDate > new Date()).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No upcoming tasks
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TasksPage;
