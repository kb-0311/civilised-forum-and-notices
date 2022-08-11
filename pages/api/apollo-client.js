import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.GRAPHQL_STEPZEN_URI,
  headers: {
    Authorization: process.env.GRAPHQL_STEPZEN_KEY
  },
  cache: new InMemoryCache()
})

export default client