import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const InvestmentCalculator = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [duration, setDuration] = useState<number>(30);

  const calculateReturns = () => {
    const dailyRate = 0.015; // 1.5% daily return
    const totalReturn = amount * (1 + dailyRate) ** duration;
    return totalReturn.toFixed(2);
  };

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="bg-gray-800 rounded-xl p-8">
        <div className="flex items-center mb-6">
          <Calculator className="w-8 h-8 text-green-400 mr-3" />
          <h2 className="text-3xl font-bold">Investment Calculator</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Investment Amount (USDT)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
                min="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Duration (Days)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
                min="1"
                max="365"
              />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 flex flex-col justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-2">Estimated Returns</p>
              <p className="text-4xl font-bold text-green-400">${calculateReturns()}</p>
              <p className="text-sm text-gray-400 mt-2">Based on 1.5% daily ROI</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentCalculator;