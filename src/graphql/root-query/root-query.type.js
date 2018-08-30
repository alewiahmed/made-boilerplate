// The graphQl Query entry point
const queryEntryPoints = `
type RootQuery {
  "Get current logged in user info"
  me: User

  "get a post"
  post(id: String!): Post
  
  "returns list of posts"
  posts(
  first: Int,
  after: String,
  last: Int,
  before: String): PostConnection

  "return all users"
  users(
  last: Int,
  first: Int,
  after: String,
  before: String): UserConnection
}`;

export default queryEntryPoints;
