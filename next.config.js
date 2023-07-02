/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
        "upload.wikimedia.org",
        "uhdtv.io",
        "mango.blender.org",
        "download.blender.org",
    ]
},
  reactStrictMode: true,
}

const withVideos = require('next-videos')



module.exports = withVideos()
module.exports = nextConfig
