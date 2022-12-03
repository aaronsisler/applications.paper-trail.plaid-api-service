interface Institution {
  institutionId: number;
  userId: number;
  itemId: string;
}

interface InstitutionDto {
  institution_id: number;
  user_id: number;
  item_id: string;
}

const institutionFactory = (institutionDto: InstitutionDto): Institution => {
  return {
    institutionId: institutionDto.institution_id,
    userId: institutionDto.user_id,
    itemId: institutionDto.item_id,
  };
};

export { Institution, InstitutionDto, institutionFactory };
