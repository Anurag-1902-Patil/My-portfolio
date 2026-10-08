import { NeoButton } from '@/components/NeoButton'
import { Seo } from '@/components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found — Anurag Patil" description="This page doesn't exist." />
      <div className="mx-auto flex max-w-2xl flex-col items-start px-5 py-20 sm:px-8">
        <p className="mono-label text-primary">404</p>
        <h1 className="display-tight mt-3 font-display text-4xl font-bold sm:text-5xl">
          Nothing lives here<span className="text-primary">.</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't exist — but the projects do.
        </p>
        <div className="mt-8 flex gap-3">
          <NeoButton to="/" variant="primary">
            Back home
          </NeoButton>
          <NeoButton to="/projects" variant="outline">
            See projects
          </NeoButton>
        </div>
      </div>
    </>
  )
}
