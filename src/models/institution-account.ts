interface InstitutionAccount {
  institutionAccountId: number;
  institutionId: number;
  accountId: string;
  itemId: string;
  accountMaskLastFour: string;
  accountName: string;
  accountOfficialName: string;
  accountType: string;
  accountSubtype: string;
}

interface InstitutionAccountDto {
  institution_account_id: number;
  institution_id: number;
  account_id: string;
  item_id: string;
  account_mask_last_four: string;
  account_name: string;
  account_official_name: string;
  account_type: string;
  account_subtype: string;
}

const institutionAccountFactory = (
  institutionAccountDto: InstitutionAccountDto
): InstitutionAccount => {
  return {
    institutionAccountId: institutionAccountDto.institution_account_id,
    institutionId: institutionAccountDto.institution_id,
    itemId: institutionAccountDto.item_id,
    accountId: institutionAccountDto.account_id,
    accountMaskLastFour: institutionAccountDto.account_mask_last_four,
    accountName: institutionAccountDto.account_name,
    accountOfficialName: institutionAccountDto.account_official_name,
    accountType: institutionAccountDto.account_type,
    accountSubtype: institutionAccountDto.account_subtype,
  };
};

export { InstitutionAccount, InstitutionAccountDto, institutionAccountFactory };
