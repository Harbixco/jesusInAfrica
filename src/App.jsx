import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/common/ScrollToTop'
import PageLayout from './components/layout/PageLayout'

import Home from './pages/Home'
import About from './pages/About'
import Posts from './pages/Posts'
import PostDetail from './pages/PostDetail'
import Events from './pages/Events'
import Connect from './pages/Connect'
import Testimonies from './pages/Testimonies'
import Prayer from './pages/Prayer'
import Contact from './pages/Contact'
import Donate from './pages/Donate'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:slug" element={<PostDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/testimonies" element={<Testimonies />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/lets-pray-with-you" element={<Prayer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageLayout>
    </>
  )
}
