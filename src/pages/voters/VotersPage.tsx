
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, UserPlus, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AGENT_DATABASE } from '@/types/campaign';

const VotersPage: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Determine which tab should be active based on URL
  const getDefaultTab = () => {
    if (location.pathname.includes('/voters/segments')) return 'segments';
    if (location.pathname.includes('/voters/interactions')) return 'interactions';
    return 'all';
  };

  // Filter voters based on search query
  const filteredVoters = AGENT_DATABASE.filter(voter => 
    voter.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    voter.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    voter.pollingStation.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Voter Database</h1>
          <p className="text-muted-foreground">
            Manage voter information and interactions for the Kabale Municipality campaign.
          </p>
        </div>
        <Link to="/voters/add">
          <Button className="bg-[#306030] hover:bg-[#306030]/90">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Voter
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue={getDefaultTab()} className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 gap-4">
          <TabsTrigger value="all">All Voters</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Voter Records</CardTitle>
              <CardDescription>View and manage all registered voters</CardDescription>
              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search voters by name, address or polling station..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Polling Station</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredVoters.map(voter => (
                      <tr key={voter.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{voter.fullName}</div>
                          <div className="text-sm text-gray-500">Mobilizer: {voter.mobilizer}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`tel:${voter.contact}`} className="flex items-center text-blue-600 hover:text-blue-800">
                            <Phone className="h-3 w-3 mr-1" />
                            {voter.contact}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {voter.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {voter.pollingStation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/voters/${voter.id}`} className="text-[#306030] hover:text-[#306030]/80 mr-3">
                            View
                          </Link>
                          <Link to={`/voters/${voter.id}/edit`} className="text-[#FFCE00] hover:text-[#FFCE00]/80">
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredVoters.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No voters found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you are looking for.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="segments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Voter Segments</CardTitle>
              <CardDescription>Group voters by demographics, support level, and other attributes</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <SegmentCard 
                title="By Location" 
                count={7} 
                description="Segments based on wards and cells"
                color="#306030"
              />
              <SegmentCard 
                title="By Support Level" 
                count={5} 
                description="Categorized by campaign support"
                color="#FFCE00"
              />
              <SegmentCard 
                title="By Demographics" 
                count={4} 
                description="Age groups and occupations"
                color="#D90000"
              />
              <SegmentCard 
                title="Special Groups" 
                count={3} 
                description="Youth, women, and special interests"
                color="#4A5D23"
              />
              <SegmentCard 
                title="Volunteers" 
                count={1} 
                description="Campaign volunteers and supporters"
                color="#0EA5E9"
              />
              <Link to="/voters/segments/new" className="block">
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-full text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="rounded-full bg-gray-100 p-3 mb-3">
                    <Plus className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="font-medium">Create New Segment</h3>
                  <p className="text-sm text-gray-500 mt-1">Define custom voter segments</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interactions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Voter Interactions</CardTitle>
              <CardDescription>Track and manage all voter contacts and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-6">
                <div className="text-center py-8">
                  <Phone className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No recent interactions</h3>
                  <p className="mt-1 text-sm text-gray-500">Record voter interactions to start building this section.</p>
                  <div className="mt-6">
                    <Link to="/voters/interactions/new">
                      <Button variant="outline" className="text-sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Record Interaction
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface SegmentCardProps {
  title: string;
  count: number;
  description: string;
  color: string;
}

const SegmentCard: React.FC<SegmentCardProps> = ({ title, count, description, color }) => {
  return (
    <Link to={`/voters/segments/${title.toLowerCase().replace(/\s+/g, '-')}`} className="block">
      <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <div className="h-2" style={{ backgroundColor: color }}></div>
        <div className="p-6">
          <h3 className="font-medium text-lg">{title}</h3>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-gray-500">{description}</p>
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{count}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VotersPage;
