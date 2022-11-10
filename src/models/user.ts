interface User {
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

export { User, UserDto };
