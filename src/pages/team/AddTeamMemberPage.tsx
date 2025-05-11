
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AddTeamMemberPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Team member added",
      description: "The new team member has been successfully added to the campaign team.",
    });
    
    navigate('/team');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2"
          onClick={() => navigate('/team')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add Team Member</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Team Member Information</CardTitle>
            <CardDescription>Add a new member to the campaign team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Enter full name" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" placeholder="e.g. 0773164565" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter email address" required />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coordinator">Ward Coordinator</SelectItem>
                    <SelectItem value="field_agent">Field Agent</SelectItem>
                    <SelectItem value="office_staff">Office Staff</SelectItem>
                    <SelectItem value="media_team">Media Team</SelectItem>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ward">Assigned Ward/Area</Label>
                <Input id="ward" placeholder="Enter assigned ward or area" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Residential Address</Label>
              <Input id="address" placeholder="Enter residential address" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Input id="notes" placeholder="Any additional notes" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accessLevel">System Access Level</Label>
              <Select defaultValue="teamMember">
                <SelectTrigger>
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="teamMember">Team Member</SelectItem>
                  <SelectItem value="readonly">Read-Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/team')}>Cancel</Button>
            <Button type="submit" className="bg-[#306030] hover:bg-[#306030]/90">Save Team Member</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddTeamMemberPage;
