interface AccountTransactionDateDto {
  fullDate: string;
  year: number;
  month: number;
  day: number;
}

const parseAccountTransactionDate = (
  fullDate: string
): AccountTransactionDateDto => {
  // 01234567890
  // 0123-56-89
  const year = parseInt(fullDate.substring(0, 4));
  const month = parseInt(fullDate.substring(5, 7));
  const day = parseInt(fullDate.substring(8, 10));

  return { fullDate, year, month, day };
};

export { AccountTransactionDateDto, parseAccountTransactionDate };
