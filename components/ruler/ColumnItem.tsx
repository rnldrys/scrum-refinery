import { Divider, ListItem, ListItemText, Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { useSelector } from 'react-redux'
import { selectTicket } from '../store/ticket'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        item: {
            borderStyle: 'solid',
            borderRadius: theme.spacing(1),
            borderColor: theme.palette.grey[300],
            borderWidth: theme.spacing(1/8),
            width: `calc(100% - ${theme.spacing(1)}px)`,
            margin: theme.spacing(0.5),
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
          display: 'inline',
        }
    })
)
export default function RulerColumn(
    {
        itemKey,
    }:{
        itemKey: string
    }
){
    const classes = useStyles();
    const ticket = useSelector(selectTicket(itemKey));
    
    return (
        <>
        <ListItem className={classes.item}>
            <ListItemText
            primary={ticket?.summary}
            secondary={
                <>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    {itemKey}
                </Typography>
                { ticket?.description}
                </>
            }
            />
        </ListItem>
        {/* <Divider component="li" /> */}
        </>
    )
}