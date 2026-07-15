const TOOL_ORDER = [
  "folder-summary",
  "multi-file-qa",
  "invoice-check",
  "contract-review",
  "version-compare",
  "courseware-organizer",
  "lesson-plan",
  "knowledge-import"
];

const TRUSTED_P0 = [
  "folder-summary",
  "multi-file-qa",
  "invoice-check"
];

const WORKBENCH_META = {
  "folder-summary": {
    category: "common",
    categoryLabel: "通用云盘",
    stage: "P0 · 高频入口",
    outcome: "把一个持续更新的项目文件夹，变成带来源的重点、待办、风险和增量变化报告。",
    flow: ["选择文件夹", "核对覆盖与权限", "保存可信摘要"],
    trust: ["来源定位", "局部失败", "增量更新"]
  },
  "multi-file-qa": {
    category: "common",
    categoryLabel: "通用云盘",
    stage: "P0 · 可信问答",
    outcome: "先锁定已授权来源，再生成能定位到原文、识别冲突并拒绝无依据结论的回答。",
    flow: ["确认来源范围", "检索并校验引用", "生成可交付文稿"],
    trust: ["权限过滤", "引用证据", "冲突复核"]
  },
  "invoice-check": {
    category: "finance",
    categoryLabel: "财务行业包",
    stage: "P0 · 商业验证",
    outcome: "批量完成 OCR、材料匹配和企业规则校验，只把重复、缺失与金额异常交给财务。",
    flow: ["导入核验批次", "自动识别与匹配", "人工处理异常"],
    trust: ["规则版本", "字段复核", "审核留痕"]
  },
  "contract-review": {
    category: "legal",
    categoryLabel: "法务行业包",
    stage: "P1 · 企业扩展",
    outcome: "按企业 Playbook 标记合同风险，保留原文、规则依据和红线决策。"
  },
  "version-compare": {
    category: "legal",
    categoryLabel: "法务与协作",
    stage: "P1 · 企业扩展",
    outcome: "从文字差异升级为责任、语义和风险变化，并保留逐项合并决定。"
  },
  "knowledge-import": {
    category: "governance",
    categoryLabel: "知识治理",
    stage: "P1 · 沉淀闭环",
    outcome: "识别高价值资料，处理重复、权限、负责人和复核周期后再发布。"
  },
  "courseware-organizer": {
    category: "education",
    categoryLabel: "教育行业包",
    stage: "P2 · 行业验证",
    outcome: "按学科、教材和课时整理散落资源，并检查答案、版本和资料缺口。"
  },
  "lesson-plan": {
    category: "education",
    categoryLabel: "教育行业包",
    stage: "P2 · 行业验证",
    outcome: "基于课件和课标生成结构化教案，校验课时并要求教师最终确认。"
  }
};

