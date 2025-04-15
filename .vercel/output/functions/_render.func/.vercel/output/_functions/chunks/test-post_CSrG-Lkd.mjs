import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_DZiBqH6y.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h1 id=\"환영합니다\">환영합니다! 👋</h1>\n<p>이것은 Astro 블로그의 테스트 포스트입니다. 이 포스트는 블로그 시스템이 제대로 작동하는지 확인하기 위해 작성되었습니다.</p>\n<h2 id=\"마크다운-기능-테스트\">마크다운 기능 테스트</h2>\n<ol>\n<li><strong>굵은 글씨</strong>와 <em>기울임꼴</em></li>\n<li><a href=\"https://astro.build\">링크 테스트</a></li>\n<li>코드 블록:</li>\n</ol>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"javascript\"><code><span class=\"line\"><span style=\"color:#E1E4E8\">console.</span><span style=\"color:#B392F0\">log</span><span style=\"color:#E1E4E8\">(</span><span style=\"color:#9ECBFF\">\"안녕하세요!\"</span><span style=\"color:#E1E4E8\">);</span></span>\n<span class=\"line\"></span></code></pre>\n<h3 id=\"이미지-테스트\">이미지 테스트</h3>\n<p>이미지는 나중에 추가할 예정입니다.</p>\n<h2 id=\"다음-단계\">다음 단계</h2>\n<ol>\n<li>Git에 커밋하고 푸시하기</li>\n<li>Vercel 배포 확인하기</li>\n<li>실제 콘텐츠로 채우기</li>\n</ol>";

				const frontmatter = {"title":"첫 번째 테스트 포스트","description":"Astro 블로그 테스트를 위한 첫 번째 포스트입니다","pubDate":"2024-04-15T00:00:00.000Z","tags":["테스트","블로그"]};
				const file = "C:/Users/parki/iCloudDrive/astro/src/content/posts/test-post.md";
				const url = undefined;
				function rawContent() {
					return "\r\n# 환영합니다! 👋\r\n\r\n이것은 Astro 블로그의 테스트 포스트입니다. 이 포스트는 블로그 시스템이 제대로 작동하는지 확인하기 위해 작성되었습니다.\r\n\r\n## 마크다운 기능 테스트\r\n\r\n1. **굵은 글씨**와 *기울임꼴*\r\n2. [링크 테스트](https://astro.build)\r\n3. 코드 블록:\r\n\r\n```javascript\r\nconsole.log(\"안녕하세요!\");\r\n```\r\n\r\n### 이미지 테스트\r\n\r\n이미지는 나중에 추가할 예정입니다.\r\n\r\n## 다음 단계\r\n\r\n1. Git에 커밋하고 푸시하기\r\n2. Vercel 배포 확인하기\r\n3. 실제 콘텐츠로 채우기 ";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"환영합니다","text":"환영합니다! 👋"},{"depth":2,"slug":"마크다운-기능-테스트","text":"마크다운 기능 테스트"},{"depth":3,"slug":"이미지-테스트","text":"이미지 테스트"},{"depth":2,"slug":"다음-단계","text":"다음 단계"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
