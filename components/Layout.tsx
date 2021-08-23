import AppBar from "@material-ui/core/AppBar"
import Image from 'next/image'
import Button from '@material-ui/core/Button'
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import GithubIcon from "@material-ui/icons/GitHub"
import  {ReactNode, ReactElement } from "react"
import Slide from "@material-ui/core/Slide"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { useDispatch } from "react-redux"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import { toggleDrawerOpen } from '../components/store/layout';
import Drawer from '../components/Drawer';
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles"
import Link from 'next/link'
import Link_ from '@material-ui/core/Link'

function HideOnScroll({ children }: { children: ReactElement}) {
    const trigger = useScrollTrigger();

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        
        '@global': {
            '*::-webkit-scrollbar': {
            width: '0.2em'
            },
            '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '0px solid slategrey'
            }
        },
        appBar: {
            zIndex: theme.zIndex.drawer * 3
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
              display: 'none',
            },
        },
        footer: {
            display: 'none'
        },
        logo: {
            height: '1em',
            marginLeft: '0.5rem'
        },
        title: {
            flexGrow: 1,
        },
    })
)

export default function Layout({ children }: { children: ReactNode}){
    const classes = useStyles();
    const dispatch = useDispatch();
    return (
        <>
            <Drawer />
            <header>
                <HideOnScroll>
                    <AppBar className={classes.appBar}>
                    <Toolbar variant="dense">
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            onClick={() => dispatch(toggleDrawerOpen())}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link href={'/'} passHref>
                            <Link_
                                color='textPrimary'
                                href={'/'}
                                className={`${classes.title}`}
                                underline="none"
                            >
                                <Typography variant="h6">Scrum Refinery</Typography>
                            </Link_>
                        </Link>
                        <Link_ href={'https://github.com/rnldrys/scrum-refinery'} target="_blank">
                            <IconButton
                                aria-label="github"
                                edge="end"
                            >
                                <GithubIcon />
                            </IconButton>
                        </Link_>
                    </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Toolbar variant="dense"/>
            </header>
            {children}
            <footer className={classes.footer}>
                <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={classes.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </>
    )
}