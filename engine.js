/* ============================================================
   KodNest Placement Readiness — Analysis Engine
   Pure JS, no external APIs, works offline.
   ============================================================ */

/* ---------- 1. SKILL DICTIONARY ---------- */
const SKILL_MAP = {
    'Core CS': ['dsa', 'data structures', 'algorithms', 'oops', 'oop', 'object oriented', 'dbms', 'database management', 'os', 'operating system', 'networks', 'networking', 'computer networks', 'system design'],
    'Languages': ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'golang', 'go', 'ruby', 'kotlin', 'swift', 'scala', 'rust', 'php'],
    'Web': ['react', 'reactjs', 'next.js', 'nextjs', 'angular', 'vue', 'vuejs', 'node.js', 'nodejs', 'express', 'expressjs', 'rest', 'restful', 'graphql', 'html', 'css', 'tailwind', 'django', 'flask', 'spring', 'spring boot'],
    'Data': ['sql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'redis', 'elasticsearch', 'firebase', 'dynamodb', 'cassandra', 'oracle', 'sqlite'],
    'Cloud/DevOps': ['aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'cicd', 'jenkins', 'terraform', 'ansible', 'linux', 'nginx', 'devops', 'microservices', 'serverless'],
    'Testing': ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'jest', 'mocha', 'testing', 'unit test', 'integration test', 'tdd', 'bdd', 'automation testing'],
};

