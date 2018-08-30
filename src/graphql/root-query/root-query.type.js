// The graphQl Query entry point
const queryEntryPoints = `
type RootQuery {
  "Get current logged in user info"
  me: User

  "get a post"
  post(id: String!): Post

  "List of users"
  users: [User]
  
  "returns list of posts"
  posts(
  first: Int,
  after: String,
  last: Int,
  before: String): PostConnection
}`;

export default queryEntryPoints;
