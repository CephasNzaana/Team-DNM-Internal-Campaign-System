
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import MessagesTab from './MessagesTab';
import VoicemailTab from './VoicemailTab';
import CallManagementTab from './CallManagementTab';
import { MessageSquare, Phone, VoicemailIcon, PenSquare } from 'lucide-react';
import { DNM_THEME } from '@/lib/theme';

const CommunicationPage: React.FC = () => {
  const location = useLocation();
  
  // Determine which tab should be active based on URL
  const getDefaultTab = () => {
    if (location.pathname.includes('/communication/voicemail')) return 'voicemail';
    if (location.pathname.includes('/communication/calls')) return 'calls';
    return 'messages';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communication</h1>
          <p className="text-muted-foreground">
            Manage all campaign communications, messages, and calls.
          </p>
        </div>
        <Link to="/communication/messages/compose">
          <Button className="bg-[#306030] hover:bg-[#306030]/90">
            <PenSquare className="mr-2 h-4 w-4" />
            Compose Message
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#FEF7CD]/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-[#306030]" />
              Team Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Internal campaign communications and updates</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-2xl font-bold">24</span>
              <span className="text-xs bg-[#306030] text-white px-2 py-1 rounded-full">12 unread</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#FDE1D3]/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <VoicemailIcon className="mr-2 h-5 w-5 text-[#D90000]" />
              Voicemail
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Recorded messages from constituents</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-2xl font-bold">8</span>
              <span className="text-xs bg-[#D90000] text-white px-2 py-1 rounded-full">3 new</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#D3E4FD]/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Phone className="mr-2 h-5 w-5 text-[#0EA5E9]" />
              Call Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Call forwarding and candidate scheduling</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-2xl font-bold">15</span>
              <span className="text-xs bg-[#0EA5E9] text-white px-2 py-1 rounded-full">5 scheduled</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue={getDefaultTab()} className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 gap-4">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="voicemail">Voicemail</TabsTrigger>
          <TabsTrigger value="calls">Call Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="mt-6">
          <MessagesTab />
        </TabsContent>
        
        <TabsContent value="voicemail" className="mt-6">
          <VoicemailTab />
        </TabsContent>
        
        <TabsContent value="calls" className="mt-6">
          <CallManagementTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationPage;
