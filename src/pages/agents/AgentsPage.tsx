
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AGENT_DATABASE } from '@/types/campaign';

const AgentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter agents based on search query
  const filteredAgents = AGENT_DATABASE.filter(agent => 
    agent.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.pollingStation.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Agents</h1>
          <p className="text-muted-foreground">
            Manage field agents and mobilizers for the Kabale Municipality campaign.
          </p>
        </div>
        <Link to="/agents/add">
          <Button className="bg-[#306030] hover:bg-[#306030]/90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Agent
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Agent Records</CardTitle>
          <CardDescription>View and manage all registered campaign agents</CardDescription>
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents by name, address or polling station..."
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobilizer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAgents.map((agent, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{agent.fullName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`tel:${agent.contact}`} className="flex items-center text-blue-600 hover:text-blue-800">
                        <Phone className="h-3 w-3 mr-1" />
                        {agent.contact}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {agent.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {agent.pollingStation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {agent.mobilizer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/agents/${index}`} className="text-[#306030] hover:text-[#306030]/80 mr-3">
                        View
                      </Link>
                      <Link to={`/agents/${index}/edit`} className="text-[#FFCE00] hover:text-[#FFCE00]/80">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredAgents.length === 0 && (
              <div className="text-center py-8">
                <Search className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No agents found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you are looking for.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentsPage;
