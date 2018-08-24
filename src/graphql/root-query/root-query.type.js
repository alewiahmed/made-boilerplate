// The graphQl Query entry point
const queryEntryPoints = `
type RootQuery {
  "List of users"
  users: [User]
  
  "List of posts"
  posts: [Post]
}`;

export default queryEntryPoints;