const TOOLS = {
  "folder-summary": {
    file: "folder-summary.html",
    icon: "摘",
    name: "文件夹智能摘要",
    desc: "批量理解文件夹内的资料，输出主题、重点文件、待办、风险和入库建议。",
    tier: "专业版",
    scene: "云盘增强",
    tags: ["文件夹级", "批量摘要", "来源可追溯"],
    accept: ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.md,.png,.jpg,.jpeg,.zip",
    uploadHint: "支持文档、表格、图片和压缩包，建议选择同一项目或课程的资料。",
    sampleFiles: [
      ["2026春季招生方案.pptx", 5280000],
      ["课程体系介绍.docx", 874000],
      ["渠道投放数据.xlsx", 386000]
    ],
    fields: [
      { type: "select", id: "summaryDepth", label: "摘要深度", options: ["标准摘要", "快速概览", "深度分析"] },
      { type: "select", id: "focus", label: "重点关注", options: ["结论、待办与风险", "业务数据", "知识沉淀"] },
      { type: "textarea", id: "instruction", label: "补充要求", value: "请识别适合沉淀到知识库的资料，并标出敏感内容。" }
    ],
    process: ["扫描文件和权限", "解析正文与表格", "按主题聚类", "生成文件夹报告", "形成入库建议"],
    result: {
      title: "招生项目资料夹摘要",
      subtitle: "已分析 3 个文件，所有结论均保留来源",
      summary: "该文件夹主要围绕 2026 春季招生展开，覆盖招生策略、课程卖点和渠道投放数据。建议沉淀为“招生运营资料库”，并补充渠道 ROI 统一口径。",
      stats: [["3", "已分析文件"], ["5", "核心主题"], ["4", "待办事项"], ["1", "风险提示"]],
      findings: [
        ["success", "招生策略完整", "目标人群、渠道规划和课程卖点已经形成闭环。", "已确认"],
        ["warn", "渠道数据口径不一致", "抖音和小红书渠道分别使用线索成本与到课成本。", "需复核"],
        ["danger", "存在外部价格信息", "课程体系文件包含合作方未公开采购价。", "敏感"],
        ["", "建议入库", "招生方案和课程体系适合进入“招生运营资料库”。", "推荐"]
      ],
      table: {
        headers: ["主题", "核心结论", "来源"],
        rows: [["目标用户", "25-38 岁职场家长", "招生方案 P4"], ["课程卖点", "分层教学 + 每周反馈", "课程体系 P3"], ["最高效渠道", "社群转介绍", "投放数据 Sheet2"]]
      },
      citations: ["2026春季招生方案.pptx · 第 4-12 页", "课程体系介绍.docx · 课程模块章节", "渠道投放数据.xlsx · Sheet2"]
    },
    actions: ["保存摘要", "加入知识库", "创建协作任务"]
  },
  "multi-file-qa": {
    file: "multi-file-qa.html",
    icon: "问",
    name: "多文件问答",
    desc: "选择多个文件直接提问，回答仅基于有权限的来源并精确标注页码。",
    tier: "专业版",
    scene: "可信问答",
    tags: ["多文件", "引用回答", "权限过滤"],
    accept: ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.md",
    uploadHint: "建议选择需要对比、总结或查找事实的多个文件。",
    sampleFiles: [["供应商报价单-A.pdf", 1640000], ["供应商报价单-B.pdf", 1430000], ["采购需求说明.docx", 286000]],
    fields: [
      { type: "textarea", id: "question", label: "你想问什么", value: "两家供应商的报价、服务范围和交付风险有什么差异？" },
      { type: "select", id: "answerMode", label: "回答模式", options: ["分析并给建议", "仅提取事实", "生成对比表"] },
      { type: "select", id: "citation", label: "引用方式", options: ["显示文件和页码", "显示原文片段", "精简引用"] }
    ],
    process: ["建立临时文件索引", "检索问题相关段落", "过滤无权限来源", "生成证据约束答案", "校验引用位置"],
    result: {
      title: "供应商方案对比回答",
      subtitle: "基于 3 个文件，共引用 6 处证据",
      summary: "A 供应商总价低 8.6%，但售后响应时间比 B 慢 12 小时；B 供应商包含额外培训服务并承诺 4 小时内响应。若项目更重视交付稳定性，建议优先 B，并进一步确认培训次数。",
      stats: [["¥286,000", "A 总报价"], ["¥312,800", "B 总报价"], ["8.6%", "价格差异"], ["6", "引用证据"]],
      findings: [
        ["success", "A 的价格优势", "总价更低，基础功能满足采购需求。", "优势"],
        ["", "B 的服务优势", "包含上线培训和更短的售后响应时间。", "优势"],
        ["warn", "A 的交付风险", "SLA 未达到采购需求说明中的 8 小时要求。", "风险"]
      ],
      table: { headers: ["维度", "供应商 A", "供应商 B"], rows: [["总报价", "28.6 万", "31.28 万"], ["响应时间", "16 小时", "4 小时"], ["培训服务", "另收费", "含 2 次"], ["结论", "价格优先", "交付优先"]] },
      citations: ["供应商报价单-A.pdf · 第 4、7 页", "供应商报价单-B.pdf · 第 3、6 页", "采购需求说明.docx · 服务要求第 2 条"]
    },
    actions: ["保存问答", "生成对比文档", "继续追问"]
  },
  "invoice-check": {
    file: "invoice-check.html",
    icon: "票",
    name: "财务票据识别与核验",
    desc: "自动识别票据字段，匹配报销单和审批规则，发现重复、缺失与金额异常。",
    tier: "企业版",
    scene: "财务自动化",
    tags: ["票据 OCR", "字段核验", "异常检测"],
    accept: ".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx",
    uploadHint: "可同时上传发票、支付凭证、报销单、合同和审批截图。",
    sampleFiles: [["电子发票_技术服务费.pdf", 628000], ["支付凭证截图.png", 840000], ["AI工具订阅报销规则.docx", 196000]],
    fields: [
      { type: "select", id: "checkType", label: "核验类型", options: ["报销材料核验", "票据字段识别", "三单匹配"] },
      { type: "input", id: "projectNo", label: "项目编号", value: "AI-2026-0710" },
      { type: "select", id: "strict", label: "规则强度", options: ["企业标准规则", "严格核验", "仅检查必填项"] },
      { type: "textarea", id: "financeRule", label: "补充规则", value: "订阅类工具需提供负责人确认截图，单笔超过 1 万元需关联项目合同。" }
    ],
    process: ["识别票据类型", "抽取金额与抬头", "匹配支付和项目", "执行企业核验规则", "生成异常清单"],
    result: {
      title: "报销材料核验结果",
      subtitle: "核心字段识别置信度 97.2%，有 1 项需要补充",
      summary: "发票金额、付款金额和项目编号匹配成功，发票抬头及税号正确。根据企业规则，当前材料缺少负责人确认截图，暂不建议直接提交财务。",
      stats: [["¥12,800", "申请金额"], ["97.2%", "识别置信度"], ["8/9", "材料完整度"], ["1", "待补充材料"]],
      findings: [
        ["success", "金额匹配成功", "发票金额与支付凭证金额一致。", "通过"],
        ["success", "发票抬头正确", "抬头、税号与企业信息一致。", "通过"],
        ["warn", "缺少负责人确认", "订阅类工具报销必须提供负责人确认截图。", "待补充"],
        ["", "未发现重复报销", "近 12 个月记录中未发现相同发票号。", "正常"]
      ],
      table: { headers: ["字段", "识别结果", "核验状态"], rows: [["发票号码", "03421876****", "通过"], ["开票日期", "2026-07-03", "通过"], ["价税合计", "12,800.00", "通过"], ["项目编号", "AI-2026-0710", "通过"]] },
      citations: ["电子发票_技术服务费.pdf · 发票原件", "支付凭证截图.png · 支付金额", "AI工具订阅报销规则.docx · 第 3.2 条"]
    },
    actions: ["导出核验单", "提醒补材料", "提交财务复核"]
  },
  "contract-review": {
    file: "contract-review.html",
    icon: "审",
    name: "合同风险审阅",
    desc: "按企业审查规则提取关键条款、识别风险并给出带原文依据的修订建议。",
    tier: "企业版 · 法务包",
    scene: "法律文档",
    tags: ["风险分级", "条款提取", "修订建议"],
    accept: ".pdf,.doc,.docx",
    uploadHint: "上传待审合同，可同时添加企业标准模板或审查规则。",
    sampleFiles: [["渠道合作协议-待审.docx", 742000], ["标准合作协议模板.docx", 386000], ["供应商资质材料.pdf", 1240000]],
    fields: [
      { type: "select", id: "contractType", label: "合同类型", options: ["自动识别", "渠道合作", "采购合同", "服务合同", "保密协议"] },
      { type: "select", id: "position", label: "我方立场", options: ["甲方", "乙方", "中立审阅"] },
      { type: "select", id: "reviewRule", label: "审查规则", options: ["企业标准 Playbook", "严格风控", "仅审核心条款"] },
      { type: "textarea", id: "legalFocus", label: "重点关注", value: "重点检查付款条件、违约责任、数据保密、知识产权和争议解决。" }
    ],
    process: ["识别合同结构", "抽取关键条款", "对照企业规则", "评估风险等级", "生成修订建议"],
    result: {
      title: "渠道合作协议审阅报告",
      subtitle: "辅助审阅结果，请由法务人员作最终判断",
      summary: "发现 1 项高风险和 3 项中风险。最需要关注的是违约责任未设置责任上限；此外，数据保密期限仅 1 年、付款节点未绑定验收条件。",
      stats: [["1", "高风险"], ["3", "中风险"], ["5", "提示项"], ["86%", "条款完整度"]],
      findings: [
        ["danger", "违约责任无上限", "第 9.3 条未约定我方累计赔偿责任上限。", "高风险"],
        ["warn", "付款条件缺少验收", "首笔 60% 付款仅绑定合同生效，未绑定交付验收。", "中风险"],
        ["warn", "数据保密期限偏短", "合作终止后仅保密 1 年，企业标准为 3 年。", "中风险"],
        ["success", "知识产权归属清晰", "交付成果知识产权归属我方。", "通过"]
      ],
      table: { headers: ["条款", "当前约定", "建议修改"], rows: [["责任上限", "未约定", "不超过合同总金额"], ["付款节点", "生效后付 60%", "验收后付 60%"], ["保密期限", "终止后 1 年", "调整为 3 年"]] },
      citations: ["渠道合作协议-待审.docx · 第 5.2、8.1、9.3 条", "标准合作协议模板.docx · 第 7、10 条", "企业标准 Playbook · 付款与赔偿章节"]
    },
    actions: ["导出审阅意见", "生成修订稿", "发给法务"]
  },
  "version-compare": {
    file: "version-compare.html",
    icon: "比",
    name: "合同/文档版本对比",
    desc: "对齐多个文档版本，识别语义差异、责任变化和潜在风险，输出红线摘要。",
    tier: "专业版 · 企业版",
    scene: "版本协作",
    tags: ["语义 Diff", "风险变化", "红线摘要"],
    accept: ".pdf,.doc,.docx,.txt,.md",
    uploadHint: "至少上传两个版本，建议文件名包含版本号或修改方。",
    sampleFiles: [["合作协议_v3_客户修订.docx", 682000], ["合作协议_v2_法务版.docx", 645000], ["合作协议_标准模板.docx", 612000]],
    fields: [
      { type: "select", id: "baseVersion", label: "基准版本", options: ["自动识别最早版本", "按上传顺序第一个", "企业标准模板"] },
      { type: "select", id: "compareDepth", label: "对比深度", options: ["语义与风险变化", "仅文字差异", "核心条款差异"] },
      { type: "select", id: "output", label: "输出方式", options: ["差异报告 + 红线摘要", "仅差异表", "生成合并建议"] }
    ],
    process: ["识别版本关系", "对齐段落与条款", "检测语义差异", "评估风险变化", "生成红线报告"],
    result: {
      title: "合作协议版本差异报告",
      subtitle: "v3 相对 v2 共发现 13 处有效修改",
      summary: "客户修订版新增独家合作义务并删除违约责任上限，整体风险较 v2 上升。建议重点复核第 5、9、12 条，并拒绝删除责任上限的修改。",
      stats: [["13", "有效修改"], ["4", "新增内容"], ["2", "删除条款"], ["3", "风险上升"]],
      findings: [
        ["danger", "删除责任上限", "v3 删除“累计责任不超过合同总金额”的约定。", "风险上升"],
        ["warn", "新增独家合作", "v3 要求我方在合作期内不得与同类客户合作。", "需谈判"],
        ["", "付款周期延长", "付款周期从 30 日调整为 45 日。", "变化"],
        ["success", "验收标准更清晰", "v3 补充了验收结果反馈时限。", "改善"]
      ],
      table: { headers: ["条款", "v2 法务版", "v3 客户版"], rows: [["第 5 条", "非独家合作", "新增独家限制"], ["第 8 条", "30 日付款", "45 日付款"], ["第 9 条", "责任不超合同金额", "删除上限"]] },
      citations: ["合作协议_v3_客户修订.docx · 第 5、8、9 条", "合作协议_v2_法务版.docx · 对应条款", "标准合作协议模板.docx · 第 9.4 条"]
    },
    actions: ["导出差异表", "生成红线摘要", "创建审阅任务"]
  },
  "courseware-organizer": {
    file: "courseware-organizer.html",
    icon: "课",
    name: "课件整理工具",
    desc: "识别学科、年级、章节和知识点，将散落课件整理成可复用的课程资料包。",
    tier: "教育行业包",
    scene: "教育资料管理",
    tags: ["课件归类", "知识点标签", "课程包"],
    accept: ".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg",
    uploadHint: "支持课件、教案、练习、答案和教材扫描件。",
    sampleFiles: [["高一数学_函数基础.pptx", 7640000], ["函数单元练习.pdf", 2360000], ["函数章节教案.docx", 486000]],
    fields: [
      { type: "select", id: "subject", label: "学科", options: ["自动识别", "数学", "语文", "英语", "物理"] },
      { type: "select", id: "grade", label: "年级", options: ["自动识别", "高一", "高二", "初三", "六年级"] },
      { type: "select", id: "packageMode", label: "整理方式", options: ["按章节生成课程包", "按资料类型归档", "按知识点标签化"] },
      { type: "textarea", id: "educationRule", label: "补充要求", value: "请识别缺失的答案解析，并按 45 分钟课时拆分。" }
    ],
    process: ["识别课程属性", "抽取知识点", "匹配课件和练习", "发现资料缺口", "生成课程资料包"],
    result: {
      title: "函数基础课程资料包",
      subtitle: "已整理为 3 个课时，包含 14 个知识点",
      summary: "资料已识别为高一数学“函数基础”单元。系统按 3 个课时整理课件、教案与练习，并发现第 2 课时缺少答案解析。",
      stats: [["3", "建议课时"], ["14", "知识点"], ["18", "练习题"], ["1", "资料缺口"]],
      findings: [
        ["success", "课时 1：函数概念", "课件、教案和基础练习完整。", "完整"],
        ["warn", "课时 2：函数表示法", "练习题存在，但缺少答案解析。", "待补充"],
        ["success", "课时 3：函数应用", "包含例题、课堂活动和拓展练习。", "完整"],
        ["", "建议知识库标签", "高一数学 / 必修一 / 函数 / 基础课程。", "推荐"]
      ],
      table: { headers: ["课时", "知识点", "资料"], rows: [["第 1 课时", "函数定义、定义域", "课件 + 教案 + 练习"], ["第 2 课时", "三种表示方法", "课件 + 练习"], ["第 3 课时", "函数建模", "课件 + 教案 + 拓展"]] },
      citations: ["高一数学_函数基础.pptx · 第 1-28 页", "函数单元练习.pdf · 题目 1-18", "函数章节教案.docx · 教学安排"]
    },
    actions: ["生成课程包", "补全答案解析", "加入教育知识库"]
  },
  "lesson-plan": {
    file: "lesson-plan.html",
    icon: "案",
    name: "教案生成工具",
    desc: "基于课件、教材和机构模板生成可编辑教案，覆盖目标、流程、互动和作业。",
    tier: "教育行业包",
    scene: "教师备课",
    tags: ["教案生成", "模板套用", "课程标准"],
    accept: ".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg",
    uploadHint: "上传课件或教材，可附加学校教案模板和课程标准。",
    sampleFiles: [["函数基础_第1课时.pptx", 4260000], ["学校教案模板.docx", 228000], ["课程标准节选.pdf", 884000]],
    fields: [
      { type: "input", id: "lessonTitle", label: "课题", value: "函数的概念与定义域" },
      { type: "select", id: "duration", label: "课时长度", options: ["45 分钟", "40 分钟", "90 分钟"] },
      { type: "select", id: "studentLevel", label: "学生水平", options: ["普通班级", "基础薄弱", "进阶班级"] },
      { type: "textarea", id: "lessonFocus", label: "教学要求", value: "增加课堂互动，保留 8 分钟随堂练习，并在结尾设计分层作业。" }
    ],
    process: ["读取课件结构", "匹配教案模板", "生成教学流程", "对齐课程标准", "生成可编辑教案"],
    result: {
      title: "函数的概念与定义域 · 教案草稿",
      subtitle: "45 分钟 · 普通班级 · 可继续编辑",
      summary: "本课通过生活场景导入函数概念，使用“问题链 + 小组讨论”完成定义域理解，并安排 8 分钟分层随堂练习。",
      stats: [["45 分钟", "总课时"], ["3", "教学目标"], ["4", "互动问题"], ["6", "作业建议"]],
      findings: [
        ["", "课堂导入 · 5 分钟", "用温度随时间变化的实例引出变量关系。", "导入"],
        ["success", "概念讲解 · 12 分钟", "通过集合语言建立函数定义。", "核心"],
        ["", "小组活动 · 10 分钟", "判断 4 组对应关系是否构成函数。", "互动"],
        ["warn", "易错点提醒", "定义域必须结合实际意义和表达式限制。", "重点"]
      ],
      table: { headers: ["环节", "时间", "教师与学生活动"], rows: [["情境导入", "5 分钟", "观察变量关系并提出问题"], ["新知探究", "22 分钟", "定义讲解、小组判断、例题"], ["巩固练习", "8 分钟", "基础与进阶分层练习"], ["总结作业", "10 分钟", "概念图总结与分层作业"]] },
      citations: ["函数基础_第1课时.pptx · 第 2-15 页", "学校教案模板.docx · 标准结构", "课程标准节选.pdf · 函数概念要求"]
    },
    actions: ["保存为 Word", "继续编辑", "生成配套练习"]
  },
  "knowledge-import": {
    file: "knowledge-import.html",
    icon: "库",
    name: "知识库一键入库",
    desc: "识别云盘中的高价值资料，推荐目标知识库、摘要、负责人和权限复核。",
    tier: "企业版 · 知识库套餐",
    scene: "知识沉淀",
    tags: ["入库推荐", "权限继承", "负责人复核"],
    accept: ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.md,.zip",
    uploadHint: "选择准备沉淀的文件或资料包，系统会评估入库价值与权限风险。",
    sampleFiles: [["客服高频问题汇总.docx", 476000], ["产品培训材料.pptx", 5840000], ["保密项目复盘.pdf", 2360000]],
    fields: [
      { type: "select", id: "targetKb", label: "目标知识库", options: ["智能推荐", "客服知识库", "产品培训库", "AI 创新项目组"] },
      { type: "select", id: "permission", label: "权限策略", options: ["继承原文件权限", "仅部门可见", "提交负责人确认"] },
      { type: "select", id: "indexRule", label: "问答索引", options: ["复核后进入问答", "入库后立即索引", "暂不进入问答"] },
      { type: "textarea", id: "kbInstruction", label: "入库要求", value: "生成摘要、关键词和 3 个热门问法；保密内容必须拦截。" }
    ],
    process: ["评估资料价值", "推荐目标知识库", "生成摘要与问法", "预览权限影响", "提交负责人复核"],
    result: {
      title: "知识库入库推荐",
      subtitle: "2 份资料建议入库，1 份保密资料需授权",
      summary: "客服问题汇总适合进入“客服知识库”，产品培训材料适合进入“产品培训库”。保密项目复盘当前无发布授权，不会进入知识广场或问答索引。",
      stats: [["2", "建议入库"], ["1", "需授权"], ["6", "推荐问法"], ["0", "权限冲突"]],
      findings: [
        ["success", "客服高频问题汇总", "内容完整、更新较新，建议进入客服知识库。", "置信度 96%"],
        ["success", "产品培训材料", "适合作为新人培训和产品问答来源。", "置信度 91%"],
        ["danger", "保密项目复盘", "无知识库发布授权，已阻止进入问答索引。", "已拦截"],
        ["", "负责人建议", "客服资料由王敏复核，培训资料由李哲复核。", "推荐"]
      ],
      table: { headers: ["文件", "目标知识库", "权限与状态"], rows: [["客服高频问题汇总", "客服知识库", "继承权限 · 待王敏复核"], ["产品培训材料", "产品培训库", "部门可见 · 待李哲复核"], ["保密项目复盘", "暂不入库", "保密 · 需申请授权"]] },
      citations: ["客服高频问题汇总.docx · 43 个问答条目", "产品培训材料.pptx · 12 个产品模块", "保密项目复盘.pdf · 权限标签：保密"]
    },
    actions: ["提交入库", "设置复核人", "查看权限预览"]
  }
};

