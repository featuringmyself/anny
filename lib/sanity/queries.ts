import { defineQuery } from "next-sanity";

const imageProjection = `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions { width, height, aspectRatio }
    }
  },
  alt,
  hotspot,
  crop
`;

const seoProjection = `
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description, excerpt, ""),
    "image": coalesce(
      seo.image { ${imageProjection} },
      coverImage { ${imageProjection} }
    ),
    "noIndex": seo.noIndex == true,
    "canonicalUrl": seo.canonicalUrl
  }
`;

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && publishedAt <= now() && seo.noIndex != true]
    | order(publishedAt desc) {
      _id,
      _updatedAt,
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      "noIndex": seo.noIndex == true,
      coverImage { ${imageProjection} },
      author->{
        name,
        "slug": slug.current,
        role
      },
      categories[]->{
        title,
        "slug": slug.current
      }
    }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && publishedAt <= now() && seo.noIndex != true]{
    "slug": slug.current
  }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    excerpt,
    publishedAt,
    "updatedAt": coalesce(updatedAt, _updatedAt),
    "slug": slug.current,
    "bodyText": pt::text(body),
    coverImage { ${imageProjection} },
    author->{
      name,
      role,
      bio,
      sameAs,
      "slug": slug.current,
      image { ${imageProjection} }
    },
    categories[]->{
      title,
      description,
      "slug": slug.current
    },
    body[]{
      ...,
      _type == "image" => {
        ${imageProjection},
        caption
      }
    },
    faqs[]{
      _key,
      question,
      answer
    },
    related[]->{
      _id,
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      coverImage { ${imageProjection} },
      categories[]->{
        title,
        "slug": slug.current
      }
    },
    "morePosts": *[_type == "post" && defined(slug.current) && slug.current != $slug && publishedAt <= now() && seo.noIndex != true]
      | order(publishedAt desc)[0...3]{
        _id,
        title,
        excerpt,
        publishedAt,
        "slug": slug.current,
        coverImage { ${imageProjection} },
        categories[]->{
          title,
          "slug": slug.current
        }
      },
    ${seoProjection}
  }
`);

export const SITEMAP_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && publishedAt <= now() && seo.noIndex != true]{
    "href": "/blog/" + slug.current,
    _updatedAt,
    publishedAt
  }
`);

export const REDIRECTS_QUERY = defineQuery(`
  *[_type == "redirect" && isEnabled == true && defined(source) && defined(destination)]{
    source,
    destination,
    permanent
  }
`);

export const RSS_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && publishedAt <= now() && seo.noIndex != true]
    | order(publishedAt desc)[0...50]{
      title,
      excerpt,
      publishedAt,
      "updatedAt": coalesce(updatedAt, _updatedAt),
      "slug": slug.current,
      "description": coalesce(seo.description, excerpt, ""),
      author->{ name }
    }
`);
