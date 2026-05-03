import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import IncidentList from './components/IncidentList';
import IncidentDetail from './components/IncidentDetail';
import About from './components/About';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { AuthProvider } from './auth/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
            <Navigation />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/incidents" element={<IncidentList />} />
                <Route path="/incidents/:id" element={<IncidentDetail />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
