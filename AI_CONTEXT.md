=== PROJECT STRUCTURE ===
.
├── AGENTS.md
├── AI_CONTEXT.md
├── app
│   ├── admin
│   │   ├── dashboard
│   │   └── users
│   ├── api
│   │   ├── auth
│   │   │   └── [...all]
│   │   └── projects
│   │       └── route.ts
│   ├── (auth)
│   │   ├── choose-role
│   │   │   └── page.tsx
│   │   ├── forgot-password
│   │   │   └── page.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   └── register
│   │       └── page.tsx
│   ├── company
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   └── projects
│   │       └── create
│   ├── (dashboard)
│   ├── developer
│   │   ├── applications
│   │   │   └── page.tsx
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── messages
│   │   │   └── page.tsx
│   │   ├── profile
│   │   │   └── page.tsx
│   │   ├── projects
│   │   │   └── page.tsx
│   │   └── settings
│   │       └── page.tsx
│   ├── developers
│   ├── favicon.ico
│   ├── globals.css
│   ├── jobs
│   ├── layout.tsx
│   ├── (marketing)
│   │   └── page.tsx
│   └── projects
│       └── page.tsx
├── bytehub.zip
├── CLAUDE.md
├── components.json
├── docs
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── BRANDING.md
│   ├── CHANGELOG.md
│   ├── CONTRIBUTING.md
│   ├── DATABASE.md
│   ├── DESIGN_SYSTEM.md
│   ├── PRD.md
│   ├── PRODUCT_SPEC.md
│   ├── README.md
│   ├── ROADMAP.md
│   └── VISION.md
├── eslint.config.mjs
├── generated
│   └── prisma
│       ├── browser.ts
│       ├── client.ts
│       ├── commonInputTypes.ts
│       ├── enums.ts
│       ├── internal
│       │   ├── class.ts
│       │   ├── prismaNamespaceBrowser.ts
│       │   └── prismaNamespace.ts
│       ├── models
│       │   ├── Account.ts
│       │   ├── Application.ts
│       │   ├── ClientProfile.ts
│       │   ├── DeveloperProfile.ts
│       │   ├── Project.ts
│       │   ├── Session.ts
│       │   ├── Skill.ts
│       │   ├── User.ts
│       │   └── Verification.ts
│       └── models.ts
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── prisma
│   ├── migrations
│   │   ├── 20260806132815_init
│   │   │   └── migration.sql
│   │   ├── 20260806133208_bytehub_models
│   │   │   └── migration.sql
│   │   ├── 20260806201205_better_auth
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── prisma.config.ts
├── public
│   └── logo.png
├── README.md
├── SidebarSection.tsx
├── skills-lock.json
├── src
│   ├── actions
│   │   └── project.ts
│   ├── app
│   │   ├── api
│   │   │   └── register
│   │   └── company
│   │       └── projects
│   ├── assets
│   ├── components
│   │   ├── auth
│   │   │   └── RegisterForm.tsx
│   │   ├── company
│   │   │   ├── CompanyStatCard.tsx
│   │   │   ├── CreateProjectForm.tsx
│   │   │   └── ProjectOverviewCard.tsx
│   │   ├── dashboard
│   │   │   ├── components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── index.ts
│   │   │   ├── Sidebar.tsx
│   │   │   └── Topbar.tsx
│   │   ├── developer
│   │   │   ├── ProfileForm.tsx
│   │   │   ├── ProfileHeader.tsx
│   │   │   └── SkillsInput.tsx
│   │   ├── icons
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   ├── layout
│   │   │   ├── Container.tsx
│   │   │   ├── index.ts
│   │   │   └── Section.tsx
│   │   ├── Logo.tsx
│   │   ├── marketing
│   │   │   ├── Announcement
│   │   │   ├── CTA
│   │   │   ├── FeaturedDevelopers
│   │   │   ├── FeaturedProjects
│   │   │   ├── Footer
│   │   │   ├── Hero
│   │   │   ├── HowItWorks
│   │   │   ├── index.ts
│   │   │   ├── Navbar
│   │   │   ├── Testimonials
│   │   │   ├── TrustedUniversities
│   │   │   ├── WhoItsFor
│   │   │   └── WhyByteHub
│   │   ├── projects
│   │   │   └── ProjectCard.tsx
│   │   └── ui
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── separator.tsx
│   │       └── sheet.tsx
│   ├── config
│   ├── constants
│   │   ├── audiences.ts
│   │   ├── developers.ts
│   │   ├── features.ts
│   │   ├── hero.ts
│   │   ├── how-it-works.ts
│   │   ├── navigation.ts
│   │   ├── projects.ts
│   │   ├── stats.ts
│   │   ├── testimonials.ts
│   │   ├── universities.ts
│   │   └── why-bytehub.ts
│   ├── features
│   │   ├── auth
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── services
│   │   │   └── types
│   │   ├── client
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── services
│   │   │   └── types
│   │   ├── developer
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── services
│   │   │   └── types
│   │   ├── jobs
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── services
│   │   │   └── types
│   │   └── projects
│   │       ├── components
│   │       ├── hooks
│   │       ├── services
│   │       └── types
│   ├── hooks
│   ├── lib
│   │   ├── auth-client.ts
│   │   ├── auth.ts
│   │   ├── prisma.ts
│   │   └── utils.ts
│   ├── schemas
│   │   ├── auth.ts
│   │   ├── company.ts
│   │   ├── developer.ts
│   │   ├── job.ts
│   │   └── project.ts
│   ├── styles
│   │   ├── animations.ts
│   │   ├── colors.ts
│   │   ├── index.ts
│   │   ├── radius.ts
│   │   ├── shadows.ts
│   │   ├── spacing.ts
│   │   └── typography.ts
│   ├── types
│   │   ├── company.ts
│   │   ├── feature.ts
│   │   ├── job.ts
│   │   ├── marketing.ts
│   │   ├── project.ts
│   │   ├── step.ts
│   │   └── user.ts
│   └── utils
└── tsconfig.json

