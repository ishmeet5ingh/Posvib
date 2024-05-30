import {Client, Databases, Storage, ID, Avatars} from 'appwrite'
import conf from '../conf/conf'


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

    getAvatars(username){
        return this.avatars.getInitials(username)
    }

    async createPost({content, slug, featuredImage, status, userId, username, avatar}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    content,
                    featuredImage,
                    status,
                    userId,
                    username,
                    avatar
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
                conf.appwriteCollectionId,
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
                conf.appwriteCollectionId,
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
            return await  this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
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
                conf.appwriteCollectionId,
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
                file
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
}

const service = new Service()

export default service