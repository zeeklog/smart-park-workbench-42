
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import ConversationsPage from "./pages/ConversationsPage";
import CustomerProfilesPage from "./pages/CustomerProfilesPage";
import CustomerProfileDetailsPage from "./pages/CustomerProfileDetailsPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import NotFound from "./pages/NotFound";
import NotificationSettingsPage from "./pages/NotificationSettingsPage";
import NotificationListPage from "./pages/NotificationListPage";
import CustomerVisitsPage from "./pages/CustomerVisitsPage";
import CustomerProfile2Page from "./pages/CustomerProfile2Page";
import CustomerProfile2DetailPage from "./pages/CustomerProfile2DetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/conversations" element={<MainLayout><ConversationsPage /></MainLayout>} />
          <Route path="/complaints" element={<MainLayout><ComplaintsPage /></MainLayout>} />
          <Route path="/customer-visits" element={<MainLayout><CustomerVisitsPage /></MainLayout>} />
          <Route path="/customer-profiles" element={<MainLayout><CustomerProfilesPage /></MainLayout>} />
          <Route path="/customer-profiles/:id" element={<MainLayout><CustomerProfileDetailsPage /></MainLayout>} />
          <Route path="/customer-profile2" element={<MainLayout><CustomerProfile2Page /></MainLayout>} />
          <Route path="/customer-profile2/:id" element={<MainLayout><CustomerProfile2DetailPage /></MainLayout>} />
          <Route path="/notification-settings" element={<MainLayout><NotificationSettingsPage /></MainLayout>} />
          <Route path="/notification-list" element={<MainLayout><NotificationListPage /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
