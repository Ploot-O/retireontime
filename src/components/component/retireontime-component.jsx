'use client'
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/77Cl7dNXHdz
 */
import React, { useEffect } from "react";
import Link from "next/link";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LightDarkButton } from "@/components/component/light-dark-toggle-component";
import { Line, Bar, Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Legend,
} from 'chart.js';
import { Info } from "react-feather";
import { Tooltip } from "./Tooltip";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Legend
)

export function RetireOnTimeComponent() {
  const [is401kChecked, set401kChecked] = React.useState(false);
  const [isIRAChecked, setIRAChecked] = React.useState(false);
  const [isMiscChecked, setMiscChecked] = React.useState(false);

  const [principal401k, set401kPrincipal] = React.useState(0);
  const [rate401k, set401kRate] = React.useState(0);
  const [contributions401k, set401kContributions] = React.useState(0);

  const [principalIRA, setIRAPrincipal] = React.useState(0);
  const [rateIRA, setIRARate] = React.useState(0);
  const [contributionsIRA, setIRAContributions] = React.useState(0);

  const [principalMisc, setMiscPrincipal] = React.useState(0);
  const [rateMisc, setMiscRate] = React.useState(0);
  const [contributionsMisc, setMiscContributions] = React.useState(0);

  const [age, setAge] = React.useState(0);
  const [preferredIncome, setPreferredIncome] = React.useState(0);

  const [compoundInterest401k, setCompoundInterest401k] = React.useState(0);
  const [compoundInterestIRA, setCompoundInterestIRA] = React.useState(0);
  const [compoundInterestMisc, setCompoundInterestMisc] = React.useState(0);

  const [totalInterest401k, setTotalInterest401k] = React.useState(0);
  const [totalInterestIRA, setTotalInterestIRA] = React.useState(0);
  const [totalInterestMisc, setTotalInterestMisc] = React.useState(0);

  const [totalRetirement401k, setTotalRetirement401k] = React.useState(0);
  const [totalRetirementIRA, setTotalRetirementIRA] = React.useState(0);
  const [totalRetirementMisc, setTotalRetirementMisc] = React.useState(0);

  const [totalContributed401k, setTotalContributed401k] = React.useState(0);
  const [totalContributedIRA, setTotalContributedIRA] = React.useState(0);
  const [totalContributedMisc, setTotalContributedMisc] = React.useState(0);

  const [totalIncome, setTotalIncome] = React.useState(0);
  const [yearsToRetire, setYearsToRetire] = React.useState(0);
  const [ageToRetire, setAgeToRetire] = React.useState(0);
  const [yearsTo65, setYearsTo65] = React.useState(0);
  const [totalIncomeAt65, setTotalIncomeAt65] = React.useState(0);
  const [supplementalIncome, setSupplementalIncome] = React.useState(0);

  const [years, setYears] = React.useState([]);
  const [balances, setBalances] = React.useState([]);
  const [interest, setInterest] = React.useState([]);
  const [contributed, setContributed] = React.useState([]);

  // variable meanings
  // c = contributions every 2 weeks
  // p = principal at beginning of period
  // r = rate of return per year as percentage
  // t = number of years

  const calculateTotalAfterTYears = (c, p, r, t) => {
    c = Number(c);
    p = Number(p);
    r = Number(r);
    t = Number(t);
    let total = p;
    for (let i = 0; i <= t; i++) {
      total += c * 26;
      total *= (1 + (r / 100));
      if (i === t) {
        total -= c * 26;
      }
    }
    return Number(total);
  };

  // function to calculate total contributions after t years. Contributions are the account balance minus the interest earned.

  const calculateContributionsAfterTYears = (c, p, r, t) => {
    c = Number(c);
    p = Number(p);
    r = Number(r);
    t = Number(t);
    let total = p;
    let contributions = 0;
    for (let i = 0; i < t; i++) {
      contributions += c * 26;
    }
    return Number(contributions);
  };

  const calculateInterestAfterTYears = (c, p, r, t) => {
    // calculates the amount of an account balance that is interest after t years

    c = Number(c);
    p = Number(p);
    r = Number(r);
    t = Number(t);
    let totalInterest = 0;
    let principal = p;

    for (let i = 0; i <= t; i++) {
      let interest = (principal + c * 26) * (r / 100);
      totalInterest += interest;
      principal += c * 26 + interest;
    }

    return Number(totalInterest);
  };

  const calculateInterestPerYearAfterTYears = (c, p, r, t) => {
    c = Number(c);
    p = Number(p);
    r = Number(r);
    t = Number(t);
    let total = p;
    let interestPerYear = 0;
    for (let i = 0; i < t; i++) {
      total += c * 26;
      total *= (1 + (r / 100));
    }
    interestPerYear = total * (r / 100);
    return Number(interestPerYear);
  };

  // function called BuildChart that takes parameters for number of years, an array of account balances per year, and an array of interest per year
  // returns a chart with the number of years on the x axis, and the account balances and interest per year on the y axis

  const buildChart = (years, balances, interest) => {
    const data = {
      labels: years,
      datasets: [
        {
          label: 'Total Retirement Balance',
          data: balances,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          label: 'Total Interest Earned',
          data: interest,
          fill: false,
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
        }
      ]
    };

    const options = {
      plugins: {
        title: {
          display: true,
          text: 'Total Balance and Interest Earned Over Time',
          fontSize: 20,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Age (years)',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Balance ($USD)',
          },
        },
      },
    };

    return (
      <Line data={data} options={options} />
    );
  };

  const buildStackedChart = (years, interest, contributions) => {
    const data = {
      labels: years,
      datasets: [
        {
          label: 'Contributions',
          data: contributions,
          backgroundColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Interest',
          data: interest,
          backgroundColor: 'rgb(54, 162, 235)',
        },
      ],
    };

    const options = {
      plugins: {
        title: {
          display: true,
          text: 'Contributions Invested and Interest Earned Over Time',
          fontSize: 20,
        },
      },
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Age (years)',
          },
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'Balance Breakdown ($USD)',
          },
        },
      },
    };

    return <Bar data={data} options={options} />;
  };

  const calculateRetirement = () => {
    if ((is401kChecked && (contributions401k > 0 && rate401k > 0) || (principal401k > 0 && rate401k > 0)) || (isIRAChecked && (contributionsIRA > 0 && rateIRA > 0) || (principalIRA > 0 && rateIRA > 0)) || (isMiscChecked && (contributionsMisc > 0 && rateMisc > 0) || (principalMisc > 0 && rateMisc > 0))) {

      let yearsTo65 = 65 - age;
      let yearsToRetire = 0;
      let compoundInterest401k = 0;
      let compoundInterestIRA = 0;
      let compoundInterestMisc = 0;
      let totalInterest401k = 0;
      let totalInterestIRA = 0;
      let totalInterestMisc = 0;
      let totalRetirement401k = 0;
      let totalRetirementIRA = 0;
      let totalRetirementMisc = 0;
      let totalContributed401k = 0;
      let totalContributedIRA = 0;
      let totalContributedMisc = 0;
      let totalIncome = 0;
      let ageToRetire = 0;
      let supplementalIncome = 0;
      let totalIncomeAt65 = 0;

      let years = [];
      let balances = [];
      let interest = [];
      let contributed = [];

      while ((totalIncome < preferredIncome) && (yearsToRetire < yearsTo65)) {
        yearsToRetire++;
        if (is401kChecked) {
          compoundInterest401k = calculateInterestPerYearAfterTYears(contributions401k, principal401k, rate401k, yearsToRetire);
          totalInterest401k = calculateInterestAfterTYears(contributions401k, principal401k, rate401k, yearsToRetire);
          totalRetirement401k = calculateTotalAfterTYears(contributions401k, principal401k, rate401k, yearsToRetire);
          totalContributed401k = calculateContributionsAfterTYears(contributions401k, principal401k, rate401k, yearsToRetire);
        }
        if (isIRAChecked) {
          compoundInterestIRA = calculateInterestPerYearAfterTYears(contributionsIRA, principalIRA, rateIRA, yearsToRetire);
          totalInterestIRA = calculateInterestAfterTYears(contributionsIRA, principalIRA, rateIRA, yearsToRetire);
          totalRetirementIRA = calculateTotalAfterTYears(contributionsIRA, principalIRA, rateIRA, yearsToRetire);
          totalContributedIRA = calculateContributionsAfterTYears(contributionsIRA, principalIRA, rateIRA, yearsToRetire);
        }
        if (isMiscChecked) {
          compoundInterestMisc = calculateInterestPerYearAfterTYears(contributionsMisc, principalMisc, rateMisc, yearsToRetire);
          totalInterestMisc = calculateInterestAfterTYears(contributionsMisc, principalMisc, rateMisc, yearsToRetire);
          totalRetirementMisc = calculateTotalAfterTYears(contributionsMisc, principalMisc, rateMisc, yearsToRetire);
          totalContributedMisc = calculateContributionsAfterTYears(contributionsMisc, principalMisc, rateMisc, yearsToRetire);
        }
        totalIncome = Number(compoundInterest401k) + Number(compoundInterestIRA) + Number(compoundInterestMisc);

        ageToRetire = Number(age) + Number(yearsToRetire);
        if (yearsToRetire >= yearsTo65) {
          supplementalIncome = Number(preferredIncome) - Number(totalIncome);
          totalIncomeAt65 = totalIncome;
        }

        years.push(ageToRetire);
        balances.push(totalRetirement401k + totalRetirementIRA + totalRetirementMisc);
        interest.push(totalInterest401k + totalInterestIRA + totalInterestMisc);
        contributed.push(totalContributed401k + totalContributedIRA + totalContributedMisc);
      }
      setYearsToRetire(yearsToRetire);
      setCompoundInterest401k(Number(compoundInterest401k).toFixed(2).toLocaleString());
      setCompoundInterestIRA(Number(compoundInterestIRA).toFixed(2).toLocaleString());
      setCompoundInterestMisc(Number(compoundInterestMisc).toFixed(2).toLocaleString());
      setTotalInterest401k(Number(totalInterest401k).toFixed(2).toLocaleString());
      setTotalInterestIRA(Number(totalInterestIRA).toFixed(2).toLocaleString());
      setTotalInterestMisc(Number(totalInterestMisc).toFixed(2).toLocaleString());
      setTotalRetirement401k(Number(totalRetirement401k).toFixed(2).toLocaleString());
      setTotalRetirementIRA(Number(totalRetirementIRA).toFixed(2).toLocaleString());
      setTotalRetirementMisc(Number(totalRetirementMisc).toFixed(2).toLocaleString());
      setTotalContributed401k(Number(totalContributed401k).toFixed(2).toLocaleString());
      setTotalContributedIRA(Number(totalContributedIRA).toFixed(2).toLocaleString());
      setTotalContributedMisc(Number(totalContributedMisc).toFixed(2).toLocaleString());
      setTotalIncome(Number(totalIncome).toFixed(2).toLocaleString());
      setAgeToRetire(ageToRetire);
      setSupplementalIncome(Number(supplementalIncome).toFixed(2).toLocaleString());
      setTotalIncomeAt65(Number(totalIncomeAt65).toFixed(2).toLocaleString());
      setYearsTo65(yearsTo65);

      setYears(years);
      setBalances(balances);
      setInterest(interest);
      setContributed(contributed);
    }

  };

  let numChecked = [is401kChecked, isIRAChecked, isMiscChecked].filter(Boolean).length;

  let gridClass;
  switch (numChecked) {
    case 1:
      gridClass = "sm:grid-cols-1";
      break;
    case 2:
      gridClass = "sm:grid-cols-2";
      break;
    case 3:
      gridClass = "sm:grid-cols-3";
      break;
    default:
      gridClass = "";
  }

  return (
    <div className="flex flex-col h-screen">
      <nav className="grid grid-cols-1 sm:grid-cols-3 items-center justify-center sm:justify-between px-2 py-2 border-b">
        <div className="grid mx-1 justify-center sm:justify-start">
          <h1 className="font-bold text-xl text-blue-500 italic">retireonti.me</h1>
        </div>
        <div className="grid mx-1 justify-center sm:justify-center">
          <Link
            className="text-sm text-blue-500 hover:text-red-500"
            href="https://paulbro.cc" target="_blank">
            check out the developer
          </Link>
        </div>
        <div className="grid mx-1 justify-center sm:justify-end lightdarkbtn">
          <LightDarkButton />
        </div>
      </nav>
      <main className="flex flex-col flex-grow p-6 gap-6">

        <Card>
          <CardHeader>
            <CardTitle className="italic">Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Tooltip text={"Enter your current age in years"}>
              <label htmlFor="age">current age in years</label>
              <Info className="cursor-help ml-2" />
            </Tooltip>
            <Input placeholder="current age in years" type="number" value={age} onChange={e => {
              if (e.target.value >= 0 && e.target.value < 65) {
                setAge(e.target.value);
                calculateRetirement();
              }
              else {
                alert("Please enter an age between 0 and 65 years.");
              }
            }}
            />
            <Tooltip text={"Enter your preferred income per year after retirement in USD"}>
              <label htmlFor="preferredIncome">preferred retirement income per year ($USD)</label>
              <Info className="cursor-help ml-2" />
            </Tooltip>
            <Input placeholder="preferred retirement income per year ($USD)" type="number" value={preferredIncome} onChange={e => {
              if (e.target.value >= 0) {
                setPreferredIncome(e.target.value);
                calculateRetirement();
              }
              else {
                alert("Please enter a preferred income greater than $0.");
              }
            }} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="italic">Retirement Accounts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <span>
                <input type="checkbox" id="401k" value="401k" onChange={e => {
                  set401kChecked(e.target.checked);
                  calculateRetirement();

                }} />
                <label htmlFor="401k">401k</label>
              </span>
              <span>
                <input type="checkbox" id="ira" value="ira" onChange={e => {
                  setIRAChecked(e.target.checked);
                  calculateRetirement();
                }} />
                <label htmlFor="ira">IRA</label>
              </span>
              <span>
                <input type="checkbox" id="misc" value="misc" onChange={e => {
                  setMiscChecked(e.target.checked);
                  calculateRetirement();
                }} />
                <label htmlFor="misc">other account</label>
              </span>
            </div>
            <div className={`grid grid-cols-1 ${gridClass} gap-12`}>

              {is401kChecked && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-lg text-blue-500">401k</h3>
                  <label htmlFor="contributions401k">total contribution per 2 weeks ($USD)</label>
                  <Input placeholder="total contribution per 2 weeks ($USD)" type="number" value={contributions401k} onChange={e => {
                    if (e.target.value >= 0) {
                      set401kContributions(e.target.value);
                      calculateRetirement();
                    }
                    else {
                      alert("The 401k Contribution cannot be a negative number.");
                    }
                  }} />
                  <label htmlFor="principal401k">total in account ($USD)</label>
                  <Input placeholder="total in account ($USD)" type="number" value={principal401k} onChange={e => {
                    if (e.target.value >= 0) {
                      set401kPrincipal(e.target.value);
                      calculateRetirement();
                    }
                    else {
                      alert("The 401k Principal cannot be a negative number.");
                    }
                  }} />
                  <label htmlFor="rate401k">expected growth per year (%)</label>
                  <Input placeholder="expected growth per year (%)" type="number" value={rate401k} onChange={e => {
                    if (e.target.value >= 0) {
                      set401kRate(e.target.value);
                      calculateRetirement();
                    }
                    else {
                      alert("The 401k Rate cannot be a negative number.");
                    }
                  }} />
                </div>
              )}
              {isIRAChecked && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-lg text-blue-500">IRA</h3>
                  <label htmlFor="contributionsIRA">total contribution per 2 weeks ($USD)</label>
                  <Input placeholder="total contribution per 2 weeks ($USD)" type="number" value={contributionsIRA} onChange={e => {
                    if (e.target.value >= 0) {
                      setIRAContributions(e.target.value);
                      calculateRetirement();
                    }
                    else {
                      alert("The IRA Contribution cannot be a negative number.");
                    }
                  }} />
                  <label htmlFor="principalIRA">total in account ($USD)</label>
                  <Input placeholder="total in account ($USD)" type="number" value={principalIRA} onChange={e => {
                    if (e.target.value >= 0) {
                      setIRAPrincipal(e.target.value);
                      calculateRetirement();
                    }
                    else {
                      alert("The IRA Principal cannot be a negative number.");
                    }
                  }} />
                  <label htmlFor="rateIRA">expected growth per year (%)</label>
                  <Input placeholder="expected growth per year (%)" type="number" value={rateIRA} onChange={e => {
                    if (e.target.value >= 0) {
                      setIRARate(e.target.value);
                      calculateRetirement();
                    }
                    else {
                      alert("The IRA Rate cannot be a negative number.");
                    }
                  }} />
                </div>
              )}
              {isMiscChecked && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-lg text-blue-500">other account</h3>
                  <label htmlFor="contributionsMisc">total contribution per 2 weeks ($USD)</label>
                  <Input placeholder="total contribution per 2 weeks ($USD)" type="number" value={contributionsMisc} onChange={e => {
                    if (e.target.value >= 0) {
                      setMiscContributions(e.target.value);
                      calculateRetirement();
                    }
                    else {
                      alert("The Misc Contribution cannot be a negative number.");
                    }
                  }} />
                  <label htmlFor="principalMisc">total in account ($USD)</label>
                  <Input placeholder="total in account ($USD)" type="number" value={principalMisc} onChange={e => {
                    if (e.target.value >= 0) {
                      setMiscPrincipal(e.target.value);
                      calculateRetirement();
                    }
                    else {
                      alert("The Misc Principal cannot be a negative number.");
                    }
                  }} />
                  <label htmlFor="rateMisc">expected growth per year (%)</label>
                  <Input placeholder="expected growth per year (%)" type="number" value={rateMisc} onChange={e => {
                    if (e.target.value >= 0) {
                      setMiscRate(e.target.value);
                      calculateRetirement();
                    }
                    else {
                      alert("The Misc Rate cannot be a negative number.");
                    }
                  }} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          <button className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={e => calculateRetirement()}>Calculate Retirement</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Account balance(s) when you retire:</CardTitle>
            </CardHeader>
            {is401kChecked && (<CardContent>401k: ${totalRetirement401k}</CardContent>)}
            {isIRAChecked && (<CardContent>IRA: ${totalRetirementIRA}</CardContent>)}
            {isMiscChecked && (<CardContent>other account: ${totalRetirementMisc}</CardContent>)}
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Age you can retire on preferred income from interest:</CardTitle>
            </CardHeader>
            {
              yearsToRetire < yearsTo65 ? (
                <CardContent>{ageToRetire} years old</CardContent>
              ) : (
                <CardContent>you will not be able to retire on preferred income before 65.</CardContent>
              )
            }
          </Card>
          {
            yearsToRetire < yearsTo65 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No supplemental income required</CardTitle>
                </CardHeader>
                <CardContent>Congrats! You are on track to retire by {ageToRetire}.</CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Supplemental annual income required to reach preferred income:</CardTitle>
                </CardHeader>
                <CardContent>Supplemental income: ${supplementalIncome}</CardContent>
                <CardContent>Interest generated per year at 65: ${totalIncomeAt65}</CardContent>
              </Card>
            )
          }
        </div>

        <div className="grid grid-cols-1 gap-4">
          {buildChart(years, balances, interest)}
        </div>
        <div className="grid grid-cols-1 gap-4">
          {buildStackedChart(years, interest, contributed)}
        </div>
      </main>
      <footer className="flex items-center justify-center h-16 border-t px-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">© 2023 retireonti.me</p>
      </footer>
    </div>
  )
}
