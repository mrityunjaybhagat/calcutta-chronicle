import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchOverlay from './components/SearchOverlay'
import { AuthProvider } from './AuthContext'

import Home from './pages/Home'
import ArticleListing from './pages/ArticleListing'
import SingleArticle from './pages/SingleArticle'
import Magazines from './pages/Magazines'
import About from './pages/About'
import Membership from './pages/Membership'
import Login from './pages/Login'
import Kaleidoscope from './pages/Kaleidoscope'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  return (
    <AuthProvider>
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <main key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tales" element={<ArticleListing />} />
          <Route path="/category/:slug" element={<ArticleListing />} />
          <Route path="/article/:slug" element={<SingleArticle />} />
          <Route path="/magazines" element={<Magazines />} />
          <Route path="/kaleidoscope" element={<Kaleidoscope />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </AuthProvider>
  )
}
