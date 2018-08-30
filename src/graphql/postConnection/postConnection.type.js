const postConnectionType =`
type PostConnection {
    edges: [PostEdge]
    pageInfo: PageInfo!
}

type PostEdge {
    cursor: String!
    post: Post!
}

type PageInfo {
    startCursor: String
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
}
`

export default postConnectionType