import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { nhost } from '@/lib/nhost'

const httpLink = new HttpLink({
  uri: 'https://vpenqrnwxlkujdimavsc.hasura.us-east-1.nhost.run/v1/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  const token = (await nhost.auth.getSession())?.accessToken

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export function makeClient() {
  return new ApolloClient({
    link: authLink.concat(httpLink),

    cache: new InMemoryCache(),

    defaultOptions: {
      watchQuery: { fetchPolicy: 'cache-and-network' },
      query: { fetchPolicy: 'network-only' },
    },
  })
}