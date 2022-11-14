## 🚀 GrapgCMS + Gatsby Example

1.  **Configurar o plugin gatsby-source-graphql.**

    gatsby-config.js

    ```javascript
      module.exports = {
        siteMetadata: {
          title: `My BLog`,
          siteUrl: `https://www.yourdomain.tld`
        },
        plugins: [
          "gatsby-plugin-styled-components",
          {
            resolve: "gatsby-source-graphql", // library
            options: {
              // Arbitrary name for the remote schema Query type
              typeName: "blog",
              // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
              fieldName: "blog",
              // Url to query from
              url: "https://api-us-west-2.graphcms.com/v2/ckswablvp0pvy01z5ew7ths5e/master", // url da api graphCMS
            },
          },
        ]
      };
    ```

2.  **Criar o template que receberá os dados dinâmicos**

    O arquivo de template fica em /src/components/PostTemplate.js


3.  **Gerar páginas dinamicamente no build.**

    Toda a configuração do build está no arquivo gatsby-node.js

4.  **Visitar Páginas.**

    1 - npm run develop
    2- Acesse localhost:8000/blog