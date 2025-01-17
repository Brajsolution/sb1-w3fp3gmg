import React from 'react';
import { Users, Wallet, Clock, Award } from 'lucide-react';

const Stats = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-3xl font-bold mb-1">15,000+</div>
          <div className="text-gray-400">Active Users</div>
        </div>
        <div className="text-center">
          <Wallet className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-3xl font-bold mb-1">$25M+</div>
          <div className="text-gray-400">Total Investment</div>
        </div>
        <div className="text-center">
          <Clock className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-3xl font-bold mb-1">730</div>
          <div className="text-gray-400">Days Operating</div>
        </div>
        <div className="text-center">
          <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-3xl font-bold mb-1">99.9%</div>
          <div className="text-gray-400">Satisfaction Rate</div>
        </div>
      </div>
    </section>
  );
};

export default Stats;