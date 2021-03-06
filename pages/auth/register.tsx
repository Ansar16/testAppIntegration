import React from 'react';
import {
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
} from '@material-ui/core';
import Link from '../../components/Link';
import { Http } from '../../lib/http';

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
    submitButton: {
      margin: `${theme.spacing(4)}px 0`,
    },
  }),
);

const Register = () => {
  const classes = useStyles({});
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const http = new Http();

    const data = {
      name: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }

    const response = await http.post('api/auth/register', data);
    if (response.ok) {
      location.href = '/';
    } else {
      alert('Failed to register!');
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2">Axolt</Typography>
      <form
        onSubmit={onSubmit}
        className={classes.container}
        autoComplete="off"
        noValidate
      >
        <Card className={classes.card}>
          <CardContent>
            <FormControl className={classes.formControl} variant="outlined">
              <TextField
                id="username"
                name="username"
                type="text"
                label="NAME"
                value={name}
                onChange={onChangeName}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <FormControl className={classes.formControl} variant="outlined">
              <TextField
                id="email"
                name="email"
                type="text"
                label="EMAIL"
                value={email}
                onChange={onChangeEmail}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <br />
            <FormControl className={classes.formControl} variant="outlined">
              <TextField
                id="password"
                name="password"
                type="password"
                label="PASSWORD"
                value={password}
                onChange={onChangePassword}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <Button
              className={classes.submitButton}
              type="submit"
              variant="outlined"
              color="primary"
              size="large"
            >
              REGISTER
            </Button>
            <br />
            <Link
              href="/auth/login"
              color="secondary"
            >
              Have an Account? Please Login!
            </Link>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Register;
