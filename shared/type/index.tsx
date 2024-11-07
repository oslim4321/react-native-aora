export type UserCreateType = {
  email: string;
  password: string;
  userName: string;
};

export type CreatorType = {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[];
  $updatedAt: string;
  accountId: string;
  avatar: string;
  email: string;
  userName: string;
};

export type videoType = {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[];
  $updatedAt: string;
  creator: CreatorType;
  prompt: string;
  thumbnail: string;
  title: string;
  video: string;
};
