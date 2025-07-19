import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Shield, Search, Users, AlertTriangle, BarChart3, Zap, Building2, User, Moon, Sun, Eye, UserCheck, Globe, Bell } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { useTheme } from '../hooks/useTheme';
import { trackSignup, trackEvent } from '../components/GoogleAnalytics';
import CountdownTimer from '../components/CountdownTimer';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const StickyCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    const fetchLaunchConfig = async () => {
      try {
        const response = await axios.get(`${API}/launch-config`);
        const data = response.data;
        
        if (data.status === 'launched') {
          setIsLaunched(true);
          setIsLoading(false);
          return;
        }
        
        setTimeLeft({
          days: data.days_remaining,
          hours: data.hours_remaining,
          minutes: data.minutes_remaining,
          seconds: data.seconds_remaining,
          totalSeconds: data.total_seconds
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching launch config:', error);
        setIsLoading(false);
      }
    };

    fetchLaunchConfig();
  }, []);

  useEffect(() => {
    if (isLaunched || isLoading || timeLeft.totalSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTotal = prev.totalSeconds - 1;
        
        if (newTotal <= 0) {
          setIsLaunched(true);
          return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
        }
        
        const days = Math.floor(newTotal / (24 * 60 * 60));
        const hours = Math.floor((newTotal % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((newTotal % (60 * 60)) / 60);
        const seconds = newTotal % 60;
        
        return { days, hours, minutes, seconds, totalSeconds: newTotal };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLaunched, isLoading, timeLeft.totalSeconds]);

  if (isLoading) {
    return (
      <div className="fixed top-20 right-4 z-50 bg-[#0A2540] text-white p-4 rounded-lg shadow-lg">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      </div>
    );
  }

  if (isLaunched) {
    return (
      <div className="fixed top-20 right-4 z-50 bg-[#00D09C] text-white p-4 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="text-sm font-semibold">🚀 LIVE NOW!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-4 z-50 bg-[#0A2540] text-white p-4 rounded-lg shadow-lg min-w-[200px]">
      <div className="text-center">
        <div className="text-xs font-semibold mb-2 text-[#00D09C]">LAUNCHING IN</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="font-bold text-lg">{timeLeft.days}</div>
            <div className="text-gray-300">Days</div>
          </div>
          <div>
            <div className="font-bold text-lg">{timeLeft.hours}</div>
            <div className="text-gray-300">Hours</div>
          </div>
          <div>
            <div className="font-bold text-lg">{timeLeft.minutes}</div>
            <div className="text-gray-300">Min</div>
          </div>
          <div>
            <div className="font-bold text-lg">{timeLeft.seconds}</div>
            <div className="text-gray-300">Sec</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to request access.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    trackEvent('signup_attempt', { email_domain: email.split('@')[1] });
    
    try {
      const response = await axios.post(`${API}/signup`, { email });
      
      if (response.data) {
        setEmail('');
        toast({
          title: "Access Requested!",
          description: "Thank you for your interest. Check your email for verification.",
          variant: "default",
        });
        trackSignup(email, 'success');
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.response?.status === 400) {
        toast({
          title: "Already Registered",
          description: "This email is already registered for early access.",
          variant: "destructive",
        });
        trackSignup(email, 'duplicate');
      } else {
        toast({
          title: "Error",
          description: "Failed to register email. Please try again.",
          variant: "destructive",
        });
        trackSignup(email, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const keyFeatures = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Digital Footprint Scan",
      description: "Deep scan for email, phone, username traces across the web"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social Profile Mapping",
      description: "Identify and map linked accounts across all platforms"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Breach & Leak Monitor",
      description: "Real-time alerts for public data breaches and leaks"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Digital Risk Score",
      description: "AI-powered privacy risk assessment and scoring"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Auto Takedown Requests",
      description: "Automated removal of exposed personal data"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Reverse Image / Face Matching",
      description: "Advanced facial recognition and image matching detection"
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Executive/C-Level Impersonation Detection",
      description: "Detect and alert on executive identity theft attempts"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Dark Web Monitoring",
      description: "Continuous monitoring of dark web marketplaces and forums"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Real-Time Alerts & Monitoring",
      description: "Instant notifications for new threats and exposures"
    }
  ];

  const individualFeatures = [
    "Personal Digital Footprint Scanner",
    "Executive Protection Mode",
    "Identity Theft Prevention",
    "Privacy Cleanup Assistant",
    "Dark Web Monitoring",
    "Real-Time Threat Alerts"
  ];

  const businessFeatures = [
    "Employee Digital Risk Assessment",
    "Executive Protection Suite",
    "Candidate Background Screening",
    "Compliance Reporting Dashboard",
    "Brand Protection Monitoring",
    "Corporate Threat Intelligence"
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Sticky Countdown Timer */}
        <StickyCountdown />
        
        {/* Header */}
        <header className="bg-card shadow-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <img src="/logo-light.svg" alt="Decloak.ai" className="h-10 block dark:hidden" />
                <img src="/logo-dark.svg" alt="Decloak.ai" className="h-10 hidden dark:block" />
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-[#00D09C] text-white hover:bg-[#00D09C]/90">
                  AI-POWERED PRIVACY CONTROL
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="w-10 h-10"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section - Optimized for Above The Fold */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8 min-h-[90vh] flex flex-col justify-center">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Main Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
                  Your Digital Life, Exposed.
                  <br />
                  <span className="text-[#00D09C]">Take Back Control.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Decloak.ai is the first intelligent platform that continuously scans the internet for your leaked personal data and gives you the tools to erase it. 
                  <strong className="text-foreground"> Stop being a product.</strong>
                </p>
                
                {/* Problem Points - Compact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                      <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">DATA EVERYWHERE</h3>
                    <p className="text-xs text-muted-foreground">Exposed across forums, brokers, and repositories</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">PRIVACY AT RISK</h3>
                    <p className="text-xs text-muted-foreground">Leads to spam, scams, and identity theft</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">CLEANUP IMPOSSIBLE</h3>
                    <p className="text-xs text-muted-foreground">Complex, frustrating manual process</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Email Signup Form */}
              <div className="lg:pl-8">
                <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                      Get Early Access
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Be the first to experience next-generation privacy protection
                    </p>
                  </div>
                  
                  {/* Countdown Timer in Form */}
                  <div className="mb-6">
                    <CountdownTimer className="w-full" />
                  </div>
                  
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base"
                      required
                    />
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-[#00D09C] hover:bg-[#00D09C]/90 text-white font-medium text-base"
                      disabled={isLoading}
                    >
                      {isLoading ? "Requesting Access..." : "Request Early Access"}
                    </Button>
                  </form>
                  
                  <div className="text-center mt-4">
                    <p className="text-xs text-muted-foreground">
                      Join thousands getting early access • No spam, ever
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Know What Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                KNOW WHAT THE INTERNET KNOWS ABOUT YOU—AND TAKE CONTROL
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Decloak.ai scans the web to uncover your digital footprint and gives you the tools to manage it.
              </p>
            </div>

            {/* Key Features */}
            <div className="mb-20">
              <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">ADVANCED FEATURES</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {keyFeatures.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-background">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-[#00D09C]/10 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-[#00D09C]">
                          {feature.icon}
                        </div>
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Target Segments */}
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center mb-6">
                  <User className="w-8 h-8 text-[#00D09C] mr-3" />
                  <h3 className="text-2xl font-semibold text-foreground">FOR INDIVIDUALS</h3>
                </div>
                <div className="space-y-4">
                  {individualFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-[#00D09C] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center mb-6">
                  <Building2 className="w-8 h-8 text-[#00D09C] mr-3" />
                  <h3 className="text-2xl font-semibold text-foreground">FOR BUSINESSES</h3>
                </div>
                <div className="space-y-4">
                  {businessFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-[#00D09C] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0A2540] text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <img src="/logo-dark.svg" alt="Decloak.ai" className="h-10" />
            </div>
            <p className="text-gray-300 mb-6">
              AI-Powered Privacy Control
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Decloak.ai. Your privacy is our priority.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;