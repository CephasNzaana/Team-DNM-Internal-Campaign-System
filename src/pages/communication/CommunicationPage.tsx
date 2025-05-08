
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, VoicemailIcon, Phone } from 'lucide-react';
import MessagesTab from './MessagesTab';
import VoicemailTab from './VoicemailTab';
import CallManagementTab from './CallManagementTab';

const CommunicationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Communication</h1>
        <p className="text-muted-foreground">Manage messages, voicemails, and calls</p>
      </div>
      
      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="messages" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>Messages</span>
          </TabsTrigger>
          <TabsTrigger value="voicemail" className="flex items-center gap-1">
            <VoicemailIcon className="h-4 w-4" />
            <span>Voicemail</span>
          </TabsTrigger>
          <TabsTrigger value="calls" className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span>Call Management</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages">
          <MessagesTab />
        </TabsContent>
        
        <TabsContent value="voicemail">
          <VoicemailTab />
        </TabsContent>
        
        <TabsContent value="calls">
          <CallManagementTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationPage;
