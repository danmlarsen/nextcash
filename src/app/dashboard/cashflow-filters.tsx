'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export default function CashflowFilters({ year, yearsRange }: { year: number; yearsRange: number[] }) {
  const router = useRouter();

  return (
    <div>
      <Select
        defaultValue={year.toString()}
        onValueChange={value => {
          router.push(`/dashboard?cfyear=${value}`);
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {yearsRange.map(year => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
