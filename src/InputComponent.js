import bgp from './assets/image/bgp.svg';
import './index.css';
import { TextField } from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { ColorTheme } from './Colortheme';
import { useState,useEffect } from 'react';

function InputComponent() {
  const theme = createTheme(ColorTheme());

  return (
    <div className='p-5'>
        <ThemeProvider theme={theme}>

                <TextField
                    multiline
                    rows={10}
                    variant="outlined"
                    color='ochre'
                    inputProps={{style: {fontSize: 20, color: '#E8ebee'},placeholder: '翻訳したい文章を入力してください。'}}
                    InputLabelProps={{style: {fontSize: 20}}}
                    fullWidth
                    focused
                />
        </ThemeProvider>
    </div>
  );
}

export default InputComponent;
