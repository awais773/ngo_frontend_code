const PRODUCTION_API_URL = "https://ngo.singsavatech.com/api/v1";
const PRODUCTION_BACKEND_URL = "https://ngo.singsavatech.com/";
const LOCAL_API_URL = "http://localhost:8000/api/v1";
const LOCAL_BACKEND_URL = "http://localhost:8000";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : LOCAL_API_URL);

export interface CmsPage {
  title: string;
  content?: string | null;
  excerpt?: string | null;
  slug?: string;
}

export interface Paginated<T> {
  data: T[];
  current_page?: number;
  last_page?: number;
}

export interface BoardMember {
  id: number;
  name: string;
  title?: string;
  bio?: string;
  image?: string;
  email?: string;
  linkedin?: string;
}

export interface MediaItem {
  id: number;
  type: string;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
}

export interface ComplianceReport {
  id: number;
  slug: string;
  title: string;
  description?: string;
  file_path?: string;
  report_year?: number;
  category?: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description?: string;
  content?: string | null;
  featured_image?: string;
  goal_amount: string | number;
  raised_amount: string | number;
  category?: string;
}

export interface Slider {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  button_text?: string;
  button_link?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  author?: string;
  category?: string;
  published_at?: string;
}

export interface EventItem {
  id: number;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  location?: string;
  starts_at?: string;
  featured_image?: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role?: string;
  content: string;
  image?: string;
  rating?: number;
}

export interface HomeData {
  sliders: Slider[];
  featured_projects: Project[];
  featured_events: EventItem[];
  latest_blogs: BlogPost[];
  testimonials: TestimonialItem[];
  donations_summary: {
    total_received: number;
    recent: Array<{ donor_name?: string; amount: number; is_anonymous: boolean }>;
  };
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options?.headers,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export const api = {
  home: () => fetchApi<HomeData>("/home"),
  settings: () => fetchApi<Record<string, string>>("/settings"),
  calculatorSettings: () => fetchApi<Record<string, string>>("/settings/calculator"),
  pages: () => fetchApi("/pages"),
  page: (slug: string) => fetchApi<CmsPage>(`/pages/${slug}`),
  pageByType: (type: string) => fetchApi<CmsPage>(`/pages/type/${type}`),
  blogs: () => fetchApi<Paginated<BlogPost>>("/blogs"),
  blog: (slug: string) => fetchApi<BlogPost>(`/blogs/${slug}`),
  events: () => fetchApi<Paginated<EventItem>>("/events"),
  event: (slug: string) => fetchApi<EventItem>(`/events/${slug}`),
  projects: () => fetchApi<Paginated<Project>>("/projects"),
  project: (slug: string) => fetchApi<Project>(`/projects/${slug}`),
  boardMembers: () => fetchApi<BoardMember[]>("/board-members"),
  media: (type?: string) => fetchApi<MediaItem[]>(`/media${type ? `?type=${type}` : ""}`),
  compliance: () => fetchApi<ComplianceReport[]>("/compliance"),
  donationsReceived: () => fetchApi("/donations/received"),
  submitDonation: (data: object) =>
    fetch(`${API_BASE}/donations`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  submitContact: (data: object) =>
    fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
};

export function mediaUrl(path?: string | null): string {
  if (!path) return "/images/causes/cause-1.jpg";
  if (path.startsWith("http")) return path;
  // Paths served from Next.js /public (e.g. /images/causes/cause-1.jpg)
  if (path.startsWith("/images/")) return path;
  const backend =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    (process.env.NODE_ENV === "production" ? PRODUCTION_BACKEND_URL : LOCAL_BACKEND_URL);
  return `${backend}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function getHomeData(): Promise<HomeData | null> {
  try {
    return await api.home();
  } catch {
    return null;
  }
}

export async function getSettings(): Promise<Record<string, string>> {
  try {
    return await api.settings();
  } catch {
    return {};
  }
}