/* ---------- 2. EXTRACT SKILLS ---------- */
function extractSkills(jdText) {
    const lower = (jdText || '').toLowerCase();
    const result = {};
    let anyFound = false;
    for (const [cat, keywords] of Object.entries(SKILL_MAP)) {
        const matched = keywords.filter(k => {
            const re = new RegExp('\\b' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+') + '\\b', 'i');
            return re.test(lower);
        });
        if (matched.length) { result[cat] = [...new Set(matched)]; anyFound = true; }
    }
    if (!anyFound) result['General'] = ['general fresher stack'];
    return result;
}

/* ---------- 3. READINESS SCORE ---------- */
function calcReadinessScore(company, role, jdText, skills) {
    let s = 35;
    const cats = Object.keys(skills).filter(k => k !== 'General');
    s += Math.min(cats.length * 5, 30);
    if (company && company.trim()) s += 10;
    if (role && role.trim()) s += 10;
    if ((jdText || '').length > 800) s += 10;
    return Math.min(s, 100);
}

/* ---------- 4. ROUND-WISE CHECKLIST ---------- */
function generateChecklist(skills) {
    const cats = Object.keys(skills);
    const has = (c) => cats.includes(c);
    const r1 = ['Review quantitative aptitude basics', 'Practice logical reasoning puzzles', 'Brush up verbal ability & grammar', 'Solve 10 pattern-based questions', 'Review company-specific aptitude format'];
    const r2 = ['Revise arrays, strings, linked lists', 'Practice 5 medium-level DSA problems', 'Review time & space complexity analysis', 'Revise sorting and searching algorithms', 'Study stack, queue, tree, graph basics'];
    if (has('Core CS')) { r2.push('Revise OS: process, threads, scheduling', 'Revise DBMS: normalization, joins, indexing', 'Review networking: TCP/IP, HTTP, DNS'); }
    const r3 = ['Prepare 2-minute project walkthrough', 'Practice explaining architecture decisions', 'Review system design basics (if applicable)'];
    if (has('Web')) r3.push('Review React/Node.js lifecycle & hooks', 'Prepare REST API design explanation', 'Review frontend performance optimization');
    if (has('Data')) r3.push('Practice SQL joins & subqueries live', 'Explain database indexing strategy');
    if (has('Cloud/DevOps')) r3.push('Review Docker basics & container lifecycle', 'Explain CI/CD pipeline you have used');
    if (has('Languages')) r3.push('Review OOP concepts in your primary language', 'Prepare code walkthrough of best project');
    if (has('Testing')) r3.push('Explain your testing strategy & tools', 'Review unit vs integration vs e2e testing');
    const r4 = ['Prepare "Tell me about yourself" (2 min)', 'Practice STAR method for behavioral Qs', 'Prepare salary/notice period expectations', 'Research company values and mission', 'Prepare 3 thoughtful questions for interviewer', 'Practice "Why this company?" answer', 'Review strengths & weaknesses framing'];
    return [
        { round: 'Round 1: Aptitude & Basics', items: r1 },
        { round: 'Round 2: DSA & Core CS', items: r2 },
        { round: 'Round 3: Technical Interview', items: r3 },
        { round: 'Round 4: HR & Managerial', items: r4 },
    ];
}

/* ---------- 5. 7-DAY PLAN ---------- */
function generatePlan(skills) {
    const cats = Object.keys(skills);
    const has = (c) => cats.includes(c);
    const plan = [
        { day: 'Day 1', title: 'Foundations', tasks: ['Review core CS fundamentals (OS, DBMS, Networks)', 'Revise OOP concepts with examples', 'Practice 5 easy aptitude questions', 'Read about the company and role'] },
        { day: 'Day 2', title: 'Core CS Deep Dive', tasks: ['Study DBMS normalization & SQL queries', 'Review OS scheduling & memory management', 'Practice networking concepts (TCP, HTTP)', 'Solve 3 previous year aptitude sets'] },
        { day: 'Day 3', title: 'DSA - Part 1', tasks: ['Arrays & strings: solve 5 medium problems', 'Linked lists: reversal, cycle detection', 'Stack & queue: implement and solve 3 problems', 'Review time complexity of common operations'] },
        { day: 'Day 4', title: 'DSA - Part 2', tasks: ['Trees: traversals, BST operations', 'Graphs: BFS, DFS, shortest path', 'Dynamic programming: 3 classic problems', 'Practice coding under 30-min time pressure'] },
        { day: 'Day 5', title: 'Project & Resume', tasks: ['Prepare 2-minute walkthrough of best project', 'Align resume keywords with job description', 'Review system design basics if applicable', 'Prepare "Why this role?" answer'] },
        { day: 'Day 6', title: 'Mock Interview', tasks: ['Practice 10 likely interview questions aloud', 'Do a timed coding round (2 problems, 40 min)', 'Practice behavioral answers using STAR method', 'Review weak areas from practice sessions'] },
        { day: 'Day 7', title: 'Revision & Confidence', tasks: ['Revisit weak topics from Day 1-6', 'Quick review of all key formulas & patterns', 'Light practice: 2 easy problems for confidence', 'Prepare questions to ask the interviewer', 'Rest well — no heavy studying'] },
    ];
    if (has('Web')) { plan[4].tasks.splice(2, 0, 'Review React/frontend concepts for discussion'); plan[5].tasks.splice(1, 0, 'Practice explaining REST API design'); }
    if (has('Data')) { plan[1].tasks.splice(1, 0, 'Practice complex SQL joins & window functions'); }
    if (has('Cloud/DevOps')) { plan[4].tasks.splice(2, 0, 'Review Docker/CI-CD pipeline for discussion'); }
    if (has('Testing')) { plan[5].tasks.splice(2, 0, 'Review testing strategies and tools used'); }
    return plan;
}

/* ---------- 6. INTERVIEW QUESTIONS ---------- */
const Q_BANK = {
    'Core CS': ['Explain the difference between process and thread.', 'What is deadlock and how can it be prevented?', 'Explain normalization forms in DBMS with examples.', 'What are ACID properties in databases?', 'Describe how DNS resolution works step by step.', 'What is virtual memory and why is it needed?', 'Explain different CPU scheduling algorithms.', 'What is the difference between TCP and UDP?'],
    'Languages': ['Explain OOP principles with real-world examples.', 'What is the difference between abstract class and interface?', 'How does garbage collection work in your primary language?', 'Explain method overloading vs overriding.', 'What are generics and why are they useful?', 'Describe exception handling best practices.', 'What is the difference between stack and heap memory?'],
    'Web': ['Explain the React component lifecycle.', 'What is the virtual DOM and how does it improve performance?', 'How do you manage state in a large React application?', 'Explain RESTful API design principles.', 'What is the difference between SSR and CSR?', 'How would you optimize a slow-loading web page?', 'Explain CORS and how to handle it.', 'What is middleware in Express/Node.js?'],
    'Data': ['Explain database indexing and when it helps.', 'What is the difference between SQL and NoSQL databases?', 'Write a query to find the second highest salary.', 'Explain joins: INNER, LEFT, RIGHT, FULL.', 'What is database sharding and when would you use it?', 'Explain ACID vs BASE consistency models.', 'How would you optimize a slow SQL query?'],
    'Cloud/DevOps': ['What is a Docker container vs a virtual machine?', 'Explain the CI/CD pipeline you have worked with.', 'What are the benefits of microservices architecture?', 'How does Kubernetes orchestrate containers?', 'Explain auto-scaling in cloud environments.', 'What is Infrastructure as Code?', 'Describe your experience with cloud services (AWS/Azure/GCP).'],
    'Testing': ['What is the testing pyramid?', 'Explain the difference between unit, integration, and e2e tests.', 'How do you decide what to test and what to skip?', 'What is TDD and what are its benefits?', 'How would you test an API endpoint?', 'Explain mocking and stubbing with examples.'],
    'General': ['Tell me about a challenging problem you solved.', 'How do you approach learning a new technology?', 'Explain a project you are most proud of.', 'What is your approach to debugging?', 'How do you handle tight deadlines?', 'Describe your understanding of software development lifecycle.', 'What data structures would you use for a search feature?', 'How would you design a URL shortener?', 'Explain Big O notation with examples.', 'What motivates you to pursue this role?'],
};

function generateQuestions(skills) {
    const qs = [];
    for (const cat of Object.keys(skills)) {
        const pool = Q_BANK[cat] || Q_BANK['General'];
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        qs.push(...shuffled.slice(0, 3).map(q => ({ category: cat, question: q })));
    }
    const general = [...Q_BANK['General']].sort(() => Math.random() - 0.5);
    for (const q of general) { if (qs.length >= 10) break; if (!qs.find(x => x.question === q)) qs.push({ category: 'General', question: q }); }
    return qs.slice(0, 10);
}

/* ---------- 7. COMPANY INTEL ---------- */
const KNOWN_ENTERPRISE = ['google', 'amazon', 'microsoft', 'meta', 'apple', 'netflix', 'flipkart', 'walmart', 'oracle', 'ibm', 'sap', 'adobe', 'salesforce', 'infosys', 'tcs', 'wipro', 'hcl', 'cognizant', 'accenture', 'capgemini', 'deloitte', 'ey', 'kpmg', 'pwc', 'mindtree', 'mphasis', 'ltimindtree', 'tech mahindra', 'zoho', 'freshworks', 'paytm', 'razorpay', 'phonepe', 'cred', 'swiggy', 'zomato', 'ola', 'uber', 'atlassian', 'intuit', 'goldman sachs', 'morgan stanley', 'jpmorgan', 'barclays', 'deutsche bank', 'samsung', 'qualcomm', 'intel', 'nvidia', 'vmware', 'cisco', 'dell', 'hp', 'lenovo', 'bytedance', 'tiktok', 'spotify', 'twitter', 'snap', 'linkedin', 'airbnb', 'stripe', 'shopify', 'paypal', 'visa', 'mastercard'];

function inferCompanyIntel(company, skills) {
    const cl = (company || '').toLowerCase().trim();
    if (!cl) return null;

    /* Size */
    let size = 'Startup';
    if (KNOWN_ENTERPRISE.some(e => cl.includes(e))) size = 'Enterprise';
    else if (cl.length > 3 && /tech|solutions|systems|software|labs|services|global|group|digital/i.test(cl)) size = 'Mid-size';

    /* Industry */
    let industry = 'Technology Services';
    if (/bank|financ|capital|invest|pay|money/i.test(cl)) industry = 'Financial Services';
    else if (/health|med|pharma|care/i.test(cl)) industry = 'Healthcare & Life Sciences';
    else if (/ecom|shop|retail|mart|cart|store/i.test(cl)) industry = 'E-commerce & Retail';
    else if (/food|swiggy|zomato|delivery/i.test(cl)) industry = 'Food & Logistics';
    else if (/game|entertain|media|stream|spotify|netflix/i.test(cl)) industry = 'Media & Entertainment';
    else if (/consult|deloitte|ey|kpmg|pwc|accenture|capgemini/i.test(cl)) industry = 'IT Consulting';
    else if (/google|microsoft|meta|apple|amazon|oracle|adobe|sap/i.test(cl)) industry = 'Big Tech / Product';

    /* Hiring focus */
    let hiringFocus;
    if (size === 'Enterprise') {
        hiringFocus = 'Structured process: online aptitude + DSA coding rounds, followed by core computer science fundamentals, project walkthrough, and HR. Emphasis on algorithmic thinking and scalable problem-solving.';
    } else if (size === 'Mid-size') {
        hiringFocus = 'Balanced process: technical coding round, stack-specific discussion, and cultural fit. Values both fundamentals and practical experience.';
    } else {
        hiringFocus = 'Practical and fast-paced: focus on real-world problem solving, stack depth, shipping speed, and cultural alignment. Less emphasis on theoretical CS, more on what you can build.';
    }

    return { company: company.trim(), size, industry, hiringFocus };
}

/* ---------- 8. ROUND MAPPING ENGINE ---------- */
function generateRoundMap(companyIntel, skills) {
    const cats = Object.keys(skills);
    const has = (c) => cats.includes(c);
    const size = companyIntel ? companyIntel.size : 'Startup';

    if (size === 'Enterprise') {
        const rounds = [
            { round: 'Round 1: Online Assessment', desc: 'Aptitude + DSA coding (timed)', why: 'Screens for logical thinking and coding speed under pressure. Most enterprise companies use this as the first filter to handle high applicant volume.' },
            { round: 'Round 2: Technical — DSA & Core CS', desc: has('Core CS') ? 'Data structures, algorithms, OS, DBMS, networking' : 'Data structures, algorithms, problem decomposition', why: 'Tests your ability to think algorithmically and apply CS fundamentals. Interviewers evaluate your approach, not just the answer.' },
            { round: 'Round 3: Technical — Projects & Stack', desc: 'Deep dive into projects, architecture choices' + (has('Web') ? ', frontend/backend stack' : '') + (has('Cloud/DevOps') ? ', cloud & DevOps experience' : ''), why: 'Validates that you can build real systems and make sound engineering decisions. Expect "why did you choose X?" style questions.' },
            { round: 'Round 4: HR & Managerial', desc: 'Behavioral, cultural fit, career goals', why: 'Assesses communication, teamwork, and alignment with company values. Keep answers structured (use STAR method) and authentic.' },
        ];
        if (has('Data')) rounds.splice(2, 0, { round: 'Round 2.5: SQL & Data', desc: 'Live SQL queries, database design discussion', why: 'For data-heavy roles, companies test your ability to write efficient queries and reason about data relationships.' });
        return rounds;
    }

    if (size === 'Mid-size') {
        return [
            { round: 'Round 1: Technical Screen', desc: 'Coding + CS fundamentals (60 min)', why: 'Combined round testing both coding fluency and foundational knowledge. Mid-size companies optimize for fewer, more comprehensive rounds.' },
            { round: 'Round 2: Stack Deep-Dive', desc: 'Detailed discussion on ' + (has('Web') ? 'web technologies, API design' : has('Data') ? 'data layer, queries, schema' : 'primary tech stack'), why: 'Evaluates how deeply you understand the tools you will use daily. Be ready to explain trade-offs and real scenarios.' },
            { round: 'Round 3: Culture + Managerial', desc: 'Team fit, communication, growth mindset', why: 'Smaller teams mean each hire matters more. They look for adaptability, collaboration skills, and genuine interest in the domain.' },
        ];
    }

    /* Startup */
    const rounds = [
        { round: 'Round 1: Practical Coding', desc: 'Build something real — small feature, debug task, or live coding' + (has('Web') ? ' (likely frontend/fullstack)' : ''), why: 'Startups value shipping speed. This round tests if you can translate requirements into working code quickly and pragmatically.' },
        { round: 'Round 2: System & Design Discussion', desc: 'Architecture thinking, trade-offs, scaling' + (has('Cloud/DevOps') ? ', deployment strategy' : ''), why: 'Even at a startup, they need engineers who think beyond code — about scale, maintainability, and system boundaries.' },
        { round: 'Round 3: Culture Fit & Founder Chat', desc: 'Values, ownership, ambiguity tolerance', why: 'Startup teams are small and intense. They need people who take ownership, communicate directly, and thrive with less structure.' },
    ];
    return rounds;
}

/* ---------- 9. FULL ANALYSIS ---------- */
function runAnalysis(company, role, jdText) {
    const skills = extractSkills(jdText);
    const score = calcReadinessScore(company, role, jdText, skills);
    const checklist = generateChecklist(skills);
    const plan = generatePlan(skills);
    const questions = generateQuestions(skills);
    const companyIntel = inferCompanyIntel(company, skills);
    const roundMap = generateRoundMap(companyIntel, skills);
    return { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), createdAt: new Date().toISOString(), company: company || '', role: role || '', jdText: jdText || '', extractedSkills: skills, readinessScore: score, checklist, plan, questions, companyIntel, roundMap };
}


