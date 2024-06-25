import {Client, Databases, ID} from "appwrite"
import conf from "../conf/conf";


class ReplyService {
    client = new Client();
    databases;
    
    constructor(){
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    }

    // create Reply 
    async createReply ({reply, userId, commentId, }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteRepliesCollectionId,
                ID.unique(),
                {
                    reply,
                    likes: [],
                    userId,
                    commentId,
                    creator: userId,
                }
            )
        } catch (error) {
            console.log("appwrite reply service :: createReply :: error: ", error);
        }
    }

    // update reply 
    async updateReply(id, {reply}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteRepliesCollectionId,
                id,
                {
                    reply
                }
            )
        } catch (error) {
            console.log("appwrite reply service :: updateReply :: error: ", error);
            
        }
    } 

    // delete reply
    async deleteReply(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteRepliesCollectionId,
                id
            )
        } catch (error) {
            console.log("appwrite reply service :: deleteReply :: error: ", error);
        }
    }

    // get all replies

    async getComments(){
        try {
            await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteRepliesCollectionId
            )
        } catch (error) {
            console.log("appwrite reply service :: getReplies :: error: ", error);
            
        }
    }

}

const replyService = new ReplyService();

export default replyService

