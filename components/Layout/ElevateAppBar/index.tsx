import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger, 
  Button,
} from '@material-ui/core';
import { Http } from "../../../lib/http";

interface ElevateAppBarProps {
  children: React.ReactElement;
}

const ElevationScroll = (props: ElevateAppBarProps) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const onClick = async (e: React.MouseEvent) => {
  e.preventDefault();
  const http = new Http();
  const response = await http.post('api/auth/logout');
  if (response.ok) {
    location.href = '/auth/login';
  }
};
export const ElevateAppBar = () => {
  return (
    <ElevationScroll>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Axolt</Typography>
          <Button
                  type="submit"
                  color="inherit"
                  size="large"
                  onClick={onClick}
                >
                  LOGOUT
                </Button>
          </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};
