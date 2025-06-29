'use client';

import TransactionForm, { transactionFormSchema } from '@/components/transaction-form';
import { type TCategory } from '@/types/category';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

export default function EditTransactionForm({
  categories,
  transaction,
}: {
  categories: TCategory[];
  transaction: {
    id: number;
    categoryId: number;
    amount: string;
    description: string;
    transactionDate: string;
  };
}) {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result: any = {};

    if (result.error) {
      toast.error(result.message);
      return;
    }

    toast.success('Transaction updated');
    router.push(`/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}&year=${data.transactionDate.getFullYear()}`);
  };

  return (
    <TransactionForm
      categories={categories}
      onSubmit={handleSubmit}
      defaultValues={{
        amount: Number(transaction.amount),
        categoryId: transaction.categoryId,
        description: transaction.description,
        transactionDate: new Date(transaction.transactionDate),
        transactionType: categories.find(category => category.id === transaction.categoryId)?.type ?? 'income',
      }}
    />
  );
}
