import { useMediaQuery, TextField } from '@mui/material';

function InputComponent(props) {
  const isMediumScreen = useMediaQuery('(min-height: 600px)');
  const isLargeScreen = useMediaQuery('(min-height: 900px)');

  let rows = 14; // デフォルトの行数

  if (isMediumScreen) {
    rows = 18; // 600px以上の場合の行数
  }

  if (isLargeScreen) {
    rows = 30; // 900px以上の場合の行数
  }

  return (
    <div className='p-5 flex-grow'>
      <TextField
        multiline
        rows={rows}
        variant="outlined"
        color='ochre'
        inputProps={{ style: { fontSize: 20, color: '#E8ebee' }, placeholder: '翻訳結果がここに表示されます。' }}
        InputLabelProps={{ style: { fontSize: 20 } }}
        fullWidth
        focused
        value={props.inputText}
      />
    </div>
  );
}

export default InputComponent;
