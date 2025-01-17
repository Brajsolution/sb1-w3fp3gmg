import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'roi';
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowUpRight className="w-4 h-4 text-green-400" />;
      case 'withdrawal':
        return <ArrowDownRight className="w-4 h-4 text-red-400" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-400">No transactions yet</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between bg-gray-900 rounded-lg p-4">
              <div className="flex items-center">
                <div className="mr-3">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-semibold capitalize">{transaction.type}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'withdrawal' ? 'text-red-400' : 'text-green-400'
                }`}>
                  {transaction.type === 'withdrawal' ? '-' : '+'}
                  ${Number(transaction.amount).toFixed(2)}
                </p>
                <p className={`text-xs ${
                  transaction.status === 'completed' ? 'text-green-400' :
                  transaction.status === 'pending' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {transaction.status}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;