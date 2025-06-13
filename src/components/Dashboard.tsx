import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import OnboardingModal from './OnboardingModal';
import SettingsModal from './SettingsModal';
import AutomationWizard from './AutomationWizard';
import { Settings } from 'lucide-react';

interface AutomationSession {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'failed';
  progress: number;
  startTime: string;
  duration: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAutomationWizard, setShowAutomationWizard] = useState(false);
  const [sessions, setSessions] = useState<AutomationSession[]>([
    {
      id: '1',
      title: 'New Application Processing',
      status: 'active',
      progress: 75,
      startTime: '2h ago',
      duration: '5m 27s'
    },
    {
      id: '2',
      title: 'Policy Renewal Automation',
      status: 'completed',
      progress: 100,
      startTime: '1d ago',
      duration: '3m 15s'
    }
  ]);

  useEffect(() => {
    if (user && !user.chubbPortalConfigured) {
      setShowOnboarding(true);
    }
  }, [user]);

  const startNewAutomation = () => {
    setShowAutomationWizard(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Running';
      case 'completed': return 'Completed';
      case 'failed': return 'Failed';
      default: return 'Unknown';
    }
  };

  if (showAutomationWizard) {
    return (
      <AutomationWizard onClose={() => setShowAutomationWizard(false)} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-chubb-blue via-chubb-blue-dark to-slate-900">
      {/* Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-chubb-blue font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">Chubb Automation Portal</h1>
                <p className="text-white/70 text-sm">Insurance Application Automation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/90 text-sm">Welcome, {user?.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="text-white hover:bg-white/10"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={logout} className="text-white border-white/30 hover:bg-white/10">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Applications Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-200">247</div>
              <p className="text-white/70 text-sm">This month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-300">98.5%</div>
              <p className="text-white/70 text-sm">Average completion rate</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Time Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-300">42h</div>
              <p className="text-white/70 text-sm">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Start New Automation</CardTitle>
              <CardDescription className="text-white/70">
                Begin processing a new insurance application automatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={startNewAutomation}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
                disabled={!user?.chubbPortalConfigured}
              >
                🤖 Start Automating
              </Button>
              {!user?.chubbPortalConfigured && (
                <p className="text-yellow-300 text-sm mt-2">
                  Configure your Chubb portal credentials to start automation
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Sessions */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Recent Automation Sessions</CardTitle>
            <CardDescription className="text-white/70">
              Monitor your automation tasks and their progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{session.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusColor(session.status)} text-white`}>
                        {getStatusText(session.status)}
                      </Badge>
                      <span className="text-sm text-white/70">{session.startTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Progress value={session.progress} className="flex-1 mr-4" />
                    <span className="text-sm text-white/70">{session.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
};

export default Dashboard;
