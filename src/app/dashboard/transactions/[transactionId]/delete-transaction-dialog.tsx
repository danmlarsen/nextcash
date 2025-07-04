'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { deleteTransaction } from './actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function DeleteTransactionDialog({ transactionId, transactionDate }: { transactionId: number; transactionDate: string }) {
  const router = useRouter();

  async function handleDeleteConfirm() {
    const result = await deleteTransaction(transactionId);

    if (result?.error) {
      toast.error(result.message);
      return;
    }

    toast.success('Transaction deleted');

    const [year, month] = transactionDate.split('-');

    router.push(`/dashboard/transactions?month=${month}&year=${year}`);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This transaction will be permanently deleted.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
