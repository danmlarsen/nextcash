'use client';

import TransactionForm, { transactionFormSchema } from '@/components/transaction-form';
import { type TCategory } from '@/types/category';
import { z } from 'zod';
import { createTransaction } from './actions';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

export default function NewTransactionForm({ categories }: { categories: TCategory[] }) {
  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await createTransaction({
      amount: data.amount,
      transactionDate: format(data.transactionDate, 'yyyy-MM-dd'),
      categoryId: data.categoryId,
      description: data.description,
    });

    if (result.error) {
      toast.error(result.message);
      return;
    }

    toast.success('');
    redirect('/dashboard/transactions');
  };

  return <TransactionForm categories={categories} onSubmit={handleSubmit} />;
}
