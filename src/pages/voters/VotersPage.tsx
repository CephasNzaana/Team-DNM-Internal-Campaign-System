
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
import { Search, Plus, Filter } from "lucide-react";

interface Voter {
  id: string;
  fullName: string;
  gender: 'male' | 'female' | 'other';
  ageGroup: 'youth' | 'middleAge' | 'senior';
  location: {
    parish: string;
    ward: string;
    cell?: string;
  };
  supportLevel: 1 | 2 | 3 | 4 | 5; // 1:Opposed, 3:Undecided, 5:Strong Supporter
  lastContact: string;
}

const VotersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample voter data
  const voters: Voter[] = [
    {
      id: '1',
      fullName: 'John Byamugisha',
      gender: 'male',
      ageGroup: 'youth',
      location: {
        parish: 'Central',
        ward: 'Kabale Ward',
        cell: 'Upper Cell'
      },
      supportLevel: 5,
      lastContact: '2025-04-28'
    },
    {
      id: '2',
      fullName: 'Mary Kyarisiima',
      gender: 'female',
      ageGroup: 'middleAge',
      location: {
        parish: 'Northern',
        ward: 'Makanga Ward',
      },
      supportLevel: 4,
      lastContact: '2025-04-25'
    },
    {
      id: '3',
      fullName: 'Francis Mukasa',
      gender: 'male',
      ageGroup: 'senior',
      location: {
        parish: 'Southern',
        ward: 'Kigongi Ward',
        cell: 'Lower Cell'
      },
      supportLevel: 3,
      lastContact: '2025-04-20'
    },
    {
      id: '4',
      fullName: 'Grace Namara',
      gender: 'female',
      ageGroup: 'youth',
      location: {
        parish: 'Western',
        ward: 'Mwanjari Ward',
      },
      supportLevel: 2,
      lastContact: '2025-04-15'
    },
    {
      id: '5',
      fullName: 'Joseph Tumusiime',
      gender: 'male',
      ageGroup: 'middleAge',
      location: {
        parish: 'Central',
        ward: 'Kabale Ward',
      },
      supportLevel: 1,
      lastContact: '2025-04-10'
    },
  ];

  const getSupportLevelBadge = (level: number) => {
    switch (level) {
      case 5:
        return <Badge className="bg-green-600">Strong Support</Badge>;
      case 4:
        return <Badge className="bg-green-400">Leaning Support</Badge>;
      case 3:
        return <Badge className="bg-yellow-500">Undecided</Badge>;
      case 2:
        return <Badge className="bg-red-400">Leaning Against</Badge>;
      case 1:
        return <Badge className="bg-red-600">Opposed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const filteredVoters = voters.filter(voter => 
    voter.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voter.location.parish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voter.location.ward.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Voter Database</h1>
          <p className="text-muted-foreground">Manage and view voter information</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Voter
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search voters..."
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
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age Group</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Support Level</TableHead>
              <TableHead>Last Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVoters.length > 0 ? (
              filteredVoters.map((voter) => (
                <TableRow key={voter.id}>
                  <TableCell className="font-medium">{voter.fullName}</TableCell>
                  <TableCell>
                    {voter.ageGroup === 'youth' ? 'Youth' : 
                     voter.ageGroup === 'middleAge' ? 'Middle Age' : 'Senior'}
                  </TableCell>
                  <TableCell>{voter.gender.charAt(0).toUpperCase() + voter.gender.slice(1)}</TableCell>
                  <TableCell>
                    {voter.location.ward}, {voter.location.parish}
                    {voter.location.cell && `, ${voter.location.cell}`}
                  </TableCell>
                  <TableCell>{getSupportLevelBadge(voter.supportLevel)}</TableCell>
                  <TableCell>{new Date(voter.lastContact).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No voters found matching your search
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VotersPage;
