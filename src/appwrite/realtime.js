// import { Client } from "appwrite";
// import { createReduxPost, updateReduxPost, deleteReduxPost, updateReduxPostLike } from "../store/configSlice";
// import store from "../store/store";
// import conf from "../conf/conf";


// const client = new Client()
//   .setEndpoint(conf.appwriteUrl)
//   .setProject(conf.appwriteProjectId);


// const unsubscribe = client.subscribe(
//   [
//     `databases.${conf.appwriteDatabaseId}.collections.${conf.appwritePostsCollectionId}.documents`,
//     "files",
//   ],
//   (response) => {
//     if (
//       response.events.includes("databases.*.collections.*.documents.*.create")
//     ) {
//       store.dispatch(createReduxPost(response.payload));
//     }
//     if (
//       response.events.includes("databases.*.collections.*.documents.*.update")
//     ) {
//       store.dispatch(
//         createReduxPost({ id: response.payload.$id, dbPost: response.payload })
//       );
//       // store.dispatch(updateReduxPostLike({id: postId, likesArray: response.payload.likes }));
//     }
//     if (
//       response.events.includes("databases.*.collections.*.documents.*.delete")
//     ) {
//       store.dispatch(deleteReduxPost(response.payload.$id));
//     }
//   }
// );

// // Closes the subscription.
// unsubscribe();



//-----------------postform----------------------------
// useEffect(() => {
//   const unsubscribe = appwriteService.client.subscribe(
//     [
//       `databases.${conf.appwriteDatabaseId}.collections.${conf.appwritePostsCollectionId}.documents`,
//       "files"
//     ],
//     (response) => {
//       if (response.events.includes("databases.*.collections.*.documents.*.create")) {
//         if (!isCreating.current) {
//           dispatch(createReduxPost(response.payload)); // Dispatch action to create new post in Redux store
//           dispatch(setReduxUserPost(response.payload)); // Set user's new post in Redux store
//         }
//       }

//       if (response.events.includes("databases.*.collections.*.documents.*.update")) {
//         dispatch(updateReduxPost({ id: response.payload.$id, dbPost: response.payload })); // Dispatch action to update post in Redux store
//         dispatch(updateReduxUserPost(response.payload)); // Update user's post in Redux store
//         setContent(response.payload?.content);
//         if (response.payload?.featuredImage) setPostFeaturedImage(response.payload?.featuredImage);
//       }
//     }
//   );

//   return () => {
//     unsubscribe();
//   }
// }, [dispatch]);

//----------------------------------------

// ----------------------postcard-----------------
// useEffect(() => {
//   const unsubscribe = appwriteService.client.subscribe(
//     [
//       `databases.${conf.appwriteDatabaseId}.collections.${conf.appwritePostsCollectionId}.documents.${$id}`,
//       "files",
//     ],
//     (response) => {
//       if (
//         response.events.includes(
//           "databases.*.collections.*.documents.*.delete"
//         )
//       ) {
//         dispatch(deleteReduxPost(response.payload.$id));
//         dispatch(
//           deleteReduxUserPost({
//             userId: response.payload?.userId,
//             postId: response.payload?.$id,
//           })
//         );
//       }
//     }
//   );
//   return () => {
//     unsubscribe();
//   };
// }, [deletedPostId, dispatch]);