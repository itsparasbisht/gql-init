import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { client } from './lib/apollo'
import { CartProvider } from './context/CartContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <CartProvider>
        <App />
      </CartProvider>
    </ApolloProvider>
  </StrictMode>,
)
