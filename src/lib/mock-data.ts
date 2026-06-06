// Centralized mock data for the NexSpace ERP demo.
import {
  Users, Building2, CalendarDays, DollarSign, Activity,
} from "lucide-react";

export const ORG = {
  name: "NexSpace",
  tagline: "The Operating System for Modern Coworking",
};

export const BRANCHES = [
  { id: "blr-koramangala", name: "Bangalore — Koramangala", city: "Bangalore", occupancy: 87, seats: 240 },
  { id: "blr-indiranagar", name: "Bangalore — Indiranagar", city: "Bangalore", occupancy: 72, seats: 180 },
  { id: "mum-bkc", name: "Mumbai — BKC", city: "Mumbai", occupancy: 94, seats: 320 },
  { id: "del-cp", name: "Delhi — Connaught Place", city: "Delhi", occupancy: 65, seats: 200 },
  { id: "hyd-hitec", name: "Hyderabad — Hitec City", city: "Hyderabad", occupancy: 81, seats: 260 },
];

export const KPIS = [
  { label: "Occupancy Rate", value: "82.4%", delta: "+4.2%", trend: "up" as const, icon: Activity, accent: "primary" },
  { label: "Monthly Revenue", value: "₹48.2L", delta: "+12.8%", trend: "up" as const, icon: DollarSign, accent: "success" },
  { label: "Active Members", value: "1,284", delta: "+86", trend: "up" as const, icon: Users, accent: "info" },
  { label: "Pending Renewals", value: "37", delta: "-5", trend: "down" as const, icon: CalendarDays, accent: "warning" },
];

export const REVENUE_SERIES = [
  { m: "Jan", revenue: 28, target: 32 },
  { m: "Feb", revenue: 31, target: 34 },
  { m: "Mar", revenue: 35, target: 36 },
  { m: "Apr", revenue: 33, target: 38 },
  { m: "May", revenue: 40, target: 40 },
  { m: "Jun", revenue: 42, target: 42 },
  { m: "Jul", revenue: 39, target: 44 },
  { m: "Aug", revenue: 46, target: 46 },
  { m: "Sep", revenue: 48, target: 48 },
];

export const OCCUPANCY_SERIES = [
  { d: "Mon", val: 78 }, { d: "Tue", val: 84 }, { d: "Wed", val: 91 },
  { d: "Thu", val: 88 }, { d: "Fri", val: 79 }, { d: "Sat", val: 42 }, { d: "Sun", val: 28 },
];

export const ACTIVITY_FEED = [
  { who: "Priya Sharma", what: "checked in to Hot Desk", where: "BLR Koramangala · Floor 2", time: "2m ago", color: "success" },
  { who: "Acme Corp", what: "renewed annual contract", where: "₹4,80,000 · 24 seats", time: "18m ago", color: "primary" },
  { who: "Visitor: R. Iyer", what: "awaiting host approval", where: "Reception · MUM BKC", time: "31m ago", color: "warning" },
  { who: "Karan M.", what: "booked Boardroom Aurora", where: "3:00 PM · 1 hour", time: "1h ago", color: "info" },
  { who: "Invoice #INV-2841", what: "marked as paid", where: "₹1,20,000 · UPI", time: "2h ago", color: "success" },
  { who: "Lead: Stripe India", what: "moved to Negotiation", where: "Owner: Anita R.", time: "3h ago", color: "primary" },
];

// CRM
export const PIPELINE_STAGES = [
  { id: "new", name: "New", color: "info" },
  { id: "qualified", name: "Qualified", color: "primary" },
  { id: "tour", name: "Tour Scheduled", color: "warning" },
  { id: "proposal", name: "Proposal Sent", color: "chart-5" },
  { id: "negotiation", name: "Negotiation", color: "warning" },
  { id: "won", name: "Won", color: "success" },
] as const;

export type Lead = {
  id: string; company: string; contact: string; seats: number; value: number;
  stage: typeof PIPELINE_STAGES[number]["id"]; owner: string; score: number; source: string;
};

