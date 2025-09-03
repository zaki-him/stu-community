import View from "@/components/View";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from 'markdown-it'
import { Skeleton } from "@/components/ui/skeleton";


const md = markdownit()

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || '')

  return (
    <>
      <section className="green_container !min-h-[260px]">
        <p className="tag tag-tri">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading">{post.description}</p>
      </section>

      <section className="section_container">
        <img src={post.image} alt="" className="w-full h-auto rounded-xl" />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Link href={`/user/${post.author?._id}`}>
                <Image
                  src={post.author?.image}
                  width={64}
                  height={64}
                  alt=""
                  className="rounded-full drop-shadow-lg"
                />
              </Link>
              <Link href={`/user/${post.author?._id}`}>
                <div>
                  <p className="text-xl font-semibold">{post.author?.name}</p>
                  <p className="text-md font-semibold text-neutral-400">
                    @{post.author?.username}
                  </p>
                </div>
              </Link>
            </div>
            <p className="category-tag">{post.category}</p>
          </div>

          <hr className="divider"/>

          <h3 className="text-4xl text-extrabold">Pitch Details</h3>
          {parsedContent ? (
            <article 
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose max-w-4xl break-all font-worksans"
            />
          ) : (
            <p className="text-black text-sm font-normal">
              No details provided
            </p>
          )}

          <Suspense fallback={<Skeleton className="view_skeleton"/>}>
            <View id={id}/>
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default page;
