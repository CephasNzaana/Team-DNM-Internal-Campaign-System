
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Lock, Bell, Sliders, Shield } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure your account and system preferences</p>
      </div>
      
      <Tabs defaultValue="account">
        <div className="flex">
          <TabsList className="flex flex-col w-[200px] h-auto p-0 bg-transparent">
            <TabsTrigger value="account" className="justify-start py-2 px-4 text-left">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security" className="justify-start py-2 px-4 text-left">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="justify-start py-2 px-4 text-left">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="justify-start py-2 px-4 text-left">
              <Sliders className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="permissions" className="justify-start py-2 px-4 text-left">
              <Shield className="h-4 w-4 mr-2" />
              Permissions
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1 ml-6 space-y-6">
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback>DN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">Profile Picture</h3>
                      <p className="text-sm text-gray-500 mt-1">Upload a new profile picture</p>
                    </div>
                    <Button variant="outline">Change</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue="Dan Musinguzi Nabaasa" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input id="displayName" defaultValue="Hon. DNM" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="dan@nabaasa2026.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+256772000000" />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="role">Role</Label>
                      <div className="flex items-center h-10 px-3 py-2 text-sm rounded-md border">
                        <span>honDNM</span>
                        <Badge className="ml-2 bg-yellow-500">Candidate</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3">Two-Factor Authentication</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">Enable 2FA</p>
                        <p className="text-sm text-gray-500 mt-1">Add an extra layer of security</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3">Session Management</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">You are currently logged in on 2 devices</p>
                      <Button variant="outline" className="text-red-600">
                        Log out of all other sessions
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Security Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">Campaign Updates</p>
                          <p className="text-sm text-gray-500">Daily digest of campaign activities</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">Task Assignments</p>
                          <p className="text-sm text-gray-500">When you are assigned a new task</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">Event Reminders</p>
                          <p className="text-sm text-gray-500">Reminders for upcoming events</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">Team Messages</p>
                          <p className="text-sm text-gray-500">When you receive a new message</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-4">System Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">Browser Notifications</p>
                          <p className="text-sm text-gray-500">Allow desktop notifications</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">SMS Alerts</p>
                          <p className="text-sm text-gray-500">Receive important alerts via SMS</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Appearance</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">Dark Mode</p>
                          <p className="text-sm text-gray-500">Use dark theme for the interface</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">High Contrast</p>
                          <p className="text-sm text-gray-500">Increase contrast for accessibility</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-4">Display Options</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">Compact View</p>
                          <p className="text-sm text-gray-500">Show more content with less spacing</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">Auto-refresh Data</p>
                          <p className="text-sm text-gray-500">Automatically update dashboards</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-4">Language & Region</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <select 
                          id="language"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          defaultValue="en"
                        >
                          <option value="en">English</option>
                          <option value="lg">Luganda</option>
                          <option value="sw">Swahili</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Time Zone</Label>
                        <select 
                          id="timezone"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          defaultValue="Africa/Kampala"
                        >
                          <option value="Africa/Kampala">Africa/Kampala (UTC+3)</option>
                          <option value="Africa/Nairobi">Africa/Nairobi (UTC+3)</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="permissions">
              <Card>
                <CardHeader>
                  <CardTitle>Role and Permissions</CardTitle>
                  <CardDescription>View your access rights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Your Access Level</h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge className="bg-yellow-500">honDNM</Badge>
                      <Badge className="bg-blue-500">Candidate</Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      As a candidate, you have access to view all campaign data and manage personal tasks and communications.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-4">Your Permissions</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        View all campaign data
                      </li>
                      <li className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Message all team members
                      </li>
                      <li className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Approve campaign strategy
                      </li>
                      <li className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Access voter database
                      </li>
                      <li className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Manage personal calls and voicemail
                      </li>
                      <li className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Configure call forwarding
                      </li>
                      <li className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Manage personal tasks
                      </li>
                      <li className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        View call analytics
                      </li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-gray-500">
                      To request additional permissions, please contact the system administrator.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
