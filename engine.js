/* ============================================================
   KodNest Placement Readiness — Analysis Engine  v2.0
   Pure JS, no external APIs, works offline.
   Hardened: standardized schema, validation, edge-case handling.
   ============================================================ */

/* ---------- 1. SKILL DICTIONARY ---------- */
const _CAT_KEY = { 'coreCS': 'coreCS', 'languages': 'languages', 'web': 'web', 'data': 'data', 'cloud': 'cloud', 'testing': 'testing', 'other': 'other' };

const SKILL_MAP = {
    coreCS: ['dsa', 'data structures', 'algorithms', 'oops', 'oop', 'object oriented', 'dbms', 'database management', 'os', 'operating system', 'networks', 'networking', 'computer networks', 'system design'],
    languages: ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'golang', 'go', 'ruby', 'kotlin', 'swift', 'scala', 'rust', 'php'],
    web: ['react', 'reactjs', 'next.js', 'nextjs', 'angular', 'vue', 'vuejs', 'node.js', 'nodejs', 'express', 'expressjs', 'rest', 'restful', 'graphql', 'html', 'css', 'tailwind', 'django', 'flask', 'spring', 'spring boot'],
    data: ['sql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'redis', 'elasticsearch', 'firebase', 'dynamodb', 'cassandra', 'oracle', 'sqlite'],
    cloud: ['aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'cicd', 'jenkins', 'terraform', 'ansible', 'linux', 'nginx', 'devops', 'microservices', 'serverless'],
    testing: ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'jest', 'mocha', 'testing', 'unit test', 'integration test', 'tdd', 'bdd', 'automation testing'],
};

/* Display labels for UI */
const CAT_LABELS = { coreCS: 'Core CS', languages: 'Languages', web: 'Web', data: 'Data', cloud: 'Cloud / DevOps', testing: 'Testing', other: 'Other' };