export const LEADS: Lead[] = [
  { id: "L-1001", company: "Linear Labs", contact: "Karri Saarinen", seats: 18, value: 540000, stage: "new", owner: "Anita R.", score: 72, source: "Website" },
  { id: "L-1002", company: "Vercel India", contact: "Guillermo R.", seats: 32, value: 980000, stage: "qualified", owner: "Anita R.", score: 88, source: "Referral" },
  { id: "L-1003", company: "Notion APAC", contact: "Ivan Z.", seats: 24, value: 720000, stage: "qualified", owner: "Rohit P.", score: 81, source: "LinkedIn" },
  { id: "L-1004", company: "Framer Studio", contact: "Koen B.", seats: 12, value: 360000, stage: "tour", owner: "Anita R.", score: 76, source: "Cold Email" },
  { id: "L-1005", company: "Stripe India", contact: "Patrick C.", seats: 48, value: 1440000, stage: "tour", owner: "Rohit P.", score: 92, source: "Event" },
  { id: "L-1006", company: "Figma APAC", contact: "Dylan F.", seats: 20, value: 600000, stage: "proposal", owner: "Anita R.", score: 84, source: "Referral" },
  { id: "L-1007", company: "Loom Media", contact: "Joe T.", seats: 8, value: 240000, stage: "proposal", owner: "Meera K.", score: 68, source: "Website" },
  { id: "L-1008", company: "Arc Internet", contact: "Josh M.", seats: 16, value: 480000, stage: "negotiation", owner: "Rohit P.", score: 90, source: "Referral" },
  { id: "L-1009", company: "Raycast Inc", contact: "Thomas P.", seats: 10, value: 300000, stage: "negotiation", owner: "Anita R.", score: 78, source: "LinkedIn" },
  { id: "L-1010", company: "Anthropic IN", contact: "Dario A.", seats: 40, value: 1200000, stage: "won", owner: "Rohit P.", score: 96, source: "Event" },
  { id: "L-1011", company: "OpenAI India", contact: "Sam A.", seats: 60, value: 1800000, stage: "won", owner: "Anita R.", score: 98, source: "Referral" },
];

// Clients
export const CLIENTS = [
  { id: "C-501", name: "Acme Corp", plan: "Dedicated 24 seats", branch: "BLR Koramangala", mrr: 480000, status: "Active", since: "Jan 2024", renewal: "Mar 2026" },
  { id: "C-502", name: "Globex Inc.", plan: "Hot Desk 12 passes", branch: "MUM BKC", mrr: 96000, status: "Active", since: "Aug 2024", renewal: "Aug 2026" },
  { id: "C-503", name: "Initech", plan: "Private Cabin 6", branch: "DEL CP", mrr: 180000, status: "At Risk", since: "Feb 2023", renewal: "Dec 2025" },
  { id: "C-504", name: "Hooli", plan: "Dedicated 40 seats", branch: "HYD Hitec", mrr: 920000, status: "Active", since: "May 2024", renewal: "May 2026" },
  { id: "C-505", name: "Soylent Co.", plan: "Hot Desk 6 passes", branch: "BLR Indiranagar", mrr: 48000, status: "Trial", since: "Nov 2025", renewal: "Dec 2025" },
];

// Floor map
export type Seat = {
  id: string; x: number; y: number; type: "hot" | "dedicated" | "cabin" | "meeting";
  status: "available" | "occupied" | "reserved" | "maintenance";
  member?: string;
};

function makeFloor(): Seat[] {
  const seats: Seat[] = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 10; c++) {
      const id = `D-${r}-${c}`;
      const rand = (r * 10 + c) % 7;
      const status =
        rand === 0 ? "available" : rand === 5 ? "reserved" : rand === 6 ? "maintenance" : "occupied";
      seats.push({
        id, x: 80 + c * 70, y: 80 + r * 70,
        type: r < 2 ? "hot" : "dedicated",
        status,
        member: status === "occupied" ? ["P. Sharma", "K. Mehta", "A. Rao", "S. Iyer", "M. Khan"][(r + c) % 5] : undefined,
      });
    }
  }
  for (let i = 0; i < 4; i++) {
    seats.push({
      id: `CAB-${i}`, x: 820, y: 100 + i * 110, type: "cabin",
      status: i === 2 ? "available" : "occupied",
      member: i !== 2 ? ["Acme Corp", "Hooli", "Initech"][i % 3] : undefined,
    });
  }
  seats.push({ id: "MR-Aurora", x: 200, y: 20, type: "meeting", status: "occupied", member: "Aurora" });
  seats.push({ id: "MR-Nebula", x: 420, y: 20, type: "meeting", status: "available", member: "Nebula" });
  seats.push({ id: "MR-Orion", x: 640, y: 20, type: "meeting", status: "reserved", member: "Orion" });
  return seats;
}
export const FLOOR_SEATS = makeFloor();

