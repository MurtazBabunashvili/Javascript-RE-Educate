# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type PostsPayload {
  _id: String!
  title: String!
  description: String!
}

type UsersPayload {
  _id: String!
  username: String!
  email: String!
  age: String!
}

type Query {
  getAllPosts: [PostsPayload!]
  getPostById(id: String!): PostsPayload
  getUsers: [UsersPayload!]
  getUserById(id: String!): UsersPayload
}

type Mutation {
  createPost(createPost: CreatePostInput!): PostsPayload
  updatePost(id: String!, updatePost: UpdatePostInput!): PostsPayload
  deletePost(id: String!): PostsPayload
  createUser(createUser: CreateUserInput!): UsersPayload
  updateUser(id: String!, updateUser: UpdateUserInput!): UsersPayload
  deleteUser(id: String!): UsersPayload
}

input CreatePostInput {
  title: String!
  description: String!
}

input UpdatePostInput {
  title: String
  description: String
}

input CreateUserInput {
  username: String!
  email: String!
  age: Float!
}

input UpdateUserInput {
  username: String
  email: String
  age: Float
}