import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Home from '../app/page'

// Import tutorial pages
import GettingStarted from '../app/tutorials/getting-started/page'
import TechnicalImplementation from '../app/tutorials/technical-implementation/page'
import Advanced from '../app/tutorials/advanced/page'

// Import other pages
import ApiDocs from '../app/api-docs/page'
import UseCases from '../app/use-cases/page'
import Resources from '../app/resources/page'
import Blog from '../app/blog/page'
import FAQ from '../app/faq/page'

function App() {
  return (
    <>
      <Helmet>
        <title>VEX Aware Tutorial - Complete Guide to Vulnerability Management</title>
        <meta name="description" content="Learn VEX Aware from basics to advanced. Free tutorials on vulnerability exploitability, SBOM integration, container security, and compliance." />
      </Helmet>
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Tutorial Routes */}
        <Route path="/tutorials/getting-started" element={<GettingStarted />} />
        <Route path="/tutorials/technical-implementation" element={<TechnicalImplementation />} />
        <Route path="/tutorials/advanced" element={<Advanced />} />
        
        {/* Other Routes */}
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </>
  )
}

export default App
