export interface Task {
  id: string;
  name: string;
  time: string;
  description: string;
  action: string;
}

export interface Phase {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  weeks: string;
  goal: string;
  goalEn: string;
  tasks: Task[];
  checkpoint: string;
  checkpointEn: string;
  color: string;
}

export interface Resource {
  name: string;
  type: string;
  usage: string;
  url?: string;
  icon: string;
  needsVpn?: boolean;
}

export interface Principle {
  title: string;
  titleEn: string;
  content: string;
}

export const phases: Phase[] = [
  {
    id: 'phase-1',
    number: '01',
    title: '断联期',
    titleEn: 'DISCONNECT',
    weeks: '第1-2周',
    goal: '让「脑中不出现中文」成为默认状态，哪怕说得简陋',
    goalEn: 'MAKE「NO CHINESE」THE DEFAULT',
    color: '#ff00cc',
    tasks: [
      {
        id: 'p1-t1',
        name: '内心独白',
        time: 'T-10min',
        description: '设定3个触发场景（起床/吃饭/通勤）',
        action: '脑中只允许出现英文，卡壳用简单词或「that thing」代替',
      },
      {
        id: 'p1-t2',
        name: '物体直联',
        time: 'T-5min',
        description: '环顾房间，快速命名10个物品',
        action: '「Backpack. It\'s black and heavy.」',
      },
      {
        id: 'p1-t3',
        name: '英英释义',
        time: 'T-10min',
        description: '每天选5个常见词，用英文解释给自己听',
        action: '从日常名词/动词开始：refrigerator, hesitate, organize',
      },
      {
        id: 'p1-t4',
        name: '输入浸泡',
        time: 'T-15min',
        description: '听《All Ears English》或类似播客',
        action: '不看文本只听，目标是抓大意，不逐词翻译',
      },
    ],
    checkpoint: '你能连续用英文内心独白3分钟而不自觉冒出中文吗？如果不能，延长此阶段1周。',
    checkpointEn: 'CAN YOU THINK IN ENGLISH FOR 3 MINUTES?',
  },
  {
    id: 'phase-2',
    number: '02',
    title: '重构期',
    titleEn: 'RESTRUCTURE',
    weeks: '第3-4周',
    goal: '开始用英文处理抽象概念，不只是描述物体',
    goalEn: 'PROCESS ABSTRACT CONCEPTS IN ENGLISH',
    color: '#3333ff',
    tasks: [
      {
        id: 'p2-t1',
        name: '影子跟读',
        time: 'T-15min',
        description: '选一段2-3分钟的视频/播客',
        action: '先听一遍，再延迟跟读两遍，最后暂停复述',
      },
      {
        id: 'p2-t2',
        name: '观点转述',
        time: 'T-10min',
        description: '看一段英文新闻/短视频（1-2分钟）',
        action: '关掉后用自己的英文总结：「The speaker thinks... because...」',
      },
      {
        id: 'p2-t3',
        name: '决策英文化',
        time: 'T-5min',
        description: '今天做的任何决定',
        action: '在脑中用英文列出 pros and cons',
      },
      {
        id: 'p2-t4',
        name: '场景词汇库',
        time: 'T-10min',
        description: '针对出国高频场景',
        action: '每天收集并整理10个实用表达，用英文写例句',
      },
    ],
    checkpoint: '能否用英文向陌生人解释「你为什么选这个专业/这个学校」？尝试录音，回听是否有翻译痕迹。',
    checkpointEn: 'CAN YOU EXPLAIN YOUR CHOICE IN ENGLISH?',
  },
  {
    id: 'phase-3',
    number: '03',
    title: '输出倒逼期',
    titleEn: 'OUTPUT DRIVE',
    weeks: '第5-6周',
    goal: '强迫大脑在压力下用英文组织复杂信息',
    goalEn: 'FORCE YOUR BRAIN TO ORGANIZE UNDER PRESSURE',
    color: '#00ccff',
    tasks: [
      {
        id: 'p3-t1',
        name: '自言自语演讲',
        time: 'T-15min',
        description: '设定一个话题（AI、环保、留学生活）',
        action: '对着手机录音，连续说3分钟不停。允许语法错误，不允许沉默超过5秒',
      },
      {
        id: 'p3-t2',
        name: '模拟对话',
        time: 'T-15min',
        description: '每天预演1个高频场景，出声说',
        action: '机场海关/宿舍报修/见导师/餐厅点餐特殊要求',
      },
      {
        id: 'p3-t3',
        name: '反驳训练',
        time: 'T-10min',
        description: '看一个英文观点（Reddit帖子、评论）',
        action: '在脑中用英文组织反驳或赞同，至少3句话',
      },
      {
        id: 'p3-t4',
        name: '日记切换',
        time: 'T-5min',
        description: '如果平时写日记，从此全部改用英文',
        action: '只写今天发生了什么，不用华丽词藻',
      },
    ],
    checkpoint: '第5周开始，手机/电脑系统语言全部切为英文。适应初期的「操作困难」本身就是训练。',
    checkpointEn: 'SWITCH ALL DEVICES TO ENGLISH',
  },
  {
    id: 'phase-4',
    number: '04',
    title: '实战冲刺期',
    titleEn: 'FINAL SPRINT',
    weeks: '第7-8周',
    goal: '把英语思维练到「疲惫时的默认状态」',
    goalEn: 'MAKE ENGLISH YOUR DEFAULT EVEN WHEN TIRED',
    color: '#00ff9d',
    tasks: [
      {
        id: 'p4-t1',
        name: '盲听挑战',
        time: 'T-20min',
        description: '看一集美剧/电影第一遍无字幕',
        action: '第二遍英文字幕。推荐：《The Office》(US)、《Modern Family》',
      },
      {
        id: 'p4-t2',
        name: '全英日',
        time: '1 day/wk',
        description: '选一天（周日），全天内心独白、计划全部英文',
        action: '找语伴/在线陪练进行30分钟真实对话（Cambly/Preply）',
      },
      {
        id: 'p4-t3',
        name: '应急表达库',
        time: 'T-10min',
        description: '整理并背诵20个「万能缓冲句」',
        action: '「Could you repeat that?」/「Let me think for a second...」',
      },
      {
        id: 'p4-t4',
        name: '弱点狙击',
        time: 'T-10min',
        description: '回听第5-6周的录音',
        action: '找出最卡顿的3个场景，针对性重写脚本并反复演练',
      },
    ],
    checkpoint: '找一段中文新闻，尝试不经过中文翻译，直接用英文概括大意。如果能做到，说明回路已初步建立。',
    checkpointEn: 'SUMMARIZE CHINESE NEWS DIRECTLY IN ENGLISH',
  },
];

