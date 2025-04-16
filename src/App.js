import React, { useState } from 'react';
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Chat from './components/Chat';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function App() {
  const [themeMode, setThemeMode] = useState('light');
  const [anchorEl, setAnchorEl] = useState(null);

  const isDark = themeMode === 'dark';

  const theme = createTheme({
    palette: {
      mode: themeMode,
      background: {
        default: isDark ? '#121212' : '#ffffff',
        paper: isDark ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: isDark ? '#ffffff' : '#000000',
      },
    },
  });

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    handleMenuClose();
  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => console.log('Link copied!'))
      .catch((err) => console.error('Failed to copy: ', err));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 1,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: theme.palette.text.primary,
            }}
          >
            AI Chat Assistant
          </Typography>

          <Tooltip title="Share">
            <IconButton onClick={handleShare}>
              <ShareIcon sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="More options">
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleToggleTheme}>
              Switch to {isDark ? 'Light' : 'Dark'} Theme
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="lg"
        sx={{
          mt: 8,
          height: 'calc(100vh - 64px)',
          bgcolor: theme.palette.background.default,
        }}
      >
        <Chat />
      </Container>
    </ThemeProvider>
  );
}

export default App;
