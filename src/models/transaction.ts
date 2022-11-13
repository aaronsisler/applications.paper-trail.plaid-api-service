import { Transaction as PlaidTransaction } from "plaid";

interface Transaction {
  transactionId: string;
  amount: number;
  date: string;
  pending: boolean;
  name: string;
  categoryId: string | null;
  category: string[] | null;
  datetime: string | null;
  merchantName?: string | null;
}

const accountTransactionFactory = (
  transactionDto: PlaidTransaction
): Transaction => {
  return {
    category: transactionDto.category,
    categoryId: transactionDto.category_id,
    amount: transactionDto.amount,
    date: transactionDto.date,
    datetime: transactionDto.datetime,
    pending: transactionDto.pending,
    transactionId: transactionDto.transaction_id,
    merchantName: transactionDto.merchant_name,
    name: transactionDto.name,
  };
};

export { Transaction, accountTransactionFactory };
