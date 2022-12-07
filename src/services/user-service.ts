import { UserDao } from "../data-access-layer/user-dao";
import { User } from "../models/user";
import {
  getMethodStartTime,
  methodProcessTime,
} from "../utils/method-process-time";

class UserService {
  userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  async save(user: User): Promise<User> {
    const time: Date = getMethodStartTime();
    try {
      return await this.userDao.create(user);
    } catch (error) {
      console.error("ERROR::UserService::save");
      throw error;
    } finally {
      methodProcessTime("UserService::get", time);
    }
  }

  async get(userId: number): Promise<User | null> {
    const time: Date = getMethodStartTime();
    try {
      return await this.userDao.read(userId);
    } catch (error) {
      console.error("ERROR::UserService::get");
      throw error;
    } finally {
      methodProcessTime("UserService::get", time);
    }
  }
}

export { UserService };
