const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()
const PORT = 8080

const schema = buildSchema(`
type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }
  
  type Post {
    id: ID!,
    title: String!,
    content: String!,
    authorId: String!,
  }
  
  type Comment {
    id: ID!,
    text: String!,
    authot: User!,
    post: Post!
  }
  
  type Query {
    users: [User!]!,
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }
  
  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, content: String!, authorId: ID!): Post!
    createComment(text: String!, authorId: ID!, postId: ID!): Comment!
    updateUser(id: ID!, name: String, email: String): User!
    updatePost(id: ID!, title: String, content: String): Post!
    updateComment(id: ID!, text: String): Comment!
    deleteUser(id: ID!): User!
    deletePost(id: ID!): Post!
    deleteComment(id: ID!): Comment!
  }
  
  schema {
    query: Query
    mutation: Mutation
  }
`)

// Resolver functions
const root = {
  users: () => {
    return [
      {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        posts: ['1', '2'], // Array of post IDs associated with the user
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        posts: ['3'], // Array of post IDs associated with the user
      },
    ]
  },
  user: ({ id }) => {
    const users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        posts: ['1', '2'], // Array of post IDs associated with the user
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        posts: ['3'], // Array of post IDs associated with the user
      },
    ]
    return users.find((user) => user.id === id)
  },
  posts: () => {
    return [
      {
        id: '1',
        title: 'First Post',
        content: 'This is the first post content.',
        authorId: '1',
      },
      {
        id: '2',
        title: 'Second Post',
        content: 'This is the second post content.',
        authorId: '1',
      },
      {
        id: '3',
        title: 'Third Post',
        content: 'This is the third post content.',
        authorId: '2',
      },
    ]
  },
  post: ({ id }) => {
    const posts = [
      {
        id: '1',
        title: 'First Post',
        content: 'This is the first post content.',
        authorId: '1',
      },
      {
        id: '2',
        title: 'Second Post',
        content: 'This is the second post content.',
        authorId: '1',
      },
      {
        id: '3',
        title: 'Third Post',
        content: 'This is the third post content.',
        authorId: '2',
      },
    ]
    return posts.find((post) => post.id === id)
  },
  createUser: ({ name, email }) => {
    const newUser = {
      id: '3',
      name,
      email,
    }
    return newUser
  },
  createPost: ({ title, content, authorId }) => {
    const newPost = {
      id: '3',
      title,
      content,
      authorId,
    }
    return newPost
  },
  createComment: ({ text, authorId, postId }) => {
    const newComment = {
      id: '1',
      text,
      authorId,
      postId,
    }
    return newComment
  },
  updateUser: ({ id, name, email }) => {
    const userToUpdate = {
      id,
      name: 'Updated Name',
      email: 'updatedemail@example.com',
    }
    return userToUpdate
  },
  updatePost: ({ id, title, content }) => {
    const postToUpdate = {
      id,
      title: 'Updated Title',
      content: 'Updated post content.',
    }
    return postToUpdate
  },
  updateComment: ({ id, text }) => {
    const commentToUpdate = {
      id,
      text: 'Updated comment text.',
    }
    return commentToUpdate
  },
  deleteUser: ({ id }) => {
    const deletedUser = {
      id,
      name: 'Deleted User',
      email: 'deleteduser@example.com',
    }
    return deletedUser
  },
  deletePost: ({ id }) => {
    const deletedPost = {
      id,
      title: 'Deleted Post',
      content: 'Deleted post content.',
    }
    return deletedPost
  },
  deleteComment: ({ id }) => {
    const deletedComment = {
      id,
      text: 'Deleted comment text.',
    }
    return deletedComment
  },
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
