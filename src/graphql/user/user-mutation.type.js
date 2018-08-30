const UserMutation = `
  # to login the user
  login (
  email: String!,
  password: String!
  ): User
  
  # register a user
  register (
    name: String!,
    email: String!,
    password: String!
  ): User

  # update user profile
  updateProfile (
    firstName: String,
    lastName: String,
    email: String,
  ): User

  # change password
  changePassword (
  oldPassword: String!,
  newPassword: String!) : User
`;
export default UserMutation;
