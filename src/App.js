import bgp from './assets/image/bgp.svg';
import './index.css';
import { Typography,Button } from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import Comp from './Components';
function App() {
  const [showTextButton, setShowTextButton] = useState(true);
  const [showFileButton, setShowFileButton] = useState(false);
  const handleTextButtonClick = () => {
    setShowTextButton(true);
    setShowFileButton(false);

  }
  const handleFileButtonClick = () => {
    setShowTextButton(false);
    setShowFileButton(true);
  }





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
    <div>
        <div className='bg-cover bg-center min-h-screen' style={{ backgroundImage:`url(${bgp})` }}>
          <ThemeProvider theme={theme}>
            <div className="flex flex-col items-center jusify-center">
              <header className=' flex flex-row items-center justify-center mt-1'>
              <Button variant='contained' color={showTextButton ? 'ochre' : 'secondary'}  onClick={() =>{handleTextButtonClick()}}>
                <Typography variant="h6" color="primary">
                  テキストの翻訳
                </Typography>
              </Button>
              <Button variant='contained' color={showFileButton ? 'ochre' : 'secondary'} onClick={() => {handleFileButtonClick()}}>
                <Typography variant="h6" color="primary">
                  文書ファイルの翻訳
                </Typography>
              </Button>
              </header>
              <Comp />
            </div>
          </ThemeProvider>
        </div>
    </div>
  );
}

export default App;
