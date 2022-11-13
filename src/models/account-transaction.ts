import { Transaction as PlaidTransaction } from "plaid";

interface AccountTransaction {
  accountTransactionId?: number;
  transactionId: string;
  userId?: number;
  accountId: string;
  amount: number;
  accountTransactionDate: string;
  pending: boolean;
  merchantName: string;
  categoryId: string | null;
  category: string[] | null;
  accountTransactionDatetime: string | null;
  merchantNameDetailed?: string | null;
}

interface AccountTransactionDto {
  account_transaction_id: number;
  user_id: number;
  transaction_id: string;
  account_id: string;
  amount: number;
  account_transaction_date: string;
  pending: boolean;
  merchant_name: string;
  categoryId: string | null;
  category: string[] | null;
  account_transaction_datetime: string | null;
  merchant_name_detailed?: string | null;
}

const accountTransactionFactory = (
  transactionDto: PlaidTransaction
): AccountTransaction => {
  return {
    accountTransactionId: undefined,
    userId: undefined,
    accountId: transactionDto.account_id,
    category: transactionDto.category,
    categoryId: transactionDto.category_id,
    amount: transactionDto.amount,
    accountTransactionDate: transactionDto.date,
    accountTransactionDatetime: transactionDto.datetime,
    pending: transactionDto.pending,
    transactionId: transactionDto.transaction_id,
    merchantName: transactionDto.name,
    merchantNameDetailed: transactionDto.merchant_name,
  };
};

export { AccountTransactionDto, AccountTransaction, accountTransactionFactory };
