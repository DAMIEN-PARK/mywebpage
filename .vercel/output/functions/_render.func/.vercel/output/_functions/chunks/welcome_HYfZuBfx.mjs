import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_DZiBqH6y.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h1 id=\"환영합니다\">환영합니다!</h1>\n<p>이것은 Obsidian에서 Astro로 변환된 첫 번째 포스트입니다.</p>\n<h2 id=\"마크다운-기능-테스트\">마크다운 기능 테스트</h2>\n<ul>\n<li>목록 항목 1</li>\n<li>목록 항목 2\n<ul>\n<li>중첩된 항목</li>\n</ul>\n</li>\n</ul>\n<blockquote>\n<p>인용문도 사용할 수 있습니다.</p>\n</blockquote>\n<p>코드 블록도 지원됩니다:</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"python\"><code><span class=\"line\"><span style=\"color:#79B8FF\">print</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#9ECBFF\">\"Hello, World!\"</span><span style=\"color:#E1E4E8\">)</span></span>\n<span class=\"line\"></span></code></pre>";

				const frontmatter = {"title":"환영합니다!","description":"첫 번째 블로그 포스트입니다.","pubDate":"2024-04-15T00:00:00.000Z","tags":["welcome","blog"]};
				const file = "C:/Users/parki/iCloudDrive/astro/src/content/posts/welcome.md";
				const url = undefined;
				function rawContent() {
					return "\n# 환영합니다!\n\n이것은 Obsidian에서 Astro로 변환된 첫 번째 포스트입니다.\n\n## 마크다운 기능 테스트\n\n- 목록 항목 1\n- 목록 항목 2\n  - 중첩된 항목\n\n> 인용문도 사용할 수 있습니다.\n\n코드 블록도 지원됩니다:\n\n```python\nprint(\"Hello, World!\")\n``` ";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"환영합니다","text":"환영합니다!"},{"depth":2,"slug":"마크다운-기능-테스트","text":"마크다운 기능 테스트"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
