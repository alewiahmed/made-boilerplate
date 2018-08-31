const AdminMutation = `
  "Delete posts and return the deleted posts"
  deletePost(
    postIds: [ID!]!
  ): [Post]!

  "Change user role"
  changeUserRole(
    userId: ID!,
    role: String!
  ): User
`;

export default AdminMutation;