// Meeting rooms & bookings
export const ROOMS = [
  { id: "aurora", name: "Aurora", capacity: 12, floor: "2nd Floor", amenities: ["TV", "Whiteboard", "Zoom"] },
  { id: "nebula", name: "Nebula", capacity: 6, floor: "2nd Floor", amenities: ["TV", "Whiteboard"] },
  { id: "orion", name: "Orion", capacity: 20, floor: "3rd Floor", amenities: ["Projector", "Conf Cam", "Mic Array"] },
  { id: "vega", name: "Vega", capacity: 4, floor: "1st Floor", amenities: ["TV"] },
  { id: "lyra", name: "Lyra Phone Booth", capacity: 1, floor: "All Floors", amenities: ["Soundproof"] },
];

export const BOOKINGS = [
  { id: "B1", roomId: "aurora", title: "Quarterly Review", start: 9, end: 11, by: "Acme Corp", color: "primary" },
  { id: "B2", roomId: "aurora", title: "Design Crit", start: 14, end: 15, by: "Linear Labs", color: "info" },
  { id: "B3", roomId: "nebula", title: "1:1 with Maya", start: 10, end: 11, by: "Karan M.", color: "success" },
  { id: "B4", roomId: "nebula", title: "Sales Standup", start: 15, end: 16, by: "Sales Team", color: "warning" },
  { id: "B5", roomId: "orion", title: "All Hands", start: 11, end: 13, by: "Hooli", color: "primary" },
  { id: "B6", roomId: "orion", title: "Investor Demo", start: 16, end: 18, by: "Initech", color: "chart-5" },
  { id: "B7", roomId: "vega", title: "Customer Call", start: 9, end: 10, by: "Globex Inc.", color: "info" },
  { id: "B8", roomId: "vega", title: "Interview: A. Rao", start: 13, end: 14, by: "HR", color: "success" },
  { id: "B9", roomId: "lyra", title: "Focus Block", start: 10, end: 12, by: "P. Sharma", color: "info" },
];

// Visitors
export const VISITORS = [
  { id: "V-9012", name: "Rohan Iyer", company: "Sequoia Capital", host: "Karan M.", purpose: "Investor Meeting", status: "Awaiting", checkIn: "10:42 AM", badge: "VIP" },
  { id: "V-9013", name: "Aditi Singh", company: "Lightspeed", host: "Anita R.", purpose: "Pitch", status: "Checked In", checkIn: "11:05 AM", badge: "Guest" },
  { id: "V-9014", name: "Marcus Lee", company: "Accel", host: "Rohit P.", purpose: "Coffee Chat", status: "Checked Out", checkIn: "09:15 AM", badge: "Guest" },
  { id: "V-9015", name: "Priyanka B.", company: "Freelancer", host: "Meera K.", purpose: "Day Pass", status: "Checked In", checkIn: "10:00 AM", badge: "Day Pass" },
  { id: "V-9016", name: "Daniel Kim", company: "Stripe", host: "Anita R.", purpose: "Partnership", status: "Awaiting", checkIn: "11:30 AM", badge: "VIP" },
];

// Invoices & Billing
export type Invoice = {
  id: string; client: string; amount: number; issued: string; due: string;
  status: "Paid" | "Pending" | "Overdue" | "Draft"; method?: string;
};
export const INVOICES: Invoice[] = [
  { id: "INV-2851", client: "Acme Corp", amount: 480000, issued: "May 01", due: "May 15", status: "Paid", method: "NEFT" },
  { id: "INV-2852", client: "Hooli", amount: 920000, issued: "May 01", due: "May 15", status: "Paid", method: "UPI" },
  { id: "INV-2853", client: "Globex Inc.", amount: 96000, issued: "May 03", due: "May 17", status: "Pending" },
  { id: "INV-2854", client: "Initech", amount: 180000, issued: "Apr 20", due: "May 04", status: "Overdue" },
  { id: "INV-2855", client: "Soylent Co.", amount: 48000, issued: "May 10", due: "May 24", status: "Pending" },
  { id: "INV-2856", client: "Linear Labs", amount: 540000, issued: "May 12", due: "May 26", status: "Draft" },
  { id: "INV-2857", client: "Vercel India", amount: 980000, issued: "May 14", due: "May 28", status: "Pending" },
  { id: "INV-2858", client: "Stripe India", amount: 1440000, issued: "May 15", due: "May 29", status: "Paid", method: "Wire" },
];

export const BILLING_SERIES = [
  { m: "Dec", paid: 32, outstanding: 6 },
  { m: "Jan", paid: 36, outstanding: 8 },
  { m: "Feb", paid: 40, outstanding: 5 },
  { m: "Mar", paid: 42, outstanding: 7 },
  { m: "Apr", paid: 45, outstanding: 9 },
  { m: "May", paid: 48, outstanding: 12 },
];

