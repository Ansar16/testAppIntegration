import React from 'react';
import Select from 'react-select'

import {
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import { Http } from '../lib/http';
import { Layout } from '../components/Layout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(8),
    },
    container: {
      width: 480,
      margin: `${theme.spacing(2)}px auto`,
    },
    card: {
      padding: theme.spacing(4),
    },
    formControl: {
      minWidth: 320,
    },
    inputBox: {
      paddingTop: 10.5,
      paddingBottom: 0,
    },
    submitButton: {
      margin: `${theme.spacing(4)}px 0`,
    },
  }),
);

const options = [
  { value: 'etsy', label: 'Etsy' },
  { value: 'amazon', label: 'Amazon' },
  { value: 'shopify', label: 'Shopify' }
]

const Index = ({ user }) => {
  const [selectedOptions, setSelectedOptions] = React.useState([]);


  const handleChange = (options) => {
    setSelectedOptions(options);
  }

  const classes = useStyles({});
  const [email, setEmail] = React.useState('');
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
 
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const http = new Http();

    const data = {
      name: e.currentTarget.email.value.split("@")[0],
      email: e.currentTarget.email.value,
      password: '123456',
      hasAccessOf: selectedOptions,
    }

    const response = await http.post('api/auth/register', data);
  
    console.log(selectedOptions)
  }

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.container}>
          <Card className={classes.card}>
            <CardContent>
            <form
              onSubmit={onSubmit}
              autoComplete="off"
              noValidate
            >
              <FormControl className={classes.formControl} variant="outlined">
                <TextField 
                  id="email"
                  name="email"
                  type="text"
                  label="Email"
                  onChange={onChangeEmail}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <Select
                  name="platform"
                  placeholder="Platforms"
                  options={options}
                  onChange={handleChange}
                  isMulti
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </FormControl>
          
              <Button
                className={classes.submitButton}
                type="submit"
                variant="outlined"
                color="primary"
                size="large"
              >
                Send Invite
              </Button>
              <br />
            </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

Index.getInitialProps = async ({ req }) => {
  const { user } = req;
  return {
    user,
  };
};

export default Index;
