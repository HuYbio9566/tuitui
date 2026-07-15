const TEMPLATE_DEFAULT_VIEWS = {
  executive: "overview",
  project: "progress",
  knowledge: "knowledge"
};

const state = {
  screen: "entry",
  template: "executive",
  selectedFolder: null,
  pickerOpen: false,
  modal: null,
  progress: 0,
  activeStage: "directory",
  issuePaused: false,
  permissionStatus: "waiting",
  ocrStatus: "waiting",
  reportView: getTemplateDefaultView("executive"),
  selectedInsight: "spring-decision",
  selectedSource: "spring-deck",
  taskAssigned: false,
  riskHandled: false,
  knowledgeStatus: "候选",
  rescanned: false,
  rescanProgress: 0,
  rescanSummary: null,
  comparisonOpen: false,
  toast: ""
};

const TEMPLATES = [
  {
    id: "executive",
    title: "领导速览",
    desc: "提炼目标、进度、风险和需要拍板的事项。",
    meta: "适合周会与汇报",
    workspaceCopy: "默认打开领导速览，先看摘要和关键证据。"
  },
  {
    id: "project",
    title: "项目进展",
    desc: "按阶段、负责人和交付物追踪推进状态。",
    meta: "适合项目复盘",
    workspaceCopy: "默认打开项目进展，先看阶段、节奏和负责人。"
  },
  {
    id: "knowledge",
    title: "知识归档",
    desc: "发现可沉淀资料、重复内容和知识负责人。",
    meta: "适合资料治理",
    workspaceCopy: "默认打开知识资产，先看可入库材料和复核状态。"
  }
];

const FOLDERS = [
  {
    id: "spring-enroll",
    name: "2026 春季招生项目",
    path: "企业云盘 / 市场部 / 招生增长",
    files: 18,
    subfolders: 5,
    size: "126 MB",
    updated: "今天 09:42",
    owner: "市场增长组",
    formats: [
      ["PPT/PDF", 7],
      ["Word", 5],
      ["Excel", 4],
      ["图片", 2]
    ],
    warnings: [
      "1 个文件权限受限：渠道预算-外包报价.xlsx",
      "1 张扫描图片需要 OCR：线下活动白板.jpg"
    ]
  },
  {
    id: "renewal-playbook",
    name: "续费运营 SOP 更新",
    path: "企业云盘 / 客户成功 / 运营资料",
    files: 24,
    subfolders: 4,
    size: "88 MB",
    updated: "昨天 18:10",
    owner: "客户成功部",
    formats: [
      ["Word", 11],
      ["Excel", 5],
      ["PDF", 6],
      ["图片", 2]
    ],
    warnings: ["2 个旧版 Word 文件建议转换后分析"]
  },
  {
    id: "teacher-kit",
    name: "教师培训资料包",
    path: "企业云盘 / 教研中心 / 培训",
    files: 31,
    subfolders: 8,
    size: "214 MB",
    updated: "07-12 21:20",
    owner: "教研中心",
    formats: [
      ["PPT", 14],
      ["PDF", 8],
      ["Word", 6],
      ["视频字幕", 3]
    ],
    warnings: ["3 个视频文件仅提取字幕摘要"]
  }
];

const SCAN_STAGES = [
  { id: "directory", label: "扫描目录与权限", desc: "读取文件夹层级、更新时间和继承权限。", at: 12 },
  { id: "parse", label: "解析正文与表格", desc: "处理文档、表格、图片 OCR 和结构化数据。", at: 36 },
  { id: "extract", label: "识别决策与待办", desc: "抽取结论、风险、负责人和截止时间。", at: 68 },
  { id: "source", label: "校验来源", desc: "为每条结论绑定文件、页码、工作表和片段。", at: 88 }
];

const SCAN_TREE = [
  { name: "00_项目管理", status: "complete", count: 4 },
  { name: "01_招生方案", status: "processing", count: 6 },
  { name: "02_渠道数据", status: "partial", count: 5 },
  { name: "03_课程资料", status: "waiting", count: 3 }
];

const REPORT_VIEWS = [
  { id: "overview", label: "领导速览" },
  { id: "progress", label: "项目进展" },
  { id: "tasks", label: "待办事项" },
  { id: "risks", label: "风险提示" },
  { id: "data", label: "关键数据" },
  { id: "knowledge", label: "知识资产" }
];

const FOLDER_COVERAGE = [
  { name: "00_项目管理", coverage: "100%", files: "4/4", status: "已完成" },
  { name: "01_招生方案", coverage: "100%", files: "6/6", status: "已完成" },
  { name: "02_渠道数据", coverage: "80%", files: "4/5", status: "局部失败" },
  { name: "03_课程资料", coverage: "100%", files: "3/3", status: "已完成" }
];

