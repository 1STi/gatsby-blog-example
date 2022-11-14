/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `My BLog`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "blog",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "blog",
        // Url to query from
        url: "https://api-us-west-2.graphcms.com/v2/ckswablvp0pvy01z5ew7ths5e/master",
      },
    },
  ]
};