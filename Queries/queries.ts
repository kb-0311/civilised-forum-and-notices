import { gql } from '@apollo/client'

export const GET_TOPIC_ON_CREATE_POST = gql`
  query MyQuery($topic: String!) {
    getTopicListByString(topic: $topic) {
      id
      topic
      created_at
    }

  }
`


export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      body
      created_at
      id
      media
      title
      topic_id
      username
      commentList {
        created_at
        id
        post_id
        text
        username
      }
      voteList {
        created_at
        id
        post_id
        upvote
        username
      }
      topic {
        created_at
        id
        topic
      }
    }
  }
`

export const GET_ALL_POSTS_IN_A_TOPIC = gql`
  query MyQuery ( 
    $topic :String!
    )  {
    getPostListByTopic(topic: $topic) {
      body
      id
      created_at
      media
      title
      topic_id
      username
      commentList {
        created_at
        id
        post_id
        text
        username
      }
      topic {
        created_at
        numOfPosts
        topic
        id
      }
    }
  }
`;

export const GET_POST= gql`
  query MyQuery ( 
    $id :ID!
    )  {
    getPost(id: $id) {
      body
      id
      created_at
      media
      title
      topic_id
      username
      commentList {
        created_at
        id
        post_id
        text
        username
      }
      topic {
        created_at
        numOfPosts
        topic
        id
      }
    }
  }
`;