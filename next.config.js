/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['cdn.imagin.studio']
    },
    webpack: (config, { isServer }) => {
     
      return config;
    },
};

module.exports=nextConfig;