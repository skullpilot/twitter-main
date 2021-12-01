import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/blog/container";
import PostBody from "../../components/blog/post-body";
import Header from "../../components/blog/header";
import PostHeader from "../../components/blog/post-header";
import Layout from "../../components/blog/layout";
import { getBlogBySlug, getAllBlogs } from "../../lib/api";
import PostTitle from "../../components/blog/post-title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";

export default function Blog({ blog, morePosts, preview }) {
  const router = useRouter();
  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{blog.title} | Co Edit</title>
                <meta property="og:image" content={blog.ogImage.url} />
              </Head>
              <PostHeader
                title={blog.title}
                coverImage={blog.coverImage}
                date={blog.date}
                author={blog.author}
              />
              <PostBody content={blog.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const blog = getBlogBySlug(params.slug, [
    "title",
    "date",
    "category",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage"
  ]);
  const content = await markdownToHtml(blog.content || "");

  return {
    props: {
      blog: {
        ...blog,
        content
      }
    }
  };
}

export async function getStaticPaths() {
  const blogs = getAllBlogs(["slug"]);

  return {
    paths: blogs.map((blog) => {
      return {
        params: {
          slug: blog.slug
        }
      };
    }),
    fallback: false
  };
}