function getToolId() {
  return document.body.dataset.tool || new URLSearchParams(location.search).get("tool") || "folder-summary";
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, index)).toFixed(index > 1 ? 1 : 0)} ${units[index]}`;
}

function extension(name) {
  const ext = name.includes(".") ? name.split(".").pop() : "FILE";
  return ext.slice(0, 4).toUpperCase();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function primaryNav(active) {
  return `<nav class="primary-nav" aria-label="汇报导航">
    <a class="primary-nav-link ${active === "report" ? "active" : ""}" href="report.html">调研报告</a>
    <a class="primary-nav-link ${active === "experience" ? "active" : ""}" href="index.html">工具体验</a>
    <a class="primary-nav-link ${active === "existing" ? "active" : ""}" href="existing-tools.html">已有工具</a>
  </nav>`;
}

function renderShell(tool) {
  const tabs = TOOL_ORDER.map(id => {
    const item = TOOLS[id];
    return `<a class="tool-tab ${id === getToolId() ? "active" : ""}" href="${item.file}"><span class="tool-tab-icon">${item.icon}</span>${item.name}</a>`;
  }).join("");

  document.body.innerHTML = `
    <div class="app-shell">
      ${renderProductSidebar()}
      <main class="main">
        <header class="topbar">
          <div class="breadcrumb"><a href="index.html">文件工作台</a><span>/</span><strong>${tool.name}</strong></div>
          ${primaryNav("experience")}
          <div class="top-actions"><button class="btn" data-action="history">处理记录</button><button class="btn primary" data-action="help">使用帮助</button></div>
        </header>
        <div class="tool-tabs-wrap"><nav class="tool-tabs">${tabs}</nav></div>
        <div class="content">
          <div class="demo-banner"><strong>可交互体验版</strong><span>可上传本地文件并体验完整流程；处理结果为演示数据，生产上线时替换为真实解析与模型接口。</span></div>
          <section class="tool-hero">
            <div class="tool-heading"><div class="tool-icon-large">${tool.icon}</div><div><h1>${tool.name}</h1><p>${tool.desc}</p></div></div>
            <div class="hero-tags"><span class="tag purple">${tool.tier}</span><span class="tag blue">${tool.scene}</span>${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
          </section>
          <div class="stepper" id="stepper">
            <div class="step active" data-step="1"><span class="step-number">1</span><div><b>添加文件</b><span>本地或云盘资料</span></div></div>
            <div class="step" data-step="2"><span class="step-number">2</span><div><b>配置任务</b><span>选择处理规则</span></div></div>
            <div class="step" data-step="3"><span class="step-number">3</span><div><b>执行处理</b><span>解析、匹配与分析</span></div></div>
            <div class="step" data-step="4"><span class="step-number">4</span><div><b>查看结果</b><span>导出或继续操作</span></div></div>
          </div>
          <div class="work-grid">
            <div class="left-stack">
              <section class="panel">
                <div class="panel-head"><div><h2>1. 添加处理文件</h2><p>${tool.uploadHint}</p></div><span class="tag blue" id="fileCount">0 个文件</span></div>
                <div class="panel-body">
                  <div class="dropzone" id="dropzone"><div><div class="drop-icon">⇧</div><strong>拖拽文件到这里</strong><p>${tool.uploadHint}</p><div class="upload-actions"><label class="btn primary" for="fileInput">选择本地文件</label><button class="btn" id="sampleButton">加载演示文件</button></div><input class="file-input" id="fileInput" type="file" multiple accept="${tool.accept}"></div></div>
                  <div class="file-list" id="fileList"></div>
                </div>
              </section>
              <section class="panel">
                <div class="panel-head"><div><h2>2. 配置处理任务</h2><p>可按业务场景调整分析规则</p></div><button class="btn ghost small" id="resetButton">重置</button></div>
                <div class="panel-body"><div class="field-grid" id="fieldGrid"></div></div>
                <div class="runbar"><span class="run-summary" id="runSummary">请先添加文件</span><button class="btn primary" id="runButton" disabled>开始处理</button></div>
              </section>
            </div>
            <div class="right-stack">
              <section class="panel">
                <div class="process-empty" id="processEmpty"><div><div class="empty-visual">${tool.icon}</div><h3>准备体验“${tool.name}”</h3><p>加载演示文件或选择本地文件，配置处理任务后点击“开始处理”，即可看到完整过程和结果。</p></div></div>
                <div class="processing" id="processing"><div class="processing-head"><div class="spinner"></div><div><strong id="processingTitle">正在处理文件</strong><div class="helper" id="processingSubtitle">正在准备任务...</div></div></div><div class="progress-track"><div class="progress-fill" id="progressFill"></div></div><div class="process-steps" id="processSteps"></div></div>
                <div class="results panel-body" id="results"></div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div class="toast" id="toast"></div>
    <div class="modal-backdrop" id="modalBackdrop"><div class="modal"><div class="modal-head"><h3 id="modalTitle">操作确认</h3><button class="btn ghost small" data-close-modal>关闭</button></div><div class="modal-body" id="modalBody"></div><div class="modal-foot"><button class="btn" data-close-modal>取消</button><button class="btn primary" id="modalConfirm">确认执行</button></div></div></div>
  `;
}

function fieldHtml(field) {
  const full = field.type === "textarea" ? " full" : "";
  if (field.type === "select") {
    return `<div class="field${full}"><label for="${field.id}">${field.label}</label><select class="select" id="${field.id}">${field.options.map(item => `<option>${item}</option>`).join("")}</select></div>`;
  }
  if (field.type === "textarea") {
    return `<div class="field${full}"><label for="${field.id}">${field.label}</label><textarea class="textarea" id="${field.id}">${field.value || ""}</textarea></div>`;
  }
  return `<div class="field${full}"><label for="${field.id}">${field.label}</label><input class="input" id="${field.id}" value="${escapeHtml(field.value || "")}"></div>`;
}

function resultHtml(tool, fileNames) {
  const result = tool.result;
  const findings = result.findings.map(item => `<div class="finding ${item[0]}"><span class="finding-dot"></span><div><strong>${item[1]}</strong><p>${item[2]}</p></div><span class="tag ${item[0] === "danger" ? "red" : item[0] === "warn" ? "orange" : item[0] === "success" ? "green" : "blue"}">${item[3]}</span></div>`).join("");
  const table = `<table class="data-table"><thead><tr>${result.table.headers.map(item => `<th>${item}</th>`).join("")}</tr></thead><tbody>${result.table.rows.map(row => `<tr>${row.map(item => `<td>${item}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  return `
    <div class="result-toolbar"><div><h2>${result.title}</h2><p>${result.subtitle}</p></div><div class="result-actions">${tool.actions.map((action, index) => `<button class="btn ${index === 0 ? "primary" : ""}" data-result-action="${escapeHtml(action)}">${action}</button>`).join("")}</div></div>
    <div class="stat-grid">${result.stats.map(item => `<div class="stat"><strong>${item[0]}</strong><span>${item[1]}</span></div>`).join("")}</div>
    <section class="result-section"><div class="result-section-head"><h3>处理结论</h3><span class="tag green">已完成</span></div><div class="result-section-body"><p class="result-summary">${result.summary}</p></div></section>
    <section class="result-section"><div class="result-section-head"><h3>关键发现</h3><span class="tag">${result.findings.length} 项</span></div><div class="result-section-body"><div class="finding-list">${findings}</div></div></section>
    <section class="result-section"><div class="result-section-head"><h3>结构化结果</h3><button class="btn small" data-export="csv">导出表格</button></div><div class="result-section-body" style="padding:0; overflow-x:auto;">${table}</div></section>
    <section class="result-section"><div class="result-section-head"><h3>来源与审计</h3><span class="tag blue">仅使用有权限文件</span></div><div class="result-section-body"><div class="citation-list">${result.citations.map(item => `<div class="citation">${item}</div>`).join("")}</div><p class="helper" style="margin:10px 0 0;">本次输入：${fileNames.map(escapeHtml).join("、")}</p></div></section>
  `;
}

function initToolPage() {
  const tool = TOOLS[getToolId()] || TOOLS[TOOL_ORDER[0]];
  renderShell(tool);
  document.title = `${tool.name} · 360 云盘 AI 工具`;
  document.getElementById("fieldGrid").innerHTML = tool.fields.map(fieldHtml).join("");
  const state = { files: [], running: false, completed: false };
  const fileInput = document.getElementById("fileInput");
  const dropzone = document.getElementById("dropzone");
  const fileList = document.getElementById("fileList");
  const runButton = document.getElementById("runButton");
  const results = document.getElementById("results");
  const processing = document.getElementById("processing");
  const processEmpty = document.getElementById("processEmpty");

  function setStep(step) {
    document.querySelectorAll(".step").forEach(node => {
      const value = Number(node.dataset.step);
      node.classList.toggle("active", value === step);
      node.classList.toggle("done", value < step);
      node.querySelector(".step-number").textContent = value < step ? "✓" : String(value);
    });
  }

  function renderFiles() {
    document.getElementById("fileCount").textContent = `${state.files.length} 个文件`;
    fileList.innerHTML = state.files.map((file, index) => `<div class="file-row"><span class="file-type">${extension(file.name)}</span><div class="file-info"><strong>${escapeHtml(file.name)}</strong><span>${formatBytes(file.size)} · 等待处理</span></div><button class="file-remove" data-remove="${index}" title="移除">×</button></div>`).join("");
    runButton.disabled = state.files.length === 0 || state.running;
    document.getElementById("runSummary").textContent = state.files.length ? `已选择 ${state.files.length} 个文件，可开始处理` : "请先添加文件";
    if (state.files.length && !state.running && !state.completed) setStep(2);
    if (!state.files.length) setStep(1);
  }

  function addFiles(files) {
    const incoming = Array.from(files).map(file => ({ name: file.name, size: file.size || 128000, file }));
    const names = new Set(state.files.map(file => file.name));
    incoming.forEach(file => { if (!names.has(file.name)) state.files.push(file); });
    state.completed = false;
    results.classList.remove("active");
    processEmpty.style.display = "grid";
    renderFiles();
    showToast(`已添加 ${incoming.length} 个文件`);
  }

  function loadSample() {
    state.files = tool.sampleFiles.map(file => ({ name: file[0], size: file[1], sample: true }));
    state.completed = false;
    results.classList.remove("active");
    processEmpty.style.display = "grid";
    renderFiles();
    showToast("演示文件已加载，可以开始处理");
  }

  async function runTask() {
    if (!state.files.length || state.running) return;
    state.running = true;
    runButton.disabled = true;
    setStep(3);
    processEmpty.style.display = "none";
    results.classList.remove("active");
    processing.classList.add("active");
    const processSteps = document.getElementById("processSteps");
    const progressFill = document.getElementById("progressFill");
    processSteps.innerHTML = tool.process.map((item, index) => `<div class="process-row" data-process="${index}"><span>${index + 1}. ${item}</span><span class="process-state">等待</span></div>`).join("");
    progressFill.style.width = "0%";

    for (let i = 0; i < tool.process.length; i += 1) {
      const rows = [...processSteps.querySelectorAll(".process-row")];
      rows.forEach((row, index) => {
        row.classList.toggle("active", index === i);
        if (index < i) row.classList.add("done");
        row.querySelector(".process-state").textContent = index < i ? "✓ 完成" : index === i ? "处理中" : "等待";
      });
      document.getElementById("processingSubtitle").textContent = tool.process[i];
      progressFill.style.width = `${Math.round(((i + 0.45) / tool.process.length) * 100)}%`;
      await new Promise(resolve => setTimeout(resolve, 520));
    }

    progressFill.style.width = "100%";
    await new Promise(resolve => setTimeout(resolve, 320));
    processing.classList.remove("active");
    state.running = false;
    state.completed = true;
    setStep(4);
    results.innerHTML = resultHtml(tool, state.files.map(file => file.name));
    results.classList.add("active");
    runButton.disabled = false;
    document.getElementById("runSummary").textContent = "处理已完成，可调整配置后重新运行";
    bindResultActions(tool, state);
    showToast(`${tool.name}处理完成`);
  }

  fileInput.addEventListener("change", event => addFiles(event.target.files));
  document.getElementById("sampleButton").addEventListener("click", loadSample);
  runButton.addEventListener("click", runTask);
  fileList.addEventListener("click", event => {
    const button = event.target.closest("[data-remove]");
    if (!button || state.running) return;
    state.files.splice(Number(button.dataset.remove), 1);
    renderFiles();
  });
  dropzone.addEventListener("dragover", event => { event.preventDefault(); dropzone.classList.add("dragover"); });
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
  dropzone.addEventListener("drop", event => { event.preventDefault(); dropzone.classList.remove("dragover"); addFiles(event.dataTransfer.files); });
  document.getElementById("resetButton").addEventListener("click", () => {
    if (state.running) return;
    state.files = [];
    state.completed = false;
    fileInput.value = "";
    results.classList.remove("active");
    processing.classList.remove("active");
    processEmpty.style.display = "grid";
    renderFiles();
    showToast("任务已重置");
  });
  document.querySelector('[data-action="history"]').addEventListener("click", () => openModal("处理记录", `<div class="finding-list"><div class="finding success"><span class="finding-dot"></span><div><strong>暂无真实处理记录</strong><p>体验版完成任务后不会上传或保存你的本地文件。</p></div><span class="tag green">隐私安全</span></div></div>`, "知道了"));
  document.querySelector('[data-action="help"]').addEventListener("click", () => openModal("使用帮助", `<ol style="margin:0; padding-left:20px; color:var(--body);"><li>加载演示文件或选择本地文件。</li><li>按场景调整处理参数。</li><li>点击“开始处理”查看完整过程。</li><li>处理结束后可体验导出和后续动作。</li></ol>`, "开始体验", loadSample));
  renderFiles();
}

function bindResultActions(tool, state) {
  document.querySelectorAll("[data-result-action]").forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.resultAction;
      openModal(action, `<p style="margin:0 0 12px; color:var(--body);">确认执行“${action}”？</p><div class="finding success"><span class="finding-dot"></span><div><strong>演示数据已准备</strong><p>正式上线后，这里会调用云盘、知识库、审批或文档服务接口。</p></div><span class="tag green">可接接口</span></div>`, "确认执行", () => showToast(`${action}成功（演示）`));
    });
  });
  document.querySelectorAll("[data-export]").forEach(button => {
    button.addEventListener("click", () => exportCsv(tool));
  });
}

