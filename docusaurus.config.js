// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Provisioning',
  tagline: 'An online recipe collection 📚',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://provisioning.kazvee.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'kazvee', // Usually your GitHub org/user name.
  projectName: 'provisioning', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // TODO: Test this feature
          //   editUrl:
          //     'https://github.com/kazvee/provisioning/',
          // },
          // blog: {
          //   showReadingTime: true,
          //   feedOptions: {
          //     type: ['rss', 'atom'],
          //     xslt: true,
          //   },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // TODO: Test this feature
          // editUrl:
          //   'https://github.com/kazvee/provisioning/',
          // // Useful options to enforce blogging best practices
          // onInlineTags: 'warn',
          // onInlineAuthors: 'warn',
          // onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    require.resolve('docusaurus-lunr-search'),
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/provisioning-social-card.jpg',
      navbar: {
        title: 'Home',
        logo: {
          alt: 'Site logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'All Recipes',
          },
          {
            to: '/docs/tags',
            label: 'Browse Recipes by Tag',
            position: 'left',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          // {
          //   href: 'https://github.com/kazvee',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'About',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Credits',
            items: [
              {
                html: '<a href="https://icons8.com/icon/NJtCLdKaUFe3/recipe" target="_blank" rel="noopener noreferrer">Recipe</a> icon by <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">Icons8</a>',
              },
            ],
          },
          {
            title: 'Favorite Links',
            items: [
              {
                label: 'NYT Cooking',
                href: 'https://cooking.nytimes.com/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/kazvee/',
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        copyright: `Made with ❤️`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
