import React from 'react';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
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
     <FormGroup className={classes.formGroup} noValidate autoComplete="on">
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