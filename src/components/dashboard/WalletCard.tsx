import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletCardProps {
  wallet: {
    balance: number;
    currency: string;
  };
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Wallet className="w-6 h-6 text-blue-400 mr-2" />
          <h3 className="font-semibold">Wallet Balance</h3>
        </div>
        <span className="text-xl font-bold">${Number(wallet.balance).toFixed(2)}</span>
      </div>
      <div className="flex space-x-2">
        <button className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold text-sm">
          Deposit
        </button>
        <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold text-sm">
          Withdraw
        </button>
      </div>
    </div>
  );
};