/* ---------- 2. EXTRACT SKILLS ---------- */
function extractSkills(jdText) {
    const lower = (jdText || '').toLowerCase();
    const result = { coreCS: [], languages: [], web: [], data: [], cloud: [], testing: [], other: [] };
    let anyFound = false;
    for (const [cat, keywords] of Object.entries(SKILL_MAP)) {
        const matched = keywords.filter(k => {
            const re = new RegExp('\\b' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+') + '\\b', 'i');
            return re.test(lower);
        });
        if (matched.length) { result[cat] = [...new Set(matched)]; anyFound = true; }
    }
    /* Fallback: if nothing detected, populate "other" with generic skills */
    if (!anyFound) {
        result.other = ['Communication', 'Problem solving', 'Basic coding', 'Projects'];
    }
    return result;
}

/* ---------- 3. BASE READINESS SCORE ---------- */
function calcBaseScore(company, role, jdText, skills) {
    let s = 35;
    const filledCats = Object.entries(skills).filter(([k, v]) => k !== 'other' && v.length > 0);
    s += Math.min(filledCats.length * 5, 30);
    if (company && company.trim()) s += 10;
    if (role && role.trim()) s += 10;
    if ((jdText || '').length > 800) s += 10;
    return Math.min(s, 100);
}

/* ---------- 4. LIVE / FINAL SCORE ---------- */
function calcFinalScore(baseScore, skillConfidenceMap) {
    if (!skillConfidenceMap || !Object.keys(skillConfidenceMap).length) return baseScore;
    let delta = 0;
    for (const v of Object.values(skillConfidenceMap)) {
        delta += v === 'know' ? 2 : -2;
    }
    return Math.max(0, Math.min(100, baseScore + delta));
}
/* backward-compat alias */
const calcLiveScore = calcFinalScore;

/* ---------- 5. ROUND-WISE CHECKLIST ---------- */
function generateChecklist(skills) {
    const has = (c) => skills[c] && skills[c].length > 0;
    const r1 = ['Review quantitative aptitude basics', 'Practice logical reasoning puzzles', 'Brush up verbal ability & grammar', 'Solve 10 pattern-based questions', 'Review company-specific aptitude format'];
    const r2 = ['Revise arrays, strings, linked lists', 'Practice 5 medium-level DSA problems', 'Review time & space complexity analysis', 'Revise sorting and searching algorithms', 'Study stack, queue, tree, graph basics'];
    if (has('coreCS')) { r2.push('Revise OS: process, threads, scheduling', 'Revise DBMS: normalization, joins, indexing', 'Review networking: TCP/IP, HTTP, DNS'); }
    const r3 = ['Prepare 2-minute project walkthrough', 'Practice explaining architecture decisions', 'Review system design basics (if applicable)'];
    if (has('web')) r3.push('Review React/Node.js lifecycle & hooks', 'Prepare REST API design explanation', 'Review frontend performance optimization');
    if (has('data')) r3.push('Practice SQL joins & subqueries live', 'Explain database indexing strategy');
    if (has('cloud')) r3.push('Review Docker basics & container lifecycle', 'Explain CI/CD pipeline you have used');
    if (has('languages')) r3.push('Review OOP concepts in your primary language', 'Prepare code walkthrough of best project');
    if (has('testing')) r3.push('Explain your testing strategy & tools', 'Review unit vs integration vs e2e testing');
    if (has('other') && !has('coreCS') && !has('languages')) {
        r3.push('Prepare a clear walkthrough of any personal project', 'Review basic problem-solving approaches');
    }
    const r4 = ['Prepare "Tell me about yourself" (2 min)', 'Practice STAR method for behavioral Qs', 'Prepare salary/notice period expectations', 'Research company values and mission', 'Prepare 3 thoughtful questions for interviewer', 'Practice "Why this company?" answer', 'Review strengths & weaknesses framing'];
    return [
        { roundTitle: 'Round 1: Aptitude & Basics', items: r1 },
        { roundTitle: 'Round 2: DSA & Core CS', items: r2 },
        { roundTitle: 'Round 3: Technical Interview', items: r3 },
        { roundTitle: 'Round 4: HR & Managerial', items: r4 },
    ];
}

/* ---------- 6. 7-DAY PLAN ---------- */
function generatePlan(skills) {
    const has = (c) => skills[c] && skills[c].length > 0;
    const plan = [
        { day: 'Day 1', focus: 'Foundations', tasks: ['Review core CS fundamentals (OS, DBMS, Networks)', 'Revise OOP concepts with examples', 'Practice 5 easy aptitude questions', 'Read about the company and role'] },
        { day: 'Day 2', focus: 'Core CS Deep Dive', tasks: ['Study DBMS normalization & SQL queries', 'Review OS scheduling & memory management', 'Practice networking concepts (TCP, HTTP)', 'Solve 3 previous year aptitude sets'] },
        { day: 'Day 3', focus: 'DSA - Part 1', tasks: ['Arrays & strings: solve 5 medium problems', 'Linked lists: reversal, cycle detection', 'Stack & queue: implement and solve 3 problems', 'Review time complexity of common operations'] },
        { day: 'Day 4', focus: 'DSA - Part 2', tasks: ['Trees: traversals, BST operations', 'Graphs: BFS, DFS, shortest path', 'Dynamic programming: 3 classic problems', 'Practice coding under 30-min time pressure'] },
        { day: 'Day 5', focus: 'Project & Resume', tasks: ['Prepare 2-minute walkthrough of best project', 'Align resume keywords with job description', 'Review system design basics if applicable', 'Prepare "Why this role?" answer'] },
        { day: 'Day 6', focus: 'Mock Interview', tasks: ['Practice 10 likely interview questions aloud', 'Do a timed coding round (2 problems, 40 min)', 'Practice behavioral answers using STAR method', 'Review weak areas from practice sessions'] },
        { day: 'Day 7', focus: 'Revision & Confidence', tasks: ['Revisit weak topics from Day 1-6', 'Quick review of all key formulas & patterns', 'Light practice: 2 easy problems for confidence', 'Prepare questions to ask the interviewer', 'Rest well — no heavy studying'] },
    ];
    if (has('web')) { plan[4].tasks.splice(2, 0, 'Review React/frontend concepts for discussion'); plan[5].tasks.splice(1, 0, 'Practice explaining REST API design'); }
    if (has('data')) { plan[1].tasks.splice(1, 0, 'Practice complex SQL joins & window functions'); }
    if (has('cloud')) { plan[4].tasks.splice(2, 0, 'Review Docker/CI-CD pipeline for discussion'); }
    if (has('testing')) { plan[5].tasks.splice(2, 0, 'Review testing strategies and tools used'); }
    if (has('other') && !has('coreCS') && !has('languages') && !has('web')) {
        plan[0].tasks.splice(0, 0, 'Focus on communication and problem-solving fundamentals');
        plan[2].tasks.splice(0, 0, 'Practice basic coding problems (arrays, strings, loops)');
    }
    return plan;
}

/* ---------- 7. INTERVIEW QUESTIONS ---------- */
const Q_BANK = {
    coreCS: ['Explain the difference between process and thread.', 'What is deadlock and how can it be prevented?', 'Explain normalization forms in DBMS with examples.', 'What are ACID properties in databases?', 'Describe how DNS resolution works step by step.', 'What is virtual memory and why is it needed?', 'Explain different CPU scheduling algorithms.', 'What is the difference between TCP and UDP?'],
    languages: ['Explain OOP principles with real-world examples.', 'What is the difference between abstract class and interface?', 'How does garbage collection work in your primary language?', 'Explain method overloading vs overriding.', 'What are generics and why are they useful?', 'Describe exception handling best practices.', 'What is the difference between stack and heap memory?'],
    web: ['Explain the React component lifecycle.', 'What is the virtual DOM and how does it improve performance?', 'How do you manage state in a large React application?', 'Explain RESTful API design principles.', 'What is the difference between SSR and CSR?', 'How would you optimize a slow-loading web page?', 'Explain CORS and how to handle it.', 'What is middleware in Express/Node.js?'],
    data: ['Explain database indexing and when it helps.', 'What is the difference between SQL and NoSQL databases?', 'Write a query to find the second highest salary.', 'Explain joins: INNER, LEFT, RIGHT, FULL.', 'What is database sharding and when would you use it?', 'Explain ACID vs BASE consistency models.', 'How would you optimize a slow SQL query?'],
    cloud: ['What is a Docker container vs a virtual machine?', 'Explain the CI/CD pipeline you have worked with.', 'What are the benefits of microservices architecture?', 'How does Kubernetes orchestrate containers?', 'Explain auto-scaling in cloud environments.', 'What is Infrastructure as Code?', 'Describe your experience with cloud services (AWS/Azure/GCP).'],
    testing: ['What is the testing pyramid?', 'Explain the difference between unit, integration, and e2e tests.', 'How do you decide what to test and what to skip?', 'What is TDD and what are its benefits?', 'How would you test an API endpoint?', 'Explain mocking and stubbing with examples.'],
    other: ['Tell me about a challenging problem you solved.', 'How do you approach learning a new technology?', 'Explain a project you are most proud of.', 'What is your approach to debugging?', 'How do you handle tight deadlines?', 'Describe your understanding of software development lifecycle.', 'What data structures would you use for a search feature?', 'How would you design a URL shortener?', 'Explain Big O notation with examples.', 'What motivates you to pursue this role?'],
};

function generateQuestions(skills) {
    const qs = [];
    for (const [cat, tags] of Object.entries(skills)) {
        if (!tags.length) continue;
        const pool = Q_BANK[cat] || Q_BANK.other;
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        qs.push(...shuffled.slice(0, 3).map(q => ({ category: CAT_LABELS[cat] || cat, question: q })));
    }
    const general = [...Q_BANK.other].sort(() => Math.random() - 0.5);
    for (const q of general) { if (qs.length >= 10) break; if (!qs.find(x => x.question === q)) qs.push({ category: 'General', question: q }); }
    return qs.slice(0, 10);
}

/* ---------- 8. COMPANY INTEL ---------- */
const KNOWN_ENTERPRISE = ['google', 'amazon', 'microsoft', 'meta', 'apple', 'netflix', 'flipkart', 'walmart', 'oracle', 'ibm', 'sap', 'adobe', 'salesforce', 'infosys', 'tcs', 'wipro', 'hcl', 'cognizant', 'accenture', 'capgemini', 'deloitte', 'ey', 'kpmg', 'pwc', 'mindtree', 'mphasis', 'ltimindtree', 'tech mahindra', 'zoho', 'freshworks', 'paytm', 'razorpay', 'phonepe', 'cred', 'swiggy', 'zomato', 'ola', 'uber', 'atlassian', 'intuit', 'goldman sachs', 'morgan stanley', 'jpmorgan', 'barclays', 'deutsche bank', 'samsung', 'qualcomm', 'intel', 'nvidia', 'vmware', 'cisco', 'dell', 'hp', 'lenovo', 'bytedance', 'tiktok', 'spotify', 'twitter', 'snap', 'linkedin', 'airbnb', 'stripe', 'shopify', 'paypal', 'visa', 'mastercard'];

function inferCompanyIntel(company, skills) {
    const cl = (company || '').toLowerCase().trim();
    if (!cl) return null;
    let size = 'Startup';
    if (KNOWN_ENTERPRISE.some(e => cl.includes(e))) size = 'Enterprise';
    else if (cl.length > 3 && /tech|solutions|systems|software|labs|services|global|group|digital/i.test(cl)) size = 'Mid-size';
    let industry = 'Technology Services';
    if (/bank|financ|capital|invest|pay|money/i.test(cl)) industry = 'Financial Services';
    else if (/health|med|pharma|care/i.test(cl)) industry = 'Healthcare & Life Sciences';
    else if (/ecom|shop|retail|mart|cart|store/i.test(cl)) industry = 'E-commerce & Retail';
    else if (/food|swiggy|zomato|delivery/i.test(cl)) industry = 'Food & Logistics';
    else if (/game|entertain|media|stream|spotify|netflix/i.test(cl)) industry = 'Media & Entertainment';
    else if (/consult|deloitte|ey|kpmg|pwc|accenture|capgemini/i.test(cl)) industry = 'IT Consulting';
    else if (/google|microsoft|meta|apple|amazon|oracle|adobe|sap/i.test(cl)) industry = 'Big Tech / Product';
    let hiringFocus;
    if (size === 'Enterprise') hiringFocus = 'Structured process: online aptitude + DSA coding rounds, followed by core computer science fundamentals, project walkthrough, and HR. Emphasis on algorithmic thinking and scalable problem-solving.';
    else if (size === 'Mid-size') hiringFocus = 'Balanced process: technical coding round, stack-specific discussion, and cultural fit. Values both fundamentals and practical experience.';
    else hiringFocus = 'Practical and fast-paced: focus on real-world problem solving, stack depth, shipping speed, and cultural alignment. Less emphasis on theoretical CS, more on what you can build.';
    return { company: company.trim(), size, industry, hiringFocus };
}

/* ---------- 9. ROUND MAPPING ENGINE ---------- */
function generateRoundMap(companyIntel, skills) {
    const has = (c) => skills[c] && skills[c].length > 0;
    const size = companyIntel ? companyIntel.size : 'Startup';
    if (size === 'Enterprise') {
        const rounds = [
            { roundTitle: 'Round 1: Online Assessment', focusAreas: ['Aptitude', 'DSA coding (timed)'], whyItMatters: 'Screens for logical thinking and coding speed under pressure. Most enterprise companies use this as the first filter to handle high applicant volume.' },
            { roundTitle: 'Round 2: Technical — DSA & Core CS', focusAreas: has('coreCS') ? ['Data structures', 'Algorithms', 'OS', 'DBMS', 'Networking'] : ['Data structures', 'Algorithms', 'Problem decomposition'], whyItMatters: 'Tests your ability to think algorithmically and apply CS fundamentals. Interviewers evaluate your approach, not just the answer.' },
            { roundTitle: 'Round 3: Technical — Projects & Stack', focusAreas: ['Project deep dive', 'Architecture choices'].concat(has('web') ? ['Frontend/backend stack'] : []).concat(has('cloud') ? ['Cloud & DevOps experience'] : []), whyItMatters: 'Validates that you can build real systems and make sound engineering decisions. Expect "why did you choose X?" style questions.' },
            { roundTitle: 'Round 4: HR & Managerial', focusAreas: ['Behavioral', 'Cultural fit', 'Career goals'], whyItMatters: 'Assesses communication, teamwork, and alignment with company values. Keep answers structured (use STAR method) and authentic.' },
        ];
        if (has('data')) rounds.splice(2, 0, { roundTitle: 'Round 2.5: SQL & Data', focusAreas: ['Live SQL queries', 'Database design'], whyItMatters: 'For data-heavy roles, companies test your ability to write efficient queries and reason about data relationships.' });
        return rounds;
    }
    if (size === 'Mid-size') {
        return [
            { roundTitle: 'Round 1: Technical Screen', focusAreas: ['Coding', 'CS fundamentals (60 min)'], whyItMatters: 'Combined round testing both coding fluency and foundational knowledge. Mid-size companies optimize for fewer, more comprehensive rounds.' },
            { roundTitle: 'Round 2: Stack Deep-Dive', focusAreas: has('web') ? ['Web technologies', 'API design'] : has('data') ? ['Data layer', 'Queries', 'Schema'] : ['Primary tech stack'], whyItMatters: 'Evaluates how deeply you understand the tools you will use daily. Be ready to explain trade-offs and real scenarios.' },
            { roundTitle: 'Round 3: Culture + Managerial', focusAreas: ['Team fit', 'Communication', 'Growth mindset'], whyItMatters: 'Smaller teams mean each hire matters more. They look for adaptability, collaboration skills, and genuine interest in the domain.' },
        ];
    }
    /* Startup */
    return [
        { roundTitle: 'Round 1: Practical Coding', focusAreas: ['Build a feature', 'Debug task', 'Live coding'].concat(has('web') ? ['(likely frontend/fullstack)'] : []), whyItMatters: 'Startups value shipping speed. This round tests if you can translate requirements into working code quickly and pragmatically.' },
        { roundTitle: 'Round 2: System & Design Discussion', focusAreas: ['Architecture thinking', 'Trade-offs', 'Scaling'].concat(has('cloud') ? ['Deployment strategy'] : []), whyItMatters: 'Even at a startup, they need engineers who think beyond code — about scale, maintainability, and system boundaries.' },
        { roundTitle: 'Round 3: Culture Fit & Founder Chat', focusAreas: ['Values', 'Ownership', 'Ambiguity tolerance'], whyItMatters: 'Startup teams are small and intense. They need people who take ownership, communicate directly, and thrive with less structure.' },
    ];
}

/* ---------- 10. FULL ANALYSIS (standardized schema) ---------- */
function runAnalysis(company, role, jdText) {
    const skills = extractSkills(jdText);
    const baseScore = calcBaseScore(company, role, jdText, skills);
    const checklist = generateChecklist(skills);
    const plan7Days = generatePlan(skills);
    const questions = generateQuestions(skills);
    const companyIntel = inferCompanyIntel(company, skills);
    const roundMapping = generateRoundMap(companyIntel, skills);
    const allSkills = Object.values(skills).flat();
    const skillConfidenceMap = Object.fromEntries(allSkills.map(s => [s, 'practice']));
    const finalScore = calcFinalScore(baseScore, skillConfidenceMap);
    const now = new Date().toISOString();

    return {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        createdAt: now,
        updatedAt: now,
        company: (company || '').trim(),
        role: (role || '').trim(),
        jdText: jdText || '',
        extractedSkills: skills,
        roundMapping,
        checklist,
        plan7Days,
        questions,
        baseScore,
        skillConfidenceMap,
        finalScore,
        companyIntel,
    };
}

/* ---------- 11. LOCAL STORAGE (robust) ---------- */
const STORAGE_KEY = 'kodnest_analysis_history';
let _corruptedCount = 0;

function loadHistory() {
    _corruptedCount = 0;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const arr = JSON.parse(raw);
        if (!Array.isArray(arr)) return [];
        const valid = [];
        for (const e of arr) {
            if (_isValidEntry(e)) {
                valid.push(_migrateEntry(e));
            } else {
                _corruptedCount++;
            }
        }
        return valid;
    } catch {
        _corruptedCount = 1;
        return [];
    }
}
function getCorruptedCount() { return _corruptedCount; }

