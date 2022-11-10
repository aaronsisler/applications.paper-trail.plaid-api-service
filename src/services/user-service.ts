import { UserDao } from "../data-access-layer/user-dao";
import { User } from "../models/user";

class UserService {
  userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  async create(user: User) {
    try {
      console.log(user);
      await this.userDao.create(user);
    } catch (error) {
      console.error("Try again from UserService::create");
      throw error;
    }
  }
}

export { UserService };
