
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const TEAM_MEMBERS = [
  { name: 'Levis', role: 'Team Member', email: 'levis@example.com', phone: '+256 70000000' },
  { name: 'Cephas', role: 'Team Member', email: 'cephas@example.com', phone: '+256 70000000' },
  { name: 'Paul', role: 'Team Member', email: 'paul@example.com', phone: '+256 70000000' },
  { name: 'Sunday', role: 'Team Member', email: 'sunday@example.com', phone: '+256 70000000' },
  { name: 'Shammy', role: 'Team Member', email: 'shammy@example.com', phone: '+256 70000000' },
  { name: 'Nick', role: 'Team Member', email: 'nick@example.com', phone: '+256 70000000' },
  { name: 'Edwin', role: 'Team Member', email: 'edwin@example.com', phone: '+256 70000000' },
  { name: 'Joseph', role: 'Team Member', email: 'joseph@example.com', phone: '+256 70000000' },
  { name: 'Alfa', role: 'Team Member', email: 'alfa@example.com', phone: '+256 70000000' },
  { name: 'Mima', role: 'Team Member', email: 'mima@example.com', phone: '+256 70000000' },
  { name: 'Vallence', role: 'Team Member', email: 'vallence@example.com', phone: '+256 70000000' },
  { name: 'Precious', role: 'Team Member', email: 'precious@example.com', phone: '+256 70000000' },
  { name: 'Cliton', role: 'Team Member', email: 'cliton@example.com', phone: '+256 70000000' },
  { name: 'Seth', role: 'Team Member', email: 'seth@example.com', phone: '+256 70000000' },
  { name: 'Lambert', role: 'Team Member', email: 'lambert@example.com', phone: '+256 70000000' }
];

const TeamPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter team members based on search query
  const filteredTeamMembers = TEAM_MEMBERS.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Team</h1>
          <p className="text-muted-foreground">
            Manage campaign staff and volunteers for the Kabale Municipality campaign.
          </p>
        </div>
        <Link to="/team/add">
          <Button className="bg-[#306030] hover:bg-[#306030]/90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Team Member
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>View and manage your campaign team</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeamMembers.map((member, index) => (
              <Card key={index} className="border-l-4 border-l-[#306030]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center text-sm mb-1">
                    <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span>{member.phone}</span>
                  </div>
                </CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamPage;
