const id = "test-post.md";
						const collection = "posts";
						const slug = "test-post";
						const body = "\r\n# 환영합니다! 👋\r\n\r\n이것은 Astro 블로그의 테스트 포스트입니다. 이 포스트는 블로그 시스템이 제대로 작동하는지 확인하기 위해 작성되었습니다.\r\n\r\n## 마크다운 기능 테스트\r\n\r\n1. **굵은 글씨**와 *기울임꼴*\r\n2. [링크 테스트](https://astro.build)\r\n3. 코드 블록:\r\n\r\n```javascript\r\nconsole.log(\"안녕하세요!\");\r\n```\r\n\r\n### 이미지 테스트\r\n\r\n이미지는 나중에 추가할 예정입니다.\r\n\r\n## 다음 단계\r\n\r\n1. Git에 커밋하고 푸시하기\r\n2. Vercel 배포 확인하기\r\n3. 실제 콘텐츠로 채우기 ";
						const data = {title:"첫 번째 테스트 포스트",description:"Astro 블로그 테스트를 위한 첫 번째 포스트입니다",pubDate:new Date(1713139200000),tags:["테스트","블로그"],draft:false};
						const _internal = {
							type: 'content',
							filePath: "C:/Users/parki/iCloudDrive/astro/src/content/posts/test-post.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