function exportCsv(tool) {
  const rows = [tool.result.table.headers, ...tool.result.table.rows];
  const csv = "\uFEFF" + rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${tool.name}-结果.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("结果表格已导出");
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function openModal(title, body, confirmText = "确认", onConfirm) {
  const backdrop = document.getElementById("modalBackdrop");
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = body;
  const confirm = document.getElementById("modalConfirm");
  confirm.textContent = confirmText;
  confirm.onclick = () => {
    backdrop.classList.remove("open");
    if (onConfirm) onConfirm();
  };
  backdrop.classList.add("open");
  backdrop.querySelectorAll("[data-close-modal]").forEach(button => button.onclick = () => backdrop.classList.remove("open"));
}

function renderPriorityToolCard(id, index) {
  const item = TOOLS[id];
  const meta = WORKBENCH_META[id];
  return `<a class="priority-tool-card hub-tool-card" data-category="${meta.category}" href="${item.file}">
    <div class="priority-card-head"><span class="priority-index">优先验证</span><span class="priority-badge">P0</span></div>
    <div class="priority-title"><span class="tool-card-icon">${item.icon}</span><div><h3>${item.name}</h3><span>${meta.categoryLabel}</span></div></div>
    <p class="priority-outcome">${meta.outcome}</p>
    <div class="priority-flow">${meta.flow.map(step => `<span>${step}</span>`).join("")}</div>
    <div class="priority-trust">${meta.trust.map(label => `<span><i data-lucide="badge-check"></i>${label}</span>`).join("")}</div>
    <div class="priority-card-action"><span>进入工作台</span><i data-lucide="arrow-right"></i></div>
  </a>`;
}

function renderWorkflowCard(id) {
  const item = TOOLS[id];
  const meta = WORKBENCH_META[id];
  return `<a class="workflow-card hub-tool-card" data-category="${meta.category}" href="${item.file}">
    <div class="workflow-card-top"><span class="tool-card-icon">${item.icon}</span><span class="workflow-stage">${meta.stage}</span></div>
    <h3>${item.name}</h3>
    <p>${meta.outcome}</p>
    <div class="workflow-meta">${item.tags.slice(0, 2).map(tag => `<span>${tag}</span>`).join("")}</div>
    <div class="workflow-card-action"><span>${meta.categoryLabel}</span><i data-lucide="arrow-right"></i></div>
  </a>`;
}

function renderHubTaskLayer() {
  return `<div class="hub-task-layer" data-task-layer aria-hidden="true">
    <button class="hub-task-scrim" type="button" data-hub-action="close-tasks" aria-label="关闭任务中心"></button>
    <aside class="hub-task-drawer" aria-label="任务中心">
      <header class="hub-task-head"><div><h2>任务中心</h2><p>跨工具查看处理中、待复核和已完成结果</p></div><button type="button" data-hub-action="close-tasks" aria-label="关闭"><i data-lucide="x"></i></button></header>
      <div class="hub-task-summary"><span><strong>1</strong>处理中</span><span><strong>1</strong>待复核</span><span><strong>12</strong>本周完成</span></div>
      <div class="hub-task-list">
        <a class="hub-task-item" href="folder-summary.html"><span class="hub-task-icon"><i data-lucide="folder-search"></i></span><span><strong>春季招生项目摘要</strong><p>正在核对 18 份文件的来源与变化</p></span><span class="hub-task-state">72%</span><span class="hub-task-progress"><i style="width:72%"></i></span></a>
        <a class="hub-task-item" href="invoice-check.html"><span class="hub-task-icon"><i data-lucide="receipt-text"></i></span><span><strong>7 月 11 日报销批次</strong><p>3 张票据存在重复、金额或材料异常</p></span><span class="hub-task-state review">待复核</span></a>
        <a class="hub-task-item" href="multi-file-qa.html"><span class="hub-task-icon"><i data-lucide="messages-square"></i></span><span><strong>招生渠道方案对比</strong><p>已生成简报并保存到原项目文件夹</p></span><span class="hub-task-state done">已回存</span></a>
      </div>
    </aside>
  </div>`;
}

function bindHubInteractions() {
  const cards = [...document.querySelectorAll(".hub-tool-card")];
  const p0Section = document.querySelector('[data-hub-section="p0"]');
  const workflowEmpty = document.querySelector("[data-workflow-empty]");
  document.querySelectorAll("[data-hub-filter]").forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.hubFilter;
      document.querySelectorAll("[data-hub-filter]").forEach(item => item.classList.toggle("active", item === button));
      cards.forEach(card => { card.hidden = filter !== "all" && card.dataset.category !== filter; });
      p0Section.hidden = !p0Section.querySelector(".hub-tool-card:not([hidden])");
      workflowEmpty.hidden = Boolean(document.querySelector('[data-hub-section="workflow"] .hub-tool-card:not([hidden])'));
    });
  });

  const taskLayer = document.querySelector("[data-task-layer]");
  const setTaskLayer = open => {
    taskLayer.classList.toggle("open", open);
    taskLayer.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  document.querySelectorAll('[data-hub-action="tasks"]').forEach(button => button.addEventListener("click", () => setTaskLayer(true)));
  document.querySelectorAll('[data-hub-action="close-tasks"]').forEach(button => button.addEventListener("click", () => setTaskLayer(false)));
  document.addEventListener("keydown", event => { if (event.key === "Escape") setTaskLayer(false); });
}

