import './globals.css'

export const metadata = {
  title: 'Divide & Conquer Visualizer',
  description: 'Step-by-step visualization of divide and conquer algorithms',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="fixed top-0 w-full z-50 border-b border-border bg-bg/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <a href="/" className="font-display font-bold text-lg text-accent">
              D&C<span className="text-text">Viz</span>
            </a>
            <span className="font-mono text-xs text-muted">
              Divide → Conquer → Combine
            </span>
          </div>
        </nav>
        <main className="pt-14 min-h-screen bg-bg">
          {children}
        </main>
      </body>
    </html>
  )
}