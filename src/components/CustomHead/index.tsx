import Head from 'next/head';

import { DOMAIN } from '../../constants';

import type PostType from '../../types/post';

interface CustomHeadInterface {
  post?: PostType;
  type: 'posting' | 'main';
}

const CustomHead = ({ post, type }: CustomHeadInterface) => {
  return type === 'posting' ? (
    <Head>
      <title>{post?.title} | 정현수 기술 블로그</title>
      <meta property="og:site_name" content="정현수 기술 블로그" />

      <meta property="og:image" content={`${DOMAIN}${post?.coverImage}`} />
      <meta property="og:title" content={`${post?.title} | 정현수 기술 블로그`} />

      <meta property="og:description" content={post?.description} />
      <meta name="twitter:description" content={post?.description} />

      <meta name="twitter:label1" content="Category" />
      <meta name="twitter:data1" content={`개발 | ${post?.category}`} />

      <meta
        name="article:published_time"
        content={`${post?.date.replace(/[/]/g, '-')}T09:00:00.000Z`}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={`${DOMAIN}${post?.coverImage}`} />
      <meta property="og:url" content={`https://junghyeonsu-dev.vercel.app/posts/${post?.slug}`} />
    </Head>
  ) : (
    <Head>
      <title>정현수 기술 블로그</title>
      <meta property="og:site_name" content="정현수 기술 블로그" />

      <meta property="og:title" content="정현수 기술 블로그" />
      <meta name="twitter:title" content="정현수 기술 블로그" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="/profile.jpeg" />
      <meta property="og:image" content="/profile.jpeg" />

      <meta property="og:description" content="공부한 것들을 정리해서 올립니다." />
      <meta name="twitter:description" content="공부한 것들을 정리해서 올립니다." />

      <meta name="twitter:label1" content="Category" />
      <meta name="twitter:data1" content="개발" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://junghyeonsu-dev.vercel.app" />
    </Head>
  );
};

export default CustomHead;
