import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { API } from "aws-amplify";

// NextStep: https://serverless-stack.com/chapters/configure-aws-amplify.html

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function MediaCard(props) {
  const classes = useStyles();
  console.log(props)

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}


class AutoGrid extends Component {
  constructor() {
    super();
    this.state = { data: [] };
    //this.classes = useStyles();
  }

  async componentDidMount() {
    const response = await API.get("hello", "/hello");
    const json = await response;
    this.setState({ data: json[0]['Name'] });
  }

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <MediaCard text={this.state.data}/>
          <MediaCard/>
          <MediaCard/>
          <MediaCard/>
          <MediaCard/>
          <MediaCard/>
          <MediaCard/>
          <MediaCard/>
        </Grid>
      </div>
    );
  }
}

export default AutoGrid
