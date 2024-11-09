import { UserCreateType } from "@/shared/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.oslim.aora",
  projectId: "672bcee100050b201d43",
  databaseId: "672bd1c700208bba2b47",
  userCollectionId: "672bd21a001be90f9b44",
  videoCollectionId: "672bd2cd00185b4ac632",
  storageId: "672bd49b000bbcdcb476",
};
const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async ({
  email,
  userName,
  password,
}: UserCreateType) => {
  try {
    const newAccount = account.create(ID.unique(), email, password, userName);
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(userName);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: (await newAccount).$id,
        avatar: avatarUrl,
        email,
        userName,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    // Navigate to home screen
  } catch (error) {
    console.log(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);

    if (!posts) throw Error;
    return posts.documents;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,

      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    if (!posts) throw Error;
    return posts.documents;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,

      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getUserPosts = async (id: string) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,

      [Query.equal("creator", id)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error as any);
  }
};
