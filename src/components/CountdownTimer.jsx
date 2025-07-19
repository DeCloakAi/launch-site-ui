import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Clock, Calendar } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CountdownTimer = ({ className = "" }) => {
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
      <Card className={`bg-gradient-to-r from-[#0A2540] to-[#1a3a5a] border-[#00D09C] ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLaunched) {
    return (
      <Card className={`bg-gradient-to-r from-[#00D09C] to-[#00b587] border-[#00D09C] ${className}`}>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 text-white mr-2" />
              <h3 className="text-xl font-semibold text-white">We're Live!</h3>
            </div>
            <p className="text-white/90">Decloak.ai is now available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-gradient-to-r from-[#0A2540] to-[#1a3a5a] border-[#00D09C] ${className}`}>
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-[#00D09C] mr-2" />
            <h3 className="text-xl font-semibold text-white">Launching In</h3>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="bg-[#00D09C] text-white rounded-lg p-3 font-bold text-2xl">
                {timeLeft.days}
              </div>
              <div className="text-gray-300 text-sm mt-1">Days</div>
            </div>
            <div className="text-center">
              <div className="bg-[#00D09C] text-white rounded-lg p-3 font-bold text-2xl">
                {timeLeft.hours}
              </div>
              <div className="text-gray-300 text-sm mt-1">Hours</div>
            </div>
            <div className="text-center">
              <div className="bg-[#00D09C] text-white rounded-lg p-3 font-bold text-2xl">
                {timeLeft.minutes}
              </div>
              <div className="text-gray-300 text-sm mt-1">Minutes</div>
            </div>
            <div className="text-center">
              <div className="bg-[#00D09C] text-white rounded-lg p-3 font-bold text-2xl">
                {timeLeft.seconds}
              </div>
              <div className="text-gray-300 text-sm mt-1">Seconds</div>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm">
            Be the first to experience next-generation privacy protection
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;