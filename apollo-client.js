import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://wolfsburg.stepzen.net/api/forum/__graphql',
  headers: {
    Authorization: `ApiKey ${process.env.GRAPHQL_STEPZEN_KEY}`,
  },
  cache: new InMemoryCache(),
})

export default client