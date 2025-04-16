import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Paper, CircularProgress, Fade, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import { getAIResponse } from '../api';

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const theme = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse([
        ...messages.map(msg => ({ role: msg.isUser ? 'user' : 'assistant', content: msg.text })),
        { role: 'user', content: input }
      ]);

      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Sorry, there was an error processing your request.', isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const chatAreaStyles = {
    flex: 1,
    overflowY: 'auto',
    p: 2,
    bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#ffffff', // Light theme = white
    color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#000000',
  };

  const inputAreaStyles = {
    p: 2,
    borderTop: theme.palette.mode === 'dark' ? '1px solid #333333' : '1px solid #ddd',
    position: 'sticky',
    bottom: 0,
    bgcolor: theme.palette.mode === 'dark' ? '#2b2b2b' : '#ffffff',
  };

  const inputBoxStyles = {
    mr: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#ffffff',
    color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#000000',
    borderRadius: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#ffffff',
      }}
    >
      {/* Chat Area */}
      <Box sx={chatAreaStyles}>
        {messages.map((msg, idx) => (
          <Message key={idx} message={msg.text} isUser={msg.isUser} themeMode={theme.palette.mode} />
        ))}

        {isLoading && (
          <Fade in={true}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 6, mb: 2 }}>
              <CircularProgress size={20} color="inherit" />
              <span style={{ color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#000000' }}>Thinking...</span>
            </Box>
          </Fade>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Paper elevation={10} sx={inputAreaStyles}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            disabled={isLoading}
            sx={inputBoxStyles}
          />
          <IconButton color="primary" onClick={handleSendMessage} disabled={isLoading || input.trim() === ''}>
            <SendIcon sx={{ color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#000000' }} />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chat;
