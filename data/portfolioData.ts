export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Full Stack' | 'Backend & System' | 'AI & Analytics';
  featured: boolean;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  architectureOverview: string;
  keyFeatures: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: string; iconName: string; tag: string }[];
}

export interface ArchitectureSample {
  id: string;
  title: string;
  language: string;
  filename: string;
  description: string;
  code: string;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

export const PERSONAL_INFO = {
  name: "Rex Darel Andig",
  role: "Full Stack Software Engineer",
  tagline: "Architecting high-throughput distributed backends & crafting intuitive, fluid web experiences.",
  bio: "Full Stack Engineer with 5+ years of experience designing microservices, optimizing database systems, and building scalable modern web applications. Passionate about clean code, developer tools, and high-performance user interfaces.",
  status: "Available for new opportunities",
  location: "Kapatagan, Lanao del Norte, PH (Open to Remote)",
  email: "rexdarelandig@gmail.com",
  github: "https://github.com/rexdarelandig",
  resumeUrl: "https://docs.google.com/document/d/1Dz20J5ykdRUX0tEIevNgCBqkODHb9zq1rtxGsOhBtWI/edit?usp=sharing",
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "In-progress Personal Projects", value: "3+" },
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Development",
    description: "Building responsive, modern, and high-performance interfaces",
    skills: [
      { name: "React / Next.js 16", level: "Expert", iconName: "Layout", tag: "Core" },
      { name: "Vue 2/3", level: "Expert", iconName: "Layout", tag: "Core" },
      { name: "TypeScript", level: "Expert", iconName: "Code2", tag: "Core" },
      { name: "Tailwind CSS v4", level: "Expert", iconName: "Palette", tag: "Styling" },
      { name: "State Management (Pinia/TanStack Query/Redux)", level: "Advanced", iconName: "Database", tag: "State" },
      { name: "Performance Tuning & Core Web Vitals", level: "Expert", iconName: "Gauge", tag: "Optimization" },
    ]
  },
  {
    title: "Backend & Systems",
    description: "Designing scalable APIs, microservices, and distributed logic",
    skills: [
      { name: "Laravel", level: "Expert", iconName: "Server", tag: "Runtime" },
      { name: "Python", level: "Proficient", iconName: "Cpu", tag: "Backend" },
      { name: "GraphQL & RESTful APIs", level: "Expert", iconName: "Share2", tag: "API" },
      { name: "Authentication & OAuth2 / JWT", level: "Expert", iconName: "ShieldCheck", tag: "Security" },
    ]
  },
  {
    title: "Databases & Storage",
    description: "Data modeling, indexing, query optimization, and caching",
    skills: [
      { name: "PostgreSQL & MySQL", level: "Expert", iconName: "Database", tag: "Relational" },
      { name: "Redis & In-Memory Caching", level: "Expert", iconName: "Flame", tag: "Cache" },
      { name: "MongoDB / DynamoDB", level: "Proficient", iconName: "HardDrive", tag: "NoSQL" },
    ]
  },
  {
    title: "Cloud & DevOps",
    description: "Infrastructure as code, containerization, and continuous delivery",
    skills: [
      { name: "Docker", level: "Advanced", iconName: "Box", tag: "Containers" },
      { name: "CI/CD (GitHub Actions)", level: "Expert", iconName: "GitBranch", tag: "Automation" },
      { name: "Vercel", level: "Proficient", iconName: "FileCode", tag: "Deployment" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "autolog",
    title: "Autolog",
    subtitle: "Real-time logging and analytics for vehicles",
    description: "A vehicle management system that tracks vehicle information, maintenance records, and fuel consumption.",
    category: "Full Stack",
    featured: true,
    image: "/images/autolog.webp",
    tags: ["Flutter", "PostgreSQL", "Vercel", "Supabase", "Resend", "Gemini"],
    metrics: [
      { label: "Users", value: "100+" },
      { label: "Vehicles Tracked", value: "100+" },
      { label: "Data Processed", value: "100GB+" }
    ],
    architectureOverview: "Real-time vehicle management system using Flutter for the frontend, Supabase for database and authentication, and Gemini AI for smart data entry. Built with scalability and offline-first architecture in mind.",
    keyFeatures: [
      "AI Scanner for auto-fill vehicle information and gas receipts",
      "Cloud-sync for Pro Users",
      "GPS Tracking for Vehicles",
      "Smart Alerts (Low Fuel, Maintenance Due)"
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://autolog.rexdarel.com"
  },
];

export const ARCHITECTURE_SAMPLES: ArchitectureSample[] = [
  {
    id: "rate-limiter",
    title: "Distributed Redis Rate Limiter",
    language: "typescript",
    filename: "lib/rate-limiter.ts",
    description: "Sliding-window counter implementation using Redis atomic scripts for zero-race-condition API protection.",
    code: `import { Redis } from '@upstash/redis';

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Sliding Window Rate Limiter using Redis Lua script
 */
export async function checkRateLimit(
  redis: Redis,
  identifier: string,
  limit: number = 100,
  windowInSeconds: number = 60
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowStart = now - windowInSeconds * 1000;
  const key = \`ratelimit:\${identifier}\`;

  const luaScript = \`
    redis.call('ZREMRANGEBYSCORE', KEYS[1], '-inf', ARGV[1])
    local currentRequests = redis.call('ZCARD', KEYS[1])
    if currentRequests < tonumber(ARGV[2]) then
      redis.call('ZADD', KEYS[1], ARGV[3], ARGV[3])
      redis.call('EXPIRE', KEYS[1], ARGV[4])
      return {1, tonumber(ARGV[2]) - currentRequests - 1}
    else
      return {0, 0}
    end
  \`;

  const [allowed, remaining] = (await redis.eval(
    luaScript,
    [key],
    [windowStart.toString(), limit.toString(), now.toString(), windowInSeconds.toString()]
  )) as [number, number];

  return {
    success: allowed === 1,
    limit,
    remaining: allowed === 1 ? remaining : 0,
    reset: now + windowInSeconds * 1000,
  };
}`
  },
  {
    id: "schema-design",
    title: "Optimized Prisma Database Schema",
    language: "prisma",
    filename: "prisma/schema.prisma",
    description: "Production PostgreSQL schema featuring compound indexing, polymorphic relationships, and soft-delete states.",
    code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  DEVELOPER
  VIEWER
}

model Organization {
  id        String   @id @default(uuid())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  members   Member[]
  apiKeys   ApiKey[]
  projects  Project[]

  @@map("organizations")
}

model ApiKey {
  id             String       @id @default(cuid())
  keyHash        String       @unique @map("key_hash")
  name           String
  orgId          String       @map("org_id")
  organization   Organization @relation(fields: [orgId], references: [id], onDelete: Cascade)
  lastUsedAt     DateTime?    @map("last_used_at")
  expiresAt      DateTime?    @map("expires_at")
  
  @@index([orgId, keyHash])
  @@map("api_keys")
}`
  },
  {
    id: "cicd-pipeline",
    title: "Zero-Downtime Deployment Pipeline",
    language: "yaml",
    filename: ".github/workflows/deploy.yml",
    description: "Automated GitHub Actions CI/CD with Docker layer caching, unit/integration testing, and blue-green AWS ECS deployment.",
    code: `name: Production Deployment CI/CD

on:
  push:
    branches: [ main ]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js & pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: ~/.pnpm-store
          key: \${{ runner.os }}-pnpm-\${{ hashFiles('**/pnpm-lock.yaml') }}

      - name: Run Linters & Tests
        run: |
          pnpm install --frozen-lockfile
          pnpm lint
          pnpm test:coverage

      - name: Build & Push Docker Image
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: registry.digitalocean.com/app/prod:\${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max`
  }
];

export const EXPERIENCES: Experience[] = [
  {
    period: "2019 — 2026",
    role: "Full Stack Engineer",
    company: "Jarvis Analytics (acquired by Henry Schein One in 2024)",
    location: "USA, Remote",
    highlights: [
      "Engineered an internal system for monitoring customers practice status built with Laravel and Vue",
      "Created a microservice in Dentrix Ascend for Email and SMS campaign",
      "Created Python scripts to process large datasets across different database clusters"
    ],
    technologies: ["React / Next.js", "TypeScript", "Vue 2 & 3", "Laravel", "MySQL", "Redis", "AWS", "Python", "TailwindCSS"]
  },
  {
    period: "2018-2019",
    role: "Jr. Front-end Developer",
    company: "Cell 5",
    location: "UK, Remote",
    highlights: [
      "Developed a modern, front-end web application using Vue",
      "Created an image processing Python script for PDF file to extract data"
    ],
    technologies: ["Vue", "Python", "Wordpress"]
  },
  {
    period: "Jan 2017- Sept 2017",
    role: "Intern",
    company: "vimlabs",
    location: "Iligan, Philippines",
    highlights: [
      "Optimized and maintained high-traffic Wordpress sites to ensure 99.9% uptime",
      "Developed a Laravel website",
      "Managed 21CLearning Wordpress site"
    ],
    technologies: ["Wordpress", "PHP", "Laravel"]
  }
];
