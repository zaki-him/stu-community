import { defineQuery } from "next-sanity";

export const STARTUP_QUERIES = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || title match $search || author->name match $search] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, name, image, bio
    },
    views,
    description,
    category,
    image  
  }`)

export const STARTUP_BY_ID = defineQuery(`*[_type == "startup" && _id == $id][0] {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, name, image, bio, username
    },
    views,
    description,
    category,
    image,
    pitch
  }`)

export const STARTUP_VIEWS_QUERY = defineQuery(`*[_type == "startup" && _id == $id][0] {
  views  
}`)

export const AUTHOR_BY_GITHUB_ID = defineQuery(`*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }`)