const FOLDER_REPORTS = {
  "spring-enroll": {
    summary: "春季招生项目已形成课程卖点、渠道投放和社群转介绍闭环。",
    conclusion: "建议继续加码社群转介绍和直播试听，并统一渠道 ROI 口径。",
    savePath: "企业云盘 / 市场部 / 招生增长 / 周报",
    sources: [
      { id: "spring-deck", file: "2026春季招生方案.pptx", place: "第 6-12 页", updated: "今天 09:18", status: "已分析" },
      { id: "spring-sheet", file: "渠道投放数据.xlsx", place: "Sheet2", updated: "今天 09:32", status: "局部失败 1 项" },
      { id: "spring-doc", file: "课程体系介绍.docx", place: "课程卖点章节", updated: "昨天 18:08", status: "已分析" }
    ],
    insights: [
      {
        id: "spring-decision",
        type: "待办事项",
        title: "确认招生预算分配",
        desc: "建议把社群转介绍预算提高 18%，并在周会前完成确认。",
        sourceId: "spring-deck",
        confidence: "92%",
        excerpt: "预算建议向转介绍和直播试听倾斜，线下活动只保留重点城市。"
      },
      {
        id: "spring-risk",
        type: "风险提示",
        title: "渠道口径不一致",
        desc: "抖音、小红书和社群分别使用不同成本口径，无法直接比较 ROI。",
        sourceId: "spring-sheet",
        confidence: "88%",
        excerpt: "Sheet2 中抖音记录 CPL，小红书记录 CPA，社群记录成交成本。"
      },
      {
        id: "spring-knowledge",
        type: "知识资产",
        title: "课程卖点资料可入库",
        desc: "课程体系介绍中的分层教学、每周反馈和家长沟通机制适合沉淀到知识库。",
        sourceId: "spring-doc",
        confidence: "95%",
        excerpt: "课程采用入学测评、分层班型和每周学习反馈闭环。"
      },
      {
        id: "spring-metric",
        type: "关键数据",
        title: "社群转介绍到课率最高",
        desc: "社群转介绍到课率 42%，高于直播试听和短视频表单。",
        sourceId: "spring-sheet",
        confidence: "90%",
        excerpt: "社群转介绍样本 216，实际到课 91，到课率 42.1%。"
      }
    ],
    defaultInsights: {
      overview: "spring-decision",
      progress: "spring-decision",
      tasks: "spring-decision",
      risks: "spring-risk",
      data: "spring-metric",
      knowledge: "spring-knowledge"
    },
    overview: {
      description: "面向汇报的核心结论，点击任意结论可查看右侧证据。",
      summary: "项目资料显示，春季招生已形成课程卖点、渠道投放和社群转介绍闭环。当前优先动作是确认预算分配、统一渠道 ROI 口径，并把课程卖点沉淀为招生知识资产。"
    },
    progress: {
      description: "按阶段跟踪交付物、负责人和更新时间。",
      rows: [
        ["已完成", "招生方案定稿", "负责人：林澜 · 来源：2026春季招生方案.pptx"],
        ["推进中", "第 28 周渠道数据复盘", "负责人：周宁 · 来源：渠道投放数据.xlsx"],
        ["待确认", "预算调整方案", "负责人：市场负责人 · 来源：会议纪要"]
      ]
    },
    tasks: {
      description: "从文件夹中识别出的待确认事项和负责人建议。",
      title: "等待确认招生预算分配",
      assigned: "已分派给 林澜 · 截止 07-17",
      pending: "建议分派给市场负责人 · 截止本周五"
    },
    risks: {
      description: "需要人工复核或处理的口径、权限和敏感信息。",
      title: "渠道口径不一致",
      level: "中",
      pending: "待处理"
    },
    data: {
      description: "来自表格和汇报材料的可追溯指标。",
      items: [
        ["42.1%", "社群转介绍到课率", "渠道投放数据.xlsx · Sheet2"],
        ["18%", "建议增投比例", "2026春季招生方案.pptx · 第 9 页"],
        ["3", "需统一口径渠道", "渠道投放数据.xlsx · Sheet2"]
      ]
    },
    knowledge: {
      description: "适合保存到招生知识库的资料和复核状态。",
      title: "课程卖点资料可入库",
      action: "加入知识库"
    }
  },
  "renewal-playbook": {
    summary: "续费运营 SOP、风险分层和触达节奏已被整理成可执行规则。",
    conclusion: "建议先跟进高风险客户名单，再把 SOP、话术和追访节奏固化到知识库。",
    savePath: "企业云盘 / 客户成功 / 运营资料 / 周报",
    sources: [
      { id: "renewal-sop", file: "续费运营 SOP 更新.docx", place: "第 3-9 页", updated: "昨天 18:10", status: "已分析" },
      { id: "renewal-sheet", file: "续费漏斗数据.xlsx", place: "Sheet1 / Sheet3", updated: "今天 09:24", status: "已分析" },
      { id: "renewal-notes", file: "客户流失复盘纪要.docx", place: "重点客户段", updated: "今天 08:40", status: "待复核" }
    ],
    insights: [
      {
        id: "renewal-decision",
        type: "待办事项",
        title: "提前触达高风险续费客户",
        desc: "按风险分层优先处理 9 个高风险账号，避免续费窗口流失。",
        sourceId: "renewal-sheet",
        confidence: "91%",
        excerpt: "高风险客户的最后触达时间已超过 14 天。"
      },
      {
        id: "renewal-risk",
        type: "风险提示",
        title: "SOP 口径未统一",
        desc: "续费 SOP、跟进话术和例外审批流程仍有两个版本。",
        sourceId: "renewal-sop",
        confidence: "87%",
        excerpt: "不同区域仍在使用旧版跟进节点和审批表。"
      },
      {
        id: "renewal-knowledge",
        type: "知识资产",
        title: "可固化为续费知识资产",
        desc: "标准话术、提醒节奏和风险判定适合沉淀为知识库条目。",
        sourceId: "renewal-sop",
        confidence: "93%",
        excerpt: "建议将高风险客户识别规则加入知识库。"
      },
      {
        id: "renewal-metric",
        type: "关键数据",
        title: "近 30 天续费率 81%",
        desc: "高于上月 76%，但高风险客户仍占总量 12%。",
        sourceId: "renewal-sheet",
        confidence: "90%",
        excerpt: "本月续费率 81.3%，其中高风险客户 12 单。"
      }
    ],
    defaultInsights: {
      overview: "renewal-decision",
      progress: "renewal-decision",
      tasks: "renewal-decision",
      risks: "renewal-risk",
      data: "renewal-metric",
      knowledge: "renewal-knowledge"
    },
    overview: {
      description: "面向汇报的核心结论，点击任意结论可查看右侧证据。",
      summary: "续费资料已经形成 SOP、风险分层和跟进节奏。当前重点是提前处理高风险客户，并把触达和例外处理规则统一。"
    },
    progress: {
      description: "按阶段跟踪交付物、负责人和更新时间。",
      rows: [
        ["已完成", "续费 SOP 统一稿", "负责人：刘瑾 · 来源：续费运营 SOP 更新.docx"],
        ["推进中", "高风险客户清单", "负责人：张扬 · 来源：续费漏斗数据.xlsx"],
        ["待确认", "例外审批表更新", "负责人：客户成功负责人 · 来源：客户流失复盘纪要.docx"]
      ]
    },
    tasks: {
      description: "从文件夹中识别出的待确认事项和负责人建议。",
      title: "提前触达高风险续费客户",
      assigned: "已分派给 刘瑾 · 截止 07-18",
      pending: "建议分派给客户成功负责人 · 截止本周四"
    },
    risks: {
      description: "需要人工复核或处理的口径、权限和敏感信息。",
      title: "SOP 口径未统一",
      level: "中",
      pending: "待处理"
    },
    data: {
      description: "来自表格和汇报材料的可追溯指标。",
      items: [
        ["81.3%", "近 30 天续费率", "续费漏斗数据.xlsx · Sheet1"],
        ["12", "高风险客户数", "续费漏斗数据.xlsx · Sheet3"],
        ["2", "待统一 SOP 版本", "续费运营 SOP 更新.docx · 第 8 页"]
      ]
    },
    knowledge: {
      description: "适合保存到续费知识库的资料和复核状态。",
      title: "续费 SOP 可入库",
      action: "加入知识库"
    }
  },
  "teacher-kit": {
    summary: "教师培训资料包已经形成课件、反馈表和示范内容的统一资料库。",
    conclusion: "建议把高频课件和模板优先沉淀为可复用知识资产，并安排教研负责人复核。",
    savePath: "企业云盘 / 教研中心 / 培训 / 周报",
    sources: [
      { id: "teacher-slide", file: "教师培训资料包.pptx", place: "第 1-14 页", updated: "07-12 21:20", status: "已分析" },
      { id: "teacher-sheet", file: "教研反馈表.xlsx", place: "Sheet2", updated: "今天 08:52", status: "已分析" },
      { id: "teacher-captions", file: "示范课字幕摘要.txt", place: "导出字幕", updated: "今天 09:05", status: "局部失败 1 项" }
    ],
    insights: [
      {
        id: "teacher-decision",
        type: "待办事项",
        title: "教研负责人复核培训材料",
        desc: "建议先确认高频课件是否符合统一教学模板。",
        sourceId: "teacher-slide",
        confidence: "93%",
        excerpt: "第 6 页起的教案结构已经统一。"
      },
      {
        id: "teacher-risk",
        type: "风险提示",
        title: "部分视频仅有字幕摘要",
        desc: "示范课素材存在字幕提取不完整的情况，需补充原始视频。",
        sourceId: "teacher-captions",
        confidence: "86%",
        excerpt: "视频摘要仅保留关键互动片段。"
      },
      {
        id: "teacher-knowledge",
        type: "知识资产",
        title: "可沉淀为教研知识库",
        desc: "培训模板、反馈表和示范课点评适合进入知识治理流程。",
        sourceId: "teacher-sheet",
        confidence: "94%",
        excerpt: "教研反馈表显示 5 个高频教案模板重复使用。"
      },
      {
        id: "teacher-metric",
        type: "关键数据",
        title: "高频课件复用率 72%",
        desc: "已高于上次培训周期，说明模板化资料复用度提升。",
        sourceId: "teacher-slide",
        confidence: "90%",
        excerpt: "72% 的课件在两次培训中被重复使用。"
      }
    ],
    defaultInsights: {
      overview: "teacher-decision",
      progress: "teacher-decision",
      tasks: "teacher-decision",
      risks: "teacher-risk",
      data: "teacher-metric",
      knowledge: "teacher-knowledge"
    },
    overview: {
      description: "面向汇报的核心结论，点击任意结论可查看右侧证据。",
      summary: "教师培训资料包已经沉淀出统一课件、反馈表和示范课素材。当前优先把复用频次高的课件和模板纳入知识库。"
    },
    progress: {
      description: "按阶段跟踪交付物、负责人和更新时间。",
      rows: [
        ["已完成", "培训课件统一稿", "负责人：陈曦 · 来源：教师培训资料包.pptx"],
        ["推进中", "教研反馈表整理", "负责人：李琳 · 来源：教研反馈表.xlsx"],
        ["待确认", "示范课视频补充", "负责人：教研负责人 · 来源：示范课字幕摘要.txt"]
      ]
    },
    tasks: {
      description: "从文件夹中识别出的待确认事项和负责人建议。",
      title: "教研负责人复核培训材料",
      assigned: "已分派给 陈曦 · 截止 07-19",
      pending: "建议分派给教研负责人 · 截止下周一"
    },
    risks: {
      description: "需要人工复核或处理的口径、权限和敏感信息。",
      title: "示范课素材不完整",
      level: "中",
      pending: "待处理"
    },
    data: {
      description: "来自表格和汇报材料的可追溯指标。",
      items: [
        ["72%", "高频课件复用率", "教师培训资料包.pptx · 第 9 页"],
        ["5", "重复使用模板数", "教研反馈表.xlsx · Sheet2"],
        ["3", "示范课素材数量", "示范课字幕摘要.txt · 导出字幕"]
      ]
    },
    knowledge: {
      description: "适合保存到教研知识库的资料和复核状态。",
      title: "高频课件可入库",
      action: "加入知识库"
    }
  }
};

