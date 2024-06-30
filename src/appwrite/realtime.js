import { Client } from "appwrite";
import { createReduxPost, updateReduxPost, deleteReduxPost, updateReduxLike } from "../store/configSlice";
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
      store.dispatch(createReduxPost(response.payload));
    }
    if (
      response.events.includes("databases.*.collections.*.documents.*.update")
    ) {
      store.dispatch(
        createReduxPost({ id: response.payload.$id, dbPost: response.payload })
      );
      // store.dispatch(updateReduxLike({id: postId, likesArray: response.payload.likes }));
    }
    if (
      response.events.includes("databases.*.collections.*.documents.*.delete")
    ) {
      store.dispatch(deleteReduxPost(response.payload.$id));
    }
  }
);

// Closes the subscription.
unsubscribe();
