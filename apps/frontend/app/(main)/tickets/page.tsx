import Link from 'next/link';
import TicketRecoveryForm from './TicketRecoveryForm';

export const metadata = {
  title: 'Find My Tickets | Tickpass',
  description: "Secure ticket retrieval for the modern attendee.",
};

export default function MyTicketsPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col md:flex-row selection:bg-primary-100 selection:text-primary-900">
      
      {/* Sidebar: Artistic Context */}
      <section className="md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 p-8 md:p-16 flex flex-col justify-between bg-gray-50/30">
        <div className="space-y-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-primary-400" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary-400 font-medium">
              Recovery Portal
            </span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl  leading-none tracking-tight text-primary-950 font-medium">
              Misplaced <br />
              <span className="italic text-primary-600">your entry?</span>
            </h1>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed font-medium">
              Our automated system will re-verify your purchase and deliver 
              your digital passes to your original inbox instantly.
            </p>
          </div>
        </div>

        <div className="hidden md:block pt-12">
          <div className="font-mono text-[9px] text-gray-300 uppercase tracking-widest leading-loose">
            Security Protocol: RSA-4096 <br />
            Status: System Ready
          </div>
        </div>
      </section>

      {/* Main Content: The Workspace */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 md:p-24 relative overflow-hidden">
        {/* Subtle Decorative Background Blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-[120px] -z-10 opacity-40 translate-x-1/3 -translate-y-1/3" />
        
        <div className="w-full max-w-md">
          <header className="mb-12">
            <span className="font-mono text-[10px] text-accent-600 font-bold tracking-widest uppercase inline-block mb-3 bg-accent-50 px-2 py-1">
              Phase 01 / Verify
            </span>
            <h2 className="text-3xl font-semibold text-gray-900">Identify Purchase</h2>
          </header>

          <TicketRecoveryForm />

          <footer className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs text-gray-400 italic">
              Still having trouble?{' '}
              <Link href="mailto:support@tickpass.com" className="text-primary-600 font-semibold hover:text-black transition-colors underline underline-offset-4 decoration-primary-200">
                Contact Support
              </Link>
            </p>
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-primary-100 rounded-full" />
              <div className="w-1.5 h-1.5 bg-primary-300 rounded-full" />
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}