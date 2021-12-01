import Container from "../../components/blog/container";
import PostSection from "../../components/blog/post-section";
import HeroPost from "../../components/blog/hero-post";
import Intro from "../../components/blog/intro";
import Layout from "../../components/blog/layout";
import { getAllBlogs } from "../../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import { parseJSON } from "date-fns";

export default function Blog({ allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  const storyPosts = morePosts.filter(p => p.category && p.category == "story");
  const eventPosts = morePosts.filter(p => p.category && p.category == "event");
  return (
    <>
      <Layout>
        <Head>
          <title>匠心筑梦，编织人生 | Co Edit</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {storyPosts.length > 0 && <PostSection section="More Stories" posts={storyPosts} />}
          {eventPosts.length > 0 && <PostSection section="Events" posts={eventPosts}/>}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllBlogs([
    "title",
    "date",
    "slug",
    "category",
    "author",
    "coverImage",
    "excerpt"
  ]);
  return {
    props: { allPosts }
  };
}
