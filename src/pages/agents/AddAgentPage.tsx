
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AddAgentPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save the agent data to your database
    toast({
      title: "Agent added",
      description: "The new agent has been successfully added to the system.",
    });
    
    // Navigate back to agents page
    navigate('/agents');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2"
          onClick={() => navigate('/agents')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Agent</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Agent Information</CardTitle>
            <CardDescription>Enter the details for the new campaign agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter residential address" required />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pollingStation">Polling Station</Label>
                <Input id="pollingStation" placeholder="Enter polling station" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobilizer">Mobilizer</Label>
                <Input id="mobilizer" placeholder="Enter mobilizer name" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/agents')}>Cancel</Button>
            <Button type="submit" className="bg-[#306030] hover:bg-[#306030]/90">Save Agent</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddAgentPage;
