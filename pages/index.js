import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Question for RG</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <center>
          <p>
          <br/>I am formally asking you out on <strong><em>February 14th</em></strong> because the two of us are meant to be.
          <br/><strong><em>Rachel</em></strong>, you were made for me.
          </p>
        </center>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}