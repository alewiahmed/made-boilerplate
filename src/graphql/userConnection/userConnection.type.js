const userConnectionType = `
type UserConnection {
    edges: [UserEdge]
    pageInfo: PageInfo!
}

type UserEdge {
    cursor: String!
    user: User!
}
`;

export default userConnectionType;
