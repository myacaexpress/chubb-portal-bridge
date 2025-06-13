
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [chubbUrl, setChubbUrl] = useState('');
  const [chubbEmail, setChubbEmail] = useState('');
  const [chubbPassword, setChubbPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateChubbPortalConfig } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const savedConfig = localStorage.getItem('chubb-portal-config');
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        setChubbUrl(config.url || '');
        setChubbEmail(config.email || '');
        setChubbPassword(''); // Don't populate password for security
      }
    }
  }, [isOpen]);

  const handleChubbConfigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const config = {
        url: chubbUrl,
        email: chubbEmail,
        password: chubbPassword,
        updatedAt: new Date().toISOString()
      };

      updateChubbPortalConfig(config);
      
      toast({
        title: "Settings Updated",
        description: "Your Chubb portal configuration has been updated.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-chubb-blue">Settings</DialogTitle>
          <DialogDescription>
            Manage your automation settings and portal configurations.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="chubb" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chubb">Chubb Portal</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chubb" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Chubb Portal Configuration</CardTitle>
                <CardDescription>
                  Update your Chubb insurance portal credentials for automation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChubbConfigSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="settings-chubbUrl">Portal URL</Label>
                    <Input
                      id="settings-chubbUrl"
                      type="url"
                      value={chubbUrl}
                      onChange={(e) => setChubbUrl(e.target.value)}
                      placeholder="https://chubb.insuranceadmin.com/login"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="settings-chubbEmail">Email</Label>
                    <Input
                      id="settings-chubbEmail"
                      type="email"
                      value={chubbEmail}
                      onChange={(e) => setChubbEmail(e.target.value)}
                      placeholder="your.email@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="settings-chubbPassword">Password</Label>
                    <Input
                      id="settings-chubbPassword"
                      type="password"
                      value={chubbPassword}
                      onChange={(e) => setChubbPassword(e.target.value)}
                      placeholder="Enter new password to update"
                    />
                  </div>
                  <Button type="submit" className="bg-chubb-blue hover:bg-chubb-blue-dark" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Configuration"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="automation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Automation Settings</CardTitle>
                <CardDescription>
                  Configure how automation behaves and processes applications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Webhook Endpoint</Label>
                  <Input
                    readOnly
                    value="https://your-app.com/webhook/automation-trigger"
                    className="bg-muted"
                  />
                  <p className="text-sm text-muted-foreground">
                    Use this endpoint to trigger automation via webhook when leads begin providing information.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Auto-retry Failed Applications</Label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Automatically retry failed automation attempts</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Maximum Retry Attempts</Label>
                  <Input type="number" defaultValue="3" min="1" max="5" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
