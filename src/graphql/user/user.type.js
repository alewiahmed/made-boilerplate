const userType = `
  type User {
    "User identifier"
    id: ID!

    "User's first name"
    firstName: String!

    "User's last name"
    lastName: String

    "User's email"
    email: String!

    "User's avatar"
    avatar: String
    
    "Created date"
    createdAt: Date!

    "Updated date"
    updatedAt: Date!

    "json web token for access"
    token: String
    
    "The role of the user"
    role : String
  }
`;

export default userType;
