import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useAuthStore } from './store/auth';
import { useSidebarStore } from './store/sidebar';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Watch } from './pages/Watch';
import { Search } from './pages/Search';
import { Explore } from './pages/Explore';
import { Liked } from './pages/Liked';
import { Subscriptions } from './pages/Subscriptions';
import { History } from './pages/History';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

const queryClient = new QueryClient();

function App() {
  const { setUser, setLoading } = useAuthStore();
  const isOpen = useSidebarStore((state) => state.isOpen);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <Sidebar />
                  <main className={`pt-14 transition-all duration-300 ${
                    isOpen ? 'pl-64' : 'pl-16'
                  }`}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/watch/:id" element={<Watch />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/liked" element={<Liked />} />
                      <Route path="/subscriptions" element={<Subscriptions />} />
                      <Route path="/history" element={<History />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </main>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;