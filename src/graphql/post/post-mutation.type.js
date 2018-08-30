const PostMutation = `
  # create a new Post
  addPost (
    text: String
  ): Post

  # create a new Post
  removePost (
    postId: ID!,
  ): Post
`;
export default PostMutation;
