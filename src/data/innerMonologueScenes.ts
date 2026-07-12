export interface MonologueScene {
  id: string;
  scene: string;
  prompt: string;
  level: 'easy' | 'medium' | 'hard';
}

export const monologueScenes: MonologueScene[] = [
  // Everyday interactions - easy
  { id: 'm1', scene: '早晨起床', prompt: '描述你昨晚的睡眠、今天的心情、今天的计划', level: 'easy' },
  { id: 'm2', scene: '洗漱更衣', prompt: '描述你看到的自己的样子、穿的衣服、今天的天气', level: 'easy' },
  { id: 'm3', scene: '做早餐', prompt: '描述你正在做什么食物、味道、你饿不饿', level: 'easy' },
  { id: 'm4', scene: '出门通勤', prompt: '描述路上看到的人、交通状况、你的心情', level: 'easy' },
  { id: 'm5', scene: '等电梯', prompt: '描述周围的环境、等待时的想法、时间紧迫吗', level: 'easy' },
  { id: 'm6', scene: '买咖啡', prompt: '假装在咖啡店点单，描述你想要什么、和店员的对话', level: 'easy' },
  { id: 'm7', scene: '超市购物', prompt: '描述你在买什么、为什么买、价格如何', level: 'easy' },
  { id: 'm8', scene: '做饭/洗碗', prompt: '描述步骤、食材、味道、是否享受这个过程', level: 'easy' },
  { id: 'm9', scene: '整理房间', prompt: '描述房间的每个角落、什么东西在哪里、整洁还是乱', level: 'easy' },
  { id: 'm10', scene: '晚上睡前', prompt: '回顾今天做了什么、有什么感想、明天的期待', level: 'easy' },
  // Social - medium
  { id: 'm11', scene: '偶遇同学/同事', prompt: '打招呼、聊近况、表达惊讶或高兴', level: 'medium' },
  { id: 'm12', scene: '收到消息', prompt: '描述消息内容、你的第一反应、怎么回复', level: 'medium' },
  { id: 'm13', scene: '聚会场景', prompt: '描述在场的人、氛围、你在做什么、和谁的对话', level: 'medium' },
  { id: 'm14', scene: '拒绝邀请', prompt: '礼貌地拒绝一个邀约、给出理由、表达遗憾', level: 'medium' },
  { id: 'm15', scene: '请求帮助', prompt: '描述你遇到了什么困难、向谁求助、怎么说', level: 'medium' },
  { id: 'm16', scene: '迷路问路', prompt: '描述你在哪、要去哪、怎么向陌生人问路', level: 'medium' },
  { id: 'm17', scene: '餐厅点餐', prompt: '描述菜单上的选择、询问推荐、特殊要求', level: 'medium' },
  { id: 'm18', scene: '打电话预约', prompt: '描述你要预约什么、提供信息、确认时间', level: 'medium' },
  // Campus/Study - medium
  { id: 'm19', scene: '上课走神', prompt: '描述课堂上讲的内容、你走神在想什么、拉回来的过程', level: 'medium' },
  { id: 'm20', scene: '图书馆自习', prompt: '描述周围的环境、你在学什么、进展如何', level: 'medium' },
  { id: 'm21', scene: '小组讨论', prompt: '描述组员说了什么、你的观点、是否同意别人', level: 'medium' },
  { id: 'm22', scene: '准备考试', prompt: '描述复习的内容、焦虑程度、计划怎么分配时间', level: 'medium' },
  { id: 'm23', scene: '写论文/作业', prompt: '描述主题、卡在哪里、思路的推进', level: 'medium' },
  { id: 'm24', scene: '选课纠结', prompt: '描述两个选项的 pros and cons、你的犹豫', level: 'medium' },
  // Abstract/Hard - hard
  { id: 'm25', scene: '争论观点', prompt: '选择一个话题（如AI、环保），组织支持和反对的论点', level: 'hard' },
  { id: 'm26', scene: '解释决定', prompt: '解释你为什么做了一个选择、考虑了什么因素', level: 'hard' },
  { id: 'm27', scene: '描述情绪', prompt: '描述你现在的感觉、为什么、用什么词最准确', level: 'hard' },
  { id: 'm28', scene: '未来规划', prompt: '描述你未来3年的目标、步骤、担忧', level: 'hard' },
  { id: 'm29', scene: '回忆经历', prompt: '描述一件过去的事、细节、感受、学到了什么', level: 'hard' },
  { id: 'm30', scene: '评价事物', prompt: '评价一部电影/一本书/一个经历、优缺点、推荐吗', level: 'hard' },
  // Travel/Abroad - hard
  { id: 'm31', scene: '机场报到', prompt: '描述流程、和工作人员的对话、行李问题', level: 'hard' },
  { id: 'm32', scene: '过海关', prompt: '描述海关官员的问题、你的回答、紧张吗', level: 'hard' },
  { id: 'm33', scene: '入住酒店', prompt: '描述和前台对话、房间要求、问题反馈', level: 'hard' },
  { id: 'm34', scene: '看病就医', prompt: '描述症状、回答医生问题、理解医嘱', level: 'hard' },
  { id: 'm35', scene: '银行业务', prompt: '描述要办的业务、提供证件、理解条款', level: 'hard' },
];

export function getRandomScenes(count: number = 3): MonologueScene[] {
  const shuffled = [...monologueScenes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
