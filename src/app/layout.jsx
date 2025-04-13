import './globals.css';

export const metadata = {
  title: 'Acid-Base Titration Calculator',
  description: 'Interactive tool for visualizing acid-base titration curves',
}

// Define o ano atual como uma constante para evitar problemas de hidratação
const currentYear = 2025;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-50">
          <header className="bg-blue-700 text-white p-4 shadow-md">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold">Acid-Base Titration Calculator</h1>
              <p className="text-blue-100">Visualize titration curves for strong acid-strong base reactions</p>
            </div>
          </header>
          
          <div className="max-w-6xl mx-auto p-4">
            {children}
          </div>
          
          <footer className="bg-gray-100 border-t border-gray-300 p-4 mt-10">
            <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
              <p> ©{currentYear} Acid-Base Titration Calculator</p>
              <p className="mt-1">Developed for Chemistry Education</p>
            </div>
          </footer>
        </main>
      </body>
    </html>
  )
}