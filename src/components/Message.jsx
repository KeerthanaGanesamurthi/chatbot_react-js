import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

const Message = ({ message, isUser, themeMode }) => {
  const [liked, setLiked] = useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
  };

  const isDark = themeMode === 'dark';

  // Common background for both user & AI messages
  const bubbleBg = isDark ? '#303030' : '#f5f5f5';
  const textColor = isDark ? '#e0e0e0' : '#000000';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        mb: 2,
        px: 1,
      }}
    >
      <Avatar sx={{ bgcolor: isUser ? '#1976d2' : '#757575', mt: 0.5 }}>
        {isUser ? 'U' : 'AI'}
      </Avatar>

      <Box sx={{ maxWidth: '80%' }}>
        <Paper
          elevation={2}
          sx={{
            p: 1.5,
            width: '100%',
            bgcolor: bubbleBg,
            borderRadius: 3,
            wordBreak: 'break-word',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              color: textColor,
            }}
          >
            {message}
          </Typography>
        </Paper>

        {/* Action Buttons (only for AI messages) */}
        {!isUser && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 1,
              mt: 0.5,
              ml: 0.5,
            }}
          >
            <Tooltip title="Copy">
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{ color: textColor }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Like">
              <IconButton
                size="small"
                color={liked === true ? 'primary' : 'default'}
                onClick={() => setLiked(true)}
                sx={{ color: textColor }}
              >
                <ThumbUpAltOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Dislike">
              <IconButton
                size="small"
                color={liked === false ? 'error' : 'default'}
                onClick={() => setLiked(false)}
                sx={{ color: textColor }}
              >
                <ThumbDownAltOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Message;
