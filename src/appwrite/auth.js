import { Client, Account, ID, Avatars, Databases, Permission, Role } from "appwrite";
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

      
      await this.login({ email, password });

      const avatarUrl = this.avatars.getInitials(name);
      
      return await this.userToDB({
          name: userAccount.name,
          accountId: userAccount.$id,
          username: username,
          email: userAccount.email,
          imageUrl: avatarUrl,
        });
        
    } catch (error) {
      console.log("appwrite service :: createAccount :: error: ", error);
    }
  }

  async userToDB({ name, accountId, username, email, imageUrl}) {
    try {
        console.log("namename", name)
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

  async getUserDataFromDB(accountId){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteUsersCollectionId,
            accountId
        )
    } catch (error) {
        console.log("appwrite service :: getPost :: error: ", error)
        return false
    }
}
  async getUsersDataFromDB(){
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteUsersCollectionId,
        )
    } catch (error) {
        console.log("appwrite service :: getPost :: error: ", error)
        return false
    }
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
