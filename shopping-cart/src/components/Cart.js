import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Paper,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useCart } from '../context/CartContext';

const Cart = ({ onClose }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Mock authentication state (replace with your actual auth logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleQuantityChange = (item, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (quantity > 0) {
      updateQuantity(item.id, quantity);
    }
  };

  const calculateItemTotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setOpenAuthDialog(true);
    } else {
      handleOrderSuccess();
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setOpenAuthDialog(false);
    handleOrderSuccess();
  };

  const handleOrderSuccess = () => {
    setOpenSuccessDialog(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccessDialog(false);
    onClose();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Your cart is empty
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: 3 }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 500 }}>
          Shopping Cart
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: 2, mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">Product</Typography>
            <Typography variant="subtitle2" color="text.secondary">Price</Typography>
            <Typography variant="subtitle2" color="text.secondary">Quantity</Typography>
            <Typography variant="subtitle2" color="text.secondary" align="right">Total</Typography>
            <Box />
          </Box>

          {cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                gap: 2,
                alignItems: 'center',
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body2">₹{item.price.toLocaleString('en-IN')}</Typography>
              <TextField
                type="number"
                size="small"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item, e.target.value)}
                inputProps={{ min: 1 }}
                sx={{ width: '80px' }}
              />
              <Typography variant="body2" align="right">
                ₹{calculateItemTotal(item.price, item.quantity).toLocaleString('en-IN')}
              </Typography>
              <IconButton
                size="small"
                onClick={() => removeFromCart(item.id)}
                sx={{ color: 'error.main' }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mt: 4,
          mb: 3,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="h6">Total Amount:</Typography>
          <Typography variant="h6" color="primary.main">
            ₹{calculateCartTotal().toLocaleString('en-IN')}
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleCheckout}
          sx={{
            py: 1.5,
            borderRadius: 1,
            textTransform: 'none',
            fontSize: '1rem'
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>

      {/* Authentication Dialog */}
      <Dialog 
        open={openAuthDialog} 
        onClose={() => setOpenAuthDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: '400px',
          }
        }}
      >
        <Paper sx={{ p: 0 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontWeight: 500,
                  py: 2,
                },
                '& .Mui-selected': {
                  color: '#1976d2',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#1976d2',
                  height: 3,
                }
              }}
            >
              <Tab label="SIGN IN" />
              <Tab label="SIGN UP" />
            </Tabs>
          </Box>
          <form onSubmit={handleAuthSubmit}>
            <DialogContent sx={{ pt: 4, pb: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    startAdornment: <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
                {tabValue === 1 && (
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                )}
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
              <Button 
                onClick={() => setOpenAuthDialog(false)}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '1rem',
                  color: 'text.secondary'
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained"
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '1rem',
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0'
                  }
                }}
              >
                {tabValue === 0 ? 'Sign In' : 'Sign Up'}
              </Button>
            </DialogActions>
          </form>
        </Paper>
      </Dialog>

      {/* Order Success Dialog */}
      <Dialog 
        open={openSuccessDialog} 
        onClose={handleCloseSuccess}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: '400px',
          }
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>
          <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 600 }}>
            Order Placed Successfully!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Thank you for your order. Your order has been successfully placed and will be processed soon.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Order Total: ₹{calculateCartTotal().toLocaleString('en-IN')}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseSuccess}
            variant="contained"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              px: 4,
              py: 1,
              borderRadius: 2
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart; 