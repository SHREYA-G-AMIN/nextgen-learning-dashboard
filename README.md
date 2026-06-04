# Next-Gen Learning Dashboard

A high-fidelity, futuristic student dashboard built with **Next.js App Router**, **TypeScript**, **Supabase**, **Tailwind CSS v4**, and **Framer Motion**.

The application showcases modern frontend engineering practices, including **Server Components**, **responsive Bento Grid layouts**, **smooth hardware-accelerated animations**, and **secure server-side data fetching**.

---

## 🚀 Live Demo

**Vercel Deployment:**  
https://nextgen-learning-dashboard-fawn.vercel.app/

**GitHub Repository:**  
https://github.com/SHREYA-G-AMIN/nextgen-learning-dashboard

---

## 📸 Preview

<img width="1907" height="1021" alt="image" src="https://github.com/user-attachments/assets/f9a674ac-8646-4109-b863-1d92173b7de6" />


---

## ✨ Features

### Dashboard Experience
- Modern Bento Grid layout
- Dark-mode-only premium UI
- Responsive design across desktop, tablet, and mobile
- Learning streak overview
- Dynamic course progress tracking
- Activity contribution graph

### Data Architecture
- Supabase PostgreSQL integration
- Server-side data fetching using Next.js App Router
- Type-safe data models
- Graceful fallback handling
- Environment variable security

### Animations
- Staggered page entrance animations
- Spring-based hover interactions
- Animated progress bars
- Layout transitions using Framer Motion
- Zero-layout-shift animation strategy

### User Experience
- Loading skeletons
- Error boundaries
- Responsive navigation
- Semantic HTML structure
- Accessibility-focused component design

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS v4

### Backend / Data
- Supabase
- PostgreSQL

### Animation
- Framer Motion

### Icons
- Lucide React

### Deployment
- Vercel

---

## 🏗️ Architecture

### Server Components

The dashboard uses **React Server Components (RSC)** for data fetching.

Benefits:

- Reduced client-side JavaScript
- Faster initial page loads
- Secure database communication
- Improved performance

```txt
app/page.tsx
        │
        ▼
Supabase Query
        │
        ▼
Server Component
        │
        ▼
DashboardClient
        │
        ▼
Interactive UI Components
```

---

### Client Components

Client Components are used only where interactivity is required:

| Component | Purpose |
|------------|----------|
| Sidebar | Navigation interactions |
| DashboardClient | Staggered animations |
| CourseCard | Progress animations |
| ActivityCard | Interactive graph |

This separation keeps the application performant while maintaining a smooth user experience.

---

## 📂 Project Structure

```txt
nextgen-learning-dashboard/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── globals.css
│
├── components/
│   ├── dashboard/
│   │   ├── DashboardClient.tsx
│   │   ├── BentoGrid.tsx
│   │   ├── HeroCard.tsx
│   │   ├── CourseCard.tsx
│   │   └── ActivityCard.tsx
│   │
│   ├── layout/
│   │   └── Sidebar.tsx
│   │
│   └── ui/
│
├── lib/
│   └── supabase.ts
│
├── types/
│   └── course.ts
│
├── utils/
│   └── iconMap.ts
│
├── public/
│
├── .env.example
└── README.md
```

---

## 🗄️ Database Schema

### Courses Table

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null,
  icon_name text not null,
  created_at timestamp default now()
);
```

### Sample Data

```sql
insert into courses
(title, progress, icon_name)
values
('Advanced React Patterns', 75, 'Code'),
('Next.js Mastery', 60, 'Layers'),
('TypeScript Pro', 85, 'FileCode'),
('System Design Basics', 40, 'Network');
```

---

## 🔑 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Refer to `.env.example` for the required variables.

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/SHREYA-G-AMIN/nextgen-learning-dashboard.git

cd nextgen-learning-dashboard
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create:

```bash
.env.local
```

Add your Supabase credentials.

### Start Development Server

```bash
npm run dev
```

Application will run on:

```txt
http://localhost:3000
```

---

## 🚢 Deployment

### Vercel

1. Push code to GitHub
2. Import repository into Vercel
3. Configure environment variables
4. Deploy

---

## 🎯 Design Decisions

### Why Server Components?

Using Server Components allows data fetching to occur on the server, reducing client bundle size and improving performance.

### Why Framer Motion?

Framer Motion provides:

- Hardware-accelerated animations
- Spring physics
- Layout animations
- High performance without causing layout shifts

### Why Bento Grid?

Bento layouts provide:

- Better information hierarchy
- Modern visual appearance
- Flexible responsiveness
- Improved content discoverability

---

## 📈 Performance Considerations

- Server-side data fetching
- Minimal client-side JavaScript
- Lazy-loaded interactive components
- Transform and opacity-only animations
- Responsive image and asset strategy
- Optimized rendering using React Server Components

---

## 🧪 Future Improvements

- Authentication with Supabase Auth
- Real student activity analytics
- Course completion certificates
- Notifications system
- Theme customization
- Real-time updates using Supabase Realtime

---

## 📝 Challenges & Learnings

During development, key challenges included:

- Designing a responsive Bento Grid layout
- Implementing Server Component and Client Component boundaries
- Managing smooth Framer Motion animations without layout shifts
- Creating reusable and scalable UI components
- Integrating Supabase securely with Next.js App Router

These challenges helped reinforce best practices around modern React architecture, performance optimization, and scalable frontend development.

---

## 👨‍💻 Author

**Shreya G Amin**

Computer Science Student | Full Stack & Frontend Development Enthusiast

GitHub: https://github.com/SHREYA-G-AMIN

LinkedIn: https://www.linkedin.com/in/shreya-g-amin/

---

## 📄 License

This project was developed as part of a Frontend Internship Assignment and is intended for educational and evaluation purposes.
