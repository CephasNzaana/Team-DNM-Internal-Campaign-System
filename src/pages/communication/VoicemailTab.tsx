
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play, Pause, User, Phone, Clock, RefreshCcw } from "lucide-react";

interface VoicemailMessage {
  id: string;
  callerId: string;
  callerName: string;
  receivedAt: Date;
  duration: number; // in seconds
  recordingUrl: string;
  transcription?: string;
  status: 'new' | 'reviewed' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category?: 'complaint' | 'support' | 'information' | 'media' | 'personal' | 'other';
  notes?: string;
}

const VoicemailTab: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<VoicemailMessage | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState('all');
  const [notes, setNotes] = useState('');
  
  // Sample voicemail data
  const voicemails: VoicemailMessage[] = [
    {
      id: '1',
      callerId: '+256772123456',
      callerName: 'John Kamugisha',
      receivedAt: new Date('2025-05-08T09:15:00'),
      duration: 45, // 45 seconds
      recordingUrl: '/demo-recording-1.mp3',
      transcription: 'Hello Hon. Nabaasa, this is John Kamugisha from Central Parish. I wanted to discuss the recent water supply issues in our area. We've been experiencing shortages for the past week, and I believe this is an important issue to address in your campaign. Please call me back at your earliest convenience. Thank you.',
      status: 'new',
      priority: 'high',
      category: 'complaint'
    },
    {
      id: '2',
      callerId: '+256782654321',
      callerName: 'Mary Kebirungi',
      receivedAt: new Date('2025-05-07T14:30:00'),
      duration: 30, // 30 seconds
      recordingUrl: '/demo-recording-2.mp3',
      transcription: 'Good afternoon. This is Mary Kebirungi from the Women\'s Association. We would like to invite you to speak at our upcoming meeting on May 20th. Please let me know if you're available. You can reach me at this number. Thank you.',
      status: 'reviewed',
      priority: 'medium',
      category: 'information'
    },
    {
      id: '3',
      callerId: '+256700987654',
      callerName: 'David Muhumuza',
      receivedAt: new Date('2025-05-07T11:45:00'),
      duration: 60, // 60 seconds
      recordingUrl: '/demo-recording-3.mp3',
      transcription: 'Hello, this is David from Kabale FM. I'm calling to confirm your interview scheduled for tomorrow at 10 AM. Please arrive 15 minutes early for preparation. If there are any changes to your schedule, please let us know as soon as possible. Looking forward to the interview. Thank you.',
      status: 'in_progress',
      priority: 'high',
      category: 'media'
    },
    {
      id: '4',
      callerId: '+256712345678',
      callerName: 'Sarah Atuhaire',
      receivedAt: new Date('2025-05-06T16:20:00'),
      duration: 25, // 25 seconds
      recordingUrl: '/demo-recording-4.mp3',
      transcription: 'Hi Hon. Nabaasa, this is Sarah calling. I just wanted to express my support for your campaign. Your focus on education reform resonates with me as a teacher. I would like to volunteer for your campaign if possible. Please call me back when you have time. Thank you and best of luck!',
      status: 'new',
      priority: 'medium',
      category: 'support'
    },
    {
      id: '5',
      callerId: '+256798765432',
      callerName: 'Peter Byaruhanga',
      receivedAt: new Date('2025-05-05T08:50:00'),
      duration: 40, // 40 seconds
      recordingUrl: '/demo-recording-5.mp3',
      transcription: 'Good morning, Hon. Nabaasa. This is Peter Byaruhanga, principal of Kabale Secondary School. We spoke last week about the educational initiatives in your platform. I have some additional thoughts I'd like to share with you. Please call me back at your convenience. Thank you.',
      status: 'resolved',
      priority: 'medium',
      category: 'information',
      notes: 'Called back on May 6th. Discussed educational initiatives and arranged meeting for May 12th.'
    },
  ];
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-600">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-500">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">New</Badge>;
      case 'reviewed':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Reviewed</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="border-orange-500 text-orange-500">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="border-green-500 text-green-500">Resolved</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const filteredVoicemails = voicemails
    .filter(vm => filter === 'all' || vm.status === filter)
    .sort((a, b) => {
      // Sort by status (new first), then by priority, then by date
      if (a.status === 'new' && b.status !== 'new') return -1;
      if (a.status !== 'new' && b.status === 'new') return 1;
      
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder];
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder];
      
      if (aPriority !== bPriority) return aPriority - bPriority;
      
      return b.receivedAt.getTime() - a.receivedAt.getTime();
    });
  
  const handlePlay = () => {
    // In a real app, this would play the audio file
    setIsPlaying(!isPlaying);
  };
  
  const handleSaveNotes = () => {
    // In a real app, this would save the notes to the database
    alert('Notes saved!');
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="md:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Voicemail</CardTitle>
              <Button variant="ghost" size="sm">
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>Filter by status</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Caller</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVoicemails.map(voicemail => (
                <TableRow 
                  key={voicemail.id}
                  onClick={() => {
                    setSelectedMessage(voicemail);
                    setNotes(voicemail.notes || '');
                    setIsPlaying(false);
                  }}
                  className={`cursor-pointer ${selectedMessage?.id === voicemail.id ? 'bg-blue-50' : ''}`}
                >
                  <TableCell className="font-medium">{voicemail.callerName}</TableCell>
                  <TableCell>{getStatusBadge(voicemail.status)}</TableCell>
                  <TableCell className="text-xs text-gray-500">
                    {voicemail.receivedAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </TableCell>
                </TableRow>
              ))}
              {filteredVoicemails.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No voicemails found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="md:col-span-2">
        {selectedMessage ? (
          <Card>
            <CardHeader className="border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedMessage.callerName}</CardTitle>
                  <CardDescription>{selectedMessage.callerId}</CardDescription>
                </div>
                <div className="flex flex-col items-end">
                  {getPriorityBadge(selectedMessage.priority)}
                  <span className="text-xs text-gray-500 mt-1">
                    {selectedMessage.receivedAt.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-4 space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 mr-2"
                    onClick={handlePlay}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <div className="h-2 bg-gray-200 rounded-full flex-1 max-w-[150px]">
                    <div className="h-2 bg-blue-500 rounded-full" style={{width: isPlaying ? '60%' : '0'}}></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm">{formatDuration(selectedMessage.duration)}</span>
                </div>
              </div>
              
              {selectedMessage.category && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Category:</span>
                  <Badge variant="outline" className="capitalize">
                    {selectedMessage.category}
                  </Badge>
                </div>
              )}
              
              {selectedMessage.transcription && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Transcription</h4>
                  <div className="p-3 border rounded-md bg-gray-50">
                    <p className="text-sm">{selectedMessage.transcription}</p>
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium mb-1">Notes</h4>
                <Textarea 
                  placeholder="Add notes about this voicemail..." 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="flex items-center">
                <span className="text-sm mr-2">Status:</span>
                <Select defaultValue={selectedMessage.status}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-x-2">
                <Button variant="outline">Call Back</Button>
                <Button onClick={handleSaveNotes}>Save Notes</Button>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card className="h-full flex flex-col justify-center items-center text-center p-8">
            <div className="p-3 bg-gray-100 rounded-full mb-4">
              <Phone className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">No voicemail selected</h3>
            <p className="text-gray-500">Select a voicemail from the list to view details</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VoicemailTab;
