import React from 'react';
import GoogleChart from '../charts/charts';

const Dashboard = () => {
  const sales = 152000;
  const cost = 99700;
  const profit = 32100;
  const topSellingProducts = [
    { name: 'Healthcare Erbology in Accessories', sales: 13153 },
    { name: 'Healthcare Erbology in Accessories', sales: 13153 },
    { name: 'Healthcare Erbology in Accessories', sales: 13153 },
    { name: 'Healthcare Erbology in Accessories', sales: 13153 },
  ];
  const recentTransactions = [
    { name: 'Jagarnath S.', date: '24.05.2023', amount: 124.97, status: 'Paid' },
    { name: 'Anand G.', date: '23.05.2023', amount: 55.42, status: 'Pending' },
    { name: 'Kartik S.', date: '23.05.2023', amount: 89.90, status: 'Paid' },
    { name: 'Rakesh S.', date: '22.05.2023', amount: 144.94, status: 'Pending' },
    { name: 'Anup S.', date: '22.05.2023', amount: 70.52, status: 'Paid' },
    { name: 'Jimmy P.', date: '22.05.2023', amount: 50.35, status: 'Paid' },
  ];
  const topProductsByUnitsSold = [
    { name: 'Men Grey Hoodie', price: 49.90, units: 204 },
    { name: 'Women Striped T-Shirt', price: 34.90, units: 155 },
    { name: 'Women White T-Shirt', price: 40.90, units: 120 },
    { name: 'Men White T-Shirt', price: 49.90, units: 100 },
    { name: 'Women Red T-Shirt', price: 34.90, units: 90 },
  ];

  return (
    <div className=''>
         <div className='w-[100%] justify-between flex'>
      {/* Financial Overview */}
      <div className='w-[57%]'>
      <div className="w-[100%] flex  mb-6">
       
        <div className="bg-pink-100 p-4 px-[40px] py-[20px] rounded-lg shadow-md flex justify-between mx-2">
            <div>
            <img className='mr-[10px]' src="src/assets/img/iconly-glass-chart.svg.png" alt="" />
            </div>
            <div className='flex-1'>
          <div className="text-sm text-pink-600">Sales</div>
          <div className="text-2xl font-semibold">${(sales / 1000).toFixed(1)}k</div>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 px-[40px] py-[20px] rounded-lg shadow-md flex  mx-2">
            <div>
                <img className='mr-[10px]' src="src/assets/img/iconly-glass-discount.svg.png" alt="" />
            </div>
            <div className='flex-1'>
          <div className="text-sm text-yellow-600">Cost</div>
          <div className="text-2xl font-semibold">${(cost / 1000).toFixed(1)}k</div>
          </div>
        </div>
        <div className="bg-green-100 p-4 px-[40px] py-[20px] rounded-lg shadow-md flex  mx-2">
            <div>
                <img className='mr-[10px]' src="src/assets/img/div.MuiBox-root.png" alt="" />
            </div>
            <div className='flex-1'>
          <div className="text-sm text-green-600">Profit</div>
          <div className="text-2xl font-semibold">${(profit / 1000).toFixed(1)}k</div>
          </div>
        </div>
      </div>
      <div>
            <GoogleChart/>
        </div>
        </div>
      
      {/* Top Selling Products */}
     
    
      <div className="bg-white p-6 border border-gray-300 rounded-lg  mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Top selling products</h2>
          <a href="#" className="text-sm text-blue-600">See All</a>
        </div>
        {topSellingProducts.map((product, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b last:border-none">
            <div className="flex items-center">
              <div className="bg-gray-200 h-10 w-10 mr-4"></div>
              <span className="text-gray-700">{product.name}</span>
            </div>
            <span className="text-gray-500">{product.sales.toLocaleString()} in sales</span>
          </div>
        ))}
      </div>
      </div>
      <div className="flex  -mx-2">
        {/* Recent Transactions */}
        <div className="w-full lg:w-1/2 px-2 mb-4">
          <div className="bg-white p-6 rounded-lg border border-gray-300">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-2 text-left text-sm text-gray-500">Name</th>
                  <th className="py-2 text-left text-sm text-gray-500">Date</th>
                  <th className="py-2 text-left text-sm text-gray-500">Amount</th>
                  <th className="py-2 text-left text-sm text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="py-2">{transaction.name}</td>
                    <td className="py-2">{transaction.date}</td>
                    <td className="py-2">${transaction.amount.toFixed(2)}</td>
                    <td className={`py-2 ${transaction.status === 'Paid' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {transaction.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products by Units Sold */}
        <div className="w-full lg:w-1/2 px-2 mb-4">
          <div className="bg-white p-6 rounded-lg border border-gray-300">
            <h2 className="text-xl font-semibold mb-4">Top Products by Units Sold</h2>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-2 text-left text-sm text-gray-500">Name</th>
                  <th className="py-2 text-left text-sm text-gray-500">Price</th>
                  <th className="py-2 text-left text-sm text-gray-500">Units</th>
                </tr>
              </thead>
              <tbody>
                {topProductsByUnitsSold.map((product, index) => (
                  <tr key={index}>
                    <td className="py-2">{product.name}</td>
                    <td className="py-2">${product.price.toFixed(2)}</td>
                    <td className="py-2">{product.units}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