function renderHub() {
  document.title = "360 AI 文件工作台 · 360 云盘";
  document.body.innerHTML = `
    <div class="app-shell">
      ${renderProductSidebar()}
      <main class="main">
        <header class="topbar"><div class="breadcrumb"><strong>360 AI 文件工作台</strong></div>${primaryNav("experience")}<div class="top-actions"><button class="btn hub-task-trigger" type="button" data-hub-action="tasks" aria-label="打开任务中心"><i data-lucide="list-checks"></i><span>任务中心</span></button><a class="btn primary" href="folder-summary.html"><i data-lucide="folder-input"></i>从文件开始</a></div></header>
        <div class="hub-content">
          <section class="hub-intro" data-screen-label="文件工作台首页">
            <div><h1>让云盘里的文件，直接变成可信工作结果</h1><p>在原有权限范围内完成理解、核验、审阅与沉淀；每个结论可查看来源，高风险动作由人确认，结果可回存原位置。</p></div>
            <div class="hub-value-points"><span><i data-lucide="shield-check"></i>权限不外溢</span><span><i data-lucide="quote"></i>结论可追溯</span><span><i data-lucide="user-check"></i>关键动作可复核</span></div>
          </section>

          <section class="current-context" aria-label="从当前文件夹开始">
            <div class="current-context-main"><span class="context-folder-mark"><i data-lucide="folder-open"></i></span><span><small>从当前文件夹开始</small><strong>春季招生项目</strong><p>企业云盘 / 市场部 · 今天 09:42 更新</p></span></div>
            <div class="current-context-summary"><span><strong>18</strong>文件</span><span><strong>5</strong>子文件夹</span><span><strong>100%</strong>权限可见</span></div>
            <div class="context-actions">
              <a class="context-action" href="folder-summary.html"><i data-lucide="folder-search"></i><span><strong>生成项目速览</strong><small>重点、待办与风险</small></span></a>
              <a class="context-action" href="multi-file-qa.html"><i data-lucide="messages-square"></i><span><strong>问这些文件</strong><small>引用原文回答</small></span></a>
              <a class="context-action" href="knowledge-import.html"><i data-lucide="database-zap"></i><span><strong>筛选可入库资料</strong><small>权限与重复检查</small></span></a>
            </div>
          </section>

          <section class="hub-section" data-hub-section="p0">
            <div class="hub-section-heading"><div><h2>首期推荐</h2><p>3 个 P0 工具先验证高频使用、可信结果和企业付费。</p></div><span>共享权限、证据、任务与审计能力</span></div>
            <div class="p0-grid">${TRUSTED_P0.map(renderPriorityToolCard).join("")}</div>
          </section>

          <section class="hub-section" data-hub-section="workflow">
            <div class="hub-section-heading"><div><h2>行业工作流</h2><p>8 个方向完整保留，按验证顺序逐步生产化。</p></div><div class="hub-filter" aria-label="筛选工具"><button class="hub-filter-button active" data-hub-filter="all">全部</button><button class="hub-filter-button" data-hub-filter="common">通用</button><button class="hub-filter-button" data-hub-filter="finance">财务</button><button class="hub-filter-button" data-hub-filter="legal">法务</button><button class="hub-filter-button" data-hub-filter="education">教育</button><button class="hub-filter-button" data-hub-filter="governance">知识治理</button></div></div>
            <div class="workflow-grid">${TOOL_ORDER.filter(id => !TRUSTED_P0.includes(id)).map(renderWorkflowCard).join("")}</div>
            <div class="workflow-empty" data-workflow-empty hidden>该场景的首期工具已在上方展示。</div>
          </section>
        </div>
      </main>
    </div>
    ${renderHubTaskLayer()}`;
  refreshProductIcons();
  bindHubInteractions();
}

