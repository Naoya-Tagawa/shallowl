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
  const [Text, setInputText] = useState('');
  const handleTextButtonClick = () => {
    setShowTextButton(true);
    setShowFileButton(false);
    // window.api.getText().then(text => {setInputText(text);});
  }
  const handleFileButtonClick = () => {
    setShowTextButton(false);
    setShowFileButton(true);
    //setInputText('Hello, World!');
  }
  const theme = createTheme(ColorTheme());

  // useEffect(() => {
  //   // IPC通信を使ってテキストを取得する
  //   window.api.getText().then(text => {
  //     setInputText(text);
  //   });
  // }, []); // 空の依存配列を指定することで、マウント時のみ実行される

  


  return (
    <ThemeProvider theme={theme}>
      <div className='bg-cover bg-center min-h-screen' style={{ backgroundImage: `url(${bgp})` }}>
        <div className=' flex flex-row justify-center p-5'>
          <Button variant='contained' className='p-5' color={showTextButton ? 'ochre' : 'secondary'} onClick={handleTextButtonClick}>
            <Typography variant="h6" color="primary">
              テキストの翻訳
            </Typography>
          </Button>
          <Button variant='contained' color={showFileButton ? 'ochre' : 'secondary'} onClick={handleFileButtonClick}>
            <Typography variant="h6" color="primary">
              文書ファイルの翻訳
            </Typography>
          </Button>
        </div>
        {showTextButton ? 
        <div className='flex flex-row'>
          <InputComponent inputText={Text}/>
          <OutputComponent />
        </div> :null}
        {showFileButton ?
        <div className='flex flex-col'>
          <FileUploadUI />
          <OutputComponent />
        </div> :null}

      </div>
    </ThemeProvider>
  );
}

export default App;
