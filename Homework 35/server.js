import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { users, posts } from "./data.js";

const resolvers = {
  Query: {
    users() {
      //Get all users
      return users;
    },

    user(_, { id }) {
      //Get user by id
      return users.find((el) => el.id === Number(id));
    },
    posts() {
      //Get all posts
      return posts;
    },
    post(_, { id }) {
      //Get post by id
      return posts.find((el) => el.id === Number(id));
    },
  },

  User: {
    posts(parent) {
      return posts.filter((el) => el.user === parent.id);
    },
  },

  Posts: {
    user(parent) {
      return users.find((el) => el.id === parent.user);
    },
  },

  Mutation: {
    createUser(_, { createUserDTO }) {
      const lastId = users[users.length - 1]?.id || 0;
      const newUser = {
        id: lastId + 1,
        name: createUserDTO.name,
        age: createUserDTO.age,
        posts: [],
      };
      users.push(newUser);
      return "New user created successfully";
    },
    deleteUser(_, { id }) {
      const findIndex = users.findIndex((el) => el.id === Number(id));
      if (findIndex === -1) {
        return false;
      }

      users.splice(findIndex, 1);
      return true;
    },
    updateUser(_, { id, updateUserDTO }) {
      const findIndex = users.findIndex((el) => el.id === Number(id));
      if (findIndex === -1) {
        return "User not found";
      }
      users[findIndex] = {
        ...users[findIndex],
        name: updateUserDTO.name || users[findIndex].name,
        age: updateUserDTO.age || users[findIndex].age,
      };
      return "User updated successfully";
    },
    createPost(_, { createPostDTO }) {
      const lastId = posts[posts.length - 1]?.id || 0;
      const newObj = {
        id: lastId + 1,
        title: createPostDTO.title,
        body: createPostDTO.body,
        user: createPostDTO.user,
      };
      posts.push(newObj);
      return "Post created successfully";
    },
    updatePost(_, { id, updatePostDTO }) {
      const findPostIndex = posts.findIndex((el) => el.id === Number(id));
      if (findPostIndex === -1) {
        return "Post not found";
      }
      posts[findPostIndex] = {
        ...posts[findPostIndex],
        title: updatePostDTO.title || posts[findPostIndex].title,
        body: updatePostDTO.body || posts[findPostIndex].body,
      };
      return "Post updated successfully";
    },
    deletePost(_, { id }) {
      const findIndex = posts.findIndex((el) => el.id === Number(id));
      if (findIndex === -1) {
        return false;
      }
      posts.splice(findIndex, 1);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`Server is running on ${url}`);
