interface Institution {
  institutionId: number;
  userId: number;
  institutionIdentifier: string;
}

interface InstitutionCreation {
  userId: number;
  institutionIdentifier: string;
}

interface InstitutionDto {
  institution_id: number;
  user_id: number;
  institution_identifier: string;
}

const institutionFactory = (institutionDto: InstitutionDto): Institution => {
  return {
    institutionId: institutionDto.institution_id,
    userId: institutionDto.user_id,
    institutionIdentifier: institutionDto.institution_identifier,
  };
};

export { Institution, InstitutionCreation, InstitutionDto, institutionFactory };
