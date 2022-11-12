interface User {
  userId: number;
  principalId: string;
  firstName: string;
  lastName: string;
}

interface UserDto {
  UserId: number;
  PrincipalId: string;
  FirstName: string;
  LastName: string;
}

const userFactory = (userDto: UserDto): User => {
  return {
    userId: userDto.UserId,
    principalId: userDto.PrincipalId,
    firstName: userDto.FirstName,
    lastName: userDto.LastName,
  };
};

export { User, UserDto, userFactory };
