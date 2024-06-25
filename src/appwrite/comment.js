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
    async createComment ({comment, userId, postId, }) {
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
                    creator: userId,
                    replies: []
                }
            )
        } catch (error) {
            console.log("appwrite comment service :: createComment :: error: ", error);
        }
    }

    // update comment 
    async updateComment(id, {comment}){
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
            console.log("appwrite comment service :: updateComment :: error: ", error);
            
        }
    } 

    // delete comment
    async deleteComment(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                id
            )
        } catch (error) {
            console.log("appwrite comment service :: deleteComment :: error: ", error);
        }
    }

    // get all comments

    async getComments(){
        try {
            await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId
            )
        } catch (error) {
            console.log("appwrite comment service :: getComments :: error: ", error);
            
        }
    }

    async updateReplies (commentId, replyId) {
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
          return updatedComment
        } catch (error) {
          console.log("Appwrite service :: updateReplies :: error: ", error);
        } 
      }

}

const commentService = new CommentService();

export default commentService

