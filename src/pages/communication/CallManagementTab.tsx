
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Phone, 
  Clock, 
  User, 
  PhoneForwarded, 
  PhoneOff, 
  VoicemailIcon,
  Plus,
  Edit
} from "lucide-react";

interface CallForwardingRule {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  callerType: 'all' | 'known_voter' | 'team_member' | 'vip' | 'specific_numbers';
  action: 'forward' | 'voicemail' | 'custom_message';
  forwardToNumber?: string;
  customMessageId?: string;
  priority: number;
}

interface CallRecording {
  id: string;
  name: string;
  description: string;
  purpose: 'greeting' | 'away_message' | 'specific_response' | 'campaign_message';
  duration: number;
  isActive: boolean;
}

const CallManagementTab: React.FC = () => {
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  
  // Sample call forwarding rules
  const forwardingRules: CallForwardingRule[] = [
    {
      id: '1',
      name: 'After Hours',
      description: 'Send all calls to voicemail outside of working hours',
      active: true,
      callerType: 'all',
      action: 'voicemail',
      priority: 1
    },
    {
      id: '2',
      name: 'VIP Callers',
      description: 'Forward important calls directly to mobile',
      active: true,
      callerType: 'vip',
      action: 'forward',
      forwardToNumber: '+256772000000',
      priority: 2
    },
    {
      id: '3',
      name: 'Team Members',
      description: 'Direct team calls to office number',
      active: false,
      callerType: 'team_member',
      action: 'forward',
      forwardToNumber: '+256772111111',
      priority: 3
    },
    {
      id: '4',
      name: 'Unknown Numbers',
      description: 'Play screening message for unknown callers',
      active: true,
      callerType: 'all',
      action: 'custom_message',
      customMessageId: 'msg1',
      priority: 4
    }
  ];
  
  // Sample voice recordings
  const voiceRecordings: CallRecording[] = [
    {
      id: 'msg1',
      name: 'General Greeting',
      description: 'Standard greeting for all callers',
      purpose: 'greeting',
      duration: 20,
      isActive: true
    },
    {
      id: 'msg2',
      name: 'After Hours Message',
      description: 'Message for calls outside working hours',
      purpose: 'away_message',
      duration: 25,
      isActive: true
    },
    {
      id: 'msg3',
      name: 'Campaign Update',
      description: 'Latest campaign information for callers',
      purpose: 'campaign_message',
      duration: 45,
      isActive: false
    },
    {
      id: 'msg4',
      name: 'VIP Screening',
      description: 'Special greeting for important callers',
      purpose: 'specific_response',
      duration: 15,
      isActive: true
    }
  ];
  
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'forward':
        return <PhoneForwarded className="h-4 w-4 text-blue-500" />;
      case 'voicemail':
        return <VoicemailIcon className="h-4 w-4 text-yellow-500" />;
      case 'custom_message':
        return <User className="h-4 w-4 text-green-500" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  return (
    <div className="space-y-6 mt-4">
      <Tabs defaultValue="rules">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="rules">Call Forwarding Rules</TabsTrigger>
          <TabsTrigger value="recordings">Voice Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rules" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Call Forwarding Rules</CardTitle>
              <Button size="sm" className="h-8">
                <Plus className="h-4 w-4 mr-1" />
                Add Rule
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Configure how incoming calls should be handled based on caller type and time of day.
              </p>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead>Rule</TableHead>
                      <TableHead>Caller Type</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead className="w-[100px]">Priority</TableHead>
                      <TableHead className="text-right">Edit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forwardingRules.map(rule => (
                      <TableRow key={rule.id}>
                        <TableCell>
                          <Switch checked={rule.active} />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{rule.name}</div>
                          {rule.description && (
                            <div className="text-xs text-gray-500">{rule.description}</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {rule.callerType.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getActionIcon(rule.action)}
                            <span className="capitalize">{rule.action}</span>
                          </div>
                          {rule.forwardToNumber && (
                            <div className="text-xs text-gray-500">{rule.forwardToNumber}</div>
                          )}
                        </TableCell>
                        <TableCell>{rule.priority}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recordings" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Voice Messages</CardTitle>
              <Button size="sm" className="h-8">
                <Plus className="h-4 w-4 mr-1" />
                Add Message
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Record custom voice messages for different scenarios.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {voiceRecordings.map(recording => (
                  <Card key={recording.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{recording.name}</CardTitle>
                          <CardDescription>{recording.purpose.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</CardDescription>
                        </div>
                        <Switch checked={recording.isActive} />
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">{recording.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatDuration(recording.duration)}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Play
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CallManagementTab;
