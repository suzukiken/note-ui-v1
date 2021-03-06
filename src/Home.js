import * as React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0, 0.5),
  },
  container: {
    flexGrow: 1
  },
  contentTitle: {
    margin: theme.spacing(2.4, 0, 0.6)
  },
  contentContent: {
    margin: theme.spacing(0, 0, 0)
  },
  contentTag: {
    margin: theme.spacing(0.3),
    fontSize: 11
  },
  contentDate: {
    margin: theme.spacing(0.5, 0),
    fontSize: 12
  },
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    minHeight: 180,
    maxHeight: 400,
  }
}))

function Home() {
  const classes = useStyles();

  const [contents, setContents] = useState([]);
  
  // https://cdknotestragestack-bucket83908e77-15iapvi94z1g2.s3.ap-northeast-1.amazonaws.com/summary/titles.json
  // https://note-dev.figmentresearch.com/summary/titles.json
  const titles_url = 'https://note.figmentresearch.com/summary/titles.json'

  useEffect(() => {
    async function doGet() {
      try {
        fetch(titles_url)
          .then(res => res.json())
          .then(result => {
            console.log(result)
            setContents(result)
          })
      } catch (err) {
        console.log('error doGet')
      }
    }
    doGet()
  }, [])
  
  return (
    <React.Fragment> 
      <Container maxWidth="lg" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
          index
        </Typography>
      </Container>
      <Container maxWidth="sm" className={classes.container}>
        {contents.map((content, index1) => (
          <div key={index1}>
            <div className={classes.contentTitle}>
              <Typography variant="h6" align="left">
                <Link href={`/article/${content.filename.replace('.json', '')}/`}>
                  {content.title}
                </Link>
              </Typography>
            </div>
            <div className={classes.contentContent}>
              {content.content}
            </div>
            <div className={classes.contentDate}>
              {content.reponame} {content.date}
            </div>
            <div>
              {content.tags && content.tags.map((tag, index2) => (
                <Chip key={index2} className={classes.contentTag} label={tag} size="small" />
              ))}
            </div>
          </div>
        ))}
      </Container>
    </React.Fragment> 
  );
}

export default Home

/*
[
   {
      "filename":"cdk-fargate.md",
      "title":"Scheduled Farget Task",
      "category":"Farget",
      "tags":[
         "Farget",
         "ECR",
         "Docker"
      ],
      "date":"2021-06-28",
      "update":"2021-06-29"
   },
   {
      "filename":"cdk-lambda-kicad.md",
      "title":"Kicad",
      "category":"Keyboard",
      "tags":[
         "Kicad",
         "Lambda",
         "S-expression",
         "????????????"
      ],
      "date":"2021-06-29",
      "update":"2021-06-29"
   }
]
*/