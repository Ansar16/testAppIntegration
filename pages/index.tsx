import React from 'react'
import Select from 'react-select'
import { render } from 'react-dom'
import FlashMessage from 'react-flash-message'

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
import { response } from 'express';
import { platform } from 'os';

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
    img: {
      width: '300px',
    },
  }),
);

  const platformOptions = [
    { value: 'etsy', label: 'Etsy' },
    { value: 'amazon', label: 'Amazon' },
    { value: 'shopify', label: 'Shopify' }
  ]

  let emailOptions = []

const Index = ({ user }) => {
  const http = new Http();
  const [selectedOptions, setSelectedOptions] = React.useState([])
  const [showFlash, setShowFlash] = React.useState({
      show_message: false,
      message: 'Access Granted Successfully!'
    })

  const handleChange = (options) => {
    setSelectedOptions(options)
  }

  const handleEmailChange = async (option) => {
    const response = await http.get(`api/user/getAccessOfArray?id=${option.value}`)
    let body = await response.json()
    setSelectedOptions(platformOptions.filter(element => body.includes(element.value)))
  }

  const classes = useStyles({});

  const initializeData = async () => {
    const response = await http.get('api/user/getUsers')
    let body = await response.json()

    if (emailOptions.length < 1) {
      body.forEach((element)=> {
        emailOptions.push({ value: element.id, label: element.email })
      })
    }
  }

  const renderImages = () => {
    let platform_images = []

    user.has_access_of.forEach((platform)=> {
      if (platform == "amazon")
        platform_images.push(<img className = {classes.img} src='/images/amazon.png' alt='logo'/>)
      else if (platform == "etsy")
        platform_images.push(<img className = {classes.img} src='/images/etsy.png' alt='logo'/>)
      else
        platform_images.push(<img className = {classes.img} src='/images/shopify.png' alt='logo'/>)
    })

    return platform_images
  }


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      id: e.currentTarget.email.value,
      hasAccessOf: selectedOptions.map((element) => element.value)
    }

    const response = await http.post('api/user/updatePlatformAccess', data);

    if (response.ok) {
      setShowFlash({show_message: true, message: 'Access Granted Successfully!'})
    }
  }

  if (user.role == "admin") {
    initializeData()

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
                  <Select
                    name="email"
                    placeholder="Choose an email"
                    options={emailOptions}
                    onChange={handleEmailChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </FormControl>
                <br />
                <br />

                <FormControl className={classes.formControl} variant="outlined">
                  <Select
                    name="platform"
                    placeholder="Platforms"
                    value={selectedOptions}
                    options={platformOptions}
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
                  Grant Access
                </Button>
                { showFlash.show_message &&
                  <div>
                    <FlashMessage duration={5000}>
                        <strong>{showFlash.message}</strong>
                    </FlashMessage>
                  </div>
                }
                <br />
              </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }
  else {
    return (
      <Layout>
        <div className={classes.root}>
          <div className={classes.container}>
            <div class = "row">
              { renderImages() }
            </div>
          </div>
        </div>
      </Layout>
    )
  }
};

Index.getInitialProps = async ({ req }) => {
  const { user } = req;
  return {
    user,
  };
};

export default Index;
