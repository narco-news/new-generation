interface Tag {
  slug: string
  name: string
}

interface Tags {
  tag: Tag
}

export interface AuthorPostsCount {
  posts: number
}

export interface Author {
  profile_image: string
  name: string
  count: AuthorPostsCount
  bio: string
  twitter: string
  facebook: string
  website: string
  email: string
}

export interface Article {
  slug: string
  title: string
  feature_image: string
  published_at: string
  custom_excerpt: string
  excerpt: string
  tags: Tags
  primary_author: Author
}

export interface Articles {
  article: Article
}
