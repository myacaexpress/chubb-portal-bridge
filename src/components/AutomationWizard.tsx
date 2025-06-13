
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface AutomationStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface AutomationWizardProps {
  onClose: () => void;
}

const AutomationWizard: React.FC<AutomationWizardProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps] = useState(18);
  const [isRunning, setIsRunning] = useState(false);

  const steps: AutomationStep[] = [
    {
      id: 1,
      title: "Navigate to Chubb portal",
      description: "https://chubb.insuranceadmin.com/login to begin the login process.",
      completed: false
    },
    {
      id: 2,
      title: "Enter login credentials",
      description: "Enter the provided email and password into the appropriate fields and submit the login form.",
      completed: false
    },
    {
      id: 3,
      title: "Access application interface",
      description: "Look for the interface/menu option to start creating a new application. Check available navigation and expand menus if needed.",
      completed: false
    },
    {
      id: 4,
      title: "Navigate to Book of Business",
      description: "Expand and/or navigate to 'Book of Business' and/or other likely sections ('Sales Tools', 'Applications') to locate the new/test application creation interface.",
      completed: false
    },
    {
      id: 5,
      title: "Check Sales Tools menu",
      description: "Click on the 'Sales Tools' menu option to check if it offers an option to create a new or test application.",
      completed: false
    },
    {
      id: 6,
      title: "Access Applications menu",
      description: "Click the 'Applications' menu item to see if it offers an option to create a new or test application.",
      completed: false
    },
    {
      id: 7,
      title: "Start new application",
      description: "Click the 'Start a New Application' button to begin the process.",
      completed: false
    }
  ];

  const progress = (currentStep / totalSteps) * 100;

  const startAutomation = () => {
    setIsRunning(true);
    // Simulate automation progress
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= totalSteps) {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-chubb-blue via-chubb-blue-dark to-slate-900 z-50">
      {/* Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-white text-xl font-bold">Insurance Application Automation</h1>
                <p className="text-white/70 text-sm">Step-by-step automation process</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-orange-500 text-white">
                Step {currentStep}/{totalSteps}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Progress Bar */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-white/70">Overall Progress</span>
              <span className="text-sm text-white/70">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between mt-2 text-xs text-white/60">
              <span>Task 1/1</span>
              <span>Total time: 5m 27s</span>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Automation Steps */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Automation Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`p-4 rounded-lg border transition-all ${
                      index + 1 === currentStep
                        ? 'bg-orange-500/20 border-orange-500'
                        : index + 1 < currentStep
                        ? 'bg-green-500/20 border-green-500'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {index + 1 < currentStep ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            index + 1 === currentStep
                              ? 'border-orange-500 bg-orange-500'
                              : 'border-white/30'
                          }`}>
                            {index + 1 === currentStep && (
                              <div className="w-1 h-1 bg-white rounded-full m-2"></div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                        <p className="text-xs text-white/70">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Control Panel */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Control Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Current Task</h3>
                  <p className="text-white/70 text-sm">
                    {steps[currentStep - 1]?.title || "Automation completed"}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Status</h3>
                  <Badge className={`${
                    isRunning ? 'bg-orange-500' : currentStep >= totalSteps ? 'bg-green-500' : 'bg-blue-500'
                  } text-white`}>
                    {isRunning ? 'Running' : currentStep >= totalSteps ? 'Completed' : 'Ready'}
                  </Badge>
                </div>

                <div className="pt-4">
                  {!isRunning && currentStep < totalSteps && (
                    <Button
                      onClick={startAutomation}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      🤖 Start Automation
                    </Button>
                  )}
                  
                  {isRunning && (
                    <Button
                      disabled
                      className="w-full bg-orange-500/50 text-white cursor-not-allowed"
                    >
                      Automation Running...
                    </Button>
                  )}

                  {currentStep >= totalSteps && (
                    <Button
                      onClick={onClose}
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      ✅ Return to Dashboard
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AutomationWizard;
