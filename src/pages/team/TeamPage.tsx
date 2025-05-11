
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, Users, UserCheck } from 'lucide-react';
import { CAMPAIGN_TEAM, AGENT_DATABASE } from '@/types/campaign';
import { DNM_THEME } from '@/lib/theme';

const TeamPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter team members based on search
  const filteredTeamMembers = CAMPAIGN_TEAM.filter(
    member => member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter agents for each team member
  const getAgentsByMobilizer = (mobilizer: string) => {
    return AGENT_DATABASE.filter(
      agent => agent.mobilizer.toLowerCase() === mobilizer.toLowerCase()
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Team</h1>
          <p className="text-muted-foreground">
            Manage team members and their assigned agents for the Kabale Municipality campaign.
          </p>
        </div>
        <Button className="bg-[#306030] hover:bg-[#306030]/90">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>All active campaign team members and their assigned agents</CardDescription>
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeamMembers.map((member) => {
              const memberAgents = getAgentsByMobilizer(member.name);
              return (
                <Card key={member.id} className="overflow-hidden">
                  <div className="h-2" style={{ backgroundColor: DNM_THEME.colors.green }}></div>
                  <CardHeader className="pb-2">
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center">
                      <div className="bg-[#306030]/10 p-2 rounded-full mr-3">
                        <UserCheck className="h-5 w-5 text-[#306030]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Assigned Agents</p>
                        <p className="text-xs text-gray-500">{memberAgents.length} agents</p>
                      </div>
                    </div>
                    
                    {memberAgents.length > 0 ? (
                      <div className="rounded-md border overflow-hidden">
                        <div className="max-h-40 overflow-y-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {memberAgents.map((agent) => (
                                <tr key={agent.id}>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm">{agent.fullName}</td>
                                  <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">{agent.address}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-3 border rounded-md bg-gray-50">
                        <p className="text-sm text-gray-500">No agents assigned</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between pt-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[#306030]"
                      >
                        <UserPlus className="h-4 w-4 mr-1" /> Assign Agent
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {filteredTeamMembers.length === 0 && (
              <div className="col-span-full text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No team members found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or add new team members.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Team Statistics</CardTitle>
          <CardDescription>Performance metrics for the campaign team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Team Members"
              value={CAMPAIGN_TEAM.length}
              description="Active campaign team"
              color={DNM_THEME.colors.green}
            />
            <StatsCard
              title="Agents"
              value={AGENT_DATABASE.length}
              description="Deployed across the municipality"
              color={DNM_THEME.colors.yellow}
            />
            <StatsCard
              title="Voter Outreach"
              value="62%"
              description="Coverage of Kabale Municipality"
              color={DNM_THEME.colors.red}
            />
            <StatsCard
              title="Polling Stations"
              value="24"
              description="With assigned team members"
              color={DNM_THEME.colors.oliveGreen}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, color }) => {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }}></div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <div className="text-3xl font-bold" style={{ color }}>{value}</div>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
};

export default TeamPage;
