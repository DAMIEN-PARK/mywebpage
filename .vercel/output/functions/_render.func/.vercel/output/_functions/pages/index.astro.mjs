/* empty css                                 */
import { a as createAstro, c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_DZiBqH6y.mjs';
import 'kleur/colors';
import { g as getCollection, $ as $$Layout } from '../chunks/Layout_DKElA5sq.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://mywebpage-bay.vercel.app");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = await getCollection("posts", ({ data }) => {
    return !data.draft;
  });
  posts.sort((a, b) => {
    const dateA = a.data.pubDate ? new Date(a.data.pubDate).getTime() : 0;
    const dateB = b.data.pubDate ? new Date(b.data.pubDate).getTime() : 0;
    return dateB - dateA;
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-4xl mx-auto px-4 py-8"> <h1 class="text-4xl font-bold mb-8">블로그</h1> <div class="space-y-8"> ${posts.map((post) => renderTemplate`<article class="border-b pb-8"> <h2 class="text-2xl font-bold mb-2"> <a${addAttribute(`/posts/${post.slug}`, "href")} class="hover:text-blue-600"> ${post.data.title} </a> </h2> ${post.data.description && renderTemplate`<p class="text-gray-600 mb-2">${post.data.description}</p>`} <div class="text-sm text-gray-500"> <time${addAttribute(post.data.pubDate?.toISOString(), "datetime")}> ${post.data.pubDate?.toLocaleDateString("ko-KR")} </time> </div> ${post.data.tags && post.data.tags.length > 0 && renderTemplate`<div class="flex gap-2 mt-2"> ${post.data.tags.map((tag) => renderTemplate`<span class="bg-gray-100 px-2 py-1 rounded-full text-sm"> ${tag} </span>`)} </div>`} </article>`)} </div> </main> ` })}`;
}, "C:/Users/parki/iCloudDrive/astro/src/pages/index.astro", void 0);

const $$file = "C:/Users/parki/iCloudDrive/astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
