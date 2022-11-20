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
  category: string[] | null;
  merchantNameDetailed?: string | null;
  isAdded: boolean;
  isModified: boolean;
}

const stagedAddedAccountTransactionFactory = (
  transactionDto: PlaidTransaction,
  userId: number,
  isModified: boolean = false
): StagedAddedAccountTransaction => {
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
    isAdded: !isModified,
    isModified,
  };
};

export {
  AccountTransactionDateDto,
  StagedAddedAccountTransaction,
  stagedAddedAccountTransactionFactory,
};
