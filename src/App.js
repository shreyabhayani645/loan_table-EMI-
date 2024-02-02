import React, { useState } from 'react';

const App = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [loanTermYears, setLoanTermYears] = useState('');
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  let [age, setage] = useState({
    months: 0,
    emi: 0,
    interest: 0,
    tot_interest: 0,
    year_interest: 0,

  });

  const calculateAmortization = () => {

    const rate = parseFloat(annualInterestRate) / 100 / 12;

    const months = parseFloat(loanTermYears) * 12;

    const emi = (loanAmount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

    const interest = emi * months;

    const tot_interest = interest - loanAmount;

    const year_interest = tot_interest / loanTermYears;

    setage({
      months: months.toFixed(1),
      emi: emi.toFixed(1),
      interest: interest.toFixed(1),
      tot_interest: tot_interest.toFixed(1),
      year_interest: year_interest.toFixed(1),
    });
  

    let rBalance = loanAmount;
    const schedule = [];

    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    for (let i = 1; i <= months; i++) {
      const monthInterest = rBalance * rate;
      const principalAmt = emi - monthInterest;
      const endBalance = rBalance - principalAmt;

      schedule.push({
        month: `${monthNames[currentMonth]} ${currentYear}`,
        startingBalance: typeof rBalance === 'number' ? rBalance.toFixed(0) : rBalance,
        emi: emi.toFixed(0),
        principal: principalAmt.toFixed(0),
        interest: monthInterest.toFixed(0),
        endingBalance: Math.abs(endBalance).toFixed(0),
      });

      rBalance -= principalAmt;
      currentMonth++;
      if (currentMonth === 12) {
        currentMonth = 0;
        currentYear++;
      }
    }

    setAmortizationSchedule(schedule);
  };

  return (
    <div>
      <h2>Loan Amortization Table</h2>
      Loan Amount:
        <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}></input>
      <br></br><br></br>
      Annual Interest Rate (%):
        <input type="number" value={annualInterestRate} onChange={(e) => setAnnualInterestRate(e.target.value)}></input>
      <br></br><br></br>
      Loan Term (Years):
        <input type="number" value={loanTermYears} onChange={(e) => setLoanTermYears(e.target.value)}></input>
      <br></br><br></br>
      <input type='button' value='Calculate Amortization' onClick={calculateAmortization}></input>

      <div className='allper'>
        <h4>Payment Duration:<span>{age.months}</span></h4>
        <h4>Calculated Monthly EMI:<span>{age.emi}</span></h4>
        <h4>Total Amount with Interest:<span>{age.interest}</span></h4>
        <h4>Total Interest Amount:<span>{age.tot_interest}</span></h4>
        <h4>Yearly Interest Amount:<span>{age.year_interest}</span></h4>
      </div>

      <table border="1">
          <tr>
            <th>Month</th>
            <th>Starting Balance</th>
            <th>EMI</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Ending Balance</th>
          </tr>

          {amortizationSchedule.map((entry, index) => (
            <tr key={index}>
              <td>{entry.month}</td>
              <td>{entry.startingBalance}</td>
              <td>{entry.emi}</td>
              <td>{entry.principal}</td>
              <td>{entry.interest}</td>
              <td>{entry.endingBalance}</td>
            </tr>
          ))}

      </table>

    </div>
  );
};

export default App;