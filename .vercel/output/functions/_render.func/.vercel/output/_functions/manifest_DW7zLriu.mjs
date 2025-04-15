import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DWpqgWwL.mjs';
import 'es-module-lexer';
import { h as decodeKey } from './chunks/astro/server_DZiBqH6y.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/parki/iCloudDrive/astro/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const l=document.getElementById(\"theme-toggle\"),s=window.matchMedia(\"(prefers-color-scheme: dark)\"),n=localStorage.getItem(\"theme\");(n===\"dark\"||!n&&s.matches)&&document.documentElement.classList.add(\"dark\");l?.addEventListener(\"click\",()=>{document.documentElement.classList.toggle(\"dark\"),localStorage.setItem(\"theme\",document.documentElement.classList.contains(\"dark\")?\"dark\":\"light\")});const o=document.getElementById(\"menu-toggle\"),e=document.getElementById(\"mobile-menu\"),c=document.getElementById(\"close-menu\");o?.addEventListener(\"click\",()=>{e?.classList.remove(\"hidden\"),e?.querySelector(\"div:last-child\")?.classList.remove(\"translate-x-full\")});c?.addEventListener(\"click\",()=>{e?.querySelector(\"div:last-child\")?.classList.add(\"translate-x-full\"),setTimeout(()=>{e?.classList.add(\"hidden\")},200)});e?.querySelector(\"div:first-child\")?.addEventListener(\"click\",()=>{e?.querySelector(\"div:last-child\")?.classList.add(\"translate-x-full\"),setTimeout(()=>{e?.classList.add(\"hidden\")},200)});\n"}],"styles":[{"type":"external","src":"/_astro/index.CRYFYPaj.css"},{"type":"inline","content":":root{--astro-code-color-text: #24292e;--astro-code-color-background: #f6f8fa;--astro-code-token-constant: #005cc5;--astro-code-token-string: #032f62;--astro-code-token-comment: #6a737d;--astro-code-token-keyword: #d73a49;--astro-code-token-parameter: #24292e;--astro-code-token-function: #6f42c1;--astro-code-token-string-expression: #032f62;--astro-code-token-punctuation: #24292e;--astro-code-token-link: #032f62}.dark[data-astro-cid-sckkx6r4]{--astro-code-color-text: #e1e4e8;--astro-code-color-background: #24292e;--astro-code-token-constant: #79b8ff;--astro-code-token-string: #9ecbff;--astro-code-token-comment: #6a737d;--astro-code-token-keyword: #f97583;--astro-code-token-parameter: #e1e4e8;--astro-code-token-function: #b392f0;--astro-code-token-string-expression: #9ecbff;--astro-code-token-punctuation: #e1e4e8;--astro-code-token-link: #9ecbff}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://mywebpage-bay.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/parki/iCloudDrive/astro/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/parki/iCloudDrive/astro/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/posts/[...slug]@_@astro":"pages/posts/_---slug_.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/parki/iCloudDrive/astro/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","C:/Users/parki/iCloudDrive/astro/src/content/posts/test-post.md?astroContentCollectionEntry=true":"chunks/test-post_BsPP9hxB.mjs","C:/Users/parki/iCloudDrive/astro/src/content/posts/welcome.md?astroContentCollectionEntry=true":"chunks/welcome_CerOvUkJ.mjs","C:/Users/parki/iCloudDrive/astro/src/content/posts/test-post.md?astroPropagatedAssets":"chunks/test-post_LxcI3LX2.mjs","C:/Users/parki/iCloudDrive/astro/src/content/posts/welcome.md?astroPropagatedAssets":"chunks/welcome_Dw76ZkMt.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","C:/Users/parki/iCloudDrive/astro/src/content/posts/test-post.md":"chunks/test-post_CSrG-Lkd.mjs","C:/Users/parki/iCloudDrive/astro/src/content/posts/welcome.md":"chunks/welcome_HYfZuBfx.mjs","\u0000@astrojs-manifest":"manifest_DW7zLriu.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.BkqNReL5.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.CRYFYPaj.css","/favicon.svg"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"b5yA6oeOsrWWZ6ExWwcdj2+MAEUgCRPiThF7IIYDJfA=","experimentalEnvGetSecretEnabled":false});

export { manifest };
