"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  Building2, 
  MessageSquare, 
  DollarSign,
  LogOut,
  Settings,
  MoreVertical
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";

type AdminTab = "overview" | "users" | "properties" | "inquiries" | "settings";

const mockStats = [
  {
    title: "Total Users",
    value: "1,245",
    change: "+12%",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Total Properties",
    value: "128",
    change: "+5%",
    icon: Building2,
    color: "text-green-500",
  },
  {
    title: "Pending Inquiries",
    value: "23",
    change: "-2%",
    icon: MessageSquare,
    color: "text-orange-500",
  },
  {
    title: "Revenue",
    value: "$45,231",
    change: "+18%",
    icon: DollarSign,
    color: "text-purple-500",
  },
];

const mockUsers = [
  { id: 1, name: "Jean Dupont", email: "jean@example.com", status: "Active", joinDate: "2024-01-15" },
  { id: 2, name: "Marie Laurent", email: "marie@example.com", status: "Active", joinDate: "2024-02-10" },
  { id: 3, name: "Pierre Martin", email: "pierre@example.com", status: "Inactive", joinDate: "2024-01-20" },
];

const mockProperties = [
  { id: 1, title: "Villa Méditerranée", location: "Nice", price: "$2.5M", status: "Active" },
  { id: 2, title: "Château de la Loire", location: "Loire Valley", price: "$4.8M", status: "Active" },
  { id: 3, title: "Penthouse Étoile", location: "Paris", price: "$3.2M", status: "Pending" },
];

const mockInquiries = [
  { id: 1, name: "John Smith", property: "Villa Méditerranée", message: "Interested in viewing", date: "2024-03-15", status: "Pending" },
  { id: 2, name: "Sarah Johnson", property: "Penthouse Étoile", message: "Negotiation inquiry", date: "2024-03-14", status: "Responded" },
  { id: 3, name: "Alex Brown", property: "Château de la Loire", message: "Schedule visit", date: "2024-03-13", status: "Closed" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push("/login");
          return;
        }

        const userRole = session?.user?.user_metadata?.role || "user";
        
        if (userRole !== "admin") {
          router.push("/account");
          return;
        }

        setUser(session.user);
        setIsAdmin(true);
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

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-32 pb-12">
        <div className="container mx-auto px-4">
          {/* Admin Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome, {user?.email || "Admin"}</p>
            </div>
            <Button
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === "users"
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("properties")}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === "properties"
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === "inquiries"
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Inquiries
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === "settings"
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Settings
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={index} className="border-gold/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-muted-foreground text-sm">{stat.title}</p>
                            <p className="font-serif text-3xl font-bold text-foreground mt-1">
                              {stat.value}
                            </p>
                            <p className="text-sm text-green-500 mt-1">{stat.change}</p>
                          </div>
                          <Icon className={`h-10 w-10 ${stat.color} opacity-80`} />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <Card className="border-gold/20">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-gold hover:bg-gold/90 text-primary-foreground">
                    Add Property
                  </Button>
                  <Button variant="outline" className="border-gold text-gold">
                    Manage Users
                  </Button>
                  <Button variant="outline" className="border-gold text-gold">
                    View Reports
                  </Button>
                  <Button variant="outline" className="border-gold text-gold">
                    Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <Card className="border-gold/20">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Join Date</th>
                        <th className="text-center py-3 px-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((u) => (
                        <tr key={u.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4">{u.name}</td>
                          <td className="py-3 px-4">{u.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              u.status === "Active"
                                ? "bg-green-500/20 text-green-700"
                                : "bg-red-500/20 text-red-700"
                            }`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{u.joinDate}</td>
                          <td className="py-3 px-4 text-center">
                            <button className="p-1 hover:bg-muted rounded">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Properties Tab */}
          {activeTab === "properties" && (
            <Card className="border-gold/20">
              <CardHeader>
                <CardTitle>Property Management</CardTitle>
                <CardDescription>Manage all properties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Title</th>
                        <th className="text-left py-3 px-4 font-semibold">Location</th>
                        <th className="text-left py-3 px-4 font-semibold">Price</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-center py-3 px-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProperties.map((property) => (
                        <tr key={property.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4">{property.title}</td>
                          <td className="py-3 px-4">{property.location}</td>
                          <td className="py-3 px-4">{property.price}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              property.status === "Active"
                                ? "bg-green-500/20 text-green-700"
                                : "bg-yellow-500/20 text-yellow-700"
                            }`}>
                              {property.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button className="p-1 hover:bg-muted rounded">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Inquiries Tab */}
          {activeTab === "inquiries" && (
            <Card className="border-gold/20">
              <CardHeader>
                <CardTitle>Inquiry Management</CardTitle>
                <CardDescription>Manage user inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 font-semibold">Property</th>
                        <th className="text-left py-3 px-4 font-semibold">Message</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockInquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4">{inquiry.name}</td>
                          <td className="py-3 px-4">{inquiry.property}</td>
                          <td className="py-3 px-4 truncate">{inquiry.message}</td>
                          <td className="py-3 px-4">{inquiry.date}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              inquiry.status === "Pending"
                                ? "bg-orange-500/20 text-orange-700"
                                : inquiry.status === "Responded"
                                ? "bg-blue-500/20 text-blue-700"
                                : "bg-gray-500/20 text-gray-700"
                            }`}>
                              {inquiry.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <Card className="border-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Admin Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-b border-border pb-6">
                    <h3 className="font-semibold mb-4">Platform Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="font-medium">Enable Registrations</label>
                        <input type="checkbox" defaultChecked className="h-5 w-5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="font-medium">Require Email Verification</label>
                        <input type="checkbox" defaultChecked className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Admin Account</h3>
                    <Button variant="outline" className="border-gold text-gold">
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}