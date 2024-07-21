import { Client, Databases, Storage, ID, Avatars, Query } from "appwrite";
import conf from "../conf/conf";


export class Service {
  client = new Client();
  databases;
  bucket;
  avatars;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.avatars = new Avatars(this.client);
    
  }

  //To create post in appwrite
  async createAppwritePost({ content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        ID.unique(),
        {
          content,
          featuredImage,
          status,
          userId,
          creator: userId,
          likes: [],
          comments: [],
        }
      );
    } catch (error) {
      console.log("appwrite service :: createAppwritePost :: error: ", error);
    }
  }

  //  update post in Appwrite
  async updateAppwritePost(id, { content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        id,
        {
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("appwrite service :: updateAppwritePost :: error: ", error);
    }
  }

  //  delete post in appwrite
  async deleteAppwritePost(id) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.log("appwrite service :: deleteAppwritePost :: error: ", error);
      return false;
    }
  }

  //  get a Single post from appwrite
  async getAppwritePost(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        id
      );
    } catch (error) {
      console.log("appwrite service :: getAppwritePost :: error: ", error);
      return false;
    }
  }

  //  get all posts from appwrite
  async getAppwritePosts(page = 1, limit = 6) {
    const offset = (page - 1) * limit;
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        [
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc("$createdAt"),
        ]
      );
      return response.documents;
    } catch (error) {
      console.log("Appwrite serive :: getAppwritePosts :: error", error);
      return [];
    }
  }

<<<<<<< HEAD
  async getAppwriteAllPosts(){
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
      );
      return response.documents;
    } catch (error) {
      console.log("Appwrite serive :: getAppwritePosts :: error", error);
    }
  }

  // To upload file to Appwrite
=======
  //  upload file to Appwrite
>>>>>>> chatFeature
  async uploadAppwriteFile(file) {
    try {
      return await this.bucket.createFile(
        // get the id
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadAppwriteFile :: error", error);
      return false;
    }
  }

  // delete file from appwrite
  async deleteAppwriteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteAppwriteFile :: error", error);
      return false;
    }
  }

  // get file preview from appwrite
  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("error:: getFilePreview", error)
    }
  }

  //ggle likes of the post of appwrite
  async toggleAppwritePostLike(postId, userId) {
    try {
      // Fetch the post
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        postId
      );

    const updatedLikes = post.likes.includes(userId)
        ? post.likes.filter((likedUser) => likedUser !== userId)
        : [...post.likes, userId];

      const updatedPost = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        postId,
        {
          likes: updatedLikes,
        }
      );

      return updatedPost;
    } catch (error) {
      console.log(
        "Appwrite service :: toggleAppwritePostLike :: error: ",
        error
      );
    }
  }

  // create comments insite the post in appwrite
  async createAppwriteCommentInsidePost(postId, commentId) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        postId
      );

      const updatedComments = [commentId, ...post?.comments];

      const updatedPost = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        postId,
        {
          comments: updatedComments,
        }
      );
      return updatedPost;
    } catch (error) {
      console.log(
        "Appwrite service :: createAppwriteCommentInsidePost :: error: ",
        error
      );
    }
  }

  // delete the comment inside the post in appwrite
  async deleteAppwriteCommentInsidePost(postId, commentId) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        postId
      );

      const updatedComments = post.comments?.filter(
        (comment) => comment?.$id !== commentId
      );

      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        postId,
        {
          comments: updatedComments,
        }
      );
    } catch (error) {
      console.log(
        "Appwrite service :: deleteAppwriteCommentInsidePost :: error: ",
        error
      );
    }
  }

  // update the comment inside post in appwrite
  async updateAppwriteCommentInsidePost(postId, comment, commentId) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        postId
      );

      const updatedComments = post.comments?.map((com) =>
        com?.$id === commentId ? { ...com, comment: comment } : com
      );

      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        postId,
        {
          comments: updatedComments,
        }
      );
    } catch (error) {
      console.log(
        "Appwrite service :: updateAppwriteCommentInsidePost :: error: ",
        error
      );
    }
  }
}

const service = new Service();

export default service;
