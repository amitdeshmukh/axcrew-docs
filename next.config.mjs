import createMDX from 'fumadocs-mdx/config';

const withMDX = createMDX({
  rootContentPath: './content/docs',
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
