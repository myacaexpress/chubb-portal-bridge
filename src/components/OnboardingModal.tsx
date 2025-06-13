
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [chubbUrl, setChubbUrl] = useState('https://chubb.insuranceadmin.com/login');
  const [chubbEmail, setChubbEmail] = useState('');
  const [chubbPassword, setChubbPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateChubbPortalConfig } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Save Chubb portal configuration
      const config = {
        url: chubbUrl,
        email: chubbEmail,
        password: chubbPassword,
        configuredAt: new Date().toISOString()
      };

      updateChubbPortalConfig(config);
      
      toast({
        title: "Chubb Portal Configured",
        description: "Your Chubb portal credentials have been saved securely.",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Configuration failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-chubb-blue">Configure Chubb Portal Access</DialogTitle>
          <DialogDescription>
            To enable automation, please provide your Chubb insurance portal credentials. 
            These will be stored securely and used only for authorized automation tasks.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chubbUrl">Chubb Portal URL</Label>
            <Input
              id="chubbUrl"
              type="url"
              value={chubbUrl}
              onChange={(e) => setChubbUrl(e.target.value)}
              placeholder="https://chubb.insuranceadmin.com/login"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="chubbEmail">Chubb Portal Email</Label>
            <Input
              id="chubbEmail"
              type="email"
              value={chubbEmail}
              onChange={(e) => setChubbEmail(e.target.value)}
              placeholder="your.email@company.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="chubbPassword">Chubb Portal Password</Label>
            <Input
              id="chubbPassword"
              type="password"
              value={chubbPassword}
              onChange={(e) => setChubbPassword(e.target.value)}
              placeholder="Your Chubb portal password"
              required
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-chubb-blue hover:bg-chubb-blue-dark" disabled={isLoading}>
              {isLoading ? "Configuring..." : "Save Configuration"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
