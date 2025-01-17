import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { LineChart, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import WalletCard from './WalletCard';
import InvestmentsList from './InvestmentsList';
import TransactionHistory from './TransactionHistory';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [investments, setInvestments] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileData, walletData, investmentsData, transactionsData] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('wallets').select('*').eq('user_id', user.id).single(),
        supabase.from('investments').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10)
      ]);

      setProfile(profileData.data);
      setWallet(walletData.data);
      setInvestments(investmentsData.data || []);
      setTransactions(transactionsData.data || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-green-400 animate-spin" />
      </div>
    );
  }

  const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const activeInvestments = investments.filter(inv => inv.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {profile?.full_name}</h1>
          <p className="text-gray-400">Here's your investment overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WalletCard wallet={wallet} />
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <ArrowUpRight className="w-6 h-6 text-green-400 mr-2" />
                <h3 className="font-semibold">Total Invested</h3>
              </div>
              <span className="text-xl font-bold">${totalInvested.toFixed(2)}</span>
            </div>
            <p className="text-gray-400">{activeInvestments} active investments</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <LineChart className="w-6 h-6 text-purple-400 mr-2" />
                <h3 className="font-semibold">Total Earnings</h3>
              </div>
              <span className="text-xl font-bold text-green-400">
                ${transactions
                  .filter(t => t.type === 'roi')
                  .reduce((sum, t) => sum + Number(t.amount), 0)
                  .toFixed(2)}
              </span>
            </div>
            <p className="text-gray-400">Lifetime earnings</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InvestmentsList investments={investments} />
          <TransactionHistory transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;