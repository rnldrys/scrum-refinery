import { useState } from "react"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { Toolbar } from "@material-ui/core"
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles"
import BarChartIcon from "@material-ui/icons/BarChart"
import InfoIcon from "@material-ui/icons/Info"
import { useSelector, useDispatch } from "react-redux"
import { selectDrawerOpen, closeDrawer } from "./store/layout"
import Link from 'next/link'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export default function Component() {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector(selectDrawerOpen);

    const drawer = (
        <div>
            <Toolbar variant='dense' />
            <Divider />
            <List>
                <Link href={'/ruler'} passHref>
                  <ListItem button>
                      <ListItemIcon><BarChartIcon /></ListItemIcon>
                      <ListItemText primary={'Story Point Ruler'} />
                  </ListItem>
                </Link>
                <Link href={'/readme'} passHref>
                  <ListItem button>
                      <ListItemIcon><InfoIcon /></ListItemIcon>
                      <ListItemText primary={'About'} />
                  </ListItem>
                </Link>
            </List>
            <Divider />
        </div>
    );

    return (
        <>
            <nav className={classes.drawer} aria-label="refinement tools">
            <Hidden smUp implementation="js">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={isDrawerOpen}
                    onClose={() => dispatch(closeDrawer())}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="js">
                <Drawer
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                >
                    {drawer}
                </Drawer>
            </Hidden>
            </nav>
        </>
    )
    
}