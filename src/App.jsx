import { Routes, Route } from 'react-router-dom';

// Public Pages
import Home from './pages/public/Home';
import Projects from './pages/public/Projects';
import ProjectDetail from './pages/public/ProjectDetail';
import Skills from './pages/public/Skills';
import Experience from './pages/public/Experience';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Profile from './pages/admin/Profile';
import ProjectsManagement from './pages/admin/ProjectsManagement';
import SkillsManagement from './pages/admin/SkillsManagement';
import ExperienceManagement from './pages/admin/ExperienceManagement';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/experience" element={<Experience />} />

      {/* Admin Login (public) */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/projects" element={<ProjectsManagement />} />
          <Route path="/admin/skills" element={<SkillsManagement />} />
          <Route path="/admin/experience" element={<ExperienceManagement />} />
        </Route>
      </Route>

      {/* 404 - Catch all */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;