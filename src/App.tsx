
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import BookDetail from "./pages/BookDetail";
import Discussions from "./pages/Discussions";
import DiscussionDetail from "./pages/DiscussionDetail";
import MyPage from "./pages/MyPage";
import SellBook from "./pages/SellBook";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/discussions/:id" element={<DiscussionDetail />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/sell" element={<SellBook />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