const RECENT_ANALYSES = [
  { folderId: "spring-enroll", time: "今天 10:08" },
  { folderId: "renewal-playbook", time: "昨天 16:35" },
  { folderId: "teacher-kit", time: "07-12 20:11" }
];

const CHANGE_SUMMARY = {
  added: 2,
  updated: 1,
  deleted: 1,
  conclusion: 3,
  deletedFile: "旧版预算表.xlsx",
  affectedConclusion: "社群转介绍从建议观察变为建议加码，相关结论改由《社群话术更新.xlsx》与《续费漏斗数据.xlsx》支撑。",
  oldEvidence: "渠道投放数据.xlsx · Sheet2 · 到课率 36.4%",
  newEvidence: "社群话术更新.xlsx · Sheet1 · 到课率 42.1%"
};

const HAS_DOCUMENT = typeof document !== "undefined";
const HAS_WINDOW = typeof window !== "undefined";
let root = null;
let scanTimer = null;
let domBound = false;

function getTemplateDefaultView(templateId) {
  return TEMPLATE_DEFAULT_VIEWS[templateId] || "overview";
}

function getFolder(folderId) {
  return FOLDERS.find(folder => folder.id === folderId) || FOLDERS[0];
}

function getFolderReport(folderId) {
  return FOLDER_REPORTS[folderId] || FOLDER_REPORTS["spring-enroll"];
}

function selectFolderReport(folderId) {
  const folder = getFolder(folderId);
  const report = getFolderReport(folder.id);
  return {
    folderId: folder.id,
    folderName: folder.name,
    summary: report.summary,
    conclusion: report.conclusion,
    sourceFiles: report.sources.map(source => source.file),
    savePath: report.savePath,
    folder,
    report
  };
}

function resolvePermissionRecovery(action, currentStatus = "waiting") {
  if (action === "request") {
    return {
      status: "requested",
      label: "已申请、等待授权",
      detail: "权限申请已提交，分析继续推进其余文件。",
      continueScanning: true
    };
  }
  if (action === "skip") {
    return {
      status: "skipped",
      label: "已跳过，继续分析其余文件",
      detail: "已跳过该文件，不阻断其他文件。",
      continueScanning: true
    };
  }
  if (currentStatus === "requested") {
    return {
      status: "requested",
      label: "已申请、等待授权",
      detail: "权限申请已提交，分析继续推进其余文件。",
      continueScanning: true
    };
  }
  if (currentStatus === "skipped") {
    return {
      status: "skipped",
      label: "已跳过，继续分析其余文件",
      detail: "已跳过该文件，不阻断其他文件。",
      continueScanning: true
    };
  }
  return {
    status: "waiting",
    label: "系统无法读取该文件，但不会阻断其他文件。",
    detail: "系统无法读取该文件，但不会阻断其他文件。",
    continueScanning: false
  };
}

function summarizeChangeSummary(changeSet) {
  const added = Number(changeSet.added || 0);
  const updated = Number(changeSet.updated || 0);
  const deleted = Number(changeSet.deleted || 0);
  const conclusion = Number(changeSet.conclusion || 0);
  return {
    banner: `新增 ${added} 个文件 · 更新 ${updated} 个文件 · 删除 ${deleted} 个文件 · 结论变化 ${conclusion} 处`,
    deletedFile: changeSet.deletedFile || "未知文件",
    affectedConclusion: changeSet.affectedConclusion || "结论发生变化",
    oldEvidence: changeSet.oldEvidence || "",
    newEvidence: changeSet.newEvidence || ""
  };
}

