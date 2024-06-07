import { Client, Account, ID, Avatars, Databases } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;
  avatars;
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.avatars = new Avatars(this.client);
    this.databases = new Databases(this.client);
  }

  async createAccount({ email, password, name, username }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (!userAccount) throw Error;

      const avatarUrl = this.avatars.getInitials(name);

      const newUser = await this.userToDB({
        name: userAccount.name,
        accountId: userAccount.$id,
        username: username,
        email: userAccount.email,
        imageUrl: avatarUrl,
      });

      return this.login({ email, password });
    } catch (error) {
      console.log("appwrite service :: createAccount :: error: ", error);
    }
  }

  async userToDB({ name, accountId, username, email, imageUrl}) {
    try {
      const newUser = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        ID.unique(),
        {
         name,
         accountId,
         username, 
         email, 
         imageUrl
        }
      );
      return newUser
    } catch (error) {
      console.log("appwrite service :: userToDB :: error: ", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("appwrite service :: login :: error: ", error);
    }
  }

  async getUserData() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("appwrite service :: getUserData :: error: ", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("appwrite service :: logout :: error: ", error);
    }
  }

}

const authService = new AuthService();

export default authService;
