# LawBot - Project Structure & Documentation

## Overview
LawBot is a full-stack AI-powered legal assistant platform built with Next.js 15. It connects clients with lawyers through an intelligent chatbot and real-time messaging system, with admin oversight for lawyer approvals.

## Tech Stack
- **Framework**: Next.js 15.1.8 (App Router)
- **Language**: JavaScript (no TypeScript)
- **Styling**: Tailwind CSS 3.4.1 + Lucide React (icons) + Framer Motion (animations)
- **Authentication**: NextAuth.js v4 (Credentials + Google OAuth)
- **Database**: MongoDB (native driver via `lib/mongodb.js`)
- **AI Integration**: OpenRouter API (GPT-4o-mini model)
- **Notifications**: react-hot-toast
- **HTTP Client**: Axios
- **Password Hashing**: bcryptjs

---

## Directory Structure

```
lawcb/
├── app/                              # Next.js App Router pages & API routes
│   ├── layout.js                     # Root layout: SessionProvider, Navbar, Toaster
│   ├── globals.css                   # Global styles + Tailwind + CSS variables
│   ├── page.js                       # Landing page (hero, features, FAQ, footer)
│   │
│   ├── about/                        # About page
│   │   └── page.js
│   │
│   ├── contact/                      # Contact form page
│   │   └── page.js
│   │
│   ├── login/                        # Login page (credentials + Google OAuth)
│   │   └── page.js
│   │
│   ├── signup/                       # User registration page
│   │   └── page.js
│   │
│   ├── chat-bot/                     # AI Legal Chatbot page
│   │   └── page.js
│   │
│   ├── chat/[chatId]/                # Client-Lawyer real-time chat page
│   │   └── page.js
│   │
│   ├── lawyer/
│   │   ├── signup/                   # Lawyer registration form
│   │   │   └── page.js
│   │   └── contact/                  # Browse & request lawyers
│   │       └── page.js
│   │
│   ├── dashboard/
│   │   ├── page.js                   # User dashboard (post-login)
│   │   ├── lawyer/
│   │   │   ├── page.js               # Lawyer dashboard (manage requests)
│   │   │   └── chat/[chatId]/        # Lawyer chat view
│   │   │       └── page.js
│   │   └── admin/
│   │       └── page.js               # Admin dashboard (approve lawyers)
│   │
│   └── api/                          # Backend API routes
│       ├── auth/[...nextauth]/       # NextAuth handler (GET/POST)
│       │   └── route.js
│       ├── signup/                   # User registration endpoint
│       │   └── route.js
│       ├── ask-lawbot/               # AI chatbot endpoint (OpenRouter)
│       │   └── route.js
│       ├── chat-requests/            # Client sends chat request to lawyer
│       │   └── route.js
│       ├── client/responses/         # Client's accepted lawyer responses
│       │   └── route.js
│       ├── chat/
│       │   ├── start/                # Create/retrieve chat session
│       │   │   └── route.js
│       │   └── [chatId]/             # GET/POST messages for a chat
│       │       └── route.js
│       ├── lawyer/
│       │   ├── route.js              # GET lawyers by status
│       │   ├── [id]/                 # GET single lawyer
│       │   │   └── route.js
│       │   ├── signup/               # Lawyer registration API
│       │   │   └── route.js
│       │   ├── login/                # Lawyer login (standalone)
│       │   │   └── route.js
│       │   ├── requests/             # Lawyer's chat requests
│       │   │   └── route.js
│       │   ├── respond/              # Lawyer accept/reject/delete
│       │   │   └── route.js
│       │   ├── responses/            # Lawyer's past responses
│       │   │   └── route.js
│       │   └── update-availability/  # Update lawyer availability
│       │       └── route.js
│       └── admin/
│           ├── approve-lawyer/       # Approve pending lawyer
│           │   └── route.js
│           ├── reject-lawyer/        # Reject/delete pending lawyer
│           │   └── route.js
│           └── pending-lawyers/      # List pending lawyers
│               └── route.js
│
├── components/
│   ├── Navbar.js                     # Responsive navigation (auth-aware)
│   ├── ChatComponent.js              # Shared real-time chat UI
│   └── SessionWrapper.js             # NextAuth SessionProvider wrapper
│
├── lib/
│   └── mongodb.js                    # MongoDB singleton connection
│
└── public/                           # Static assets (images, icons)
```

---

## User Roles & Flow

### 1. Regular User (Client)
- Sign up / Login (credentials or Google)
- Use AI chatbot (`/chat-bot`)
- Browse approved lawyers (`/lawyer/contact`)
- Send chat requests to lawyers
- Chat with accepted lawyers (`/chat/[chatId]`)

### 2. Lawyer
- Register with bar ID, specialization, etc. (`/lawyer/signup`)
- Wait for admin approval (status: `pending` → `approved`)
- Login and access dashboard (`/dashboard/lawyer`)
- View pending client requests
- Accept/reject requests
- Chat with clients (`/dashboard/lawyer/chat/[chatId]`)

