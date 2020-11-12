import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import ViewQuiltRoundedIcon from '@material-ui/icons/ViewQuiltRounded';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {
  AppBar,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import Logo from 'src/components/Logo';

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    height: 64
  },
  avatar: {
    //display: "inline-block",
    //display: "inline",
    display: "inline-grid",
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  text: {
    paddingTop: 0,
    paddingLeft: 16,
    verticalAlign: "text-bottom",
    height: 60,
    color: theme.palette.background.default,
    //textAlign: "left",
    //margin: "auto",
  },
  fullWidth: {
    width: "100%",
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Box className={classes.fullWidth}>
            <RouterLink to="/" className={classes.inline}>
              <Avatar className={classes.avatar}>
                <ViewQuiltRoundedIcon/>
              </Avatar>
              <Typography variant="h3" display="inline" color="secondary" noWrap className={classes.text}>
                App-X
              </Typography>
            </RouterLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;