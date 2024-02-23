import bgp from './assets/image/bgp.svg';
import './index.css';
import { TextField } from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { useState,useEffect } from 'react';

function Comp() {
  





  const theme = createTheme({
    palette: {
      ochre: {
        main: '#DF6063',
      },
      primary: {
        main: '#E8ebee',
      },
      secondary: {
        main: 'rgba(232, 235, 238, 0)', // 透明にするために alpha 値を 0 に設定
      },
    },
  });

  return (
        <ThemeProvider theme={theme}>
            <div className='flex flex-row items-center justify-center p-10 w-1/2'>
                <TextField
                    multiline
                    rows={10}
                    defaultValue="Default Value"
                    variant="outlined"
                    color='ochre'
                    inputProps={{style: {fontSize: 20, color: '#E8ebee'},placeholder: '翻訳したい文章を入力してください。'}}
                    InputLabelProps={{style: {fontSize: 20}}}
                    fullWidth
                    focused
                />
                
            </div>
        </ThemeProvider>
  );
}

export default Comp;
