export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-background-light">
      {/* inner centré */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-10 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="text-secondary">
            </div>
            <span className="text-sm text-slate-500">© {new Date().getFullYear()} Runalytics. Tous droits réservés.</span>
          </div>

          <nav className="flex items-center gap-6">
            <a className="text-sm font-medium text-slate-600 hover:text-secondary transition-colors" href="#">
              Mentions légales
            </a>
            <a className="text-sm font-medium text-slate-600 hover:text-secondary transition-colors" href="#">
              Confidentialité
            </a>
            <a className="text-sm font-medium text-slate-600 hover:text-secondary transition-colors" href="#">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>

  )
}