
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const AddTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dueDate, setDueDate] = React.useState<Date | undefined>(new Date());
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Task created",
      description: "The new task has been successfully added to the system.",
    });
    
    navigate('/tasks');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2"
          onClick={() => navigate('/tasks')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create New Task</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
            <CardDescription>Assign a new campaign task</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input id="title" placeholder="Enter task title" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Provide details about the task"
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="levis">Levis</SelectItem>
                    <SelectItem value="cephas">Cephas</SelectItem>
                    <SelectItem value="paul">Paul</SelectItem>
                    <SelectItem value="sunday">Sunday</SelectItem>
                    <SelectItem value="shammy">Shammy</SelectItem>
                    <SelectItem value="nick">Nick</SelectItem>
                    <SelectItem value="edwin">Edwin</SelectItem>
                    <SelectItem value="joseph">Joseph</SelectItem>
                    <SelectItem value="alfa">Alfa</SelectItem>
                    <SelectItem value="mima">Mima</SelectItem>
                    <SelectItem value="vallence">Vallence</SelectItem>
                    <SelectItem value="precious">Precious</SelectItem>
                    <SelectItem value="cliton">Cliton</SelectItem>
                    <SelectItem value="seth">Seth</SelectItem>
                    <SelectItem value="lambert">Lambert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="voter_outreach">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="voter_outreach">Voter Outreach</SelectItem>
                    <SelectItem value="event_planning">Event Planning</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="fundraising">Fundraising</SelectItem>
                    <SelectItem value="logistics">Logistics</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="relatedEvent">Related Event (Optional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select related event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Community Meeting - May 15</SelectItem>
                  <SelectItem value="2">Door-to-door Campaign - May 18</SelectItem>
                  <SelectItem value="3">Youth Rally - May 22</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/tasks')}>Cancel</Button>
            <Button type="submit" className="bg-[#306030] hover:bg-[#306030]/90">Create Task</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddTaskPage;
