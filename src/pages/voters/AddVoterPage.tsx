
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

const supportLevels = [
  { value: '1', label: 'Opposed', description: 'Actively against our candidate', color: 'bg-red-500' },
  { value: '2', label: 'Leaning Against', description: 'Somewhat opposed to our candidate', color: 'bg-orange-400' },
  { value: '3', label: 'Undecided', description: 'Neutral or undecided', color: 'bg-yellow-400' },
  { value: '4', label: 'Leaning Support', description: 'Somewhat supportive of our candidate', color: 'bg-green-400' },
  { value: '5', label: 'Strong Support', description: 'Strongly supports our candidate', color: 'bg-green-600' }
];

const AddVoterPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [supportLevel, setSupportLevel] = useState('3');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save the voter data to your database
    toast({
      title: "Voter added",
      description: "The new voter has been successfully added to the system.",
    });
    
    // Navigate back to voters page
    navigate('/voters');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2"
          onClick={() => navigate('/voters')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Voter</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Voter Information</CardTitle>
            <CardDescription>Enter the details for the new voter</CardDescription>
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
            
            <div className="space-y-3">
              <Label>Support Level</Label>
              
              <div className="flex flex-col space-y-4">
                <RadioGroup 
                  value={supportLevel} 
                  onValueChange={setSupportLevel}
                  className="flex flex-col space-y-3"
                >
                  {supportLevels.map((level) => (
                    <div key={level.value} className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-50">
                      <RadioGroupItem value={level.value} id={`level-${level.value}`} />
                      <div className="flex-1">
                        <Label 
                          htmlFor={`level-${level.value}`}
                          className="flex flex-col cursor-pointer"
                        >
                          <span className="font-medium">{level.label}</span>
                          <span className="text-xs text-gray-500">{level.description}</span>
                        </Label>
                      </div>
                      <Progress value={parseInt(level.value) * 20} className={`h-2 w-20 ${level.color}`} />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="keyIssues">Key Issues</Label>
              <Input id="keyIssues" placeholder="E.g. Education, Infrastructure, Healthcare" />
              <p className="text-xs text-gray-500">Separate issues with commas</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea 
                id="notes" 
                className="w-full min-h-24 p-2 border rounded-md" 
                placeholder="Additional notes about this voter"
              ></textarea>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/voters')}>Cancel</Button>
            <Button type="submit" className="bg-[#306030] hover:bg-[#306030]/90">Save Voter</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddVoterPage;
