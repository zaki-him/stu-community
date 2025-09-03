import { defineField, defineType } from "sanity";
import {UserIcon} from '@sanity/icons'

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "number"
    }),
    defineField({
      name: "name",
      type: "string"
    }),
    defineField({
      name: "email",
      type: "string"
    }),
    defineField({
      name: "image",
      type: "url"
    }),
    defineField({
      name: "bio",
      type: "text"
    }),
    defineField({
      name: "username",
      type: "string"
    }),
  ],
  preview: {
    select: {
      title: "name"
    }
  }
})