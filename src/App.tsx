import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TutorialsPage from './pages/TutorialsPage'
import BlogPage from './pages/BlogPage'
import ApiDocsPage from './pages/ApiDocsPage'
import UseCasesPage from './pages/UseCasesPage'
import ResourcesPage from './pages/ResourcesPage'
import FAQPage from './pages/FAQPage'

function App() {
  return (
    <div className="min-h-screen antialiased">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tutorials/*" element={<TutorialsPage />} />
        <Route path="/blog/*" element={<BlogPage />} />
        <Route path="/api-docs/*" element={<ApiDocsPage />} />
        <Route path="/use-cases/*" element={<UseCasesPage />} />
        <Route path="/resources/*" element={<ResourcesPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </div>
  )
}

export default App