/* ---------- 8. LOCAL STORAGE ---------- */
const STORAGE_KEY = 'kodnest_analysis_history';
function loadHistory() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } }
function saveToHistory(entry) { const h = loadHistory(); h.unshift(entry); if (h.length > 50) h.length = 50; localStorage.setItem(STORAGE_KEY, JSON.stringify(h)); }
function getHistoryEntry(id) { return loadHistory().find(e => e.id === id) || null; }
function deleteHistoryEntry(id) { const h = loadHistory().filter(e => e.id !== id); localStorage.setItem(STORAGE_KEY, JSON.stringify(h)); }
function updateHistoryEntry(id, updates) {
    const h = loadHistory();
    const idx = h.findIndex(e => e.id === id);
    if (idx === -1) return;
    h[idx] = { ...h[idx], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(h));
}

/* ---------- 9. LIVE SCORE ---------- */
function calcLiveScore(baseScore, skillConfidenceMap) {
    if (!skillConfidenceMap) return baseScore;
    let delta = 0;
    for (const v of Object.values(skillConfidenceMap)) {
        delta += v === 'know' ? 2 : -2;
    }
    return Math.max(0, Math.min(100, baseScore + delta));
}

/* ---------- 10. EXPORT FORMATTERS ---------- */
function formatPlanText(plan) {
    return plan.map(d => d.day + ': ' + d.title + '\n' + d.tasks.map(t => '  • ' + t).join('\n')).join('\n\n');
}
function formatChecklistText(checklist) {
    return checklist.map(r => r.round + '\n' + r.items.map(i => '  ☐ ' + i).join('\n')).join('\n\n');
}
function formatQuestionsText(questions) {
    return questions.map((q, i) => (i + 1) + '. [' + q.category + '] ' + q.question).join('\n');
}
function formatFullExport(result, confidenceMap) {
    const liveScore = calcLiveScore(result.readinessScore, confidenceMap);
    let txt = '=== PLACEMENT READINESS ANALYSIS ===\n';
    txt += 'Company: ' + (result.company || 'N/A') + '\n';
    txt += 'Role: ' + (result.role || 'N/A') + '\n';
    txt += 'Readiness Score: ' + liveScore + '/100\n';
    txt += 'Analyzed: ' + new Date(result.createdAt).toLocaleString() + '\n\n';
    txt += '--- KEY SKILLS ---\n';
    for (const [cat, tags] of Object.entries(result.extractedSkills)) {
        txt += cat + ': ' + tags.join(', ') + '\n';
    }
    if (confidenceMap) {
        txt += '\nConfident: ' + Object.entries(confidenceMap).filter(([, v]) => v === 'know').map(([k]) => k).join(', ');
        txt += '\nNeed Practice: ' + Object.entries(confidenceMap).filter(([, v]) => v === 'practice').map(([k]) => k).join(', ');
    }
    txt += '\n\n--- 7-DAY PLAN ---\n' + formatPlanText(result.plan);
    txt += '\n\n--- ROUND-WISE CHECKLIST ---\n' + formatChecklistText(result.checklist);
    txt += '\n\n--- INTERVIEW QUESTIONS ---\n' + formatQuestionsText(result.questions);
    txt += '\n\n=== Generated by KodNest Placement Readiness Platform ===\n';
    return txt;
}
