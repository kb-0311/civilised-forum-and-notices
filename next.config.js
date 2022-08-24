/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules');
module.exports =  {
  reactStrictMode: true,
  images:{
    domains:['avatars.githubusercontent.com' 
    ,'iiitp-civilised.netlify.app'
    ,'links.papareact.com'
    ,'creazilla-store.fra1.digitaloceanspaces.com'
    ,'avatars.dicebear.com'
  ]
  },
  env: {
    GRAPHQL_STEPZEN_KEY: process.env.GRAPHQL_STEPZEN_KEY,
    GRAPHQL_STEPZEN_URI: process.env.GRAPHQL_STEPZEN_URI,
  },
}
