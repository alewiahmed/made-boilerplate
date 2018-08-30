// The graphQl Query entry point
const queryEntryPoints = `
type RootQuery {
  "Get current logged in user info"
  me: User

  "get a post"
  post(id: String!): Post

  "List of users"
  users: [User]
  
  "List of posts"
  posts: [Post]
}`;

export default queryEntryPoints;
