import {Client, Databases, Storage, ID, Avatars} from 'appwrite'
import conf from '../conf/conf'

import { updatePost } from '../store/configSlice'
export class Service{
    client = new Client()
    databases
    bucket
    avatars
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
        this.avatars = new Avatars(this.client)
    }


    async createPost({content, slug, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwritePostsCollectionId,
                slug,
                {
                    content,
                    featuredImage,
                    status,
                    userId,
                    creator: userId,
                    likes: [], 
                }
            )
        } catch (error) {
            console.log("appwrite service :: createPost :: error: ", error)
        }
    }

    async updatePost(slug, {content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwritePostsCollectionId,
                slug,
                {
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite service :: updatePost :: error: ", error)
        }
    }


    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwritePostsCollectionId,
                slug
            )
            return true
        }catch(error){
            console.log("appwrite service :: deleltePost :: error: ", error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwritePostsCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite service :: getPost :: error: ", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritePostsCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service
     
    async uploadFile(file){
        try {
            return await this.bucket.createFile( // get the id 
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    
    async likePost(postId, userId, dispatch) {
        try {
            // Fetch the post
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwritePostsCollectionId,
                postId
            );

            // Add userId to likes if not already present
            const updatedLikes = post.likes?.find(likedUser => likedUser?.$id === userId)
                ? post.likes.filter(likedUser => likedUser?.$id !== userId) // Unlike
                : [...post.likes, userId]; // Like


            // Update post with new likes array
            const updatedPost = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwritePostsCollectionId,
                postId,
                {
                    likes: updatedLikes 
                }
            );
            
            dispatch(updatePost({id: postId, dbPost: updatedPost}))
            return updatedPost
        } catch (error) {
            console.log("Appwrite service :: likePost :: error: ", error);
        }
    }
}

const service = new Service()

export default service