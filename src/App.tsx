import { Suspense, lazy, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import PageSkeleton from "./components/PageSkeleton";
import LoadingModal from "./components/LoadingModal";

const AnalyzePage = lazy(() => import("./pages/AnalyzePage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const InsightsPage = lazy(() => import("./pages/InsightsPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

const queryClient = new QueryClient();

const App = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return <LoadingModal />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <Suspense fallback={<PageSkeleton />}>
                  <AnalyzePage />
                </Suspense>
              } />
              <Route path="analyze" element={
                <Suspense fallback={<PageSkeleton />}>
                  <AnalyzePage />
                </Suspense>
              } />
              <Route path="history" element={
                <Suspense fallback={<PageSkeleton />}>
                  <HistoryPage />
                </Suspense>
              } />
              <Route path="insights" element={
                <Suspense fallback={<PageSkeleton />}>
                  <InsightsPage />
                </Suspense>
              } />
              <Route path="chat" element={
                <Suspense fallback={<PageSkeleton />}>
                  <ChatPage onCloseChat={() => {}} />
                </Suspense>
              } />
              <Route path="settings" element={
                <Suspense fallback={<PageSkeleton />}>
                  <SettingsPage />
                </Suspense>
              } />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