function currentFolder() {
  return state.selectedFolder || FOLDERS[0];
}

function currentReport() {
  return getFolderReport(currentFolder().id);
}

function getReportInsight(report, insightId) {
  return report.insights.find(insight => insight.id === insightId) || report.insights[0];
}

function getDefaultInsightForView(report, viewId) {
  return report.defaultInsights[viewId] || report.defaultInsights.overview;
}

function render() {
  if (!root) return;
  root.innerHTML = layout(renderScreen());
  refreshIcons();
}

function layout(content) {
  return `
    <div class="app-shell folder-shell">
      ${renderProductSidebar()}
      <main class="main">
        <header class="topbar">
          <div class="breadcrumb"><a href="index.html">AI 文件工作台</a><span>/</span><strong>文件夹智能摘要</strong></div>
          <nav class="primary-nav" aria-label="全局导航">
            <a class="primary-nav-link" href="report.html">调研报告</a>
            <a class="primary-nav-link active" href="index.html">工具体验</a>
            <a class="primary-nav-link" href="existing-tools.html">已有工具</a>
          </nav>
          <div class="top-actions">
            <button class="btn" type="button" data-action="show-toast" data-toast="已打开使用记录">使用记录</button>
            <button class="btn" type="button" data-action="show-toast" data-toast="帮助已准备好">使用帮助</button>
          </div>
        </header>
        ${renderWorkbenchContextBar({
          label: "",
          context: "春季招生项目",
          contextIcon: "folder-open",
          items: [
            { icon: "shield-check", label: "继承原权限", state: "verified" },
            { icon: "quote", label: "结论带来源", state: "verified" },
            { icon: "refresh-cw", label: "支持增量更新", state: "ready" },
            { icon: "folder-output", label: "回存原文件夹", state: "ready" }
          ]
        })}
        ${content}
      </main>
    </div>
    ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
    ${state.pickerOpen ? renderFolderPicker() : ""}
    ${state.modal ? renderModal() : ""}
    ${state.comparisonOpen ? renderComparisonDrawer() : ""}
  `;
}

function renderScreen() {
  if (state.screen === "preflight") return renderPreflight();
  if (state.screen === "processing") return renderProcessing();
  if (state.screen === "workspace") return renderWorkspace();
  return renderEntry();
}

function renderEntry() {
  const recentAnalyses = RECENT_ANALYSES.map(analysis => {
    const snapshot = selectFolderReport(analysis.folderId);
    return {
      ...analysis,
      name: snapshot.folderName,
      summary: snapshot.summary,
      conclusion: snapshot.conclusion,
      sourceFiles: snapshot.sourceFiles.join(" · "),
      savePath: snapshot.savePath
    };
  });
  return `
    <section class="fs-entry">
      <div class="entry-hero">
        <div>
          <h1>选择云盘文件夹，生成可追溯的项目概览</h1>
          <p class="hero-copy">按目录覆盖率、来源证据和业务动作组织结果，适合不断更新的项目资料夹。</p>
          <div class="hero-actions">
            <button class="btn primary" type="button" data-action="open-picker"><i data-lucide="folder-open"></i>选择云盘文件夹</button>
            <button class="btn" type="button" data-action="show-toast" data-toast="已加载上次分析快照">查看最近快照</button>
          </div>
        </div>
        <div class="folder-preview">
          <div class="preview-head">
            <span class="preview-title">最近覆盖</span>
            <div class="preview-meter" role="progressbar" aria-label="目录覆盖率" aria-valuenow="86" aria-valuemin="0" aria-valuemax="100">
              <span style="width: 86%"></span>
            </div>
            <strong>86%</strong>
          </div>
          <div class="preview-grid">
            <span><strong>18</strong> 文件</span>
            <span><strong>5</strong> 子文件夹</span>
            <span><strong>3</strong> 待办</span>
            <span><strong>2</strong> 风险</span>
          </div>
        </div>
      </div>

      <section class="section-block">
        <div class="section-head">
          <div>
            <h2>选择分析模板</h2>
            <p>模板只决定关注重点，不会改变云盘权限边界。</p>
          </div>
        </div>
        <div class="template-grid">
          ${TEMPLATES.map(templateCard).join("")}
        </div>
      </section>

      <section class="section-block">
        <div class="section-head">
          <div>
            <h2>最近分析</h2>
            <p>继续上次的目录快照，或重新扫描新增文件。</p>
          </div>
        </div>
        <div class="recent-list">
          ${recentAnalyses.map(item => `
            <button class="recent-row" type="button" data-action="select-folder" data-folder-id="${item.folderId}">
              <span class="folder-dot"><i data-lucide="folder"></i></span>
              <span>
                <strong>${item.name}</strong>
                <small>${item.summary}</small>
                <small>${item.conclusion}</small>
                <small>${item.sourceFiles} · ${item.savePath}</small>
              </span>
              <span>${item.time}</span>
            </button>
          `).join("")}
        </div>
      </section>
    </section>
  `;
}

function templateCard(template) {
  const active = state.template === template.id ? " active" : "";
  return `
    <button class="template-card${active}" type="button" data-action="set-template" data-template="${template.id}">
      <span class="template-icon"><i data-lucide="${template.id === "executive" ? "presentation" : template.id === "project" ? "calendar-check" : "book-marked"}"></i></span>
      <strong>${template.title}</strong>
      <span>${template.desc}</span>
      <small>${template.meta}</small>
    </button>
  `;
}

function renderFolderPicker() {
  const selected = state.selectedFolder || FOLDERS[0];
  return `
    <div class="modal-backdrop" data-action="close-picker">
      <section class="folder-picker" role="dialog" aria-modal="true" aria-label="选择云盘文件夹" data-stop-close>
        <div class="modal-head">
          <div>
            <h2>选择云盘文件夹</h2>
            <p>从企业云盘继承权限并保存分析结果。</p>
          </div>
          <button class="icon-btn" type="button" data-action="close-picker" aria-label="关闭"><i data-lucide="x"></i></button>
        </div>
        <div class="picker-grid">
          <aside class="space-tree">
            <button class="space-node active" type="button"><i data-lucide="building-2"></i>企业云盘</button>
            <button class="space-node" type="button"><i data-lucide="users"></i>市场部</button>
            <button class="space-node" type="button"><i data-lucide="graduation-cap"></i>教研中心</button>
          </aside>
          <div class="folder-list">
            ${FOLDERS.map(folder => `
              <button class="folder-option${selected.id === folder.id ? " active" : ""}" type="button" data-action="preview-folder" data-folder-id="${folder.id}">
                <span class="folder-icon"><i data-lucide="folder"></i></span>
                <span><strong>${folder.name}</strong><small>${folder.path}</small></span>
                <span>${folder.updated}</span>
              </button>
            `).join("")}
          </div>
          <aside class="selected-folder-summary">
            <span class="summary-icon"><i data-lucide="folder-check"></i></span>
            <h3>${selected.name}</h3>
            <p>${selected.path}</p>
            <dl>
              <div><dt>文件</dt><dd>${selected.files}</dd></div>
              <div><dt>子文件夹</dt><dd>${selected.subfolders}</dd></div>
              <div><dt>大小</dt><dd>${selected.size}</dd></div>
            </dl>
            <button class="btn primary" type="button" data-action="select-folder" data-folder-id="${selected.id}">确认选择</button>
          </aside>
        </div>
      </section>
    </div>
  `;
}

