
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AGENT_DATABASE, CAMPAIGN_TEAM } from '@/types/campaign';
import { Search, User, MapPin, Phone, Flag } from 'lucide-react';
import { DNM_THEME } from '@/lib/theme';

const TeamPage: React.FC = () => {
  const [agentSearchTerm, setAgentSearchTerm] = useState('');
  const [teamSearchTerm, setTeamSearchTerm] = useState('');
  
  const filteredAgents = AGENT_DATABASE.filter(agent => 
    agent.fullName.toLowerCase().includes(agentSearchTerm.toLowerCase()) ||
    agent.pollingStation.toLowerCase().includes(agentSearchTerm.toLowerCase()) ||
    agent.address.toLowerCase().includes(agentSearchTerm.toLowerCase())
  );
  
  const filteredTeam = CAMPAIGN_TEAM.filter(member => 
    member.name.toLowerCase().includes(teamSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#306030] to-[#4A5D23] rounded-lg p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Team DNM</h1>
        <p className="text-white/80 mb-2">
          Manage and view campaign team members and agents across Kabale Municipality.
        </p>
        <div className="flex items-center space-x-2 mt-4">
          <div className="h-5 flex flex-shrink-0 overflow-hidden rounded">
            <div className="h-full w-5 bg-black"></div>
            <div className="h-full w-5 bg-[#FFCE00]"></div>
            <div className="h-full w-5 bg-[#D90000]"></div>
          </div>
          <p className="text-sm font-medium">Uganda • Kabale Municipality</p>
        </div>
      </div>
      
      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="agents">Agents ({AGENT_DATABASE.length})</TabsTrigger>
          <TabsTrigger value="team">Campaign Team ({CAMPAIGN_TEAM.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agents" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search agents by name, polling station or location..."
              value={agentSearchTerm}
              onChange={(e) => setAgentSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="border-l-4" style={{ borderLeftColor: DNM_THEME.colors.green }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <User size={16} className="mr-2" />
                    {agent.fullName}
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <Phone size={14} className="mr-1" />
                    {agent.contact}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-1 text-sm pt-0">
                  <p className="flex items-center">
                    <MapPin size={14} className="mr-1 text-gray-500 shrink-0" />
                    <span className="text-gray-700">{agent.address}</span>
                  </p>
                  <p className="flex items-center">
                    <Flag size={14} className="mr-1 text-gray-500 shrink-0" />
                    <span className="text-gray-700">{agent.pollingStation}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Mobilized by: <span className="font-medium">{agent.mobilizer}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredAgents.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No agents found matching your search.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="team" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search team members by name..."
              value={teamSearchTerm}
              onChange={(e) => setTeamSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTeam.map((member) => (
              <Card key={member.id} className="border-l-4" style={{ borderLeftColor: DNM_THEME.colors.yellow }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <User size={16} className="mr-2" />
                    {member.name}
                  </CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          {filteredTeam.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No team members found matching your search.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamPage;
