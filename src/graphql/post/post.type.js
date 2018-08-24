const PostType = `
type Post {
    "Post identifier"
    id: ID!

    "Post text"
    text: String

    "Created at"
    createdAt: Date!

    "Updated at"
    updatedAt: Date!

    "Owner of the post"
    user: User!
}
`;

export default PostType;
