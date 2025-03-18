import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Tab,
  Tabs,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  Tooltip,
  Paper,
  Stack,
  InputBase,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  alpha,
  useTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useCart } from '../context/CartContext';
import Cart from './Cart';
import styled from '@emotion/styled';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    flexGrow: 1,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const Header = () => {
  const theme = useTheme();
  const { cartItems, removeFromCart } = useCart();
  const [openDialog, setOpenDialog] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTabValue(0);
    setFormData({ email: '', password: '', confirmPassword: '' });
  };

  const handleOpenCart = () => setOpenCart(true);
  const handleCloseCart = () => setOpenCart(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    handleCloseDialog();
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSearch = (event) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    triggerSearch(newQuery, searchCategory);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSearchCategory(newCategory);
    triggerSearch(searchQuery, newCategory);
  };

  const triggerSearch = (query, category) => {
    const searchEvent = new CustomEvent('productSearch', {
      detail: {
        query: query,
        category: category
      }
    });
    window.dispatchEvent(searchEvent);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ gap: 2 }}>
          <Stack 
            direction="row" 
            spacing={1} 
            alignItems="center" 
            sx={{ 
              '&:hover': {
                '& .logo-icon': {
                  transform: 'rotate(10deg)',
                }
              }
            }}
          >
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 600,
                letterSpacing: 0.5,
                color: 'white',
                whiteSpace: 'nowrap'
              }}
            >
              ShopVista
            </Typography>
            <ShoppingBagIcon 
              className="logo-icon"
              sx={{ 
                color: '#FFD700',
                fontSize: '1.8rem',
                transition: 'transform 0.3s ease-in-out',
              }} 
            />
          </Stack>

          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 },
              mr: 2,
              ml: 4
            }}
          >
            <LocationOnIcon sx={{ color: 'white', mr: 1 }} />
            <Box>
              <Typography variant="caption" sx={{ color: 'white', opacity: 0.8, display: 'block' }}>
                Deliver to
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                Mumbai 400001
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexGrow: 1, maxWidth: 800 }}>
            <FormControl 
              size="small" 
              sx={{ 
                minWidth: 130,
                backgroundColor: alpha('#fff', 0.15),
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '& .MuiSelect-select': { color: 'white' },
                '& .MuiSvgIcon-root': { color: 'white' },
              }}
            >
              <Select
                value={searchCategory}
                onChange={handleCategoryChange}
                displayEmpty
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="books">Books</MenuItem>
              </Select>
            </FormControl>
            <Box 
              sx={{ 
                position: 'relative',
                borderRadius: 1,
                backgroundColor: alpha('#fff', 0.15),
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.25),
                },
                marginLeft: 2,
                marginRight: 2,
                width: '100%',
                [theme.breakpoints.up('sm')]: {
                  width: 'auto',
                  flexGrow: 1,
                },
              }}
            >
              <Box
                sx={{
                  padding: '0 16px',
                  height: '100%',
                  position: 'absolute',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <SearchIcon />
              </Box>
              <InputBase
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
                sx={{
                  color: 'inherit',
                  width: '100%',
                  '& .MuiInputBase-input': {
                    padding: '8px 8px 8px 0',
                    paddingLeft: `calc(1em + 32px)`,
                    width: '100%',
                  },
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Tooltip title="Sign In / Sign Up">
              <IconButton color="inherit" onClick={handleOpenDialog}>
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cart">
              <IconButton color="inherit" onClick={handleOpenCart}>
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
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
          <form onSubmit={handleSubmit}>
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
                onClick={handleCloseDialog}
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

      <Drawer
        anchor="right"
        open={openCart}
        onClose={handleCloseCart}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 480 },
            maxWidth: '100%'
          }
        }}
      >
        <Cart onClose={handleCloseCart} />
      </Drawer>
    </>
  );
};

export default Header; 