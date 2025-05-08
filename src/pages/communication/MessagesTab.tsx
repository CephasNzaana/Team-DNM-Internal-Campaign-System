
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, User, Send, RefreshCcw } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipients: string[];
  subject: string;
  content: string;
  priority: 'normal' | 'high' | 'urgent';
  sentAt: Date;
  read: boolean;
}

const MessagesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  
  // Sample messages data
  const messages: Message[] = [
    {
      id: '1',
      senderId: 'user1',
      senderName: 'James Mugisha',
      recipients: ['Dan Nabaasa'],
      subject: 'Community Meeting Follow-up',
      content: 'Dear Hon. Nabaasa,\n\nThank you for attending the community meeting yesterday. The residents were very impressed with your presentation and had positive feedback about your plans for infrastructure development.\n\nI wanted to follow up on a few questions that were raised during the Q&A session:\n\n1. Timeline for the road improvement project\n2. Funding allocation for the new community center\n3. Plans for youth employment initiatives\n\nPlease let me know when you'd be available to discuss these matters further.\n\nBest regards,\nJames Mugisha\nCommunity Coordinator',
      priority: 'normal',
      sentAt: new Date('2025-05-07T10:30:00'),
      read: true
    },
    {
      id: '2',
      senderId: 'user2',
      senderName: 'Sarah Atwine',
      recipients: ['Dan Nabaasa'],
      subject: 'Media Interview Request',
      content: 'Hon. Nabaasa,\n\nI hope this message finds you well. I am writing on behalf of Kabale FM to request an interview with you regarding your campaign platform and vision for Kabale Municipality.\n\nWe would like to schedule this interview for next week, preferably on Tuesday or Wednesday morning. The interview would be approximately 30 minutes and would be broadcast live on our morning show.\n\nPlease let me know if this would be possible and your preferred date and time.\n\nThank you for your consideration.\n\nBest regards,\nSarah Atwine\nProgram Director, Kabale FM',
      priority: 'high',
      sentAt: new Date('2025-05-06T15:45:00'),
      read: false
    },
    {
      id: '3',
      senderId: 'user3',
      senderName: 'Robert Tumusiime',
      recipients: ['Dan Nabaasa'],
      subject: 'Urgent: Rally Location Change',
      content: 'URGENT NOTICE\n\nDear Hon. Nabaasa,\n\nI must inform you that due to unexpected maintenance issues at Kabale Stadium, we need to relocate the youth rally scheduled for May 15th.\n\nWe have secured an alternative venue at the Municipal Grounds. All other details (date, time, program) remain unchanged.\n\nPlease confirm that you have received this message, as we need to start informing all attendees about the venue change immediately.\n\nRobert Tumusiime\nEvent Coordinator',
      priority: 'urgent',
      sentAt: new Date('2025-05-06T09:15:00'),
      read: false
    },
    {
      id: '4',
      senderId: 'user4',
      senderName: 'Grace Kyarikunda',
      recipients: ['Dan Nabaasa'],
      subject: 'Weekly Campaign Update',
      content: 'Hon. Nabaasa,\n\nHere is the weekly campaign update:\n\n1. Voter Engagement:\n   - 450 new voters contacted\n   - 12 small group meetings conducted\n   - Support level increased in Northern Parish\n\n2. Media Coverage:\n   - 3 newspaper articles published\n   - 2 radio interviews completed\n   - Social media engagement up by 15%\n\n3. Resource Utilization:\n   - Budget on track (82% of weekly allocation used)\n   - Volunteer hours: 245 (up from 210 last week)\n\nAdditional Notes:\n- Opposition activity has increased in Central Ward\n- Need to address water access concerns raised by Eastern Parish residents\n\nDetailed reports attached.\n\nRegards,\nGrace Kyarikunda\nCampaign Coordinator',
      priority: 'normal',
      sentAt: new Date('2025-05-05T17:00:00'),
      read: true
    },
    {
      id: '5',
      senderId: 'user5',
      senderName: 'Joseph Beinomugisha',
      recipients: ['Dan Nabaasa'],
      subject: 'Endorsement from Teachers Association',
      content: 'Dear Hon. Nabaasa,\n\nI am pleased to inform you that the Kabale Teachers Association has voted to officially endorse your candidacy for MP.\n\nThey were particularly impressed with your education platform and commitment to improving teacher welfare and school infrastructure.\n\nThey would like to arrange a formal announcement event next week if your schedule permits.\n\nThis is a significant endorsement that could positively influence many voters in the education sector.\n\nBest regards,\nJoseph Beinomugisha\nOutreach Director',
      priority: 'high',
      sentAt: new Date('2025-05-04T11:20:00'),
      read: true
    },
  ];
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-600">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">High</Badge>;
      case 'normal':
        return <Badge className="bg-blue-500">Normal</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const filteredMessages = messages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="md:col-span-1 border rounded-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Inbox</h3>
            <Button variant="ghost" size="sm">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search messages..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[600px]">
          {filteredMessages.map(message => (
            <div 
              key={message.id} 
              className={`p-3 border-b cursor-pointer ${
                selectedMessage?.id === message.id 
                  ? 'bg-blue-50' 
                  : message.read ? '' : 'bg-gray-50'
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-start gap-3">
                <Avatar className={`h-8 w-8 ${!message.read && 'ring-2 ring-blue-500'}`}>
                  <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className={`truncate font-medium ${!message.read && 'font-semibold'}`}>
                      {message.senderName}
                    </p>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {message.sentAt.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="truncate text-sm">
                    {message.subject}
                  </p>
                  <div className="flex items-center mt-1">
                    {message.priority !== 'normal' && (
                      <div className="mr-2">{getPriorityBadge(message.priority)}</div>
                    )}
                    <p className="text-xs text-gray-500 truncate">
                      {message.content.substring(0, 40)}...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredMessages.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No messages found matching your search
            </div>
          )}
        </div>
      </div>
      
      <div className="md:col-span-2">
        {selectedMessage ? (
          <Card>
            <CardHeader className="border-b">
              <div className="flex justify-between items-start">
                <CardTitle>{selectedMessage.subject}</CardTitle>
                {getPriorityBadge(selectedMessage.priority)}
              </div>
              <div className="flex items-center mt-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>{selectedMessage.senderName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedMessage.senderName}</div>
                  <div className="text-xs text-gray-500">
                    {selectedMessage.sentAt.toLocaleString()} • To: {selectedMessage.recipients.join(', ')}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-4">
              <div className="whitespace-pre-wrap">
                {selectedMessage.content}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end space-x-2">
              <Button variant="outline">Forward</Button>
              <Button>Reply</Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="h-full flex flex-col justify-center items-center text-center p-8">
            <div className="p-3 bg-gray-100 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">No message selected</h3>
            <p className="text-gray-500 mb-6">Select a message from the inbox to view its contents</p>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Compose New Message
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MessagesTab;