function commonSidebar() {
  return renderProductSidebar();
}

function renderReport() {
  document.title = "AI 工具场景调研报告 · 360 云盘";
  document.body.innerHTML = `
    <div class="app-shell">
      ${commonSidebar()}
      <main class="main">
        <header class="topbar"><div class="breadcrumb"><strong>AI 工具调研报告</strong></div>${primaryNav("report")}<div class="top-actions"><button class="btn" id="printReport">打印报告</button><a class="btn primary" href="index.html">进入工具体验</a></div></header>
        <div class="report-content">
          <div class="demo-banner"><strong>自动评审修订版</strong><span>8 个方向作为产品地图完整保留，生产 MVP 收敛为 3 个 P0 工具与共享可信底座。</span></div>
          <section class="report-hero">
            <div class="report-lead">
              <span class="report-kicker">Autoplan 评审结论 · 2026-07-13</span>
              <h1>云盘可信文件工作台商业化方案</h1>
              <p>产品不再以“增加多少 AI 工具”为目标，而是让已有文件在原权限范围内变成可核验、可交付、可沉淀的工作成果。</p>
              <div class="report-conclusion"><strong>核心结论：</strong>首期聚焦文件夹摘要、多文件问答与财务票据核验。三者共享权限、证据、规则、人工复核、任务审计和结果回存能力；法律、知识治理和教育场景按试点数据扩展。</div>
            </div>
            <div class="report-scoreboard">
              <div class="score-cell"><strong>3</strong><span>首期 P0 工具</span></div>
              <div class="score-cell"><strong>1</strong><span>共享可信底座</span></div>
              <div class="score-cell"><strong>8</strong><span>完整产品方向</span></div>
              <div class="score-cell"><strong>P2</strong><span>外部信息采集与社媒洞察</span></div>
            </div>
          </section>

          <section class="report-section">
            <div class="report-section-head"><div><h2>场景优先级</h2><p>按商业化潜力、云盘关联度与实施难度综合判断</p></div><span class="tag blue">建议顺序</span></div>
            <div class="report-section-body" style="padding:0; overflow-x:auto;">
              <table class="report-table"><thead><tr><th>优先级</th><th>场景方向</th><th>推荐能力</th><th>商业化潜力</th><th>云盘关联</th><th>建议</th></tr></thead><tbody>
                <tr><td><span class="tag red">P0</span></td><td>通用可信处理</td><td>文件夹摘要、多文件问答</td><td>高</td><td>极高</td><td>高频入口与能力底座</td></tr>
                <tr><td><span class="tag red">P0</span></td><td>财务票据核验</td><td>OCR、材料匹配、规则核验、异常分流</td><td>极高</td><td>高</td><td>首个付费验证场景</td></tr>
                <tr><td><span class="tag orange">P1</span></td><td>合同与知识治理</td><td>风险审阅、版本对比、知识入库</td><td>高</td><td>高</td><td>复用可信底座扩展</td></tr>
                <tr><td><span class="tag">P2</span></td><td>教育资料</td><td>课件整理、教案生成、课程资料包</td><td>中高</td><td>高</td><td>按教育试点数据立项</td></tr>
                <tr><td><span class="tag">P2</span></td><td>外部信息获取</td><td>社媒洞察、竞品监控、政策资讯</td><td>中</td><td>中</td><td>仅通过合规连接器探索</td></tr>
              </tbody></table>
            </div>
          </section>

          <section class="report-section">
            <div class="report-section-head"><div><h2>三类重点场景</h2><p>从通用能力到行业付费包逐层扩展</p></div></div>
            <div class="report-section-body"><div class="priority-grid">
              <div class="priority-card"><span class="tag purple">律师 / 法务</span><h3>高风险文档辅助审阅</h3><p>合同数量大、版本多、需要来源可追溯，适合企业高级套餐。</p><ul><li>合同风险审阅</li><li>合同版本对比</li><li>条款与要素提取</li><li>后续可扩展合同台账</li></ul></div>
              <div class="priority-card"><span class="tag blue">教育</span><h3>课程资料加工与复用</h3><p>课件、教案、试卷高度文件化，个人教师和机构均有付费空间。</p><ul><li>课件自动整理</li><li>教案生成</li><li>课程资料包</li><li>后续可扩展试卷解析</li></ul></div>
              <div class="priority-card"><span class="tag green">财务</span><h3>票据识别、匹配与核验</h3><p>从识别字段升级到业务规则核验，是企业版最明确的 ROI 场景。</p><ul><li>票据 OCR</li><li>报销材料核验</li><li>重复与异常检测</li><li>后续可扩展三单匹配</li></ul></div>
            </div></div>
          </section>

          <section class="report-section">
            <div class="report-section-head"><div><h2>8 个产品方向与上线顺序</h2><p>完整展示产品地图，生产范围按可信度与商业验证分期</p></div><a class="btn small primary" href="index.html">查看可用原型</a></div>
            <div class="report-section-body"><div class="roadmap">
              <div class="roadmap-phase"><span class="tag blue">P0 · 6-8 周</span><b>3 个 P0 + 共享可信底座</b><p>验证高频使用、结果可信和首个企业付费闭环。</p><div class="roadmap-tools"><span class="tag">文件夹智能摘要</span><span class="tag">多文件问答</span><span class="tag">财务票据核验</span></div></div>
              <div class="roadmap-phase"><span class="tag green">P1 · 企业扩展</span><b>法务协作与知识治理</b><p>复用证据、规则、人工复核和审计能力。</p><div class="roadmap-tools"><span class="tag">合同风险审阅</span><span class="tag">版本对比</span><span class="tag">知识库一键入库</span></div></div>
              <div class="roadmap-phase"><span class="tag purple">P2 · 行业验证</span><b>教育资料与教学产出</b><p>依据教育客户试点数据验证组织级采购价值。</p><div class="roadmap-tools"><span class="tag">课件整理</span><span class="tag">教案生成</span></div></div>
            </div></div>
          </section>

          <section class="report-section">
            <div class="report-section-head"><div><h2>MVP 与商业化建议</h2><p>6-8 周验证“用户愿意为云盘文件被 AI 自动处理付费”</p></div></div>
            <div class="report-section-body" style="padding:0; overflow-x:auto;"><table class="report-table"><thead><tr><th>套餐</th><th>工具能力</th><th>商业目标</th><th>关键指标</th></tr></thead><tbody>
              <tr><td>免费版</td><td>单文件摘要、OCR 试用、PDF 转换、基础翻译</td><td>拉新与体验</td><td>工具启动率、注册转化</td></tr>
              <tr><td>专业版</td><td>文件夹摘要、多文件问答、批量处理、课件整理、版本对比</td><td>个人付费与留存</td><td>结果保存率、月活跃处理数</td></tr>
              <tr><td>企业版</td><td>票据核验、合同审阅、权限审计、知识入库、团队规则</td><td>组织采购与高客单价</td><td>异常拦截率、知识入库率</td></tr>
            </tbody></table></div>
          </section>
        </div>
      </main>
    </div>`;
  refreshProductIcons();
  document.getElementById("printReport").addEventListener("click", () => window.print());
}

