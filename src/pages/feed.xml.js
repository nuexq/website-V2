import { Feed } from "feed";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { siteConfig } from "@/config/site";

export async function GET() {
  const siteUrl = `${siteConfig.url}/`;
  const md = new MarkdownIt({ html: true, breaks: true, linkify: true });

  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteUrl,
    link: siteUrl,
    language: "en",
    // favicon: "http://example.com/favicon.ico", // TODO: favicon
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: { atom: `${siteUrl}feed.xml` },
    author: { name: siteConfig.author },
    updated: new Date(),
  });

  const writing = await getCollection("writing");

  writing.map((post) => {
    const url = `${siteUrl}/writing/${post.slug}`;
    const publishDate = new Date(post.data.date);
    const updatedDate = post.data.modified
      ? new Date(post.data.modified)
      : publishDate;

    const sanitizedContent = sanitizeHtml(md.render(post.body), {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "h1",
        "h2",
        "h3",
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt"],
        a: ["href", "target", "rel"],
      },
      transformTags: {
        a: (tagName, attribs) => ({
          tagName,
          attribs: attribs.href?.startsWith("/")
            ? {
                ...attribs,
                href: `${siteUrl}${attribs.href}`,
                target: "_blank",
                rel: "noopener",
              }
            : attribs,
        }),
        img: (tagName, attribs) => ({
          tagName,
          attribs: attribs.src?.startsWith("/")
            ? { ...attribs, src: `${siteUrl}${attribs.src}` }
            : attribs,
        }),
      },
    });

    feed.addItem({
      title: post.data.title,
      id: url,
      link: url,
      description: post.data.description || "",
      content: sanitizedContent,
      author: [{ name: siteConfig.author }],
      date: publishDate,
      updated: updatedDate,
    });
  });

  const rss = feed.atom1();
  const xmlWithBase = rss.replace(
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `<feed xmlns="http://www.w3.org/2005/Atom" xml:base="${siteConfig.url}/">`,
  );

  return new Response(xmlWithBase, {
    headers: { "Content-Type": "application/xml" },
  });
}
