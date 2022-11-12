import { UserDao } from "../data-access-layer/user-dao";
import { User } from "../models/user";

class UserService {
  userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  async save(user: User): Promise<User> {
    try {
      return await this.userDao.create(user);
    } catch (error) {
      console.error("ERROR::UserService::save");
      throw error;
    }
  }

  async get(userId: number): Promise<User | null> {
    try {
      return await this.userDao.read(userId);
    } catch (error) {
      console.error("ERROR::UserService::get");
      throw error;
    }
  }
}

export { UserService };
