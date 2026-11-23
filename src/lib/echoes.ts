import { getCollection, type CollectionEntry } from 'astro:content';

export type EchoEntry = CollectionEntry<'echoes'>;
export type InterviewEntry = CollectionEntry<'interviews'>;

// 读取全部回声
// 注意：这里不按 status 过滤，当前样本全部为 draft，便于开发预览。
// 正式上线前需要明确「发布」的判定规则。
export async function getAllEchoes(): Promise<EchoEntry[]> {
  return getCollection('echoes');
}

// 读取全部访谈
export async function getAllInterviews(): Promise<InterviewEntry[]> {
  return getCollection('interviews');
}

// 首页精选回声：优先取 featuredCandidate 为真的那条，否则退回第一条
export async function getFeaturedEcho(): Promise<EchoEntry | undefined> {
  const echoes = await getAllEchoes();
  return echoes.find((echo) => echo.data.featuredCandidate) ?? echoes[0];
}
