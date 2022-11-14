exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = require.resolve(`./src/components/PostTemplate.js`);

  const resultPt = await graphql(`
    query {
      blog {
        posts (locales: [pt_BR]) {
          id
          slug
          title
          coverImage (locales: [en]) {
            url
          }
          intro
          author
          authorPicture (locales: [en]) {
            url
          }
          date
          content {
            html
          }
        }
      }
    }
  `)

  const resultEn = await graphql(`
    query {
      blog {
        posts (locales: [en]) {
          id
          slug
          title
          coverImage (locales: [en]) {
            url
          }
          intro
          author
          authorPicture (locales: [en]) {
            url
          }
          date
          content {
            html
          }
        }
      }
    }
  `)
  console.log({
    resultPt,
    resultEn
  })
  // Handle errors
  if (resultPt.errors || resultEn.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const postsPt = resultPt.data.blog.posts;
  const postsEn = resultEn.data.blog.posts;

  postsPt.forEach((item, index) => {
    console.log(item.slug);
    createPage({
      path: `blog/${item.slug}`,
      component: blogPostTemplate,
      context: {
        ...item,
        language: 'pt-BR'
      },
    })
  });

  postsEn.forEach((item, index) => {
    createPage({
      path: `blog/${item.slug}`,
      component: blogPostTemplate,
      context: {
        ...item,
        language: 'en'
      },
    })
  });
};