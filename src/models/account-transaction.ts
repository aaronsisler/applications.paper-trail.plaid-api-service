import { Transaction as PlaidTransaction } from "plaid";

interface AccountTransaction {
  accountTransactionId?: number;
  transactionId: string;
  userId?: number;
  accountId: string;
  amount: number;
  accountTransactionDate: string;
  accountTransactionYear: number;
  accountTransactionMonth: number;
  accountTransactionDay: number;
  pending: boolean;
  merchantName: string;
  categoryId: string | null;
  category: string[] | null;
  merchantNameDetailed?: string | null;
}

interface RemovedAccountTransaction {
  accountTransactionId?: number;
  transactionId: string;
  userId?: number;
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
  category_id: string | null;
  category: string[] | null;
  merchant_name_detailed?: string | null;
}

interface AccountTransactionDate {
  year: number;
  month: number;
  day: number;
}

const accountTransactionFactory = (
  transactionDto: PlaidTransaction,
  userId: number
): AccountTransaction => {
  const date = parseAccountTransactionDate(
    transactionDto.authorized_date || "99999999"
  );

  return {
    accountTransactionId: undefined,
    userId,
    accountId: transactionDto.account_id,
    category: transactionDto.category,
    categoryId: transactionDto.category_id,
    amount: transactionDto.amount,
    accountTransactionDate: transactionDto.date,
    accountTransactionYear: date.year,
    accountTransactionMonth: date.month,
    accountTransactionDay: date.day,
    pending: transactionDto.pending,
    transactionId: transactionDto.transaction_id,
    merchantName: transactionDto.name,
    merchantNameDetailed: transactionDto.merchant_name,
  };
};

const removedAccountTransactionFactory = (
  transactionDto: PlaidTransaction,
  userId: number
): RemovedAccountTransaction => {
  return {
    accountTransactionId: undefined,
    userId,
    transactionId: transactionDto.transaction_id,
  };
};

const parseAccountTransactionDate = (
  fullDate: string
): AccountTransactionDate => {
  // 01234567890
  // 0123-56-89
  const year = parseInt(fullDate.substring(0, 4));
  const month = parseInt(fullDate.substring(5, 7));
  const day = parseInt(fullDate.substring(8, 10));

  return { year, month, day };
};

export {
  AccountTransactionDto,
  AccountTransaction,
  RemovedAccountTransaction,
  accountTransactionFactory,
  removedAccountTransactionFactory,
};
