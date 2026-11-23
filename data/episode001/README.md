# Echoes That Stay：第一期内容样本

本包根据当前上传的 TXT 与 SRT 整理，包含一期访谈、六条候选回声、完整的带时间码字幕数据与原始附件。已补充用户提供的 B 站视频来源及六条回声的回看入口。它是供网站内容建模、阅读排版和检索试用的草稿内容包。

## 文件用途

- `sample-data.json`：本期元信息与六条回声的完整结构化数据，适合先用于原型。
- `src/content/echoes/*.md`：一条回声一个 Markdown 文件，正文预留给你的个人感想，目前为空。
- `src/content/interviews/*.json`：单期访谈信息。
- `transcripts/*.json`：完整 708 条字幕，包含 cue 编号、原始文字及毫秒时间。
- `sources/interview.srt` 与 `sources/interview.txt`：原附件的逐字节副本；原文件名及 SHA-256 保存在访谈元信息中。
- `verification-report.json`：文本比对、时间码检查、片头重复位置和疑似字幕错误记录。

## 候选回声

| 编辑标题 | SRT 时间区间 | Cue 编号 | 说话者候选 |
|---|---|---|---|
| 情绪不必急着分好坏 | 00:07:41,600–00:07:45,679 | 233–234 | 鲁豫（推定） |
| 让能量持续流动 | 00:08:05,280–00:08:08,879 | 246–248 | 鲁豫（推定） |
| 与自己生活在不同的时区 | 00:10:38,200–00:10:50,479 | 330–335 | 鲁豫（推定） |
| 美与自由 | 00:12:39,840–00:12:49,199 | 388–391 | 鲁豫（推定） |
| 手艺带来的底气 | 00:15:31,600–00:15:35,879 | 475–476 | 鲁豫（推定） |
| 忠于自己 | 00:18:30,080–00:18:37,839 | 566–569 | 金靖（推定） |

首页候选为「让能量持续流动」：“像水一样流动，不争先，但是要滔滔不绝。”正文上下文是在谈希望保持怎样的能量状态。

## 使用与核对

1. 六条 `quote` 只合并字幕换行、补充标点。`originalSubtitleText` 保存原始对应文字；`sourceRange` 保存连续 cue 编号和毫秒起止时间。
2. 已完成与上传字幕的逐字对照；尚未核对音视频。TXT 与 SRT 内容一致，不代表有两份独立证据证明字幕正确。
3. SRT 没有说话者标签。`speaker` 留空，推测保存在 `speakerCandidate`，依据保存在 `speakerEvidence`。音视频核实后再填写正式说话者；在预览中展示候选时应标明“推定”。
4. `editorialTitle`、`editorialSummary`、`context`、主题及检索词是本次整理建议，不是节目原话，也不是你的个人感想。`personalNote` 与 Markdown 正文留空。
5. 视频来源已填写为用户提供的 B 站链接；节目正式名称、发布日期和视频完整时长仍未知，保留为空。末条字幕结束于 00:23:56,399，只表示字幕覆盖位置。所有时间码对应这份上传字幕；与视频的实际对齐情况尚待核验。视频页面读取返回 HTTP 412，未据此补写视频元信息或确认人物。
6. 所有内容 `status` 均为 `draft`，`featuredCandidate` 只表示首页编辑候选。接入网站时，详情路由、列表和搜索索引应统一依据发布状态选取内容。
7. 内容包尚不包含运行网站所需的页面、依赖和集合配置。接入 Astro 时，先在项目的 `src/content.config.ts` 定义字段与 `interview` 关联，再将这些文件加载到对应集合。原始资料放在内容管理侧，是否呈现在公开页面由你决定。

## 由这期样本得到的结构建议

- 一期访谈关联多条回声；全文字幕保存在访谈层，回声保存精确出处区间。
- 保留「原始字幕」「展示摘录」「编辑概括」「个人感想」四类不同信息。
- 搜索可以同时覆盖摘录、概括、主题和你以后补充的感想；生成同义检索词只是额外线索，不等同于已实现语义搜索。
- 先用一条短句、一条长摘录和一条人物待核对的内容检查页面，确认文字长度与资料完整程度不同时仍能顺畅阅读。

## 视频溯源入口

完整视频：[鲁豫对话金靖：什么是真正的自由](https://www.bilibili.com/video/BV1axZJBnE78/)。

访谈页使用 `sourceUrl` 显示“观看原视频”；每条回声可以同时显示“观看原视频”与 `sourcePlaybackLabel`。后者使用 `sourcePlaybackUrl` 打开 B 站外链播放器，传入对应的起点，完整视频入口仍指向用户提供的视频页。

| 回声 | 回看入口 |
|---|---|
| 情绪不必急着分好坏 | [从 07:41 回看](https://player.bilibili.com/player.html?bvid=BV1axZJBnE78&t=461&autoplay=0) |
| 让能量持续流动 | [从 08:05 回看](https://player.bilibili.com/player.html?bvid=BV1axZJBnE78&t=485&autoplay=0) |
| 与自己生活在不同的时区 | [从 10:38 回看](https://player.bilibili.com/player.html?bvid=BV1axZJBnE78&t=638&autoplay=0) |
| 美与自由 | [从 12:39 回看](https://player.bilibili.com/player.html?bvid=BV1axZJBnE78&t=759&autoplay=0) |
| 手艺带来的底气 | [从 15:31 回看](https://player.bilibili.com/player.html?bvid=BV1axZJBnE78&t=931&autoplay=0) |
| 忠于自己 | [从 18:30 回看](https://player.bilibili.com/player.html?bvid=BV1axZJBnE78&t=1110&autoplay=0) |

回看链接遵循 [B 站官方外链播放器文档](https://player.bilibili.com/) 的 `bvid`、`t` 与 `autoplay` 参数；`t` 以秒为单位。起点由字幕毫秒数向下取整，保留 `sourceRange` 中的精确原始时间。`autoplay=0` 关闭自动播放。

这些链接已写入内容数据；当前还没有运行中的网站页面。字幕与视频的时间对齐及实际播放跳转尚未核验。如播放器无法打开，仍可通过完整视频入口按显示时间查找。