function renderPreflight() {
  const folder = state.selectedFolder || FOLDERS[0];
  return `
    <section class="preflight-page">
      <div class="preflight-header">
        <div>
          <p class="eyebrow">分析范围预检</p>
          <h1>${folder.name}</h1>
          <p>${folder.path} · 最近更新 ${folder.updated}</p>
        </div>
        <div class="preflight-actions">
          <button class="btn" type="button" data-action="back-entry">返回重选</button>
          <button class="btn primary" type="button" data-action="start-scan">开始分析</button>
        </div>
      </div>
      <div class="preflight-grid">
        <article class="preflight-card">
          <h2>目录概况</h2>
          <div class="metric-grid">
            <div><strong>${folder.files}</strong><span>文件</span></div>
            <div><strong>${folder.subfolders}</strong><span>子文件夹</span></div>
            <div><strong>${folder.size}</strong><span>总大小</span></div>
            <div><strong>${folder.owner}</strong><span>权限来源</span></div>
          </div>
        </article>
        <article class="preflight-card">
          <h2>支持格式分布</h2>
          <div class="format-list">
            ${folder.formats.map(([label, count]) => `
              <div class="format-row"><span>${label}</span><strong>${count}</strong></div>
            `).join("")}
          </div>
        </article>
        <article class="preflight-card warning-card">
          <h2>需要注意</h2>
          <ul>
            ${folder.warnings.map(item => `<li>${item}</li>`).join("")}
          </ul>
          <p>权限受限文件会被标记为局部失败，不阻断可访问文件的摘要生成。</p>
        </article>
      </div>
    </section>
  `;
}

function renderProcessing() {
  const folder = state.selectedFolder || FOLDERS[0];
  return `
    <section class="processing-page">
      <div class="processing-header">
        <div>
          <p class="eyebrow">正在分析</p>
          <h1>${folder.name}</h1>
          <p>已覆盖 ${state.progress}% · ${currentStage().label}</p>
        </div>
        <button class="btn" type="button" data-action="cancel-scan">取消分析</button>
      </div>
      <div class="processing-grid">
        <aside class="scan-tree-card">
          <h2>目录扫描树</h2>
          <div class="coverage-ring" aria-label="实时覆盖率">${state.progress}%</div>
          <div class="scan-tree">
            ${SCAN_TREE.map(item => `
              <div class="scan-node ${scanNodeState(item.status)}">
                <span><i data-lucide="${item.status === "partial" ? "alert-triangle" : "folder"}"></i>${item.name}</span>
                <strong>${item.count} 个文件</strong>
              </div>
            `).join("")}
          </div>
        </aside>
        <section class="stage-card">
          <h2>处理阶段</h2>
          <div class="progress-bar"><span style="width: ${state.progress}%"></span></div>
          <div class="stage-list">
            ${SCAN_STAGES.map(stage => `
              <div class="stage-row ${stageState(stage)}">
                <span class="stage-dot"></span>
                <div><strong>${stage.label}</strong><small>${stage.desc}</small></div>
              </div>
            `).join("")}
          </div>
          ${renderRecoverableIssues()}
        </section>
      </div>
    </section>
  `;
}

function renderRecoverableIssues() {
  const permissionState = resolvePermissionRecovery("none", state.permissionStatus);
  const permissionDone = permissionState.detail;
  return `
    <div class="issue-stack">
      ${state.progress >= 42 ? `
        <article class="issue-card ${state.permissionStatus === "skipped" ? "resolved" : ""}">
          <div>
            <strong>渠道预算-外包报价.xlsx</strong>
            ${state.permissionStatus === "requested" ? `<span class="status-pill">已申请、等待授权</span>` : ""}
            <p>${permissionDone}</p>
          </div>
          ${state.permissionStatus === "skipped" ? `<span class="status-pill">局部失败</span>` : `
            <div class="issue-actions">
              <button class="btn" type="button" data-action="request-permission">申请权限</button>
              <button class="btn primary" type="button" data-action="skip-file">跳过并继续</button>
            </div>
          `}
        </article>
      ` : ""}
      <article class="issue-card">
        <div>
          <strong>线下活动白板.jpg</strong>
          <p>${state.ocrStatus === "complete" ? "OCR 已完成，已纳入来源校验。" : state.ocrStatus === "processing" ? "正在重新识别图片文字。" : "扫描图片需要 OCR，失败后可单文件重试。"}</p>
        </div>
        ${state.ocrStatus === "complete" ? `<span class="status-pill success">已完成</span>` : `<button class="btn" type="button" data-action="retry-ocr">重试文件</button>`}
      </article>
    </div>
  `;
}

