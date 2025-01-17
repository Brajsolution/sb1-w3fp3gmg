import React from 'react';
import { Calendar } from 'lucide-react';

interface Investment {
  id: string;
  plan_name: string;
  amount: number;
  daily_roi: number;
  start_date: string;
  end_date: string;
  status: string;
}

interface InvestmentsListProps {
  investments: Investment[];
}

const InvestmentsList: React.FC<InvestmentsListProps> = ({ investments }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Your Investments</h2>
      <div className="space-y-4">
        {investments.length === 0 ? (
          <p className="text-gray-400">No active investments</p>
        ) : (
          investments.map((investment) => (
            <div key={investment.id} className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{investment.plan_name}</h3>
                  <p className="text-sm text-gray-400">
                    ${Number(investment.amount).toFixed(2)}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  investment.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  investment.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {investment.status}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(investment.start_date).toLocaleDateString()} - {new Date(investment.end_date).toLocaleDateString()}
              </div>
              <div className="mt-2 text-sm">
                <span className="text-green-400">{investment.daily_roi}% daily ROI</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InvestmentsList;