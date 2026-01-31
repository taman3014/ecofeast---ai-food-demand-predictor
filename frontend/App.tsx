import React, { useState, useMemo, useEffect } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  History,
  Settings,
  Leaf,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  RefreshCw,
  Cpu,
  Plus,
  LogOut
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import HistoryLog from './components/HistoryLog';
import Forecaster from './components/Forecaster';
import Architecture from './components/Architecture';
import EntryForm from './components/EntryForm';
import { MENU_ITEMS } from './constants';
import { API_BASE } from './services/authService';
import { DailyRecord, ForecastResponse } from './types';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import AIChat from './components/AIChat';
import VoiceCommand from './components/VoiceCommand';
import FoodDonation from './components/FoodDonation';
import WhatIfSimulator from './components/WhatIfSimulator';
import './styles/animations.css';

type Tab = 'dashboard' | 'forecaster' | 'analytics' | 'history' | 'architecture';
type AppPage = 'landing' | 'auth' | 'app';

const App: React.FC = () => {
  const [appPage, setAppPage] = useState<AppPage>('landing');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [history, setHistory] = useState<DailyRecord[]>([]);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<any | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token) {
      setAuthToken(token);
      setAuthUser(JSON.parse(user || '{}'));
      setAppPage('app');
    } else {
      setAppPage('landing');
    }
  }, []);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!authToken) return;
      try {
        const res = await fetch(`${API_BASE}/records`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        if (!res.ok) {
          console.warn('Failed to fetch records', await res.text());
          return;
        }
        const data = await res.json();
        setHistory(data || []);
      } catch (err) {
        console.error('Error fetching records', err);
      }
    };
    fetchRecords();
  }, [authToken]);

  const handleAddRecord = async (record: DailyRecord) => {
    if (!authToken) return;
    try {
      const res = await fetch(`${API_BASE}/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        body: JSON.stringify(record)
      });
      if (!res.ok) throw new Error('Failed to save record');
      const saved = await res.json();
      setHistory(prev => [saved, ...prev]);
    } catch (err) {
      console.error('Error saving record', err);
    }
  };

  const stats = useMemo(() => {
    const totalWaste = history.reduce((sum, h) => sum + h.waste, 0);
    const totalLoss = history.reduce((sum, h) => sum + h.loss, 0);
    const totalSold = history.reduce((sum, h) => sum + h.sold, 0);
    const totalPrepared = history.reduce((sum, h) => sum + h.prepared, 0);
    const wastePercentage = (totalWaste / totalPrepared) * 100;

    return {
      totalWaste,
      totalLoss,
      wastePercentage: wastePercentage.toFixed(1),
      efficiency: (100 - wastePercentage).toFixed(1)
    };
  }, [history]);

  const handleAuthSuccess = (token: string, user: any) => {
    setAuthToken(token);
    setAuthUser(user);
    setAppPage('app');
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
    setAuthUser(null);
    setAppPage('landing');
  };

  const handleGetStarted = () => {
    setAppPage('auth');
    setShowRegister(false);
  };

  const handleVoiceCommand = (command: string, action: string, data?: any) => {
    switch (action) {
      case 'NAVIGATE':
        if (data?.page && ['dashboard', 'forecaster', 'analytics', 'history', 'architecture'].includes(data.page)) {
          setActiveTab(data.page as Tab);
        }
        break;
      case 'RUN_FORECAST':
        setActiveTab('forecaster');
        break;
      case 'LOG_ENTRY':
        setShowEntryForm(true);
        break;
      default:
        break;
    }
  };

  // Landing Page
  if (appPage === 'landing') {
    return (
      <>
        <Navbar
          isLanding={true}
          isLoggedIn={false}
          onLoginClick={handleGetStarted}
          onNavClick={() => { }}
        />
        <LandingPage onGetStartedClick={handleGetStarted} />
      </>
    );
  }

  // Auth Pages (Login/Register)
  if (appPage === 'auth') {
    return (
      <>
        <Navbar
          isLanding={true}
          isLoggedIn={false}
          onLoginClick={() => setAppPage('landing')}
        />
        <div className="min-h-screen bg-dark-primary pt-20">
          {showRegister ? (
            <Register onSuccess={handleAuthSuccess} switchToLogin={() => setShowRegister(false)} />
          ) : (
            <Login onSuccess={handleAuthSuccess} switchToRegister={() => setShowRegister(true)} />
          )}
        </div>
      </>
    );
  }

  // Main App Page
  if (!authToken) {
    return (
      <>
        <Navbar
          isLanding={false}
          isLoggedIn={false}
          onLoginClick={() => setAppPage('landing')}
        />
        <div className="min-h-screen bg-dark-primary flex items-center justify-center p-6 pt-24">
          <div className="w-full max-w-3xl">
            {showRegister ? (
              <Register onSuccess={handleAuthSuccess} switchToLogin={() => setShowRegister(false)} />
            ) : (
              <Login onSuccess={handleAuthSuccess} switchToRegister={() => setShowRegister(true)} />
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex h-screen bg-dark-primary text-white overflow-hidden">
      {/* Navbar for App */}
      <Navbar
        isLanding={false}
        isLoggedIn={true}
        onLogout={handleLogout}
        userName={authUser?.username}
      />

      {/* Sidebar */}
      <aside className="w-64 bg-dark-secondary border-r border-border-muted flex flex-col mt-16">
        <div className="p-6 flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-teal to-accent-teal-hover rounded-lg flex items-center justify-center text-white shadow-lg">
            <Leaf size={24} />
          </div>
          <span className="text-xl font-bold gradient-text-dark">EcoFeast</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem
            icon={<TrendingUp size={20} />}
            label="AI Forecast"
            active={activeTab === 'forecaster'}
            onClick={() => setActiveTab('forecaster')}
          />
          <NavItem
            icon={<BarChart3 size={20} />}
            label="Analytics"
            active={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
          />
          <NavItem
            icon={<History size={20} />}
            label="Order History"
            active={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
          />
          <div className="pt-4 mt-4 border-t border-border-muted">
            <NavItem
              icon={<Cpu size={20} />}
              label="System Arch"
              active={activeTab === 'architecture'}
              onClick={() => setActiveTab('architecture')}
            />
          </div>
        </nav>

        <div className="p-4 border-t border-border-muted">
          <button
            onClick={() => setShowEntryForm(true)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-teal to-accent-teal-hover text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all mb-4 hover-lift"
          >
            <Plus size={20} />
            Add Daily Log
          </button>

          <div className="bg-dark-tertiary rounded-xl p-4 border border-border-muted">
            <h4 className="text-xs font-semibold text-accent-teal uppercase tracking-wider mb-1">Impact Summary</h4>
            <div className="flex items-center justify-between text-white">
              <span className="text-sm">Waste Reduction</span>
              <span className="font-bold">+{stats.efficiency}%</span>
            </div>
            <div className="mt-2 w-full bg-border-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-accent-teal to-accent-teal-hover h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.efficiency}%` }}
              ></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden mt-16">
        <header className="h-16 bg-dark-secondary border-b border-border-muted px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <span>Management</span>
            <ChevronRight size={14} />
            <span className="text-white font-bold capitalize">{activeTab}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-text-muted">Logged as:</span>
              <span className="text-white font-semibold ml-2">{authUser?.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 flex items-center gap-2 bg-red-900/20 text-red-500 hover:bg-red-900/30 rounded-lg font-medium text-sm transition-smooth"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && (
            <Dashboard
              stats={stats}
              history={history}
              onRunForecast={() => setActiveTab('forecaster')}
            />
          )}
          {activeTab === 'forecaster' && (
            <Forecaster
              history={history}
              menu={MENU_ITEMS}
              forecast={forecast}
              setForecast={setForecast}
              authToken={authToken}
            />
          )}
          {activeTab === 'analytics' && (
            <Analytics history={history} />
          )}
          {activeTab === 'history' && (
            <HistoryLog history={history} />
          )}
          {activeTab === 'architecture' && (
            <Architecture />
          )}
        </div>
      </main>

      {/* AI Chat Widget */}
      <AIChat authToken={authToken || ''} />

      {/* Voice Command Widget */}
      <VoiceCommand onCommand={handleVoiceCommand} />

      {showEntryForm && (
        <EntryForm
          onClose={() => setShowEntryForm(false)}
          onSubmit={handleAddRecord}
        />
      )}
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active
      ? 'bg-dark-tertiary text-accent-teal'
      : 'text-text-muted hover:bg-dark-tertiary/50 hover:text-white'
      }`}
  >
    {icon}
    {label}
  </button>
);

export default App;
