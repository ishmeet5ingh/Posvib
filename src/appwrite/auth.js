import { Client, Account, ID, Avatars, Databases, Storage } from "appwrite";
import conf from "../conf/conf";
import { setError } from "../store/errorSlice";
import store from "../store/store";

export class AuthService {
  client = new Client();
  account;
  avatars;
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.avatars = new Avatars(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //  create user account in appwrite.
  async createAccount(id,{ email, password, name, username }, setError) {
    try {

      const avatarUrl = this.avatars.getInitials(name);
      const dbUser = await this.userToDB({
        name: name,
        accountId: id,
        username: username,
        email: email,
        imageUrl: avatarUrl,
      }, setError);

      if(dbUser){
        const userAccount = await this.account.create(
          id,
          email,
          password,
          name
        );

        if(userAccount){
          await this.login({ email, password });
          return dbUser
        }else{
           
        }
      }
      
    } catch (error) {
      if(error.message === "A user with the same id, email, or phone already exists in this project."){
        await this.databases.deleteDocument(
          conf.appwriteDatabaseId,
          conf.appwriteUsersCollectionId,
          username
         )
      }
      setError(error.message)
      console.log(error.message);
    }
  }

  //  create user in appwrite.
  async userToDB({ name, accountId, username, email, imageUrl }, setError) {
    try {
      const newUser = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        username,
        {
          name,
          accountId,
          username,
          email,
          imageUrl,
          following: [],
          followers: [],
          profilePicId: "",
          bio: "",
        }
      );

      return newUser;
    } catch (error) {
      setError(error.message)
      console.log("appwrite service :: userToDB :: error: ", error.message);
    }
  }

  //  login the user.
  async login({ email, password }, setError) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
     setError(error.message)
      console.log("appwrite service :: login :: error: ", error);
    }
  }

  //  update following and followers in appwrite.
  async updateAppwriteFollowingFollowers(currentUserId, targetUserId) {
    try {
      const [currentUser, targetUser] = await Promise.all([
        this.databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteUsersCollectionId,
          currentUserId
        ),
        this.databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteUsersCollectionId,
          targetUserId
        ),
      ]);
      const updatedFollowing = currentUser?.following.includes(targetUserId)
        ? currentUser?.following?.filter(
            (targetId) => targetId !== targetUserId
          )
        : [...currentUser?.following, targetUserId];

      const updatedFollowers = targetUser?.followers.includes(currentUserId)
        ? targetUser?.followers?.filter(
            (currentId) => currentId !== currentUserId
          )
        : [...targetUser?.followers, currentUserId];

      const [updatedCurrentUserDoc, updatedTargetUserDoc] = await Promise.all([
        this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteUsersCollectionId,
          currentUserId,
          { following: updatedFollowing }
        ),
        this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteUsersCollectionId,
          targetUserId,
          { followers: updatedFollowers }
        ),
      ]);

      console.log("Updated following and followers successfully.");

      return updatedTargetUserDoc;
    } catch (error) {
      console.log(
        "appwrite service :: updateAppwriteFollowingFollowers :: error: ",
        error
      );
    }
  }

  //  update User data from appwrite

  async updateAppwriteUser({currentUser, updateData}) {
    try {
      // Get the current data for the user

      if ( updateData?.name && (updateData?.name !== currentUser.name)) {
        await this.account.updateName(updateData?.name);
      }

      const updatedUser = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        currentUser.$id,
        updateData
      );

      console.log("User updated successfully:", updatedUser);
      return updatedUser;
    } catch (error) {
      console.log("appwrite service :: updateAppwriteUser :: error: ", error);
      store.dispatch(setError(error.message)); // Optionally handle error with Redux
      return false;
    }
  }

  // Upload file to Appwrite
  async uploadAppwriteFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucket2Id,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadAppwriteFile :: error", error);
      return false;
    }
  }

  // Delete file from appwrite
  async deleteAppwriteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucket2Id, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteAppwriteFile :: error", error);
      return false;
    }
  }

  // Get file preview from appwrite
  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucket2Id, fileId);
    } catch (error) {
      console.log("error:: getFilePreview", error);
    }
  }

  // Get single user date from appwrite.
  async getUserData() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("appwrite service :: getUserData :: error: ", error);
    }
    return null;
  }

  // Get single user date from user collection from appwrite.
  async getUserDataFromDB(id) {
    try {
      const userData = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        id
      );
      return userData;
    } catch (error) {
      console.log("appwrite service :: getUserDataFromDB :: error: ", error);
      return false;
    }
  }

  // Get All users from the user collection from appwrite.
  async getUsersDataFromDB() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId
      );
    } catch (error) {
      console.log("appwrite service :: getUsersDataFromDB :: error: ", error);
      return false;
    }
  }

  // Logout the user
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
