import { Transaction as PlaidTransaction } from "plaid";
import {
  AccountTransactionDateDto,
  parseAccountTransactionDate,
} from "./account-transaction-date-dto";

interface StagedAddedAccountTransaction {
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
  category: string[];
  merchantNameDetailed?: string | null;
}

const stagedAddedAccountTransactionFactory = (
  transactionDto: PlaidTransaction,
  userId: number
): StagedAddedAccountTransaction => {
  const date = parseAccountTransactionDate(
    transactionDto.authorized_date || "9999-99-99"
  );

  return {
    accountTransactionId: undefined,
    userId,
    accountId: transactionDto.account_id,
    category: transactionDto.category || [],
    categoryId: transactionDto.category_id,
    amount: transactionDto.amount,
    accountTransactionDate: date.fullDate,
    accountTransactionYear: date.year,
    accountTransactionMonth: date.month,
    accountTransactionDay: date.day,
    pending: transactionDto.pending,
    transactionId: transactionDto.transaction_id,
    merchantName: transactionDto.name,
    merchantNameDetailed: transactionDto.merchant_name,
  };
};

export {
  AccountTransactionDateDto,
  StagedAddedAccountTransaction,
  stagedAddedAccountTransactionFactory,
};
