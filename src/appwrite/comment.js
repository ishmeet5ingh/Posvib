import {Client, Databases, ID} from "appwrite"
import conf from "../conf/conf";


class CommentService {
    client = new Client();
    databases;
    
    constructor(){
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    }

    // create Comment 
    async createAppwriteComment ({comment, userId, postId, creatorAvatarUrl, creatorUsername}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                ID.unique(),
                {
                    comment,
                    likes: [],
                    userId,
                    postId,
                    replies: [],
                    creatorAvatarUrl,
                    creatorUsername,
                }
            )
        } catch (error) {
            console.log("appwrite comment service :: createAppwriteComment :: error: ", error);
        }
    }

    // update comment 
    async updateAppwriteComment(id, {comment}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                id,
                {
                    comment
                }
            )
        } catch (error) {
            console.log("appwrite comment service :: updateAppwriteComment :: error: ", error);
            
        }
    } 

    // delete comment
    async deleteAppwriteComment(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                id
            )
        } catch (error) {
            console.log("appwrite comment service :: deleteAppwriteComment :: error: ", error);
        }
    }

    // get all comments

    async updateAppwriteComment(){
        try {
            await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId
            )
        } catch (error) {
            console.log("appwrite comment service :: updateAppwriteComment :: error: ", error);
            
        }
    }

    async createAppwriteReplyInsideComments (commentId, replyId) {
        try {
          const comment = await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCommentsCollectionId,
            commentId
          );
      
          const updatedReplies = [...comment?.replies, replyId]
          
          const updatedComment = await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCommentsCollectionId,
            commentId,
            {
              replies: updatedReplies
            }
          )
          console.log("updatedComment", updatedComment)
          return updatedComment
        } catch (error) {
          console.log("Appwrite service :: createAppwriteReplyInsideComments :: error: ", error);
        } 
      }

}

const commentService = new CommentService();

export default commentService

