// "use client";

// import { Building2, Calendar, Code2, GraduationCap, Rocket, Users } from "lucide-react";

// const POINTERS = [
//   { label: "Developers", href: "#developers", icon: Code2, desc: "1,200+ builders" },
//   { label: "Startups", href: "#startups", icon: Rocket, desc: "25+ startups" },
//   { label: "Companies", href: "#companies", icon: Building2, desc: "Hiring now" },
//   { label: "Communities", href: "#communities", icon: Users, desc: "4 guilds" },
//   { label: "Events", href: "#events", icon: Calendar, desc: "Monthly meetups" },
//   { label: "Students", href: "#students", icon: GraduationCap, desc: "Campus programs" },
// ];

// export function PointerNav() {
//   return (
//     <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
//       {/* <div className="rounded-2xl border border-border/70 bg-card p-3 sm:p-4 shadow-xs">
//         <div className="flex items-center justify-between gap-2 mb-3">
//           <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
//             <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
//             Explore ecosystem
//           </p>
//           <span className="hidden sm:inline-flex text-[11px] text-muted-foreground font-medium">Jump to section →</span>
//         </div>

//         <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5" aria-label="Pointer navigation">
//           {POINTERS.map((item) => {
//             const Icon = item.icon;
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={cn(
//                   "group flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 px-3.5 py-3 transition-all duration-200",
//                   "hover:border-primary/40 hover:shadow-xs hover:bg-card"
//                 )}
//               >
//                 <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
//                   <Icon className="h-4 w-4" />
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-none">
//                     {item.label}
//                   </p>
//                   <p className="text-[10px] text-muted-foreground font-medium mt-1 leading-none">{item.desc}</p>
//                 </div>
//                 <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:block" />
//               </Link>
//             );
//           })}
//         </nav>
//       </div> */}
//     </section>
//   );
// }
