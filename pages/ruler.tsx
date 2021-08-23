import Head from 'next/head'
import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { selectColumns } from '../components/store/ruler'
import { selectAreThereTickets } from '../components/store/ticket'
import UploadTickets from '../components/UploadTickets'
import ResetTickets from '../components/ResetTickets'
import RulerColumn from '../components/ruler/Column'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
          height: `calc(100vh - ${theme.spacing(6)}px)`,
        },
        toolbar: {
            borderBottom: theme.spacing(0.25),
            borderBottomStyle: 'solid',
            borderBottomColor: theme.palette.divider
        },
        inline: {
          display: 'inline',
        },
        rulers: {
          overflowX: 'auto',
          overflowY: 'auto',
          height: `calc(100% - ${theme.spacing(5.75)}px)`,
        },
        ruler: {
          height: '100%',
        },
        empty: {
          height: '100%',
          width: `calc(100% - ${theme.spacing(2)}px)`,
          margin: 'unset'
        },
    })
)

export default function Ruler(){
  const classes = useStyles();
  const columns = useSelector(selectColumns);
  const areThereTickets = useSelector(selectAreThereTickets);

  return (
      <>
      <main className={classes.root}>
          {
            areThereTickets ?
            <>
            <Grid item xs={12} className={classes.toolbar}>
              <UploadTickets />
              <ResetTickets />
            </Grid>
            <Box className={classes.rulers}>
            <Grid container spacing={0} direction='row' wrap='nowrap' className={classes.ruler}>
              {
                columns.map((value) => {
                  return (
                    <RulerColumn points={value} key={`ruler-column-${value}`}/>
                  ) 
                })
              }    
            </Grid>
            </Box>
            </>
            :
            <Grid
              container
              className={classes.empty}
              direction='column'
              alignContent='center'
              justifyContent='center'
              alignItems='center'
              spacing={2}
            >
              <Grid item>
                <Typography>Populate the ruler with tickets by uploading some!</Typography>
              </Grid>
              <Grid item>
                <UploadTickets buttonProps={{ variant:'contained' }} />
              </Grid>
            </Grid>
          }
      </main>
      </>
  )
}

Ruler.getLayout = function getLayout(page: ReactElement){
  return (
    <>
    <Head>
        <title>Scrum Refinery - Story Point Ruler</title>
        <meta name="description" content="by rnldrys" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      {page}
    </Layout>
    </>
  )
}