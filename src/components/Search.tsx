import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import { Container,Button,FormGroup,Grid,TextField} from '@mui/material';
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
       
        width: '25ch',
      },
    },
    appbar: {
      padding:'5px'
    },
    formGroup: {
      alignItems: 'center'
    }
  }));



function Search() {

    const classes = useStyles();
    const {
     
        control
      } = useForm()

/* omitting some of the other LOC to save space */
  return (
       <>
    <Container maxWidth="sm">
     <h1>Search for kwhs</h1>
     <FormGroup className={classes.formGroup}>
      <form className={classes.root} noValidate autoComplete="off">
      <Grid  item xs={12} sm={12} md={12} >
      <Controller
          render={({ field }) => <TextField   {...field} />}
          name="TextField"
          control={control}
          defaultValue="wolard"
          
        />
        </Grid>
        <Grid  item xs={12} sm={12} md={12} >
        <Controller
          render={({ field}) => <TextField  type="password" {...field} />}
          name="TextField2"
          control={control}
          defaultValue=""
        />
        </Grid>
        <Grid  item xs={12} sm={12} md={12} >
  <Button variant="contained"> login</Button>

  </Grid>
   </form>
   </FormGroup>
     </Container>
     </>
  );
}


export default Search;