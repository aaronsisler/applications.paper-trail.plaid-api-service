interface UserAccessToken {
  userAccessTokenId: number;
  userId: number;
  institutionId: number;
  accessToken: string;
  lastCursor?: string;
}

interface UserAccessTokenCreation {
  userId: number;
  institutionId: number;
  accessToken: string;
  lastCursor?: string;
}

interface UserAccessTokenDto {
  user_access_token_id: number;
  user_id: number;
  institution_id: number;
  access_token: string;
  last_cursor: string;
}

const userAccessTokenFactory = (
  userAccessTokenDto: UserAccessTokenDto
): UserAccessToken => {
  return {
    userAccessTokenId: userAccessTokenDto.user_access_token_id,
    userId: userAccessTokenDto.user_id,
    institutionId: userAccessTokenDto.institution_id,
    accessToken: userAccessTokenDto.access_token,
    lastCursor: userAccessTokenDto.last_cursor,
  };
};

export { UserAccessToken, UserAccessTokenCreation, userAccessTokenFactory };
