import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Box,
  Container,
  Paper,
  InputLabel,
  Rating,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { fetchProducts, fetchProductsByCategory, fetchProductsByPriceRange } from '../services/api';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const ProductList = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  useEffect(() => {
    fetchFilteredProducts();
  }, [category, priceRange]);

  useEffect(() => {
    const handleSearch = (event) => {
      const { query, category: searchCategory } = event.detail;
      setSearchQuery(query);
      
      let filtered = [...products];
      
      if (query.trim()) {
        const searchTerm = query.toLowerCase().trim();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchTerm)
        );
      }
      
      if (searchCategory !== 'all') {
        filtered = filtered.filter(product => 
          product.category.toLowerCase() === searchCategory.toLowerCase()
        );
      }
      
      setFilteredProducts(filtered);
    };

    window.addEventListener('productSearch', handleSearch);
    return () => window.removeEventListener('productSearch', handleSearch);
  }, [products]);

  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      let data;

      if (category !== 'All' && priceRange !== 'All') {
        const [min, max] = getPriceRangeValues(priceRange);
        data = await fetchProductsByCategory(category);
        data = data.filter(product => 
          product.price >= min && (max ? product.price <= max : true)
        );
      } else if (category !== 'All') {
        data = await fetchProductsByCategory(category);
      } else if (priceRange !== 'All') {
        const [min, max] = getPriceRangeValues(priceRange);
        data = await fetchProductsByPriceRange(min, max);
      } else {
        data = await fetchProducts();
      }

      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPriceRangeValues = (range) => {
    switch (range) {
      case '0-1000':
        return [0, 1000];
      case '1001-5000':
        return [1001, 5000];
      case '5001+':
        return [5001, null];
      default:
        return [0, null];
    }
  };

  const renderProductDetails = (product) => (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{
          objectFit: 'contain',
          p: 2,
          backgroundColor: alpha(theme.palette.primary.main, 0.03)
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://source.unsplash.com/500x500/?${product.name.toLowerCase().replace(' ', '-')}`;
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="h2"
          sx={{ 
            fontSize: '1.1rem',
            mb: 1,
            height: '2.4em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>

        {/* Brand */}
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          Brand: {product.brand || 'Generic'}
        </Typography>

        {/* Rating and Reviews */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating value={product.rating || 4} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({product.reviewCount || '245'} reviews)
          </Typography>
        </Box>

        {/* Price Section */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            color="primary"
            sx={{ 
              mb: 0.5,
              fontSize: '1.25rem',
              fontWeight: 600
            }}
          >
            ₹{product.price.toLocaleString('en-IN')}
          </Typography>
          {product.originalPrice && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ textDecoration: 'line-through' }}
              >
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </Typography>
              <Typography 
                variant="body2" 
                color="success.main"
                sx={{ fontWeight: 500 }}
              >
                {Math.round((1 - product.price / product.originalPrice) * 100)}% off
              </Typography>
            </Box>
          )}
        </Box>

        {/* Delivery Info */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalShippingIcon sx={{ fontSize: '1rem', mr: 1, color: 'success.main' }} />
            <Typography variant="caption" color="success.main">
              Free Delivery
            </Typography>
          </Box>
          {product.fastDelivery && (
            <Typography variant="caption" color="primary">
              Fast Delivery Available
            </Typography>
          )}
        </Box>

        {/* Stock Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Chip 
            label={product.quantityAvailable > 0 ? 'In Stock' : 'Out of Stock'}
            color={product.quantityAvailable > 0 ? 'success' : 'error'}
            size="small"
            sx={{ borderRadius: 1 }}
          />
          {product.quantityAvailable > 0 && product.quantityAvailable < 10 && (
            <Typography 
              variant="caption" 
              color="error" 
              sx={{ ml: 1 }}
            >
              Only {product.quantityAvailable} left!
            </Typography>
          )}
        </Box>

        {/* Product Features */}
        {product.features && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
              Key Features:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2 }}>
              {product.features.slice(0, 3).map((feature, index) => (
                <Typography 
                  key={index} 
                  component="li" 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ mb: 0.25 }}
                >
                  {feature}
                </Typography>
              ))}
            </Box>
          </Box>
        )}

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          onClick={() => addToCart(product)}
          disabled={product.quantityAvailable === 0}
          startIcon={<ShoppingCartIcon />}
          sx={{ 
            mt: 'auto',
            textTransform: 'none',
            borderRadius: 1,
            py: 1
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          backgroundColor: alpha(theme.palette.primary.main, 0.03),
          borderRadius: 2
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: { xs: 2, md: 0 } }}>
              Filter Products
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="All">All Categories</MenuItem>
                {['Electronics', 'Clothing', 'Beauty', 'Home', 'Books'].map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Price Range</InputLabel>
              <Select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                label="Price Range"
              >
                <MenuItem value="All">All Prices</MenuItem>
                <MenuItem value="0-1000">Under ₹1,000</MenuItem>
                <MenuItem value="1001-5000">₹1,001 - ₹5,000</MenuItem>
                <MenuItem value="5001+">Above ₹5,000</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            {renderProductDetails(product)}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList; 