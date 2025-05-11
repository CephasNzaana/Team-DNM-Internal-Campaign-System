
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DEFAULT_USERS = {
  candidate: {
    username: "DanMN",
    password: "Nabaasa@2026-Test",
    role: "honDNM",
    permissions: [
      "view_all", 
      "message_all", 
      "approve_strategy",
      "access_voter_database",
      "manage_personal_calls",
      "manage_voicemail",
      "configure_call_forwarding",
      "manage_personal_tasks",
      "view_call_analytics"
    ]
  },
  campaignManager: {
    username: "AdminManager",
    password: "Nabaasa@2026-Test",
    role: "admin",
    permissions: ["all"]
  },
  fieldCoordinator: {
    username: "TeamMember",
    password: "Nabaasa@2026-Test",
    role: "teamMember",
    permissions: ["view_assigned", "update_voters", "report_activities"]
  }
};

const AuthPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'honDNM' | 'admin' | 'teamMember'>('honDNM');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    let isAuthenticated = false;
    let userRole = '';
    
    // Very simple authentication for demonstration
    if (selectedRole === 'honDNM' && username === DEFAULT_USERS.candidate.username && password === DEFAULT_USERS.candidate.password) {
      isAuthenticated = true;
      userRole = 'honDNM';
    } else if (selectedRole === 'admin' && username === DEFAULT_USERS.campaignManager.username && password === DEFAULT_USERS.campaignManager.password) {
      isAuthenticated = true;
      userRole = 'admin';
    } else if (selectedRole === 'teamMember' && username === DEFAULT_USERS.fieldCoordinator.username && password === DEFAULT_USERS.fieldCoordinator.password) {
      isAuthenticated = true;
      userRole = 'teamMember';
    }
    
    if (isAuthenticated) {
      // Store user role in localStorage for dashboard customization
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('username', username);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${username}!`,
      });
      
      navigate('/');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-8 flex overflow-hidden rounded-sm">
              <div className="h-full w-8 bg-black"></div>
              <div className="h-full w-8 bg-[#FFCE00]"></div>
              <div className="h-full w-8 bg-[#D90000]"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-green-800">Team DNM</h1>
          <p className="text-gray-600">Campaign Management System</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the campaign system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Login as</Label>
              <Select value={selectedRole} onValueChange={(value: 'honDNM' | 'admin' | 'teamMember') => setSelectedRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="honDNM">Hon. Dan Musinguzi Nabaasa</SelectItem>
                  <SelectItem value="admin">Campaign Administrator</SelectItem>
                  <SelectItem value="teamMember">Team Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {selectedRole === 'honDNM' && <p className="text-xs text-gray-500">Default: DanMN</p>}
              {selectedRole === 'admin' && <p className="text-xs text-gray-500">Default: AdminManager</p>}
              {selectedRole === 'teamMember' && <p className="text-xs text-gray-500">Default: TeamMember</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs text-gray-500">Default: Nabaasa@2026-Test</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full bg-green-700 hover:bg-green-800" onClick={handleLogin}>Login</Button>
            <p className="mt-4 text-sm text-gray-600 text-center">
              <a href="#" className="text-green-600 hover:underline">
                Forgot your password?
              </a>
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          By continuing, you agree to Team DNM Campaign's terms and conditions.
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
