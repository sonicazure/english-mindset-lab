export interface DailyPhrase {
  en: string;
  zh: string;
  context: string;
}

// 30 days of daily phrases - practical expressions for study abroad
export const dailyPhrases: DailyPhrase[] = [
  { en: "I'm not following. Could you say that differently?", zh: '我没跟上。你能换一种说法吗？', context: '课堂/讨论没听懂' },
  { en: "That's a fair point, but I think...", zh: '这是个合理的观点，但我认为...', context: '学术讨论中表达不同意见' },
  { en: "Quick question — is this due by Friday?", zh: '打扰一下——这个周五之前交吗？', context: '确认作业截止日期' },
  { en: "Mind if I join you?", zh: '介意我加入你们吗？', context: '加入小组讨论/餐桌' },
  { en: "I'm running late for class. See you later!", zh: '我上课要迟到了。回头见！', context: '匆忙告别' },
  { en: "Could I get a rain check?", zh: '能改天吗？/下次可以吗？', context: '婉拒邀请但表示有兴趣' },
  { en: "It slipped my mind. I'll do it right now.", zh: '我给忘了。我马上做。', context: '忘记做某事' },
  { en: "I'm torn between these two options.", zh: '我在两个选项之间犹豫不决。', context: '表达选择困难' },
  { en: "To be honest, I'm still on the fence about it.", zh: '说实话，我还在犹豫。', context: '尚未做决定' },
  { en: "Let's touch base tomorrow.", zh: '我们明天联系一下。', context: '约定后续沟通' },
  { en: "Can you walk me through this?", zh: '能带我过一遍这个吗？', context: '请求讲解步骤' },
  { en: "I spaced out for a second. What did you say?", zh: '我走神了一下。你刚才说什么？', context: '课堂走神' },
  { en: "This is way over my head.", zh: '这完全超出我的理解范围。', context: '内容太难' },
  { en: "Do you want to grab coffee sometime?", zh: '想什么时候一起去喝咖啡吗？', context: '社交邀约' },
  { en: "I second that.", zh: '我同意。/我附议。', context: '表示赞同' },
  { en: "Sorry, I have my hands full right now.", zh: '抱歉，我现在腾不出手来。', context: '婉拒帮忙请求' },
  { en: "Could you keep me posted?", zh: '有进展能告诉我一声吗？', context: '请求保持更新' },
  { en: "I'm not feeling it today.", zh: '我今天状态不太好。', context: '表达不在状态' },
  { en: "Where do I sign up for this?", zh: '这个在哪里报名？', context: '报名活动/课程' },
  { en: "That rings a bell.", zh: '有点印象。/听着耳熟。', context: '对某事有模糊记忆' },
  { en: "I need to crash. See you tomorrow!", zh: '我要睡了。明天见！', context: '睡前告别' },
  { en: "Could you speak up a bit?", zh: '能大声一点吗？', context: '没听清请求提高音量' },
  { en: "I'm swamped with assignments.", zh: '我被作业淹没了。', context: '抱怨学业繁忙' },
  { en: "What time works for you?", zh: '你什么时间方便？', context: '约时间' },
  { en: "I'll take a rain check on that.", zh: '这次先不去，下次吧。', context: '婉拒' },
  { en: "That's news to me.", zh: '我第一次听说。', context: '表示惊讶/不知道' },
  { en: "Count me in!", zh: '算我一个！', context: '积极参加活动' },
  { en: "I have no clue where to start.", zh: '我完全不知道从哪开始。', context: '面对新任务不知所措' },
  { en: "Thanks for having me.", zh: '谢谢邀请/接待。', context: '感谢主人的邀请' },
  { en: "Let's call it a day.", zh: '今天就到这里吧。', context: '结束一天的学习/工作' },
];

/**
 * Get today's phrase based on the day of month.
 * Returns a consistent phrase for the same day.
 */
export function getTodayPhrase(): DailyPhrase {
  const day = new Date().getDate();
  return dailyPhrases[(day - 1) % dailyPhrases.length];
}
