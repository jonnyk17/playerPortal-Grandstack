import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { Auth0Provider } from '@auth0/auth0-react';


const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
})

const Main = () => 
{console.log(process.env.REACT_AUTH0_REDIRECT_URI)
  return (
  <ApolloProvider client={client}>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={process.env.REACT_AUTH0_REDIRECT_URI}
    >
      <App />
    </Auth0Provider>
  </ApolloProvider>
)}

ReactDOM.render(<Main />, document.getElementById('root'))
