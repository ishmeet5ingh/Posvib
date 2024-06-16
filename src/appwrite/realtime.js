import { Client } from "appwrite";
import { createPost, updatePost, deletePost, updateLike } from "../store/configSlice";
import store from "../store/store";
import conf from "../conf/conf";


const client = new Client()
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId);


const unsubscribe = client.subscribe(
  [
    `databases.${conf.appwriteDatabaseId}.collections.${conf.appwritePostsCollectionId}.documents`,
    "files",
  ],
  (response) => {
    if (
      response.events.includes("databases.*.collections.*.documents.*.create")
    ) {
      console.log("A Post is Created");
      store.dispatch(createPost(response.payload));
    }
    if (
      response.events.includes("databases.*.collections.*.documents.*.update")
    ) {
      store.dispatch(
        updatePost({ id: response.payload.$id, dbPost: response.payload })
      );
      // store.dispatch(updateLike({id: postId, likesArray: response.payload.likes }));
    }
    if (
      response.events.includes("databases.*.collections.*.documents.*.delete")
    ) {
      store.dispatch(deletePost(response.payload.$id));
    }
  }
);

// Closes the subscription.
unsubscribe();
