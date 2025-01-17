import React from 'react';
import { Wallet, LineChart, Battery, ArrowUpRight, Shield, Users } from 'lucide-react';
import InvestmentCalculator from './components/InvestmentCalculator';
import InvestmentPlans from './components/InvestmentPlans';
import Stats from './components/Stats';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Battery className="w-8 h-8 text-green-400" />
            <span className="text-xl font-bold">CryptoPower</span>
          </div>
          <div className="flex space-x-6">
            <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">Login</button>
            <button className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition">Register</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">Power Your Crypto Investment</h1>
        <p className="text-xl text-gray-400 mb-8">Secure, Reliable, and High-Yield Investment Platform</p>
        <button className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-lg font-semibold transition flex items-center mx-auto">
          Start Investing <ArrowUpRight className="ml-2" />
        </button>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Investment Plans */}
      <InvestmentPlans />

      {/* Calculator Section */}
      <InvestmentCalculator />

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose CryptoPower</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <Shield className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
            <p className="text-gray-400">Military-grade encryption and secure storage for your investments</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <LineChart className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">High Returns</h3>
            <p className="text-gray-400">Competitive ROI with daily profit distribution</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <Users className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-400">Join thousands of successful investors worldwide</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Battery className="w-6 h-6 text-green-400" />
              <span className="font-bold">CryptoPower</span>
            </div>
            <div className="text-gray-400">© 2024 CryptoPower. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;