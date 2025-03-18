import React from 'react';
import { Container, Box } from '@mui/material';
import ProductList from './components/ProductList';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <ProductList />
        </Container>
      </Box>
    </CartProvider>
  );
}

export default App;
