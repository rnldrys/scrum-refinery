import { Divider, Grid, List, Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import ColumnItem from './ColumnItem'
import { useSelector } from 'react-redux'
import { selectTicketIdsByPoints } from '../store/ticket'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        column: {
            "&:nth-child(even)": {
                backgroundColor: theme.palette.grey[100],
            },
            minWidth: theme.spacing(30),
            height: `100%`,
        },
        list: {
            height: `calc(100% - ${theme.spacing(4.25)}px)`,
            overflow: 'auto'
        }
    })
)
export default function RulerColumn(
    {
        points,
    }:{
        points: number
    }
){
    const classes = useStyles();
    const ticketKeys = useSelector(selectTicketIdsByPoints(points));
    return (
        <>
        <Grid item xs={2} className={classes.column}>
        <Typography variant="h6" align="center">
          {points}
        </Typography>
        <Divider /> 
        <List className={classes.list}>
            {
                ticketKeys.map((key) => {
                    return (
                        <ColumnItem itemKey={key} key={`ruler-col-item-${key}`}/>
                    )
                })
            }
        </List>
        </Grid>
        </>
    )
}