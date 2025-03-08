import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  ResponsiveContainer
} from 'recharts';
import { 
  Home, BarChart2, Settings, User, Menu, X,
  Activity, Users, DollarSign, ShoppingCart,
  Bell
} from 'lucide-react';

// Custom Toggle Switch Component
const Toggle = ({ checked, onChange }) => {
  return (
    <div 
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
        checked ? 'bg-blue-600' : 'bg-gray-300'
      }`}
      onClick={() => onChange(!checked)}
    >
      <div 
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`} 
      />
    </div>
  );
};

// Custom Input Component
const Input = ({ type = "text", placeholder, className = "", ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
};

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [notifications, setNotifications] = useState(true);
  const [timeRange, setTimeRange] = useState('month');

  const navItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: BarChart2, label: 'Analytics', id: 'analytics' },
    { icon: Users, label: 'Team', id: 'team' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: User, label: 'Profile', id: 'profile' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 4000, users: 2400, cost: 2400 },
    { month: 'Feb', revenue: 3000, users: 1398, cost: 2210 },
    { month: 'Mar', revenue: 5000, users: 9800, cost: 2290 },
    { month: 'Apr', revenue: 4500, users: 3908, cost: 2000 },
    { month: 'May', revenue: 6000, users: 4800, cost: 2181 },
    { month: 'Jun', revenue: 5500, users: 3800, cost: 2500 }
  ];

  const analyticsData = [
    { name: 'Week 1', visits: 4000, clicks: 2400, conversion: 1200 },
    { name: 'Week 2', visits: 3000, clicks: 1398, conversion: 900 },
    { name: 'Week 3', visits: 2000, clicks: 9800, conversion: 1600 },
    { name: 'Week 4', visits: 2780, clicks: 3908, conversion: 1400 }
  ];

  const pieData = [
    { name: 'Desktop', value: 400 },
    { name: 'Mobile', value: 300 },
    { name: 'Tablet', value: 200 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const DashboardContent = () => (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: DollarSign, label: 'Revenue', value: '$24,560', change: '+12.5%' },
          { icon: Users, label: 'Active Users', value: '1,234', change: '+3.2%' },
          { icon: ShoppingCart, label: 'Sales', value: '854', change: '+2.4%' },
          { icon: Activity, label: 'Conversion', value: '3.9%', change: '+1.2%' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <stat.icon className="text-blue-600" size={24} />
              </div>
            </div>
            <p className="text-green-500 text-sm mt-2">{stat.change} from last month</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="cost" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Device Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsSection = () => (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Visits', value: '124,563', change: '+14.2%' },
          { label: 'Bounce Rate', value: '32.8%', change: '-2.1%' },
          { label: 'Avg. Session Duration', value: '4m 23s', change: '+0.8%' }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h4 className="text-gray-500">{metric.label}</h4>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className={metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {metric.change}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visits" stroke="#8884d8" />
              <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
              <Line type="monotone" dataKey="conversion" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const TeamSection = () => (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'John Doe', role: 'Frontend Developer', email: 'john@example.com' },
          { name: 'Jane Smith', role: 'UX Designer', email: 'jane@example.com' },
          { name: 'Mike Johnson', role: 'Backend Developer', email: 'mike@example.com' },
          { name: 'Sarah Williams', role: 'Product Manager', email: 'sarah@example.com' },
          { name: 'Tom Brown', role: 'DevOps Engineer', email: 'tom@example.com' },
          { name: 'Lisa Davis', role: 'QA Engineer', email: 'lisa@example.com' }
        ].map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
                <p className="text-sm text-gray-400">{member.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SettingsSection = () => (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">General Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-gray-500">Enable push notifications</p>
            </div>
            <Toggle 
              checked={notifications}
              onChange={setNotifications}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileSection = () => (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-16 w-16 rounded-full overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-500">Frontend Developer</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input defaultValue="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input defaultValue="john.doe@example.com" type="email" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentSection) {
      case 'analytics':
        return <AnalyticsSection />;
      case 'team':
        return <TeamSection />;
      case 'settings':
        return <SettingsSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300`}>
        <div className="p-4 flex justify-between items-center">
        {isSidebarOpen && <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>}
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="mt-8">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`flex items-center p-4 cursor-pointer ${
                currentSection === item.id 
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="ml-4">{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="p-4 bg-white shadow-sm flex justify-between items-center">
          <h2 className="text-xl font-semibold">{navItems.find(item => item.id === currentSection)?.label}</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;