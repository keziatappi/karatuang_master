export default function sitemap() {
  return [
    {
      url: 'https://kelurahankaratuang.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://kelurahankaratuang.com/galeri',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
