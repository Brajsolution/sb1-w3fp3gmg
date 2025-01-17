import React from 'react';
import { Zap, Gem, Crown } from 'lucide-react';

const InvestmentPlans = () => {
  const plans = [
    {
      icon: <Zap className="w-12 h-12 text-blue-400" />,
      name: 'Starter',
      minInvestment: '100',
      maxInvestment: '999',
      dailyReturn: '1.2',
      duration: '30',
      color: 'blue'
    },
    {
      icon: <Gem className="w-12 h-12 text-purple-400" />,
      name: 'Advanced',
      minInvestment: '1,000',
      maxInvestment: '4,999',
      dailyReturn: '1.5',
      duration: '60',
      color: 'purple'
    },
    {
      icon: <Crown className="w-12 h-12 text-yellow-400" />,
      name: 'Premium',
      minInvestment: '5,000',
      maxInvestment: '50,000',
      dailyReturn: '2.0',
      duration: '90',
      color: 'yellow'
    }
  ];

  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Investment Plans</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-gray-800 rounded-xl p-8 hover:transform hover:scale-105 transition duration-300">
            <div className="text-center mb-6">
              {plan.icon}
              <h3 className="text-2xl font-bold mt-4">{plan.name}</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Min Investment</span>
                <span className="font-semibold">${plan.minInvestment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Max Investment</span>
                <span className="font-semibold">${plan.maxInvestment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Return</span>
                <span className="font-semibold text-green-400">{plan.dailyReturn}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Duration</span>
                <span className="font-semibold">{plan.duration} Days</span>
              </div>
            </div>
            
            <button className={`w-full mt-8 px-6 py-3 rounded-lg bg-${plan.color}-500 hover:bg-${plan.color}-600 transition font-semibold`}>
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InvestmentPlans;