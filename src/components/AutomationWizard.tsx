
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, Play, Pause } from 'lucide-react';

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
  const [totalSteps] = useState(7);
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
      title: "Enter the provided email and password into the appropriate fields and submit the login form.",
      description: "Enter login credentials and authenticate with the portal.",
      completed: false
    },
    {
      id: 3,
      title: "Look for the interface/menu option to start creating a new application. Check available navigation and expand menus if needed.",
      description: "Locate the new application creation interface in the portal navigation.",
      completed: false
    },
    {
      id: 4,
      title: "Expand and/or navigate to 'Book of Business' and/or other likely sections ('Sales Tools', 'Applications') to locate the new/test application creation interface.",
      description: "Navigate through the portal sections to find application creation options.",
      completed: false
    },
    {
      id: 5,
      title: "Click on the 'Sales Tools' menu option to check if it offers an option to create a new or test application.",
      description: "Check the Sales Tools menu for application creation functionality.",
      completed: false
    },
    {
      id: 6,
      title: "Click the 'Applications' menu item to see if it offers an option to create a new or test application.",
      description: "Explore the Applications menu for new application options.",
      completed: false
    },
    {
      id: 7,
      title: "Click the 'Start a New Application' button to begin.",
      description: "Initiate the new application creation process.",
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
    }, 3000);
  };

  const pauseAutomation = () => {
    setIsRunning(false);
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex">
      {/* Left Panel - Automation Steps */}
      <div className="w-96 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-foreground hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Badge variant="secondary" className="bg-chubb-blue text-white">
              Step {currentStep}/{totalSteps}
            </Badge>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex gap-2">
            {!isRunning ? (
              <Button
                onClick={startAutomation}
                className="flex-1 bg-chubb-blue hover:bg-chubb-blue-dark text-white"
                disabled={currentStep >= totalSteps}
              >
                <Play className="w-4 h-4 mr-2" />
                {currentStep >= totalSteps ? 'Completed' : 'Start'}
              </Button>
            ) : (
              <Button
                onClick={pauseAutomation}
                variant="outline"
                className="flex-1"
              >
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            )}
          </div>
        </div>

        {/* Steps List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-3 rounded-lg border transition-all ${
                  index + 1 === currentStep
                    ? 'bg-chubb-blue/10 border-chubb-blue'
                    : index + 1 < currentStep
                    ? 'bg-green-500/10 border-green-500'
                    : 'bg-muted/50 border-border'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {index + 1 < currentStep ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        index + 1 === currentStep
                          ? 'border-chubb-blue bg-chubb-blue'
                          : 'border-muted-foreground'
                      }`}>
                        {index + 1 === currentStep && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-tight mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            Task 1/1 • Total time: 5m 27s
          </div>
        </div>
      </div>

      {/* Right Panel - Browser Canvas */}
      <div className="flex-1 flex flex-col bg-muted/30">
        {/* Canvas Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Browser Automation</h2>
              <p className="text-sm text-muted-foreground">
                Live view of automation progress
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isRunning ? "default" : "secondary"} className="bg-chubb-blue text-white">
                {isRunning ? 'Running' : 'Ready'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-4">
          <div className="h-full bg-card rounded-lg border border-border flex items-center justify-center">
            {currentStep >= totalSteps ? (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Automation Complete!</h3>
                <p className="text-muted-foreground mb-4">
                  Successfully navigated to Chubb portal and started new application
                </p>
                <Button onClick={onClose} className="bg-chubb-blue hover:bg-chubb-blue-dark text-white">
                  Return to Dashboard
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 border-2 border-chubb-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {isRunning ? 'Automation in Progress' : 'Ready to Start'}
                </h3>
                <p className="text-muted-foreground">
                  {isRunning 
                    ? `Currently executing: ${steps[currentStep - 1]?.title || 'Preparing...'}`
                    : 'Click Start to begin the automation process'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationWizard;