function _isValidEntry(e) {
    return e && typeof e === 'object' && typeof e.id === 'string' && typeof e.createdAt === 'string';
}

/* Migrate old-format entries to new schema */
function _migrateEntry(e) {
    /* Skills migration: old keys → new keys */
    if (e.extractedSkills) {
        const sk = e.extractedSkills;
        const migrated = {
            coreCS: sk.coreCS || sk['Core CS'] || [],
            languages: sk.languages || sk['Languages'] || [],
            web: sk.web || sk['Web'] || [],
            data: sk.data || sk['Data'] || [],
            cloud: sk.cloud || sk['Cloud/DevOps'] || [],
            testing: sk.testing || sk['Testing'] || [],
            other: sk.other || sk['General'] || [],
        };
        e.extractedSkills = migrated;
    } else {
        e.extractedSkills = { coreCS: [], languages: [], web: [], data: [], cloud: [], testing: [], other: [] };
    }

    /* Checklist migration: round → roundTitle */
    if (e.checklist && Array.isArray(e.checklist)) {
        e.checklist = e.checklist.map(r => ({
            roundTitle: r.roundTitle || r.round || '',
            items: r.items || [],
        }));
    } else { e.checklist = []; }

    /* Plan migration: plan → plan7Days, title → focus */
    if (!e.plan7Days && e.plan) { e.plan7Days = e.plan; delete e.plan; }
    if (e.plan7Days && Array.isArray(e.plan7Days)) {
        e.plan7Days = e.plan7Days.map(d => ({
            day: d.day || '',
            focus: d.focus || d.title || '',
            tasks: d.tasks || [],
        }));
    } else { e.plan7Days = []; }

    /* Round mapping migration */
    if (!e.roundMapping && e.roundMap) { e.roundMapping = e.roundMap; delete e.roundMap; }
    if (e.roundMapping && Array.isArray(e.roundMapping)) {
        e.roundMapping = e.roundMapping.map(r => ({
            roundTitle: r.roundTitle || r.round || '',
            focusAreas: r.focusAreas || (r.desc ? [r.desc] : []),
            whyItMatters: r.whyItMatters || r.why || '',
        }));
    } else { e.roundMapping = []; }

    /* Score migration */
    if (e.baseScore === undefined) {
        e.baseScore = e.readinessScore || 35;
    }
    if (!e.skillConfidenceMap) {
        const allSkills = Object.values(e.extractedSkills).flat();
        e.skillConfidenceMap = Object.fromEntries(allSkills.map(s => [s, 'practice']));
    }
    if (e.finalScore === undefined) {
        e.finalScore = calcFinalScore(e.baseScore, e.skillConfidenceMap);
    }
    if (!e.updatedAt) e.updatedAt = e.createdAt;
    if (!e.company) e.company = '';
    if (!e.role) e.role = '';
    if (!e.jdText) e.jdText = '';
    if (!e.questions) e.questions = [];

    return e;
}

