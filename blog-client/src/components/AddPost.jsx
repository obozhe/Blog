import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  form: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 5,
    paddingTop: 20,
    backgroundColor: '#D6F0F5',
    height: '100%',
    '& .MuiTextField-root': {
      width: '90%',
      margin: '10px',
    },
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function AddPost({
  type, open, handleClose, handleSave, article,
}) {
  const classes = useStyles();
  const [author, setAuthor] = React.useState(article ? article.author : '');
  const [title, setTitle] = React.useState(article ? article.title : '');
  const [text, setText] = React.useState(article ? article.text : '');

  function save() {
    handleSave({
      author, title, text,
    }, article ? article._id : null, type);
    handleClose();
    setAuthor('');
    setTitle('');
    setText('');
  }

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {type === 'CREATE' ? 'Create a new post' : 'Edit the post'}
            </Typography>
            <Button autoFocus color="inherit" onClick={save}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            className={classes.input}
            required
            variant="outlined"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            label="Author"
          />
          <TextField
            className={classes.input}
            required
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            label="Title"
          />
          <TextField
            className={classes.input}
            required
            variant="outlined"
            onChange={(e) => setText(e.target.value)}
            value={text}
            label="Text"
            multiline
            rows="10"
          />
        </form>
      </Dialog>
    </div>
  );
}