106 directories, 133 files

=== PACKAGE.JSON ===
{
  "name": "bytehub",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@base-ui/react": "^1.7.0",
    "@better-auth/prisma-adapter": "^1.6.26",
    "@hookform/resolvers": "^5.7.1",
    "@prisma/adapter-pg": "^7.9.1",
    "@prisma/client": "^7.9.1",
    "@radix-ui/react-icons": "^1.3.2",
    "@radix-ui/react-slot": "^1.3.3",
    "bcrypt": "^6.0.0",
    "better-auth": "^1.6.26",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^13.0.0",
    "geist": "^1.7.2",
    "lucide-react": "^1.28.0",
    "next": "16.3.0",
    "next-themes": "^0.4.6",
    "pg": "^8.22.0",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-hook-form": "^7.84.0",
    "react-icons": "^5.7.0",
    "shadcn": "^4.16.1",
    "tailwind-merge": "^3.6.0",
    "tw-animate-css": "^1.4.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.0",
    "prisma": "^7.9.1",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

=== PRISMA SCHEMA ===
generator client {
  provider = "prisma-client-js"
}


datasource db {
  provider = "postgresql"
}


// ======================
// USERS
// ======================

model User {
  id            String   @id @default(cuid())

  name          String?
  email         String   @unique
  emailVerified Boolean  @default(false)
  image         String?

  password      String?

  role          Role     @default(DEVELOPER)

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt


  // Company projects
  projects      Project[]


  // Developer applications
  applications  Application[]


  // Skills
  skills        UserSkill[]


  // Portfolio
  portfolios    Portfolio[]


  // Messaging
  sentMessages      Message[] @relation("sentMessages")
  receivedMessages  Message[] @relation("receivedMessages")


  // Notifications
  notifications Notification[]


  // Better Auth relations
  sessions      Session[]
  accounts      Account[]
}



// ======================
// AUTH TABLES
// ======================

model Session {
  id        String   @id @default(cuid())

  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  token     String   @unique

  expiresAt DateTime

  createdAt DateTime @default(now())
}


model Account {
  id                String @id @default(cuid())

  userId            String
  user              User @relation(fields: [userId], references: [id], onDelete: Cascade)

  provider          String
  providerAccountId String

  accessToken       String?
  refreshToken      String?

  createdAt         DateTime @default(now())


  @@unique([provider, providerAccountId])
}



// ======================
// PROJECTS
// ======================

model Project {

  id          String @id @default(cuid())


  title       String

  description String


  budget      Float?


  deadline    DateTime?


  status      ProjectStatus @default(ACTIVE)


  companyId   String

  company     User @relation(
    fields: [companyId],
    references: [id],
    onDelete: Cascade
  )


  applications Application[]


  createdAt DateTime @default(now())

  updatedAt DateTime @updatedAt

}



// ======================
// APPLICATIONS
// ======================


model Application {

  id String @id @default(cuid())


  message String


  status ApplicationStatus @default(PENDING)


  projectId String

  project Project @relation(
    fields: [projectId],
    references: [id],
    onDelete: Cascade
  )


  developerId String

  developer User @relation(
    fields: [developerId],
    references: [id],
    onDelete: Cascade
  )


  createdAt DateTime @default(now())

}



// ======================
// SKILLS
// ======================


model Skill {

  id String @id @default(cuid())


  name String @unique


  users UserSkill[]

}



model UserSkill {

  id String @id @default(cuid())


  userId String

  user User @relation(
    fields: [userId],
    references: [id],
    onDelete: Cascade
  )


  skillId String

  skill Skill @relation(
    fields: [skillId],
    references: [id],
    onDelete: Cascade
  )


  @@unique([userId, skillId])

}



// ======================
// PORTFOLIO
// ======================


model Portfolio {

  id String @id @default(cuid())


  title String

  url String


  userId String

  user User @relation(
    fields: [userId],
    references: [id],
    onDelete: Cascade
  )

}



// ======================
// MESSAGING
// ======================


model Message {

  id String @id @default(cuid())


  content String


  senderId String

  sender User @relation(
    "sentMessages",
    fields: [senderId],
    references: [id],
    onDelete: Cascade
  )


  receiverId String

  receiver User @relation(
    "receivedMessages",
    fields: [receiverId],
    references: [id],
    onDelete: Cascade
  )


  read Boolean @default(false)


  createdAt DateTime @default(now())

}



// ======================
// NOTIFICATIONS
// ======================


model Notification {

  id String @id @default(cuid())


  message String


  read Boolean @default(false)


  userId String

  user User @relation(
    fields: [userId],
    references: [id],
    onDelete: Cascade
  )


  createdAt DateTime @default(now())

}



// ======================
// ENUMS
// ======================


enum Role {

  DEVELOPER

  COMPANY

  ADMIN

}


enum ProjectStatus {

  ACTIVE

  COMPLETED

  CLOSED

}


enum ApplicationStatus {

  PENDING

  ACCEPTED

  REJECTED

}

=== ENV VARIABLES (NAMES ONLY) ===
# Environment variables declared in this file are NOT automatically loaded by Prisma.
# Please add `import "dotenv/config";` to your `prisma.config.ts` file, or use the Prisma CLI with Bun
# to load environment variables from .env files: https://pris.ly/prisma-config-env-vars.

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# The following `prisma+postgres` URL is similar to the URL produced by running a local Prisma Postgres
# server with the `prisma dev` CLI command, when not choosing any non-default ports or settings. The API key, unlike the
# one found in a remote Prisma Postgres URL, does not contain any sensitive information.

DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL
DIRECT_URL

=== APP ROUTES ===
src/app/api/register/route.ts
src/app/company/projects/create/page.tsx

=== COMPONENTS ===
src/components/developer/SkillsInput.tsx
src/components/developer/ProfileHeader.tsx
src/components/developer/ProfileForm.tsx
src/components/Logo.tsx
src/components/layout/Container.tsx
src/components/layout/index.ts
src/components/layout/Section.tsx
src/components/ui/dropdown-menu.tsx
src/components/ui/separator.tsx
src/components/ui/sheet.tsx
src/components/ui/label.tsx
src/components/ui/card.tsx
src/components/ui/button.tsx
src/components/ui/badge.tsx
src/components/ui/input.tsx
src/components/ui/navigation-menu.tsx
src/components/ui/avatar.tsx
src/components/index.ts
src/components/projects/ProjectCard.tsx
src/components/company/ProjectOverviewCard.tsx
src/components/company/CreateProjectForm.tsx
src/components/company/CompanyStatCard.tsx
src/components/marketing/FeaturedDevelopers/index.ts
src/components/marketing/FeaturedDevelopers/FeaturedDevelopers.tsx
src/components/marketing/Announcement/Announcement.tsx
src/components/marketing/Announcement/index.ts
src/components/marketing/CTA/CTA.tsx
src/components/marketing/CTA/index.ts
src/components/marketing/HowItWorks/components/StepCard.tsx
src/components/marketing/HowItWorks/HowItWorks.tsx
src/components/marketing/HowItWorks/index.ts
src/components/marketing/TrustedUniversities/index.ts
src/components/marketing/TrustedUniversities/TrustedUniversities.tsx
src/components/marketing/WhoItsFor/WhoItsFor.tsx
src/components/marketing/WhoItsFor/components/AudienceCard.tsx
src/components/marketing/WhoItsFor/index.ts
src/components/marketing/FeaturedProjects/index.ts
src/components/marketing/FeaturedProjects/FeaturedProjects.tsx
src/components/marketing/Testimonials/index.ts
src/components/marketing/Testimonials/Testimonials.tsx
src/components/marketing/index.ts
src/components/marketing/Footer/Footer.tsx
src/components/marketing/Footer/index.ts
src/components/marketing/Hero/components/HeroBadge.tsx
src/components/marketing/Hero/components/index.ts
src/components/marketing/Hero/components/DashboardPreview.tsx
src/components/marketing/Hero/components/HeroButtons.tsx
src/components/marketing/Hero/components/HeroStats.tsx
src/components/marketing/Hero/index.ts
src/components/marketing/Hero/Hero.tsx
src/components/marketing/Navbar/Navbar.tsx
src/components/marketing/Navbar/index.ts
src/components/marketing/WhyByteHub/components/FeatureCard.tsx
src/components/marketing/WhyByteHub/WhyByteHub.tsx
src/components/marketing/WhyByteHub/index.ts
src/components/dashboard/components/NotificationCard.tsx
src/components/dashboard/components/ActivityItem.tsx
src/components/dashboard/components/StatCard.tsx
src/components/dashboard/components/SectionCard.tsx
src/components/dashboard/components/UserMenu.tsx
src/components/dashboard/components/NavItem.tsx
src/components/dashboard/components/EmptyState.tsx
src/components/dashboard/components/SidebarSection.tsx
src/components/dashboard/components/PageHeader.tsx
src/components/dashboard/components/ProfileCompletion.tsx
src/components/dashboard/components/QuickActionCard.tsx
src/components/dashboard/index.ts
src/components/dashboard/Topbar.tsx
src/components/dashboard/DashboardLayout.tsx
src/components/dashboard/Sidebar.tsx
src/components/icons/index.ts
src/components/auth/RegisterForm.tsx
