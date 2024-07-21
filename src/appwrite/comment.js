import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

class CommentService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  // create Comment
  async createAppwriteComment(commentId, {
    comment,
    userId,
    postId,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsCollectionId,
        commentId,
        {
          comment,
          likes: [],
          userId,
          postId,
          replies: [],
          creator: userId
        }
      );
    } catch (error) {
      console.log(
        "appwrite comment service :: createAppwriteComment :: error: ",
        error
      );
    }
  }

  // delete comment
  async deleteAppwriteComment(commentId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsCollectionId,
        commentId
      );
    } catch (error) {
      console.log(
        "appwrite comment service :: deleteAppwriteComment :: error: ",
        error
      );
    }
  }

  // update appwrite comment
  async updateAppwriteComment(commentId, { comment }) {
    try {
      await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsCollectionId,
        commentId,
        {
          comment: comment,
        }
      );
    } catch (error) {
      console.log(
        "appwrite comment service :: updateAppwriteComment :: error: ",
        error
      );
    }
  }

  async createAppwriteReplyInsideComments(commentId, replyId) {
    try {
      const comment = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsCollectionId,
        commentId
      );

      const updatedReplies = [replyId, ...comment?.replies];

      const updatedComment = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsCollectionId,
        commentId,
        {
          replies: updatedReplies,
        }
      );
      console.log("updatedComment", updatedComment);
      return updatedComment;
    } catch (error) {
      console.log(
        "Appwrite service :: createAppwriteReplyInsideComments :: error: ",
        error
      );
    }
  }

  // deleting appwrite reply from Comments
  async deleteAppwriteReplyInsideComments(commentId, replyId) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsCollectionId,
        commentId
      );

      const updatedComments = post.comments?.map((comment) =>
        comment?.$id === commentId
          ? {
              ...comment,
              replies: comment.replies?.filter(
                (reply) => reply?.$id !== replyId
              ),
            }
          : comment
      );

      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsCollectionId,
        commentId,
        {
          comments: updatedComments,
        }
      );
    } catch (error) {
      console.log(
        "Appwrite service :: deleteAppwriteReplyInsideComments :: error: ",
        error
      );
    }
  }

  // deleting the comments by postId
  async deleteAppwriteCommentsAndRepliesByPostId(postId) {
    try {
      const [commentsResponse, repliesResponse] = await Promise.all([
        this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCommentsCollectionId,
          [Query.equal("postId", postId)]
        ),
        this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteRepliesCollectionId,
          [Query.equal("postId", postId)]
        ),
      ]);

      const comments = commentsResponse.documents;
      const replies = repliesResponse.documents;


      const deleteComments = comments.map((comment) =>
        this.databases.deleteDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCommentsCollectionId,
          comment.$id
        )
      );

      const deleteReplies = replies.map((reply) =>
        this.databases.deleteDocument(
          conf.appwriteDatabaseId,
          conf.appwriteRepliesCollectionId,
          reply.$id
        )
      );

      await Promise.all(deleteComments);
      await Promise.all(deleteReplies)
    } catch (error) {
      console.error(
        "Appwrite service :: deleteDocumentsByPostId :: error:",
        error
      );
      return false;
    }
  }

  async toggleAppwriteCommentLike(CommentId, userId) {
    try {
      // Fetch the post
      const comment = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsCollectionId,
        CommentId
      );

    const updatedLikes = comment.likes.includes(userId)
        ? comment.likes.filter((likedUser) => likedUser !== userId)
        : [...comment.likes, userId];

      const updatedComment = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsCollectionId,
        CommentId,
        {
          likes: updatedLikes,
        }
      );

      return updatedComment;
    } catch (error) {
      console.log(
        "Appwrite comment service :: toggleAppwriteCommentsLike :: error: ",
        error
      );
    }
  }
}

const commentService = new CommentService();

export default commentService;
