/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
  },
  date: {
    fontSize: 12,
    textAlign: 'right',
  },
  author: {
    fontSize: 14,
    marginBottom: 12,
  },
  buttonLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  topLine: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default function Article({
  title, author, text, createdAt, id,
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <span className={classes.topLine}>
          <Typography className={classes.author} color="textSecondary">
            {author}
          </Typography>
          <Typography className={classes.date} color="textSecondary" gutterBottom>
            {createdAt}
          </Typography>
        </span>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.text} align="left" variant="body2" component="p">
          {`${text.slice(0, 20)}...`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link className={classes.buttonLink} to={`/${id}`}>
            more
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
