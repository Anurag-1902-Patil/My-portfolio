import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'

// Route-level code splitting — secondary pages load on demand.
const About = lazy(() => import('@/pages/About'))
const Experience = lazy(() => import('@/pages/Experience'))
const Projects = lazy(() => import('@/pages/Projects'))
const CaseStudy = lazy(() => import('@/pages/CaseStudy'))
const Skills = lazy(() => import('@/pages/Skills'))
const Proof = lazy(() => import('@/pages/Proof'))
const Updates = lazy(() => import('@/pages/Updates'))
const Achievements = lazy(() => import('@/pages/Achievements'))
const Resume = lazy(() => import('@/pages/Resume'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function PageFallback() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8" aria-label="Loading page">
      <div className="neu-inset h-8 w-40 animate-pulse rounded-lg" />
      <div className="neu-inset mt-4 h-14 w-full max-w-lg animate-pulse rounded-lg" />
      <div className="neu-inset mt-8 h-40 w-full animate-pulse rounded-2xl" />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={<PageFallback />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/experience"
          element={
            <Suspense fallback={<PageFallback />}>
              <Experience />
            </Suspense>
          }
        />
        <Route
          path="/projects"
          element={
            <Suspense fallback={<PageFallback />}>
              <Projects />
            </Suspense>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <Suspense fallback={<PageFallback />}>
              <CaseStudy />
            </Suspense>
          }
        />
        <Route
          path="/skills"
          element={
            <Suspense fallback={<PageFallback />}>
              <Skills />
            </Suspense>
          }
        />
        <Route
          path="/proof"
          element={
            <Suspense fallback={<PageFallback />}>
              <Proof />
            </Suspense>
          }
        />
        <Route
          path="/updates"
          element={
            <Suspense fallback={<PageFallback />}>
              <Updates />
            </Suspense>
          }
        />
        <Route
          path="/achievements"
          element={
            <Suspense fallback={<PageFallback />}>
              <Achievements />
            </Suspense>
          }
        />
        <Route
          path="/resume"
          element={
            <Suspense fallback={<PageFallback />}>
              <Resume />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<PageFallback />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
