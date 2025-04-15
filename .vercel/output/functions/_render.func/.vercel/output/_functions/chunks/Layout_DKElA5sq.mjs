import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { r as removeBase, i as isRemotePath, V as VALID_INPUT_FORMATS, A as AstroError, U as UnknownContentCollectionError, p as prependForwardSlash } from './astro/assets-service_E4dsOteh.mjs';
import { c as createComponent, i as renderUniqueStylesheet, j as renderScriptElement, k as createHeadAndContent, b as renderComponent, r as renderTemplate, u as unescapeHTML, a as createAstro, d as addAttribute, l as renderHead, g as renderSlot } from './astro/server_DZiBqH6y.mjs';
import 'kleur/colors';
import * as devalue from 'devalue';
import 'clsx';
/* empty css                          */

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1);
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class DataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_BcEe_9wP.mjs');
      if (data.default instanceof Map) {
        return DataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return DataStore.fromMap(map);
    } catch {
    }
    return new DataStore();
  }
  static async fromMap(data) {
    const store = new DataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = DataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://mywebpage-bay.vercel.app", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./_astro_asset-imports_D9aVaOQr.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        const entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/posts/test-post.md": () => import('./test-post_BsPP9hxB.mjs'),"/src/content/posts/welcome.md": () => import('./welcome_CerOvUkJ.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"posts":{"type":"content","entries":{"welcome":"/src/content/posts/welcome.md","test-post":"/src/content/posts/test-post.md"}}};

new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/posts/test-post.md": () => import('./test-post_LxcI3LX2.mjs'),"/src/content/posts/welcome.md": () => import('./welcome_Dw76ZkMt.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const $$Astro = createAstro("https://mywebpage-bay.vercel.app");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="ko" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro Blog</title>${renderHead()}</head> <body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" data-astro-cid-sckkx6r4> <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full top-0 z-50" data-astro-cid-sckkx6r4> <nav class="container mx-auto px-4 py-4" data-astro-cid-sckkx6r4> <div class="flex justify-between items-center" data-astro-cid-sckkx6r4> <a href="/" class="text-2xl font-bold" data-astro-cid-sckkx6r4>HOME</a> <div class="hidden lg:flex items-center space-x-8" data-astro-cid-sckkx6r4> <a href="/learning" class="hover:text-blue-500" data-astro-cid-sckkx6r4>학습목록</a> <a href="/graphic-view" class="hover:text-blue-500" data-astro-cid-sckkx6r4>GraphicView</a> <!-- 개발 드롭다운 --> <div class="relative group" data-astro-cid-sckkx6r4> <button class="flex items-center hover:text-blue-500" data-astro-cid-sckkx6r4>
개발
<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-sckkx6r4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-sckkx6r4></path> </svg> </button> <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" data-astro-cid-sckkx6r4> <a href="/dev/java" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>JAVA</a> <a href="/dev/python" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>Python</a> </div> </div> <!-- 게임/메타버스 드롭다운 --> <div class="relative group" data-astro-cid-sckkx6r4> <button class="flex items-center hover:text-blue-500" data-astro-cid-sckkx6r4>
게임/메타버스
<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-sckkx6r4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-sckkx6r4></path> </svg> </button> <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" data-astro-cid-sckkx6r4> <a href="/game/unity" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>Unity</a> <a href="/game/blender" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>Blender</a> <a href="/game/vr" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>VR/AR/XR</a> <a href="/game/engage" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>Engage</a> <a href="/game/hmd" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>HMD</a> </div> </div> <!-- AI 활용 드롭다운 --> <div class="relative group" data-astro-cid-sckkx6r4> <button class="flex items-center hover:text-blue-500" data-astro-cid-sckkx6r4>
AI 활용
<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-sckkx6r4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-sckkx6r4></path> </svg> </button> <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" data-astro-cid-sckkx6r4> <a href="/ai/image" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>이미지생성</a> <a href="/ai/video" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>영상생성/편집</a> <a href="/ai/nocode" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>노코드 개발</a> <a href="/ai/research" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>리서치</a> <a href="/ai/design" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>디자인생성</a> <a href="/ai/model" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>AI 모델</a> </div> </div> <!-- 데이터분석 드롭다운 --> <div class="relative group" data-astro-cid-sckkx6r4> <button class="flex items-center hover:text-blue-500" data-astro-cid-sckkx6r4>
데이터분석
<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-sckkx6r4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-sckkx6r4></path> </svg> </button> <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" data-astro-cid-sckkx6r4> <a href="/data/ml" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>Machine Learning</a> <a href="/data/dl" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>Deep Learning</a> </div> </div> <!-- DB 드롭다운 --> <div class="relative group" data-astro-cid-sckkx6r4> <button class="flex items-center hover:text-blue-500" data-astro-cid-sckkx6r4>
DB
<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-sckkx6r4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-sckkx6r4></path> </svg> </button> <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" data-astro-cid-sckkx6r4> <a href="/db/sql" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>SQL</a> <a href="/db/mysql" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4>MySQL</a> </div> </div> <a href="/output" class="hover:text-blue-500" data-astro-cid-sckkx6r4>OUTPUT</a> <a href="/etc" class="hover:text-blue-500" data-astro-cid-sckkx6r4>기타</a> </div> <div class="flex items-center gap-4" data-astro-cid-sckkx6r4> <!-- 모바일 메뉴 버튼 --> <button id="menu-toggle" class="lg:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" data-astro-cid-sckkx6r4> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-sckkx6r4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" data-astro-cid-sckkx6r4></path> </svg> </button> <!-- 다크모드 토글 --> <button id="theme-toggle" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" data-astro-cid-sckkx6r4> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-sckkx6r4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" data-astro-cid-sckkx6r4></path> </svg> </button> </div> </div> </nav> </header> <!-- 모바일 메뉴 --> <div id="mobile-menu" class="lg:hidden fixed inset-0 z-40 hidden" data-astro-cid-sckkx6r4> <div class="fixed inset-0 bg-black bg-opacity-50" data-astro-cid-sckkx6r4></div> <div class="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-800 transform transition-transform duration-200 ease-in-out translate-x-full" data-astro-cid-sckkx6r4> <div class="p-4" data-astro-cid-sckkx6r4> <div class="flex justify-end" data-astro-cid-sckkx6r4> <button id="close-menu" class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" data-astro-cid-sckkx6r4> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-sckkx6r4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-sckkx6r4></path> </svg> </button> </div> <nav class="mt-4" data-astro-cid-sckkx6r4> <ul class="space-y-2" data-astro-cid-sckkx6r4> <li data-astro-cid-sckkx6r4><a href="/learning" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>학습목록</a></li> <li data-astro-cid-sckkx6r4><a href="/graphic-view" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>GraphicView</a></li> <li data-astro-cid-sckkx6r4><a href="/dev/java" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>JAVA</a></li> <li data-astro-cid-sckkx6r4><a href="/dev/python" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>Python</a></li> <li data-astro-cid-sckkx6r4><a href="/game/unity" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>Unity</a></li> <li data-astro-cid-sckkx6r4><a href="/game/blender" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>Blender</a></li> <li data-astro-cid-sckkx6r4><a href="/game/vr" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>VR/AR/XR</a></li> <li data-astro-cid-sckkx6r4><a href="/game/engage" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>Engage</a></li> <li data-astro-cid-sckkx6r4><a href="/game/hmd" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>HMD</a></li> <li data-astro-cid-sckkx6r4><a href="/ai/image" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>이미지생성</a></li> <li data-astro-cid-sckkx6r4><a href="/ai/video" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>영상생성/편집</a></li> <li data-astro-cid-sckkx6r4><a href="/ai/nocode" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>노코드 개발</a></li> <li data-astro-cid-sckkx6r4><a href="/ai/research" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>리서치</a></li> <li data-astro-cid-sckkx6r4><a href="/ai/design" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>디자인생성</a></li> <li data-astro-cid-sckkx6r4><a href="/ai/model" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>AI 모델</a></li> <li data-astro-cid-sckkx6r4><a href="/data/ml" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>Machine Learning</a></li> <li data-astro-cid-sckkx6r4><a href="/data/dl" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>Deep Learning</a></li> <li data-astro-cid-sckkx6r4><a href="/db/sql" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>SQL</a></li> <li data-astro-cid-sckkx6r4><a href="/db/mysql" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>MySQL</a></li> <li data-astro-cid-sckkx6r4><a href="/output" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>OUTPUT</a></li> <li data-astro-cid-sckkx6r4><a href="/etc" class="block py-2 hover:text-blue-500" data-astro-cid-sckkx6r4>기타</a></li> </ul> </nav> </div> </div> </div> <main class="container mx-auto px-4 pt-24" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </main> <footer class="container mx-auto px-4 py-8 mt-16 border-t border-gray-200 dark:border-gray-700" data-astro-cid-sckkx6r4> <div class="text-center text-sm" data-astro-cid-sckkx6r4> <p data-astro-cid-sckkx6r4>© 2024 Astro Blog. All rights reserved.</p> </div> </footer>  </body></html>`;
}, "C:/Users/parki/iCloudDrive/astro/src/layouts/Layout.astro", void 0);

export { $$Layout as $, getCollection as g };