function renderWorkspace() {
  const folder = state.selectedFolder || FOLDERS[0];
  const report = currentReport();
  const selectedInsight = getReportInsight(report, state.selectedInsight);
  const template = TEMPLATES.find(item => item.id === state.template) || TEMPLATES[0];
  return `
    <section class="workspace-page">
      <div class="workspace-top">
        <div>
          <p class="eyebrow">文件夹分析工作台</p>
          <h1>${folder.name}</h1>
          <p>${folder.files} 个文件 · 目录覆盖 94% · ${state.permissionStatus === "skipped" ? "1 个文件局部失败" : state.permissionStatus === "requested" ? "1 个文件已申请权限" : "全部可追溯"}</p>
        </div>
        <div class="workspace-actions">
          <button class="btn" type="button" data-action="rescan-folder"><i data-lucide="refresh-cw"></i>重新扫描</button>
          <button class="btn" type="button" data-action="open-save-modal"><i data-lucide="save"></i>保存为周报</button>
          <button class="btn primary" type="button" data-action="show-toast" data-toast="只读报告链接已复制">分享只读报告</button>
        </div>
      </div>
      <div class="workspace-template-bar">
        <div>
          <p class="eyebrow">结果模板</p>
          <h2>${template.title}</h2>
          <p>${template.workspaceCopy}</p>
        </div>
        <div class="template-switcher" role="tablist" aria-label="模板切换">
          ${TEMPLATES.map(item => `
            <button class="${state.template === item.id ? "active" : ""}" type="button" data-action="set-template" data-template="${item.id}">${item.title}</button>
          `).join("")}
        </div>
      </div>
      <div class="workspace-note">
        <strong>${report.summary}</strong>
        <span>保存路径：${report.savePath} · ${report.conclusion}</span>
      </div>
      ${state.rescanProgress > 0 && state.rescanProgress < 100 ? `
        <div class="rescan-progress">
          <span>增量扫描中 ${state.rescanProgress}%</span>
          <div class="progress-bar"><span style="width: ${state.rescanProgress}%"></span></div>
        </div>
      ` : ""}
      ${state.rescanned ? `
        <button class="change-banner" type="button" data-action="open-comparison">
          ${state.rescanSummary ? state.rescanSummary.banner : summarizeChangeSummary(CHANGE_SUMMARY).banner}
        </button>
      ` : ""}
      <div class="workspace-grid">
        <aside class="folder-tree-panel">
          <h2>目录与覆盖</h2>
          <div class="tree-summary">
            <strong>94%</strong>
            <span>17/18 文件已纳入分析</span>
          </div>
          <div class="coverage-list">
            ${FOLDER_COVERAGE.map(item => `
              <button class="coverage-row" type="button" data-action="show-toast" data-toast="${item.name} 已定位">
                <span><i data-lucide="folder"></i>${item.name}</span>
                <strong>${item.coverage}</strong>
                <small>${item.files} · ${item.status}</small>
              </button>
            `).join("")}
          </div>
          <div class="source-list">
            <h3>文件状态</h3>
            ${report.sources.map(source => `
              <button class="source-row ${state.selectedSource === source.id ? "active" : ""}" type="button" data-action="open-source" data-source-id="${source.id}">
                <span>${source.file}</span>
                <small>${source.place} · ${source.status}</small>
              </button>
            `).join("")}
          </div>
        </aside>
        <main class="analysis-canvas">
          <div class="view-tabs">
            ${REPORT_VIEWS.map(view => `
              <button class="${state.reportView === view.id ? "active" : ""}" type="button" data-action="set-report-view" data-view="${view.id}">${view.label}</button>
            `).join("")}
          </div>
          ${renderReportView(report)}
        </main>
        <aside class="evidence-panel">
          <h2>来源证据</h2>
          <div class="evidence-focus">
            <span>${selectedInsight.type}</span>
            <strong>${selectedInsight.title}</strong>
            <p>${selectedInsight.desc}</p>
          </div>
          ${renderEvidence(report, selectedInsight)}
        </aside>
      </div>
    </section>
  `;
}

function renderReportView(report = currentReport()) {
  if (state.reportView === "progress") return renderProgressView(report);
  if (state.reportView === "tasks") return renderTasksView(report);
  if (state.reportView === "risks") return renderRisksView(report);
  if (state.reportView === "data") return renderDataView(report);
  if (state.reportView === "knowledge") return renderKnowledgeView(report);
  return renderOverviewView(report);
}

function renderOverviewView(report = currentReport()) {
  const overviewInsightIds = [
    report.defaultInsights.overview,
    report.defaultInsights.risks,
    report.defaultInsights.knowledge,
    report.defaultInsights.data
  ];
  return `
    <section class="report-section">
      <div class="canvas-head">
        <div>
          <h2>领导速览</h2>
          <p>${report.overview.description}</p>
        </div>
        <span class="status-pill success">已校验来源</span>
      </div>
      <div class="insight-grid">
        ${overviewInsightIds.map(insightId => insightCard(getReportInsight(report, insightId))).join("")}
      </div>
      <div class="brief-card">
        <h3>汇报摘要</h3>
        <p>${report.overview.summary}</p>
      </div>
    </section>
  `;
}

