import logo from './logo.svg';
import './App.css';
import Typography from '@mui/material/Typography';
import Converter from './components/converter';

import Paper from '@mui/material/Paper';

//style={{margin:25, padding:15, height:'100%'}}

function App() {
  return (
    <div className="App">
      <header >
        
      </header>
      <Paper className="Frame" elevation={6} square={false}>
        <Typography className="Topic" id="header-text" variant="h5" component="h5">
          Currency Converter
        </Typography>
        <Converter/>
      </Paper>
    </div>
  );
}

export default App;
