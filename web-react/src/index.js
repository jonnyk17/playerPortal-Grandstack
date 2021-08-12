import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { Auth0Provider } from '@auth0/auth0-react';


const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
})

const Main = () => (
  <ApolloProvider client={client}>
    <Auth0Provider
      domain="dev-jxxen9p2.us.auth0.com"
      clientId="s0lnhSpSrLXkQ5oYTfNisNkS6tjtoSt0"
      redirectUri={"http://localhost:3000/callback"}
     //redirectUri={"https://playerportal.netlify.app/#/callback"}
    >
      <App />
    </Auth0Provider>
  </ApolloProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'))
