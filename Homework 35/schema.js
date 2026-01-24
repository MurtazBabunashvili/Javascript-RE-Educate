export const typeDefs = `#graphql
    type User {
        id: ID
        name: String
        age: Int
        posts: [Posts]
    }

    type Posts {
        id: ID,
        title: String
        body: String
        user: User
    }

    type Query {
        users: [User!]
        user(id:ID!): User
        posts: [Posts!]
        post(id: ID!): Posts
    }


    input createUserDTO{
        name: String,
        age: Int
    }
    input updateUserDTO{
        name: String,
        age: Int
    }

    input createPostDTO {
        title: String,
        body: String
        user: User
    }

    input updatePostDTO {
        title: String
        body: String
    }

    type Mutation {
        deleteUser(id:ID!): Boolean
        createUser(createUserDTO: createUserDTO): String
        updateUser(id:ID!, updateUserDTO: updateUserDTO): String
        deletePost(id:ID!): Boolean
        createPost(createPostDTO: createPostDTO): String
        updatePost(id:ID!, updatePostDTO: updatePostDTO): String
    }
`;
