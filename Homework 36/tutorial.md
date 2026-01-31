````md
# User commands

```graphql
query GetUserById($id: String!) {
  getUserById(id: $id) {
    _id
    username
    email
    age
  }
}
```
````

```graphql
mutation createUser($createUser: CreateUserInput!) {
  createUser(createUser: $createUser) {
    _id
  }
}
```

```graphql
mutation updateUser($id: String!, $updateUser: UpdateUserInput!) {
  updateUser(id: $id, updateUser: $updateUser) {
    _id
    username
    email
    _id
  }
}
```

```graphql
mutation DeleteUser($id: String!) {
  deleteUser(id: $id) {
    _id
    username
  }
}
```

```graphql
query {
  getUsers {
    _id
    username
    email
    age
  }
}
```

# Post commands

```graphql
query {
  getAllPosts {
    _id
    title
    description
  }
}
```

```graphql
query GetPostById($id: String!) {
  getPostById(id: $id) {
    _id
    title
    description
  }
}
```

```graphql
mutation CreatePost($createPost: CreatePostInput!) {
  createPost(createPost: $createPost) {
    _id
    title
    description
  }
}
```

```graphql
mutation UpdatePost($id: String!, $updatePost: UpdatePostInput!) {
  updatePost(id: $id, updatePost: $updatePost) {
    _id
    title
    description
  }
}
```

```graphql
mutation DeletePost($id: String!) {
  deletePost(id: $id) {
    title
  }
}
```

```

```
