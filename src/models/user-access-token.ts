interface UserAccessToken {
  userAuthTokenId?: number;
  userId: number;
  itemId: string;
  accessToken: string;
}

interface UserAccessTokenDto {
  user_access_token_id: number;
  user_id: number;
  item_id: string;
  access_token: string;
}

const userAccessTokenFactory = (
  userAccessTokenDto: UserAccessTokenDto
): UserAccessToken => {
  return {
    userAuthTokenId: userAccessTokenDto.user_access_token_id,
    userId: userAccessTokenDto.user_id,
    itemId: userAccessTokenDto.item_id,
    accessToken: userAccessTokenDto.access_token,
  };
};

export { UserAccessToken, userAccessTokenFactory };
