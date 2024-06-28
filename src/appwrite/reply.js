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
    async createAppwriteReply ({reply, userId, commentId, creatorUrl, creatorUsername }) {
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
                    creatorUrl,
                    creatorUsername
                }
            )
        } catch (error) {
            console.log("appwrite reply service :: createAppwriteReply :: error: ", error);
        }
    }

    // update reply 
    async updateAppwriteReply(id, {reply}){
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
            console.log("appwrite reply service :: updateAppwriteReply :: error: ", error);
            
        }
    } 

    // delete reply
    async deleteAppwriteReply(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteRepliesCollectionId,
                id
            )
        } catch (error) {
            console.log("appwrite reply service :: deleteAppwriteReply :: error: ", error);
        }
    }

    // get all replies

    async getAppwriteReplies(){
        try {
            await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteRepliesCollectionId
            )
        } catch (error) {
            console.log("appwrite reply service :: getAppwriteReplies :: error: ", error);
            
        }
    }

}

const replyService = new ReplyService();

export default replyService

