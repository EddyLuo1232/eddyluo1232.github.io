import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_URL = 'https://scholar.google.com/citations?hl=zh-CN&user=EZzmjVUAAAAJ&pagesize=100';
const OUTPUT_PATH = path.resolve('src/data/scholarCitations.ts');

const PUBLICATIONS = [
  {
    id: 'doxing',
    title: 'Doxing via the Lens: Revealing Location-related Privacy Leakage on Multi-modal Large Reasoning Models'
  },
  {
    id: 'jailbreakv',
    title: 'JailBreakV: A Benchmark for Assessing the Robustness of MultiModal Large Language Models against Jailbreak Attacks',
    aliases: [
      'JailBreakV-28K: A Benchmark for Assessing the Robustness of MultiModal Large Language Models against Jailbreak Attacks'
    ]
  },
  {
    id: 'agrail',
    title: 'AGrail: A lifelong Agent Guardrail with Effective and Adaptive Safety Detection'
  },
  {
    id: 'dynamic-safeguards',
    title: 'Dynamic Guided and Domain Applicable Safeguards for Enhanced Security in Large Language Models'
  },
  {
    id: 'memory-reasoning',
    title: 'Disentangling Memory and Reasoning Ability in Large Language Models'
  },
  {
    id: 'agentlens',
    title: 'AgentLens: Interpretable Safety Steering via Mechanistic Subspaces for Multi-Turn Coding Agent'
  },
  {
    id: 'foodguardbench',
    title: 'Cooking Up Risks: Benchmarking and Reducing Food Safety Risks in Large Language Models'
  },
  {
    id: 'advcua',
    title: 'Code Agent can be an End-to-end System Hacker: Benchmarking Real-world Threats of Computer-use Agent',
    aliases: [
      'Your Cursor is Not Secure: Command Line Interface Agent Can Expose Realistic Risks Through Tactics, Techniques, and Procedures'
    ]
  },
  {
    id: 'visual-roleplay',
    title: 'Visual-RolePlay: Universal Jailbreak Attack on MultiModal Large Language Models via Role-playing Image Character'
  }
];

const decodeHtml = (value) => value
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
  .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number.parseInt(decimal, 10)));

const stripTags = (value) => value.replace(/<[^>]*>/g, '');

const normalizeTitle = (value) => stripTags(decodeHtml(value))
  .toLowerCase()
  .replace(/[\u2010-\u2015]/g, '-')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const scholarSearchUrl = (query) => (
  `https://scholar.google.com/scholar?hl=zh-CN&q=${encodeURIComponent(query)}`
);

const absoluteScholarUrl = (href) => {
  if (!href) {
    return '';
  }

  return new URL(decodeHtml(href), 'https://scholar.google.com').toString();
};

const parseScholarRows = (html) => {
  const rows = [...html.matchAll(/<tr class="gsc_a_tr">([\s\S]*?)<\/tr>/g)];

  return rows.map(([, rowHtml]) => {
    const titleMatch = rowHtml.match(/<a[^>]*class="gsc_a_at"[^>]*>([\s\S]*?)<\/a>/);
    const citationCellMatch = rowHtml.match(/<td class="gsc_a_c">([\s\S]*?)<\/td>/);
    const citationLinkMatch = citationCellMatch?.[1]?.match(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/);
    const citationText = stripTags(decodeHtml(citationLinkMatch?.[2] ?? '')).trim();

    return {
      title: stripTags(decodeHtml(titleMatch?.[1] ?? '')).trim(),
      normalizedTitle: normalizeTitle(titleMatch?.[1] ?? ''),
      count: citationText ? Number.parseInt(citationText.replace(/,/g, ''), 10) : 0,
      href: absoluteScholarUrl(citationLinkMatch?.[1] ?? '')
    };
  }).filter((row) => row.title);
};

const findScholarRow = (rows, publication) => {
  const titles = [publication.title, ...(publication.aliases ?? [])].map(normalizeTitle);
  return rows.find((row) => titles.includes(row.normalizedTitle));
};

const buildOutput = (citations) => `export const scholarCitationSource = ${JSON.stringify(SOURCE_URL)};\n`
  + `export const scholarCitationUpdatedAt = ${JSON.stringify(new Date().toISOString())};\n\n`
  + 'export const scholarCitations = {\n'
  + citations.map(({ id, count, href, sourceTitle }) => (
    `  ${JSON.stringify(id)}: {\n`
    + `    count: ${count},\n`
    + `    href: ${JSON.stringify(href)},\n`
    + `    sourceTitle: ${JSON.stringify(sourceTitle)}\n`
    + '  }'
  )).join(',\n')
  + '\n} as const;\n';

const response = await fetch(SOURCE_URL, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; CitationUpdater/1.0; +https://eddyluo1232.github.io)',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
  }
});

if (!response.ok) {
  throw new Error(`Failed to retrieve Google Scholar profile: ${response.status} ${response.statusText}`);
}

const html = await response.text();
const rows = parseScholarRows(html);

if (rows.length === 0) {
  throw new Error('No Google Scholar publication rows were found. Google Scholar may have changed markup or blocked the request.');
}

const citations = PUBLICATIONS.map((publication) => {
  const row = findScholarRow(rows, publication);

  return {
    id: publication.id,
    count: row?.count ?? 0,
    href: row?.href || scholarSearchUrl(publication.title),
    sourceTitle: row?.title ?? publication.title
  };
});

await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, buildOutput(citations), 'utf8');

console.log(`Updated ${OUTPUT_PATH} from ${SOURCE_URL}`);
citations.forEach(({ id, count, sourceTitle }) => {
  console.log(`${id}: ${count} (${sourceTitle})`);
});