// Contracts / Memberships
export type Contract = {
  id: string; client: string; plan: string; seats: number; value: number;
  start: string; end: string; auto: boolean; status: "Active" | "Renewing" | "Ending" | "Draft";
};
export const CONTRACTS: Contract[] = [
  { id: "CT-7001", client: "Acme Corp", plan: "Dedicated · Annual", seats: 24, value: 5760000, start: "Mar 2024", end: "Mar 2026", auto: true, status: "Active" },
  { id: "CT-7002", client: "Hooli", plan: "Enterprise · Annual", seats: 40, value: 11040000, start: "May 2024", end: "May 2026", auto: true, status: "Active" },
  { id: "CT-7003", client: "Initech", plan: "Private Cabin · Annual", seats: 6, value: 2160000, start: "Dec 2024", end: "Dec 2025", auto: false, status: "Ending" },
  { id: "CT-7004", client: "Globex Inc.", plan: "Hot Desk · Quarterly", seats: 12, value: 288000, start: "Aug 2025", end: "Aug 2026", auto: true, status: "Renewing" },
  { id: "CT-7005", client: "Soylent Co.", plan: "Trial · Monthly", seats: 6, value: 48000, start: "Nov 2025", end: "Dec 2025", auto: false, status: "Draft" },
  { id: "CT-7006", client: "Anthropic IN", plan: "Enterprise · 2-Year", seats: 40, value: 24000000, start: "Jan 2026", end: "Jan 2028", auto: true, status: "Draft" },
];

export const MEMBERSHIP_PLANS = [
  { id: "hot", name: "Hot Desk", price: 8000, period: "/mo", features: ["Open seating", "5 day passes", "Wi-Fi & coffee"], color: "info" },
  { id: "dedicated", name: "Dedicated", price: 18000, period: "/mo", features: ["Reserved desk", "24/7 access", "Locker"], color: "primary" },
  { id: "cabin", name: "Private Cabin", price: 45000, period: "/mo", features: ["4–6 person room", "Branding", "Dedicated meeting hrs"], color: "chart-5" },
  { id: "enterprise", name: "Enterprise", price: 0, period: "Custom", features: ["Multi-branch", "SLA & SSO", "Account manager"], color: "success" },
];

// Helpdesk / Tickets
export type Ticket = {
  id: string; subject: string; member: string; branch: string;
  priority: "Low" | "Medium" | "High" | "Urgent"; status: "Open" | "In Progress" | "Resolved";
  assignee: string; category: string; created: string;
};
export const TICKETS: Ticket[] = [
  { id: "T-2101", subject: "AC in Aurora room not cooling", member: "Acme Corp", branch: "BLR Kora", priority: "High", status: "In Progress", assignee: "Facilities", category: "Facilities", created: "12m ago" },
  { id: "T-2102", subject: "Need 2 extra monitors", member: "Linear Labs", branch: "BLR Ind", priority: "Medium", status: "Open", assignee: "IT", category: "IT", created: "1h ago" },
  { id: "T-2103", subject: "Wi-Fi dropping in Floor 3", member: "Hooli", branch: "HYD Hitec", priority: "Urgent", status: "In Progress", assignee: "Network", category: "IT", created: "2h ago" },
  { id: "T-2104", subject: "Add member access card", member: "Globex Inc.", branch: "MUM BKC", priority: "Low", status: "Resolved", assignee: "Reception", category: "Access", created: "5h ago" },
  { id: "T-2105", subject: "Invoice clarification — May", member: "Initech", branch: "DEL CP", priority: "Medium", status: "Open", assignee: "Billing", category: "Billing", created: "Yesterday" },
  { id: "T-2106", subject: "Coffee machine refill", member: "House", branch: "BLR Kora", priority: "Low", status: "Resolved", assignee: "Pantry", category: "Pantry", created: "Yesterday" },
];

