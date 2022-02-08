import * as React from 'react';
import Grid from '@mui/material/Grid';
import CCYBase from './CurrencyBase';
import CCYTerms from './CurrencyTerms';
import Typography from '@mui/material/Typography';


export default function Converter() {
  const [status, setStatus] =  React.useState('')
  const updateConversionStatus = (updateStatus) => {
      setStatus(updateStatus) 
  }

  return (
    <>
        <Grid container justifyContent="center" alignContent='center' alignItems="center" alignSelf='center'  spacing={3}>
        
            <Grid item sm={4} xs={10}>
                <CCYBase updateConversionStatus={updateConversionStatus}/>
            </Grid>      

            <Grid item sm={4}  xs={10}> 
                <CCYTerms updateConversionStatus={updateConversionStatus}/>
            </Grid>
        
        </Grid>
        <Grid  container justifyContent="center" alignContent='center' alignItems="center" alignSelf='center'  spacing={3}>
        <Grid item xs={10}>
                <Typography className="Warning" id="header-text" data-testid="conversion-rate" variant="h6" component="h6">
                    {status}
                </Typography>
            </Grid>
        </Grid>
    </>
  );
}


