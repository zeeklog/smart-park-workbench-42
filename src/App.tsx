
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import ConversationsPage from "./pages/ConversationsPage";
import CustomerProfilesPage from "./pages/CustomerProfilesPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import NotFound from "./pages/NotFound";

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
          <Route path="/service-overview" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/service-reports" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/complaints" element={<MainLayout><ComplaintsPage /></MainLayout>} />
          <Route path="/customer-visits" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/customer-profiles" element={<MainLayout><CustomerProfilesPage /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
