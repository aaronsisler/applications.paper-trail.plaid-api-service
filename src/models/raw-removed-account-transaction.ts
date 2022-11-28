import { Transaction as PlaidTransaction } from "plaid";

interface RawRemovedAccountTransaction {
  accountTransactionId?: number;
  transactionId: string;
  userId?: number;
}

const rawRemovedAccountTransactionFactory = (
  transactionDto: PlaidTransaction,
  userId: number
): RawRemovedAccountTransaction => {
  return {
    accountTransactionId: undefined,
    userId,
    transactionId: transactionDto.transaction_id,
  };
};

export { RawRemovedAccountTransaction, rawRemovedAccountTransactionFactory };
