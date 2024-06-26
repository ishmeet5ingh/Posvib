import { Client, Databases, Storage, ID, Avatars, Query } from "appwrite";
import conf from "../conf/conf";
import { createPost, updatePost, deletePost, updateLike } from "../store/configSlice";
import store from "../store/store";

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

  async createPost({ content, featuredImage, status, userId }) {
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
          comments: []
        }
      );
    } catch (error) {
      console.log("appwrite service :: createPost :: error: ", error);
    }
  }

  async updatePost(id, { content, featuredImage, status }) {
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
      console.log("appwrite service :: updatePost :: error: ", error);
    }
  }

  async deletePost(id) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.log("appwrite service :: deleltePost :: error: ", error);
      return false;
    }
  }

  async getPost(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        id
      );
    } catch (error) {
      console.log("appwrite service :: getPost :: error: ", error);
      return false;
    }
  }

  async getPosts(page = 1, limit = 6) {
    const offset = (page - 1) * limit;
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        [
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc('$createdAt')
        ]
      );
      return response.documents
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return [];
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        // get the id
        conf.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }

  async likePost(postId, userId) {
    try {
      // Fetch the post
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        postId
      );

      // Add userId to likes if not already present
      const updatedLikes = post.likes.includes(userId)
        ? post.likes.filter((likedUser) => likedUser !== userId) // Unlike
        : [...post.likes, userId]; // Like

      // Update post with new likes array
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
      console.log("Appwrite service :: likePost :: error: ", error);
    }
  }

  async updateComments (postId, commentId) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        postId
      );
  
      const updatedComments = [...post?.comments, commentId]
      
      const updatedPost = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        postId,
        {
          comments: updatedComments
        }
      )
      return updatePost
    } catch (error) {
      console.log("Appwrite service :: updateComments :: error: ", error);
    } 
  }


}

const service = new Service();

export default service;