export const resources: Resource[] = [
  { name: 'All Ears English', type: '播客', usage: '阶段一、二日常输入', url: 'https://www.allearsenglish.com/', icon: 'podcast' },
  { name: 'English with Lucy', type: 'YouTube', usage: '阶段二影子跟读', url: 'https://www.youtube.com/c/EnglishwithLucy', icon: 'youtube', needsVpn: true },
  { name: 'BBC Learning English', type: 'YouTube', usage: '阶段二影子跟读', url: 'https://www.youtube.com/bbclearningenglish', icon: 'youtube', needsVpn: true },
  { name: 'The Office (US)', type: '美剧', usage: '阶段三、四盲听', url: 'https://www.netflix.com/', icon: 'tv', needsVpn: true },
  { name: 'Longman Dictionary', type: '英英词典', usage: '全程查词用', url: 'https://www.ldoceonline.com/', icon: 'book' },
  { name: 'Merriam-Webster', type: '英英词典', usage: '全程查词用', url: 'https://www.merriam-webster.com/', icon: 'book' },
  { name: 'Cambly', type: '语伴平台', usage: '阶段三、四实战输出', url: 'https://www.cambly.com/', icon: 'users' },
  { name: 'Preply', type: '语伴平台', usage: '阶段三、四实战输出', url: 'https://preply.com/', icon: 'users' },
];

export const principles: Principle[] = [
  {
    title: '「No Chinese」是铁律，不是目标',
    titleEn: 'NO CHINESE',
    content: '哪怕你只能说「I want... that thing... because... good」，也比在心里翻译成「我想要那个东西因为它很好」再转述要强。质量暂时让位于语言的直接性。',
  },
  {
    title: '利用「社交压力」预演',
    titleEn: 'SOCIAL PRESSURE',
    content: '出国前两周，尽量参加一次英语角或线上外教课。真实对话中的「尴尬」和「脑子空白」是最高效的训练——它会在你脑中留下深刻印记，逼你下次提前准备。',
  },
];

export const timeOverview = [
  { phase: '1-2周', time: '40分钟', actions: '内心独白 + 英英释义 + 输入浸泡' },
  { phase: '3-4周', time: '40分钟', actions: '影子跟读 + 观点转述 + 词汇库' },
  { phase: '5-6周', time: '45分钟', actions: '演讲录音 + 模拟对话 + 英文日记' },
  { phase: '7-8周', time: '40-60分钟', actions: '盲听 + 全英日 + 弱点狙击' },
];

export const englishDefinitions: { word: string; definition: string }[] = [
  { word: 'refrigerator', definition: 'A large machine that keeps food and drinks cold so they stay fresh longer.' },
  { word: 'hesitate', definition: 'To pause before doing or saying something because you are unsure or nervous.' },
  { word: 'organize', definition: 'To arrange things in a systematic order or to plan an event or activity.' },
  { word: 'awkward', definition: 'Making you feel embarrassed or uncomfortable; not smooth or graceful.' },
  { word: 'routine', definition: 'A set of actions that you do regularly in the same order or at the same time.' },
  { word: 'schedule', definition: 'A plan that lists events or tasks and the times when they will happen.' },
  { word: 'confidence', definition: 'The feeling that you can trust yourself to do things well or succeed.' },
  { word: 'fluent', definition: 'Able to speak or write a language smoothly and easily without many pauses.' },
  { word: 'translate', definition: 'To change words from one language into another language.' },
  { word: 'expression', definition: 'A word or group of words used in a particular situation to communicate an idea or feeling.' },
];

export const softLanding = [
  '整理个人词汇库：把模拟中常用的、卡壳的20个表达，写成一张A4纸，登机前再看一遍',
  '预设「破冰」脚本：准备3个自我介绍版本（15秒/1分钟/3分钟），以及5个问别人的问题',
  '心理预演：在脑中过一遍从飞机落地到宿舍入住的全程，每个环节用英文问自己：「接下来我要说什么？」',
];
