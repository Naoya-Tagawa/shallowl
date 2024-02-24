import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { green,lime } from '@mui/material/colors'
import Button from '@mui/material/Button'
import { ColorTheme } from './Colortheme.js';
import { createTheme,ThemeProvider } from '@mui/material/styles';

export default function CircularIntegration(props) {
  const { asyncEvent, success, onClick } = props
  const theme = createTheme(ColorTheme());

  const buttonSx = {
    ...(success && {
      bgcolor: lime[500],
      '&:hover': {
        bgcolor: lime[700],
      },
    }),
  }

  return (
    <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ m: 1, position: 'relative' }}>
            <Button
            variant="contained"
            sx={buttonSx}
            disabled={asyncEvent.loading}
            onClick={() => {
                if (onClick) {
                onClick()
                }
                asyncEvent.execute()
            }}
            >
            {props.text}
            </Button>
            {asyncEvent.loading && (
            <CircularProgress
                size={24}
                sx={{
                color: lime[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
                }}
            />
            )}
        </Box>
        </Box>
    </ThemeProvider>
  )
}