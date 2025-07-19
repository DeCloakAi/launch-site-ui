// Mock data for Decloak.ai landing page
class MockData {
  constructor() {
    this.emailSignups = [
      { email: 'john.doe@example.com', timestamp: new Date('2024-01-01T10:00:00Z') },
      { email: 'jane.smith@example.com', timestamp: new Date('2024-01-02T11:30:00Z') },
      { email: 'mike.johnson@example.com', timestamp: new Date('2024-01-03T14:15:00Z') }
    ];
    
    this.scanResults = [
      {
        id: 1,
        email: 'john.doe@example.com',
        exposures: 23,
        riskScore: 8.2,
        breaches: 5,
        socialProfiles: 12,
        dataPoints: 156,
        lastScan: new Date('2024-01-01T10:00:00Z')
      },
      {
        id: 2,
        email: 'jane.smith@example.com',
        exposures: 18,
        riskScore: 6.7,
        breaches: 3,
        socialProfiles: 8,
        dataPoints: 98,
        lastScan: new Date('2024-01-02T11:30:00Z')
      }
    ];
    
    this.featuresData = {
      digitalFootprint: {
        title: "Digital Footprint Scan",
        description: "Deep scan for email, phone, username traces",
        totalScans: 45821,
        averageExposures: 27,
        successRate: 94.2
      },
      socialMapping: {
        title: "Social Profile Mapping",
        description: "Identify linked accounts across platforms",
        platformsCovered: 150,
        averageProfiles: 12,
        accuracyRate: 97.8
      },
      breachMonitor: {
        title: "Breach & Leak Monitor",
        description: "Alert for public data breaches, leaks",
        breachesTracked: 2847,
        alertsGenerated: 892,
        responseTime: "< 1 hour"
      },
      riskScore: {
        title: "Digital Risk Score",
        description: "AI-generated privacy risk assessment",
        averageScore: 6.8,
        scoreRange: "1-10",
        updateFrequency: "Real-time"
      },
      autoTakedown: {
        title: "Auto Takedown Requests",
        description: "Remove exposed personal data easily",
        successRate: 89.4,
        averageTime: "72 hours",
        requestsProcessed: 12847
      }
    };
  }
  
  addEmailSignup(email) {
    const newSignup = {
      email,
      timestamp: new Date()
    };
    this.emailSignups.push(newSignup);
    console.log(`New email signup: ${email}`);
    return newSignup;
  }
  
  getEmailSignups() {
    return this.emailSignups;
  }
  
  getScanResults() {
    return this.scanResults;
  }
  
  getFeaturesData() {
    return this.featuresData;
  }
  
  simulateDigitalScan(email) {
    return {
      email,
      status: 'completed',
      exposures: Math.floor(Math.random() * 50) + 5,
      riskScore: Math.floor(Math.random() * 10) + 1,
      breaches: Math.floor(Math.random() * 10) + 1,
      socialProfiles: Math.floor(Math.random() * 20) + 3,
      dataPoints: Math.floor(Math.random() * 200) + 50,
      scannedAt: new Date(),
      findings: [
        'Email found in 3 data breaches',
        'Phone number exposed on 2 forums',
        'Social profiles linked across 8 platforms',
        'Personal information in 12 public records'
      ]
    };
  }
  
  getPrivacyTips() {
    return [
      {
        title: "Use Strong, Unique Passwords",
        description: "Create different passwords for each account and use a password manager.",
        category: "authentication",
        difficulty: "easy"
      },
      {
        title: "Enable Two-Factor Authentication",
        description: "Add an extra layer of security to your important accounts.",
        category: "authentication",
        difficulty: "easy"
      },
      {
        title: "Review Privacy Settings",
        description: "Regularly check and update privacy settings on social media platforms.",
        category: "social",
        difficulty: "medium"
      },
      {
        title: "Monitor Your Credit Reports",
        description: "Check your credit reports regularly for signs of identity theft.",
        category: "financial",
        difficulty: "medium"
      },
      {
        title: "Use Privacy-Focused Search Engines",
        description: "Switch to search engines that don't track your searches.",
        category: "browsing",
        difficulty: "easy"
      }
    ];
  }
}

export const mockData = new MockData();