const EXISTING_TOOLS = [
  { group: "推荐应用", icon: "文", name: "AI DOC", desc: "输入主题快速生成文档内容。", tag: "内容生成" },
  { group: "推荐应用", icon: "P", name: "AI PPT", desc: "自动生成 PPT 演示文档。", tag: "内容生成" },
  { group: "推荐应用", icon: "表", name: "AI Excel", desc: "通过聊天处理 Excel 和数据分析。", tag: "数据处理" },
  { group: "推荐应用", icon: "译", name: "文档翻译", desc: "支持多语言文档对比翻译。", tag: "文档处理" },
  { group: "推荐应用", icon: "会", name: "会议纪要", desc: "根据会议音频生成纪要。", tag: "音频处理" },
  { group: "文件流转", icon: "享", name: "分享", desc: "管理发起和收到的全部分享。", tag: "协作" },
  { group: "文件流转", icon: "收", name: "收集", desc: "面向多人高效收集文件。", tag: "协作" },
  { group: "文件流转", icon: "阅", name: "审阅", desc: "支持多节点单人、多人审阅。", tag: "审批" },
  { group: "文件处理", icon: "W", name: "PDF 转 Word", desc: "快速批量将 PDF 转换为 Word。", tag: "格式转换" },
  { group: "文件处理", icon: "P", name: "PDF 转 PPT", desc: "快速批量将 PDF 转换为 PPT。", tag: "格式转换" },
  { group: "文件处理", icon: "X", name: "PDF 转 Excel", desc: "快速批量将 PDF 转换为 Excel。", tag: "格式转换" },
  { group: "文件处理", icon: "图", name: "图片转文字", desc: "智能识别图片中的文字。", tag: "OCR" },
  { group: "文件处理", icon: "音", name: "音频转文字", desc: "快速将语音资料转换为文本。", tag: "转写" },
  { group: "文件处理", icon: "模", name: "文件模板库", desc: "多种办公模板直接使用。", tag: "模板" }
];

