"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UserProfileCard } from "@/components/user/user-profile-card";
import { SavedPropertiesList } from "@/components/user/saved-properties-list";
import { InquiriesList } from "@/components/user/inquiries-list";
import { AccountSettings } from "@/components/user/account-settings";
import { mockUser } from "@/lib/user";
import { Heart, MessageSquare, Settings, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";

type Tab = "profile" | "saved" | "inquiries" | "settings";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const mockUserData = mockUser;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push("/login");
          return;
        }

        const userRole = session?.user?.user_metadata?.role || "user";
        
        if (userRole === "admin") {
          router.push("/admin");
          return;
        }

        setUser(session.user);
        setLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const tabs = [
    { id: "profile" as Tab, label: "Mon Profil", icon: User },
    { id: "saved" as Tab, label: "Favoris", icon: Heart, count: mockUserData.savedProperties.length },
    { id: "inquiries" as Tab, label: "Mes Demandes", icon: MessageSquare, count: mockUserData.inquiries.length },
    { id: "settings" as Tab, label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-primary-foreground text-balance">
                Mon Espace Personnel
              </h1>
              <p className="mt-2 text-primary-foreground/80">
                Bienvenue, {user?.email || "Utilisateur"}
              </p>
            </div>
            <Button
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:w-64 shrink-0">
              <nav className="bg-card rounded-lg border border-border p-2 sticky top-24">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                      {tab.count !== undefined && (
                        <span className={`ml-auto text-sm px-2 py-0.5 rounded-full ${
                          activeTab === tab.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {activeTab === "profile" && <UserProfileCard user={mockUserData} />}
              {activeTab === "saved" && <SavedPropertiesList savedProperties={mockUserData.savedProperties} />}
              {activeTab === "inquiries" && <InquiriesList inquiries={mockUserData.inquiries} />}
              {activeTab === "settings" && <AccountSettings user={mockUserData} />}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
