import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { GetStaticProps } from 'next'
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

const readmeFilePath = path.join(process.cwd(), 'README.md');

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
        },
    })
)

export const getStaticProps: GetStaticProps = async () => {
    const readmeFile = fs.readFileSync(readmeFilePath, 'utf8')
    const readmeMatter = matter(readmeFile);
    const readmeContent = await remark().use(html).process(readmeMatter.content);
    const readmeHTML = readmeContent.toString();

    return {
        props: {
        readmeHTML
        }
    }
}

export default function ReadMe({
      readmeHTML
} : {
      readmeHTML: string
}){
    const classes = useStyles();
    return (
        <>
        <main className={classes.root}>
            <div dangerouslySetInnerHTML={{ __html: readmeHTML }} />
        </main>
        </>
    )
}

ReadMe.getLayout = function getLayout(page: ReactElement){
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