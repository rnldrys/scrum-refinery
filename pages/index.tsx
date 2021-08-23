import Head from 'next/head'
import { ReactElement } from 'react'
import Layout from '../components/Layout'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
          height: `calc(100vh - ${theme.spacing(6)}px)`,
        },
        fullbleed: {
          height: '100%',
          width: `calc(100% - ${theme.spacing(2)}px)`,
          margin: 'unset'
        },
        subtitle: {
          textAlign: 'center',
        }
    })
)

export default function Home(){
  const classes = useStyles();
  return (
    <>
    <main className={classes.root}>
      <Grid
        container
        className={classes.fullbleed}
        direction='column'
        alignContent='center'
        justifyContent='center'
        alignItems='center'
      >
        <Grid item className={classes.subtitle}>
          <Typography variant='h5'><b>Scrum Refinery</b></Typography>
          <Typography>
            Welcome! I hope the tools here can help make your product backlog refinement easier. 🚀<br/>
            Please try them out. Any feedback and contribution is appreciated. ✌<br/>
            Thanks! -- rnldrys
          </Typography>
        </Grid>
      </Grid>
    </main>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement){
  return (
    <>
    <Head>
        <title>Scrum Refinery</title>
        <meta name="description" content="by rnldrys" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      {page}
    </Layout>
    </>
  )
}