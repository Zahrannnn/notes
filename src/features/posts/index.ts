/**
 * posts feature — content pipeline + pages.
 * Authoring: drop a .md file in src/content/posts (frontmatter validated at
 * build/dev time). Rendering: react-markdown + Shiki in components.
 */
export {
  posts,
  getPostBySlug,
  getPostMetas,
  getAllTags,
  getPostsByTag,
  type Post,
  type Frontmatter,
} from './api/posts';
