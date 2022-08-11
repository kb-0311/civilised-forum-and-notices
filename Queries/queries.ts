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