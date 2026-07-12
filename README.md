# English Mindset Lab

8周英语思维植入计划的交互式训练平台。

## 在线访问

- Kimi 部署: https://fl2pwticek76e.kimi.page
- GitHub Pages: https://[你的用户名].github.io/english-mindset-lab/

## 功能

- **Tab 导航**: 打卡 / 工具箱 / 路线图 / 资料
- **每日句型条**: 顶部固定显示，支持复制和随机切换
- **内心独白场景生成器**: 35个日常场景，三级难度
- **物品英文速查**: 联网翻译 + 本地词典 fallback
- **英英释义**: 每日5词，点击揭示
- **任务打卡系统**: 进度追踪 + 里程碑成就
- **应急表达库**: 20句万能缓冲句
- **破冰脚本**: 3版本自我介绍 + 5个破冰问题

## 技术栈

- React + TypeScript + Vite
- Tailwind CSS
- Three.js (WebGL 流体背景)
- GSAP (动画)

## 本地开发

```bash
npm install
npm run dev
npm run build
```

## 部署到 GitHub Pages

### 第一步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. Repository name 填 `english-mindset-lab`
3. 选择 **Public** (GitHub Pages 免费版需要公开仓库)
4. 不要勾选 "Add a README"（已有）
5. 点击 **Create repository**

### 第二步：推送代码

在终端中执行以下命令：

```bash
# 1. 进入项目目录
cd /path/to/english-mindset-lab

# 2. 初始化 git
git init

# 3. 添加远程仓库（将 YOUR_USERNAME 替换为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/english-mindset-lab.git

# 4. 添加所有文件
git add .

# 5. 提交
git commit -m "Initial commit"

# 6. 推送到 main 分支
git branch -M main
git push -u origin main
```

### 第三步：启用 GitHub Pages

1. 打开仓库页面 → **Settings** → **Pages**（左侧菜单）
2. **Source** 选择 **GitHub Actions**
3. 等待约 1-2 分钟，GitHub Actions 会自动构建并部署
4. 部署完成后，访问 `https://YOUR_USERNAME.github.io/english-mindset-lab/`

### 自动更新

每次推送代码到 main 分支，GitHub Actions 会自动重新构建和部署。
