'use client'
import { PropsWithChildren } from 'react'
import { ApolloProvider } from '@apollo/client'
import { NhostProvider } from '@nhost/react'
import { nhost } from '@/lib/nhost'
import { makeClient } from './apollo-client'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={makeClient()}>
        {children}
      </ApolloProvider>
    </NhostProvider>
  )
}