function renderExistingCards(group = "全部") {
  const container = document.getElementById("existingSections");
  const groups = group === "全部" ? ["推荐应用", "文件流转", "文件处理"] : [group];
  container.innerHTML = groups.map(name => {
    const items = EXISTING_TOOLS.filter(item => item.group === name);
    return `<section class="existing-section"><div class="existing-section-title"><h2>${name}</h2><span>${items.length} 个已有工具</span></div><div class="existing-card-grid">${items.map(item => `<article class="existing-card"><div class="existing-card-top"><span class="existing-card-icon">${item.icon}</span><span class="tag">${item.tag}</span></div><h3>${item.name}</h3><p>${item.desc}</p><div class="existing-card-foot"><button class="btn ghost small" data-existing-tool="${item.name}">打开工具</button><span>→</span></div></article>`).join("")}</div></section>`;
  }).join("");
  container.querySelectorAll("[data-existing-tool]").forEach(button => button.addEventListener("click", () => showToast(`${button.dataset.existingTool}：已有工具体验入口（演示）`)));
}

function renderExistingTools() {
  document.title = "已有工具 · 360 云盘";
  document.body.innerHTML = `
    <div class="app-shell">
      ${commonSidebar()}
      <main class="main">
        <header class="topbar"><div class="breadcrumb"><strong>已有工具</strong></div>${primaryNav("existing")}<div class="top-actions"><a class="btn" href="report.html">查看调研</a><a class="btn primary" href="index.html">对比新工具</a></div></header>
        <div class="existing-content">
          <div class="comparison-note"><span class="tag blue">对比说明</span><div><strong>已有工具主要解决单次生成、格式转换和文件流转。</strong><p>新规划的 8 个工具进一步处理文件夹、多文件、业务规则和行业任务，承担专业版与企业版商业化。</p></div></div>
          <section class="existing-hero"><div><h1>当前已有工具能力</h1><p>汇总现有 AI 生成、文件流转与格式处理能力，方便与新增的云盘增强、财务、法务和教育工具对比。</p></div><div class="existing-metrics"><div class="hub-metric"><strong>14</strong><span>已有工具</span></div><div class="hub-metric"><strong>3</strong><span>工具类别</span></div><div class="hub-metric"><strong>基础层</strong><span>拉新与活跃</span></div></div></section>
          <div class="existing-filter"><button class="filter-chip active" data-group="全部">全部</button><button class="filter-chip" data-group="推荐应用">推荐应用</button><button class="filter-chip" data-group="文件流转">文件流转</button><button class="filter-chip" data-group="文件处理">文件处理</button></div>
          <div id="existingSections"></div>
        </div>
      </main>
    </div><div class="toast" id="toast"></div>`;
  refreshProductIcons();
  renderExistingCards();
  document.querySelectorAll("[data-group]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-group]").forEach(item => item.classList.toggle("active", item === button));
    renderExistingCards(button.dataset.group);
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "hub") renderHub();
  else if (document.body.dataset.page === "report") renderReport();
  else if (document.body.dataset.page === "existing") renderExistingTools();
  else initToolPage();
});
