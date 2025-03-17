import { useState } from 'react';

const MortgageCalculator = () => {
  const [inputs, setInputs] = useState({
    loanAmount: '',
    interestRate: '',
    loanTerm: ''
  });

  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
    setError('');
    setResults(null);
  };

  const calculateMortgage = () => {
    try {
      // Validate inputs
      const amount = parseFloat(inputs.loanAmount);
      const rate = parseFloat(inputs.interestRate);
      const years = parseFloat(inputs.loanTerm);

      if (isNaN(amount) || isNaN(rate) || isNaN(years)) {
        throw new Error('Please enter valid numbers for all fields');
      }

      if (amount <= 0 || rate <= 0 || years <= 0) {
        throw new Error('All values must be greater than zero');
      }

      // Calculate monthly interest rate and number of payments
      const monthlyRate = (rate / 100) / 12;
      const totalPayments = years * 12;

      // Calculate monthly payment using the formula
      const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                            (Math.pow(1 + monthlyRate, totalPayments) - 1);

      // Calculate total payment and interest
      const totalPayment = monthlyPayment * totalPayments;
      const totalInterest = totalPayment - amount;

      setResults({
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
      });
      setError('');
    } catch (err) {
      setError(err.message);
      setResults(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Mortgage Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Loan Amount ($)
            <input
              type="number"
              name="loanAmount"
              value={inputs.loanAmount}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g. 200000"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Annual Interest Rate (%)
            <input
              type="number"
              name="interestRate"
              value={inputs.interestRate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g. 5.5"
              step="0.01"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Loan Term (years)
            <input
              type="number"
              name="loanTerm"
              value={inputs.loanTerm}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g. 30"
            />
          </label>
        </div>

        <button
          onClick={calculateMortgage}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate
        </button>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {results && (
          <div className="mt-6 space-y-3 p-4 bg-gray-50 rounded">
            <div className="flex justify-between">
              <span className="font-medium">Monthly Payment:</span>
              <span>${results.monthlyPayment}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Payment:</span>
              <span>${results.totalPayment}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Interest:</span>
              <span>${results.totalInterest}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;