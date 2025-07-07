import { getAnnualCashflow } from '@/data/getAnnualCashflow';

export default async function CashFlow() {
  const cashflow = await getAnnualCashflow(2025);

  return <div />;
}