function renderProgressView(report = currentReport()) {
  return `
    <section class="report-section">
      <div class="canvas-head">
        <div><h2>项目进展</h2><p>${report.progress.description}</p></div>
      </div>
      <div class="timeline">
        ${report.progress.rows.map(([status, title, desc]) => `
          <button class="timeline-row" type="button" data-action="select-insight" data-insight-id="${report.defaultInsights.progress}">
            <span>${status}</span><strong>${title}</strong><small>${desc}</small>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTasksView(report = currentReport()) {
  const insight = getReportInsight(report, report.defaultInsights.tasks);
  return `
    <section class="report-section">
      <div class="canvas-head">
        <div><h2>待办事项</h2><p>${report.tasks.description}</p></div>
        <span class="status-pill">${state.taskAssigned ? "1 项已分派" : "1 项待分派"}</span>
      </div>
      <article class="action-row ${state.selectedInsight === insight.id ? "active" : ""}">
        <button type="button" data-action="select-insight" data-insight-id="${insight.id}">
          <strong>${insight.title}</strong>
          <span>${state.taskAssigned ? report.tasks.assigned : report.tasks.pending}</span>
        </button>
        <button class="btn primary" type="button" data-action="create-task" data-insight-id="${insight.id}">${state.taskAssigned ? "查看待办" : "创建待办"}</button>
      </article>
    </section>
  `;
}

function renderRisksView(report = currentReport()) {
  const insight = getReportInsight(report, report.defaultInsights.risks);
  return `
    <section class="report-section">
      <div class="canvas-head">
        <div><h2>风险提示</h2><p>${report.risks.description}</p></div>
        <span class="status-pill">${state.riskHandled ? "0 项未处理" : "1 项未处理"}</span>
      </div>
      <div class="risk-table">
        <div class="risk-head"><span>风险</span><span>等级</span><span>状态</span><span>操作</span></div>
        <div class="risk-row">
          <button type="button" data-action="select-insight" data-insight-id="${insight.id}">${insight.title}</button>
          <span>${report.risks.level}</span>
          <span>${state.riskHandled ? "已处理" : report.risks.pending}</span>
          <button class="btn" type="button" data-action="mark-risk-handled">${state.riskHandled ? "已完成" : "风险已处理"}</button>
        </div>
      </div>
    </section>
  `;
}

function renderDataView(report = currentReport()) {
  return `
    <section class="report-section">
      <div class="canvas-head">
        <div><h2>关键数据</h2><p>${report.data.description}</p></div>
      </div>
      <div class="data-grid">
        ${report.data.items.map(([value, label, source]) => `
          <button class="data-card" type="button" data-action="select-insight" data-insight-id="${report.defaultInsights.data}">
            <strong>${value}</strong><span>${label}</span><small>${source}</small>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderKnowledgeView(report = currentReport()) {
  const insight = getReportInsight(report, report.defaultInsights.knowledge);
  return `
    <section class="report-section">
      <div class="canvas-head">
        <div><h2>知识资产</h2><p>${report.knowledge.description}</p></div>
      </div>
      <article class="knowledge-card">
        <button type="button" data-action="select-insight" data-insight-id="${insight.id}">
          <strong>${insight.title}</strong>
          <span>${insight.desc}</span>
        </button>
        <span class="status-pill">${state.knowledgeStatus}</span>
        <button class="btn primary" type="button" data-action="add-knowledge">${state.knowledgeStatus === "候选" ? report.knowledge.action : "待负责人复核"}</button>
      </article>
    </section>
  `;
}

function insightCard(insight) {
  const active = state.selectedInsight === insight.id ? " active" : "";
  return `
    <button class="insight-card${active}" type="button" data-action="select-insight" data-insight-id="${insight.id}">
      <span>${insight.type}</span>
      <strong>${insight.title}</strong>
      <small>${insight.desc}</small>
    </button>
  `;
}

function renderEvidence(report = currentReport(), insight) {
  const source = report.sources.find(item => item.id === insight.sourceId) || report.sources[0];
  return `
    <div class="evidence-source">
      <h3>${source.file}</h3>
      <p>${source.place} · 更新 ${source.updated}</p>
      <blockquote>${insight.excerpt}</blockquote>
      <dl>
        <div><dt>置信度</dt><dd>${insight.confidence}</dd></div>
        <div><dt>文件状态</dt><dd>${source.status}</dd></div>
        <div><dt>保存位置</dt><dd>${report.savePath}</dd></div>
      </dl>
      <button class="btn primary" type="button" data-action="show-toast" data-toast="已在云盘中打开 ${source.file}">打开原文件</button>
    </div>
  `;
}

function renderModal() {
  if (state.modal === "task") {
    return `
      <div class="modal-backdrop" data-action="close-modal">
        <section class="business-modal" role="dialog" aria-modal="true" aria-label="创建待办" data-stop-close>
          <div class="modal-head">
            <div><h2>创建待办</h2><p>把识别出的事项提交到协作任务。</p></div>
            <button class="icon-btn" type="button" data-action="close-modal" aria-label="关闭"><i data-lucide="x"></i></button>
          </div>
          <div class="modal-body">
            <label>负责人<input value="林澜"></label>
            <label>截止日期<input value="2026-07-17"></label>
            <label>任务说明<textarea>确认春季招生预算分配，并统一渠道 ROI 口径。</textarea></label>
          </div>
          <div class="modal-actions">
            <button class="btn" type="button" data-action="close-modal">取消</button>
            <button class="btn primary" type="button" data-action="confirm-task">确认创建</button>
          </div>
        </section>
      </div>
    `;
  }

  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="business-modal" role="dialog" aria-modal="true" aria-label="保存为周报" data-stop-close>
        <div class="modal-head">
          <div><h2>保存为周报</h2><p>结果会回存到云盘，并保留本次来源证据。</p></div>
          <button class="icon-btn" type="button" data-action="close-modal" aria-label="关闭"><i data-lucide="x"></i></button>
        </div>
        <div class="modal-body">
          <label>保存目录<input value="企业云盘 / 市场部 / 周报"></label>
          <label>文件名<input value="2026 春季招生项目周报.md"></label>
        </div>
        <div class="modal-actions">
          <button class="btn" type="button" data-action="close-modal">取消</button>
          <button class="btn primary" type="button" data-action="confirm-save-report">保存</button>
        </div>
      </section>
    </div>
  `;
}

function renderComparisonDrawer() {
  const summary = state.rescanSummary || summarizeChangeSummary(CHANGE_SUMMARY);
  return `
    <aside class="comparison-drawer">
      <div class="drawer-head">
        <div><h2>重扫变化对比</h2><p>保留上次扫描快照，突出新增、更新、删除和结论变化。</p></div>
        <button class="icon-btn" type="button" data-action="close-comparison" aria-label="关闭"><i data-lucide="x"></i></button>
      </div>
      <div class="change-list">
        ${[
          { label: "新增文件", title: `新增 ${CHANGE_SUMMARY.added} 个文件`, desc: "新增《直播试听复盘.docx》和《社群话术更新.xlsx》。" },
          { label: "更新文件", title: `更新 ${CHANGE_SUMMARY.updated} 个文件`, desc: "《渠道投放数据.xlsx》新增第 28 周数据。" },
          { label: "删除文件", title: `删除 ${CHANGE_SUMMARY.deleted} 个文件`, desc: `${CHANGE_SUMMARY.deletedFile} 已删除，相关结论已切换到新证据。` },
          { label: "结论变化", title: `结论变化 ${CHANGE_SUMMARY.conclusion} 处`, desc: summary.affectedConclusion }
        ].map(change => `
          <article>
            <span>${change.label}</span>
            <strong>${change.title}</strong>
            <p>${change.desc}</p>
          </article>
        `).join("")}
      </div>
      <div class="evidence-diff">
        <h3>变化结论</h3>
        <p><strong>删除文件：</strong>${CHANGE_SUMMARY.deletedFile}</p>
        <p><strong>旧证据：</strong>${summary.oldEvidence}</p>
        <p><strong>新证据：</strong>${summary.newEvidence}</p>
        <p><strong>受影响结论：</strong>${summary.affectedConclusion}</p>
      </div>
    </aside>
  `;
}

function openFolderPicker() {
  state.pickerOpen = true;
  if (!state.selectedFolder) state.selectedFolder = FOLDERS[0];
  render();
}

function selectFolder(folderId) {
  state.selectedFolder = getFolder(folderId);
  state.pickerOpen = false;
  state.screen = "preflight";
  render();
}

function renderPreflightFromEntry() {
  state.screen = "preflight";
  render();
}

function applyTemplateSelection(templateId) {
  state.template = TEMPLATES.some(template => template.id === templateId) ? templateId : "executive";
  state.reportView = getTemplateDefaultView(state.template);
  const report = currentReport();
  state.selectedInsight = getDefaultInsightForView(report, state.reportView);
  state.selectedSource = getReportInsight(report, state.selectedInsight).sourceId;
  render();
}

function startScan() {
  if (HAS_WINDOW) window.clearInterval(scanTimer);
  state.screen = "processing";
  state.progress = 0;
  state.activeStage = "directory";
  state.issuePaused = false;
  state.permissionStatus = "waiting";
  state.ocrStatus = "waiting";
  state.rescanned = false;
  state.rescanProgress = 0;
  state.rescanSummary = null;
  render();
  if (HAS_WINDOW) {
    scanTimer = window.setInterval(advanceScan, 260);
  }
}

function advanceScan() {
  if (state.issuePaused) return;
  if (state.progress >= 42 && state.permissionStatus === "waiting") {
    state.progress = 42;
    state.issuePaused = true;
    render();
    return;
  }
  state.progress = Math.min(100, state.progress + 7);
  state.activeStage = currentStage().id;
  render();
  if (state.progress >= 100) finishScan();
}

function finishScan() {
  if (HAS_WINDOW) window.clearInterval(scanTimer);
  scanTimer = null;
  state.progress = 100;
  state.screen = "workspace";
  state.reportView = getTemplateDefaultView(state.template);
  const report = currentReport();
  state.selectedInsight = getDefaultInsightForView(report, state.reportView);
  state.selectedSource = getReportInsight(report, state.selectedInsight).sourceId;
  render();
}

function currentStage() {
  return SCAN_STAGES.reduce((active, stage) => (state.progress >= stage.at ? stage : active), SCAN_STAGES[0]);
}

function stageState(stage) {
  if (state.progress >= stage.at + 18) return "complete";
  if (currentStage().id === stage.id) return "active";
  return "";
}

function scanNodeState(status) {
  if (state.progress >= 82 && status !== "partial") return "complete";
  if (state.progress >= 42 && status === "partial") return "partial";
  return status;
}

function getInsight(insightId) {
  return getReportInsight(currentReport(), insightId);
}

function setReportView(viewId) {
  state.reportView = REPORT_VIEWS.some(view => view.id === viewId) ? viewId : "overview";
  const report = currentReport();
  const insightId = getDefaultInsightForView(report, state.reportView);
  const insight = getReportInsight(report, insightId);
  state.selectedInsight = insight.id;
  state.selectedSource = insight.sourceId;
  render();
}

function selectInsight(insightId, shouldRender = true) {
  const insight = getInsight(insightId);
  state.selectedInsight = insight.id;
  state.selectedSource = insight.sourceId;
  if (shouldRender) render();
}

function openSource(sourceId) {
  state.selectedSource = sourceId;
  const insight = currentReport().insights.find(item => item.sourceId === sourceId);
  if (insight) state.selectedInsight = insight.id;
  render();
}

function createTask(insightId) {
  selectInsight(insightId, false);
  state.modal = "task";
  render();
}

function rescanFolder() {
  if (HAS_WINDOW) window.clearInterval(scanTimer);
  state.rescanned = false;
  state.comparisonOpen = false;
  state.rescanSummary = summarizeChangeSummary(CHANGE_SUMMARY);
  state.rescanProgress = 8;
  render();
  if (!HAS_WINDOW) return;
  scanTimer = window.setInterval(() => {
    state.rescanProgress = Math.min(100, state.rescanProgress + 23);
    if (state.rescanProgress >= 100) {
      window.clearInterval(scanTimer);
      scanTimer = null;
      state.rescanned = true;
      state.comparisonOpen = true;
      setToast(state.rescanSummary.banner);
      return;
    }
    render();
  }, 240);
}

function refreshIcons() {
  if (HAS_WINDOW && window.lucide) window.lucide.createIcons();
}

function setToast(message) {
  state.toast = message;
  render();
  if (!HAS_WINDOW) return;
  window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1800);
}

function handleRootClick(event) {
  const stopClose = event.target.closest("[data-stop-close]");
  if (stopClose) event.stopPropagation();

  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;
  if (action === "open-picker") openFolderPicker();
  if (action === "close-picker") {
    state.pickerOpen = false;
    render();
  }
  if (action === "preview-folder") {
    state.selectedFolder = getFolder(target.dataset.folderId);
    render();
  }
  if (action === "select-folder") selectFolder(target.dataset.folderId);
  if (action === "set-template") applyTemplateSelection(target.dataset.template);
  if (action === "back-entry") {
    state.screen = "entry";
    render();
  }
  if (action === "start-scan") {
    startScan();
  }
  if (action === "cancel-scan") {
    if (HAS_WINDOW) window.clearInterval(scanTimer);
    scanTimer = null;
    state.screen = "preflight";
    render();
  }
  if (action === "request-permission") {
    const recovery = resolvePermissionRecovery("request", state.permissionStatus);
    state.permissionStatus = recovery.status;
    state.issuePaused = false;
    setToast(recovery.label);
  }
  if (action === "skip-file") {
    const recovery = resolvePermissionRecovery("skip", state.permissionStatus);
    state.permissionStatus = recovery.status;
    state.issuePaused = false;
    render();
  }
  if (action === "retry-ocr") {
    state.ocrStatus = "processing";
    render();
    if (HAS_WINDOW) window.setTimeout(() => {
      state.ocrStatus = "complete";
      render();
    }, 700);
  }
  if (action === "set-report-view") setReportView(target.dataset.view);
  if (action === "select-insight") selectInsight(target.dataset.insightId);
  if (action === "open-source") openSource(target.dataset.sourceId);
  if (action === "create-task") createTask(target.dataset.insightId);
  if (action === "close-modal") {
    state.modal = null;
    render();
  }
  if (action === "confirm-task") {
    state.taskAssigned = true;
    state.modal = null;
    setToast("待办已创建并分派给林澜");
  }
  if (action === "open-save-modal") {
    state.modal = "save";
    render();
  }
  if (action === "confirm-save-report") {
    state.modal = null;
    setToast(`周报已保存到 ${currentReport().savePath}`);
  }
  if (action === "mark-risk-handled") {
    state.riskHandled = true;
    setToast("风险已处理，未处理风险数已更新");
  }
  if (action === "add-knowledge") {
    state.knowledgeStatus = "待负责人复核";
    setToast("已加入知识库候选，等待负责人复核");
    render();
  }
  if (action === "rescan-folder") rescanFolder();
  if (action === "open-comparison") {
    state.comparisonOpen = true;
    render();
  }
  if (action === "close-comparison") {
    state.comparisonOpen = false;
    render();
  }
  if (action === "show-toast") setToast(target.dataset.toast || "操作已完成");
}

function initFolderSummary() {
  if (!HAS_DOCUMENT || domBound) return;
  root = document.createElement("div");
  root.className = "folder-summary-app";
  document.body.appendChild(root);
  root.addEventListener("click", handleRootClick);
  domBound = true;
  render();
}

const api = {
  state,
  renderEntry,
  openFolderPicker,
  selectFolder,
  renderPreflight: renderPreflightFromEntry,
  startScan,
  renderProcessing,
  finishScan,
  renderWorkspace,
  setReportView,
  selectInsight,
  openSource,
  createTask,
  rescanFolder,
  getTemplateDefaultView,
  selectFolderReport,
  resolvePermissionRecovery,
  summarizeChangeSummary,
  applyTemplateSelection,
  getFolderReport
};

if (HAS_WINDOW) {
  window.folderSummary = api;
}

if (HAS_DOCUMENT) {
  initFolderSummary();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = api;
}