function saveToHistory(entry) {
    const h = loadHistory();
    h.unshift(entry);
    if (h.length > 50) h.length = 50;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(h));
}
function getHistoryEntry(id) { return loadHistory().find(e => e.id === id) || null; }
function deleteHistoryEntry(id) { const h = loadHistory().filter(e => e.id !== id); localStorage.setItem(STORAGE_KEY, JSON.stringify(h)); }
function updateHistoryEntry(id, updates) {
    const h = loadHistory();
    const idx = h.findIndex(e => e.id === id);
    if (idx === -1) return;
    h[idx] = { ...h[idx], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(h));
}

/* ---------- 12. EXPORT FORMATTERS ---------- */
function formatPlanText(plan7Days) {
    return (plan7Days || []).map(d => d.day + ': ' + d.focus + '\n' + d.tasks.map(t => '  • ' + t).join('\n')).join('\n\n');
}
function formatChecklistText(checklist) {
    return (checklist || []).map(r => r.roundTitle + '\n' + r.items.map(i => '  ☐ ' + i).join('\n')).join('\n\n');
}
function formatQuestionsText(questions) {
    return (questions || []).map((q, i) => (i + 1) + '. [' + (q.category || 'General') + '] ' + q.question).join('\n');
}
function formatFullExport(result, confidenceMap) {
    const live = calcFinalScore(result.baseScore, confidenceMap || result.skillConfidenceMap);
    let txt = '=== PLACEMENT READINESS ANALYSIS ===\n';
    txt += 'Company: ' + (result.company || 'N/A') + '\n';
    txt += 'Role: ' + (result.role || 'N/A') + '\n';
    txt += 'Readiness Score: ' + live + '/100\n';
    txt += 'Analyzed: ' + new Date(result.createdAt).toLocaleString() + '\n\n';
    txt += '--- KEY SKILLS ---\n';
    for (const [cat, tags] of Object.entries(result.extractedSkills)) {
        if (tags.length) txt += (CAT_LABELS[cat] || cat) + ': ' + tags.join(', ') + '\n';
    }
    if (confidenceMap) {
        txt += '\nConfident: ' + Object.entries(confidenceMap).filter(([, v]) => v === 'know').map(([k]) => k).join(', ');
        txt += '\nNeed Practice: ' + Object.entries(confidenceMap).filter(([, v]) => v === 'practice').map(([k]) => k).join(', ');
    }
    txt += '\n\n--- 7-DAY PLAN ---\n' + formatPlanText(result.plan7Days);
    txt += '\n\n--- ROUND-WISE CHECKLIST ---\n' + formatChecklistText(result.checklist);
    txt += '\n\n--- INTERVIEW QUESTIONS ---\n' + formatQuestionsText(result.questions);
    txt += '\n\n=== Generated by KodNest Placement Readiness Platform ===\n';
    return txt;
}
