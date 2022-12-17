interface User {
  userId: number;
  principalId: string;
  firstName: string;
  lastName: string;
}

interface UserDto {
  user_id: number;
  principal_id: string;
  first_name: string;
  last_name: string;
}

const userFactory = (userDto: UserDto): User => {
  return {
    userId: userDto.user_id,
    principalId: userDto.principal_id,
    firstName: userDto.first_name,
    lastName: userDto.last_name,
  };
};

export { User, UserDto, userFactory };