// Events / Community
export type Event = {
  id: string; title: string; date: string; time: string; branch: string;
  type: "Workshop" | "Networking" | "Talk" | "Wellness"; rsvps: number; capacity: number; host: string;
};
export const EVENTS: Event[] = [
  { id: "E-301", title: "Founder Fireside: Scaling SaaS in APAC", date: "May 28", time: "6:00 PM", branch: "BLR Koramangala", type: "Talk", rsvps: 87, capacity: 120, host: "Anita R." },
  { id: "E-302", title: "Pizza & Pitch Night", date: "May 30", time: "7:30 PM", branch: "MUM BKC", type: "Networking", rsvps: 54, capacity: 80, host: "Rohit P." },
  { id: "E-303", title: "Design Systems Workshop", date: "Jun 03", time: "11:00 AM", branch: "BLR Indiranagar", type: "Workshop", rsvps: 32, capacity: 40, host: "Meera K." },
  { id: "E-304", title: "Rooftop Yoga", date: "Jun 05", time: "7:00 AM", branch: "HYD Hitec", type: "Wellness", rsvps: 18, capacity: 25, host: "House" },
  { id: "E-305", title: "AI for Coworking Operators", date: "Jun 08", time: "3:00 PM", branch: "DEL CP", type: "Talk", rsvps: 96, capacity: 100, host: "Karan M." },
];

export const COMMUNITY_POSTS = [
  { id: "P1", author: "Priya Sharma", company: "Linear Labs", time: "5m", text: "Anyone up for a coffee chat on B2B onboarding? I'm in Aurora till 4.", likes: 12, replies: 3 },
  { id: "P2", author: "Karan M.", company: "House", time: "1h", text: "🔥 Friday demo day signups are live — pitch in front of 6 VCs.", likes: 48, replies: 14 },
  { id: "P3", author: "Aditi Singh", company: "Lightspeed", time: "3h", text: "Hiring a senior backend eng for our portfolio co. DM me!", likes: 22, replies: 7 },
];

// Analytics — extra series
export const REVENUE_BY_BRANCH = [
  { branch: "MUM BKC", value: 18.4 },
  { branch: "BLR Kora", value: 14.2 },
  { branch: "HYD Hitec", value: 11.8 },
  { branch: "DEL CP", value: 8.1 },
  { branch: "BLR Ind", value: 6.9 },
];

export const CHURN_SERIES = [
  { m: "Dec", churn: 3.2, nps: 58 },
  { m: "Jan", churn: 2.8, nps: 61 },
  { m: "Feb", churn: 2.4, nps: 64 },
  { m: "Mar", churn: 2.9, nps: 62 },
  { m: "Apr", churn: 2.1, nps: 68 },
  { m: "May", churn: 1.8, nps: 71 },
];

export const LEAD_SOURCE_MIX = [
  { name: "Referral", value: 38, color: "primary" },
  { name: "Website", value: 24, color: "info" },
  { name: "LinkedIn", value: 18, color: "chart-5" },
  { name: "Event", value: 12, color: "success" },
  { name: "Cold Email", value: 8, color: "warning" },
];

// Team / HR
export type TeamMember = {
  id: string; name: string; role: string; branch: string; email: string;
  status: "Active" | "On Leave" | "Remote"; avatar: string;
};
export const TEAM: TeamMember[] = [
  { id: "U-01", name: "Anita Rao", role: "Head of Sales", branch: "BLR Kora", email: "anita@nexspace.io", status: "Active", avatar: "AR" },
  { id: "U-02", name: "Rohit Pillai", role: "Account Executive", branch: "MUM BKC", email: "rohit@nexspace.io", status: "Active", avatar: "RP" },
  { id: "U-03", name: "Meera Khan", role: "Community Manager", branch: "BLR Ind", email: "meera@nexspace.io", status: "Active", avatar: "MK" },
  { id: "U-04", name: "Karan Mehta", role: "City Lead — Delhi", branch: "DEL CP", email: "karan@nexspace.io", status: "On Leave", avatar: "KM" },
  { id: "U-05", name: "Sneha Iyer", role: "Facilities Lead", branch: "HYD Hitec", email: "sneha@nexspace.io", status: "Active", avatar: "SI" },
  { id: "U-06", name: "Vikram Joshi", role: "Finance Manager", branch: "BLR Kora", email: "vikram@nexspace.io", status: "Remote", avatar: "VJ" },
  { id: "U-07", name: "Priya Nair", role: "IT & Network", branch: "MUM BKC", email: "priya@nexspace.io", status: "Active", avatar: "PN" },
  { id: "U-08", name: "Arjun Das", role: "Customer Success", branch: "BLR Kora", email: "arjun@nexspace.io", status: "Active", avatar: "AD" },
];

export const HR_KPIS = [
  { label: "Headcount", value: "42" },
  { label: "Open Roles", value: "6" },
  { label: "Avg Tenure", value: "2.4y" },
  { label: "eNPS", value: "+58" },
];
