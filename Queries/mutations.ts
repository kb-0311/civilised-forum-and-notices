import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation MyMutation(
    $body: String!
    $media: String!
    $topic_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      media: $media
      topic_id: $topic_id
      title: $title
      username: $username
    ) {
      body
      created_at
      id
      media
      topic_id
      title
      username
    }
  }
`

export const ADD_TOPIC = gql`
  mutation MyMutation(
    $topic: String!
    $numOfPosts: Int!
    ) {
    insertTopic(
        topic: $topic
        numOfPosts:$numOfPosts
        ) {
      topic
      id
      numOfPosts
    }
  }
`

export const ADD_COMMENT = gql`
  mutation MyMutation
  (
    $post_id: ID!,
    $username: String!,
    $text: String!
    ) {
      insertComment(post_id: $post_id, text: $text, username: $username) {
        created_at
        id
        post_id
        text
        username
      }
  }
`

export const ADD_VOTE = gql`
  mutation MyMutation (
    $post_id: ID!,
    $username: String!,
    $upvote: Boolean!
  ) {
    insertVote(post_id: $post_id, upvote: $upvote, username: $username) {
      created_at
      id
      upvote
      username
      post_id
    }
  }
`;

export const DELETE_COMMENT = gql `
  mutation DeleteComment (
    $commentId: ID!
  ) {
    deleteComment(id: $commentId) {
      text
      username
    } 
  }
`