import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp, 
  Shield, 
  Calendar,
  Mail,
  Clock,
  BarChart3,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Settings,
  Moon,
  Sun,
  Database
} from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useTheme } from '../hooks/useTheme';
import { toast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [stats, setStats] = useState({
    signups: { total: 0, verified: 0, pending: 0, recent_week: 0 },
    scans: { total: 0, average_risk_score: 0 },
    launch: { launch_date: null, status: 'unknown' }
  });
  const [signups, setSignups] = useState([]);
  const [filteredSignups, setFilteredSignups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    startDate: '',
    endDate: ''
  });
  const [launchDate, setLaunchDate] = useState('');
  const [isUpdatingLaunch, setIsUpdatingLaunch] = useState(false);

  // AG Grid column definitions
  const columnDefs = [
    {
      headerName: 'Email',
      field: 'email',
      flex: 2,
      sortable: true,
      filter: true,
      cellRenderer: (params) => (
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2 text-gray-500" />
          <span className="font-medium">{params.value}</span>
        </div>
      )
    },
    {
      headerName: 'Status',
      field: 'status',
      flex: 1,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        const statusColors = {
          verified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
          pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
          unsubscribed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        };
        return (
          <Badge className={`${statusColors[params.value]} border-0`}>
            {params.value}
          </Badge>
        );
      }
    },
    {
      headerName: 'Signup Date',
      field: 'timestamp',
      flex: 1.5,
      sortable: true,
      filter: 'agDateColumnFilter',
      cellRenderer: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    },
    {
      headerName: 'Verified Date',
      field: 'verified_at',
      flex: 1.5,
      sortable: true,
      filter: 'agDateColumnFilter',
      cellRenderer: (params) => {
        if (!params.value) return <span className="text-gray-400">-</span>;
        const date = new Date(params.value);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    },
    {
      headerName: 'IP Address',
      field: 'ip_address',
      flex: 1,
      sortable: true,
      filter: true,
      cellRenderer: (params) => (
        <span className="font-mono text-sm">{params.value || '-'}</span>
      )
    }
  ];

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true
  };

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Fetch admin stats
      const statsResponse = await axios.get(`${API}/admin/dashboard-stats`);
      setStats(statsResponse.data);
      
      // Fetch signups with filters
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);
      if (filters.startDate) params.append('start_date', filters.startDate);
      if (filters.endDate) params.append('end_date', filters.endDate);
      
      const signupsResponse = await axios.get(`${API}/signups?${params}`);
      setSignups(signupsResponse.data);
      setFilteredSignups(signupsResponse.data);
      
      // Set launch date for editing
      if (statsResponse.data.launch.launch_date) {
        const date = new Date(statsResponse.data.launch.launch_date);
        setLaunchDate(date.toISOString().slice(0, 16));
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  }, [filters]);

  const handleUpdateLaunchDate = async () => {
    if (!launchDate) {
      toast({
        title: "Error",
        description: "Please select a launch date",
        variant: "destructive"
      });
      return;
    }

    setIsUpdatingLaunch(true);
    try {
      await axios.post(`${API}/update-launch-date`, {
        launch_date: new Date(launchDate).toISOString()
      });
      
      toast({
        title: "Success",
        description: "Launch date updated successfully",
        variant: "default"
      });
      
      // Refresh data
      await fetchDashboardData();
    } catch (error) {
      console.error('Error updating launch date:', error);
      toast({
        title: "Error",
        description: "Failed to update launch date",
        variant: "destructive"
      });
    } finally {
      setIsUpdatingLaunch(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    const csvData = signups.map(signup => ({
      email: signup.email,
      status: signup.status,
      signup_date: new Date(signup.timestamp).toISOString(),
      verified_date: signup.verified_at ? new Date(signup.verified_at).toISOString() : '',
      ip_address: signup.ip_address || ''
    }));

    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(csvData[0]).join(",") + "\n" +
      csvData.map(row => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `decloak_signups_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="min-h-screen bg-background p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D09C]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-background p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage Decloak.ai early access program</p>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-[#00D09C] hover:text-[#00D09C]/80">
                ← Back to Site
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-10 h-10"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="signups">Signups</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.signups.total}</div>
                    <p className="text-xs text-muted-foreground">
                      +{stats.signups.recent_week} this week
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.signups.verified}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.signups.total > 0 ? 
                        `${Math.round((stats.signups.verified / stats.signups.total) * 100)}% verified` : 
                        '0% verified'
                      }
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
                    <UserX className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.signups.pending}</div>
                    <p className="text-xs text-muted-foreground">
                      Awaiting email verification
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.scans.average_risk_score}</div>
                    <p className="text-xs text-muted-foreground">
                      From {stats.scans.total} scans
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Launch Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Launch Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {stats.launch.status === 'countdown' ? 'Countdown Active' : 'Launch Status'}
                      </h3>
                      <p className="text-muted-foreground">
                        {stats.launch.launch_date ? 
                          `Launch Date: ${new Date(stats.launch.launch_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}` : 
                          'Launch date not set'
                        }
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={stats.launch.status === 'countdown' ? 'secondary' : 'outline'}>
                        {stats.launch.status}
                      </Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Launch Date</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="launch-date">Launch Date</Label>
                              <Input
                                id="launch-date"
                                type="datetime-local"
                                value={launchDate}
                                onChange={(e) => setLaunchDate(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <Button
                              onClick={handleUpdateLaunchDate}
                              disabled={isUpdatingLaunch}
                              className="w-full"
                            >
                              {isUpdatingLaunch ? 'Updating...' : 'Update Launch Date'}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signups" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Filters & Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <Label htmlFor="status-filter">Status</Label>
                      <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All statuses</SelectItem>
                          <SelectItem value="verified">Verified</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="search-filter">Search Email</Label>
                      <Input
                        id="search-filter"
                        placeholder="Search by email..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => handleFilterChange('startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => handleFilterChange('endDate', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={fetchDashboardData} variant="outline">
                      <Search className="w-4 h-4 mr-2" />
                      Apply Filters
                    </Button>
                    <Button onClick={handleExportData} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Data Grid */}
              <Card>
                <CardHeader>
                  <CardTitle>User Signups ({filteredSignups.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`${theme === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}`} style={{ height: '600px' }}>
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={filteredSignups}
                      defaultColDef={defaultColDef}
                      pagination={true}
                      paginationPageSize={20}
                      rowSelection="multiple"
                      animateRows={true}
                      enableRangeSelection={true}
                      suppressRowClickSelection={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Signup Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Advanced analytics coming soon...</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Score Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Charts coming soon...</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Database Schema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      View the complete database schema and collection structure for Decloak.ai
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">email_signups</h4>
                        <p className="text-sm text-muted-foreground">Stores user email signups and verification status</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">scan_results</h4>
                        <p className="text-sm text-muted-foreground">Contains digital footprint scan results and risk scores</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">launch_config</h4>
                        <p className="text-sm text-muted-foreground">Manages launch dates and countdown configuration</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;