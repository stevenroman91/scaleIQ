import Link from "next/link";
import { GraduationCap, BookOpen, Phone, TrendingUp, Award, FileText } from "lucide-react";

const navigation = [
  { name: "Modules", href: "/academy/modules", icon: BookOpen },
  { name: "Simulation", href: "/academy/simulation", icon: Phone },
  { name: "Progression", href: "/academy/progress", icon: TrendingUp },
  { name: "Wiki", href: "/academy/wiki", icon: FileText },
  { name: "Onboarding", href: "/academy/onboarding", icon: Award },
];

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            <span className="font-bold">ScaleAcademy</span>
          </Link>
          <nav className="flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
