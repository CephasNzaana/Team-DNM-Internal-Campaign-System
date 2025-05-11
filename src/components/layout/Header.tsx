
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, User, Bell, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DNM_THEME } from '@/lib/theme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Header: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the install button
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    // Show the install prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          toast({
            title: "Installation started",
            description: "Thanks for installing our app!",
          });
        }
        // Reset the deferred prompt variable
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  return (
    <header className="bg-[#306030] text-white py-3 px-4 md:px-6 shadow-md border-b border-[#4A5D23]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="lg:hidden mr-2 text-white hover:bg-green-700">
            <Menu />
          </Button>
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="flex flex-shrink-0 h-6 w-10 overflow-hidden">
                  <div className="h-full w-1/3 bg-black"></div>
                  <div className="h-full w-1/3 bg-[#FFCE00]"></div>
                  <div className="h-full w-1/3 bg-[#D90000]"></div>
                </div>
                <span className="font-bold text-xl tracking-tight">Team DNM</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {showInstallButton && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-white border-white hover:bg-green-700 hidden md:flex"
              onClick={handleInstallClick}
            >
              <Download size={16} className="mr-1" />
              Install App
            </Button>
          )}
          
          <div className="hidden md:block text-sm font-medium bg-[#4A5D23] text-white px-3 py-1 rounded-full">
            Kabale Municipality
          </div>
          
          <Link to="/communication/messages">
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#D90000]"></span>
            </Button>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center text-white hover:bg-green-700">
                <User size={20} className="mr-2" />
                <span className="hidden md:inline">Account</span>
                <ChevronDown size={16} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/account" className="cursor-pointer">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/auth" className="cursor-pointer text-red-600">Logout</Link>
              </DropdownMenuItem>
              
              {showInstallButton && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleInstallClick}>
                    <Download size={16} className="mr-2" />
                    Install App
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