### 3. Admin
- Hardcoded email: `lawchatbot17@gmail.com`
- Access admin dashboard (`/dashboard/admin`)
- Approve/reject lawyer registrations
- View all approved lawyers

---

## Database Collections

### `users`
- `_id`, `name`, `email`, `password` (bcrypt hashed)

### `lawyers`
- `_id`, `name`, `email`, `password`, `barId`, `specialization`, `experience`, `state`, `availability`, `bio`, `status` (`pending`/`approved`)

### `admin`
- `_id`, `name`, `email`, `password`

### `chatRequests`
- `_id`, `lawyerId`, `clientEmail`, `requestedAt`

### `chatResponses`
- `_id`, `requestId`, `lawEmail`, `Client`, `status` (`accepted`/`rejected`), `respondedAt`

### `chats`
- `_id`, `chatId` (UUID), `clientEmail`, `lawyerEmail`, `createdAt`

### `messages`
- `_id`, `chatId`, `sender`, `message`, `timestamp`

---

## Key Components

### `Navbar.js`
- Responsive navigation with mobile hamburger menu
- Auth-aware links based on user role
- Desktop and mobile views with proper routing

### `ChatComponent.js`
- Shared chat UI used by both client and lawyer chat pages
- Polls for new messages every 3 seconds
- Features: message bubbles, timestamps, loading states

### `SessionWrapper.js`
- Wraps app in NextAuth `SessionProvider`
- Required for client-side session access

---

## API Routes Summary

| Route | Method | Purpose | Auth Guard |
|-------|--------|---------|------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handler | Built-in |
| `/api/signup` | POST | User registration | None |
| `/api/ask-lawbot` | POST | AI chatbot (OpenRouter) | None (5 msg limit for guests) |
| `/api/chat-requests` | POST | Client requests lawyer chat | None |
| `/api/client/responses` | POST | Get client's accepted responses | None |
| `/api/chat/start` | POST | Create/retrieve chat session | None |
| `/api/chat/[chatId]` | GET/POST | Chat messages | None |
| `/api/lawyer` | GET | Get lawyers by status | None |
| `/api/lawyer/[id]` | GET | Get single lawyer | None |
| `/api/lawyer/signup` | POST | Lawyer registration | None |
| `/api/lawyer/login` | POST | Lawyer login (standalone) | None |
| `/api/lawyer/requests` | POST | Get lawyer's requests | None |
| `/api/lawyer/respond` | POST/DELETE | Accept/reject/delete requests | None |
| `/api/lawyer/responses` | POST | Get lawyer's past responses | None |
| `/api/lawyer/update-availability` | POST | Update availability | None |
| `/api/admin/approve-lawyer` | POST | Approve lawyer | **Email check** |
| `/api/admin/reject-lawyer` | POST | Reject lawyer | **Email check** |
| `/api/admin/pending-lawyers` | GET | List pending lawyers | None |

---

## Authentication Flow

1. **Credentials Login**: Email + password → bcrypt compare → session with role
2. **Google OAuth**: Redirects to Google → returns user → creates/fetches from DB
3. **Role Detection**:
   - `isLawyer=true` → `lawyers` collection → role: `lawyer`
   - Email matches admin → `admin` collection → role: `admin`
   - Default → `users` collection → role: `user`

---

## Environment Variables

Required in `.env.local`:
```
MONGODB_URI=mongodb://...
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
OPENROUTER_API_KEY=...
```

---

## Known Issues & Limitations

### Security
- Most API routes lack authentication guards (only admin routes have email check)
- No rate limiting on AI endpoint
- Chat access relies on knowing chatId (no ownership verification)
- Admin role is hardcoded by email

### UX
- Contact form doesn't persist data (frontend only)
- No real-time WebSocket (uses 3s polling)
- Google login always redirects to `/dashboard` regardless of role
- No password reset functionality

### Database
- Uses native MongoDB driver (no Mongoose schemas/validation)
- No indexes defined for frequently queried fields
- Messages collection grows unbounded

---

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## File Conventions

- **Pages**: `app/[route]/page.js`
- **API Routes**: `app/api/[route]/route.js`
- **Components**: `components/[Name].js`
- **Client Components**: Must have `"use client"` directive at top
- **Imports**: Use `@/` alias for project root (e.g., `@/lib/mongodb`)

---

## AI Agent Notes

When working on this project:
1. Always check if a page needs `"use client"` directive for hooks
2. MongoDB uses native driver, not Mongoose - use `db.collection().find/insertOne/updateOne`
3. Session data is accessed via `useSession()` (client) or `getServerSession()` (server)
4. Tailwind CSS is configured - use utility classes for styling
5. Lucide React icons are available - import from `lucide-react`
6. Toast notifications use `react-hot-toast` - `toast.success()`, `toast.error()`
7. API routes return JSON via `NextResponse.json()`
8. The project uses JavaScript, not TypeScript
