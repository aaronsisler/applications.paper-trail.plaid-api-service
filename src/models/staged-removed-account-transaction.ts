import { Transaction as PlaidTransaction } from "plaid";

interface StagedRemovedAccountTransaction {
  accountTransactionId?: number;
  transactionId: string;
  userId?: number;
}

const stagedRemovedAccountTransactionFactory = (
  transactionDto: PlaidTransaction,
  userId: number
): StagedRemovedAccountTransaction => {
  return {
    accountTransactionId: undefined,
    userId,
    transactionId: transactionDto.transaction_id,
  };
};

export {
  StagedRemovedAccountTransaction,
  stagedRemovedAccountTransactionFactory,
};
