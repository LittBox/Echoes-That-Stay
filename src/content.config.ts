
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 从文件路径中提取 ID
// episode001/content/echoes/xxx.md -> episode001-xxx
function getEntryId(entry: string): string {
  const parts = entry.split('/');
  const episodeId = parts[0];
  const filename = parts.at(-1)!.replace(/\.(md|json)$/, '');

  return `${episodeId}-${filename}`;
}

// 访谈集合
const interviews = defineCollection({
  loader: glob({
    base: './data',
    pattern: 'episode*/content/interviews/*.json',
    generateId: ({ entry }) => getEntryId(entry),
  }),

  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    episodeNumber: z.number().int().positive(),
    showName: z.string().nullable().optional(),
    participants: z.array(z.string()).default([]),
    sourceUrl: z.string().url(),
    sourceVideoId: z.string().optional(),
    publishedAt: z.string().nullable().optional(),
    subtitleVideoAlignmentVerified: z.boolean().default(false),
    status: z.string().default('draft'),
  }).passthrough(),
});

// 回声集合
const echoes = defineCollection({
  loader: glob({
    base: './data',
    pattern: 'episode*/content/echoes/*.md',
    generateId: ({ entry }) => getEntryId(entry),
  }),

  schema: z.object({
    id: z.string().optional(),

    // 关联所属访谈
    interview: reference('interviews'),

    // 回声内容
    editorialTitle: z.string(),
    quote: z.string(),
    editorialSummary: z.string(),
    context: z.string().optional(),
    personalNote: z.string().nullable().optional(),

    // 人物信息
    speaker: z.string().nullable().optional(),
    speakerCandidate: z.string().nullable().optional(),
    speakerStatus: z.string().optional(),

    // 分类和搜索
    topics: z.array(z.string()).default([]),
    searchKeywords: z.array(z.string()).default([]),

    // 视频溯源
    sourceUrl: z.string().url(),
    sourcePlaybackUrl: z.string().url(),
    sourceStartLabel: z.string(),

    sourceRange: z.object({
      startMs: z.number(),
      endMs: z.number(),
    }).passthrough(),

    // 核验状态
    audioVideoVerified: z.boolean().default(false),
    subtitleVideoAlignmentVerified: z.boolean().default(false),

    // 管理信息
    collectedAt: z.string().nullable().optional(),
    featuredCandidate: z.boolean().default(false),
    status: z.string().default('draft'),
  }).passthrough(),
});

export const collections = {
  interviews,
  echoes,
};
