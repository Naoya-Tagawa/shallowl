import bgp from './assets/image/bgp.svg';
import './index.css';
import { Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { ColorTheme } from './Colortheme';
import InputComponent from './InputComponent';
import OutputComponent from './OutputComponent';
import FileUploadUI from './FileUploadUI';

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
  const theme = createTheme(ColorTheme());

  return (
    <div>
      <div className='bg-cover bg-center min-h-screen' style={{ backgroundImage: `url(${bgp})` }}>
          <div className="flex flex-col items-center jusify-center h-full">
            <ThemeProvider theme={theme}>
            <header className=' flex flex-row items-center justify-center mt-1'>
              <Button variant='contained' color={showTextButton ? 'ochre' : 'secondary'} onClick={handleTextButtonClick}>
                <Typography variant="h6" color="primary">
                  テキストの翻訳
                </Typography>
              </Button>
              <Button variant='contained' color={showFileButton ? 'ochre' : 'secondary'} onClick={handleFileButtonClick}>
                <Typography variant="h6" color="primary">
                  文書ファイルの翻訳
                </Typography>
              </Button>
            </header>
            <div className='flex flex-col items-center justify-center h-full'>
              {showTextButton ? <InputComponent /> : <FileUploadUI />}
              <div className="flex-grow"></div> {/* OutputComponentを下半分いっぱいに表示するためのスペース */}
              <OutputComponent />
            </div>
            </ThemeProvider>
          </div>
      </div>
    </div>
  );
}

export default App;
