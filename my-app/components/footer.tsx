import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";


export function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span className="inline-block h-5 w-5 rounded bg-gradient-to-br from-emerald-500 to-sky-500" />
            AI Verify
          </div>
          <p className="mt-3 text-sm text-foreground/70">AI content verification for media and education.</p>
        </div>
        <div>
          <div className="text-sm font-medium">Product</div>
          <ul className="mt-3 space-y-2 text-sm text-foreground/70">
            <li><Link href="/upload" className="hover:opacity-80">Upload</Link></li>
            <li><Link href="/pricing" className="hover:opacity-80">Pricing</Link></li>
            <li><Link href="/about" className="hover:opacity-80">About</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-foreground/70">
            <li><Link href="/contact" className="hover:opacity-80">Contact</Link></li>
            <li><a className="hover:opacity-80" href="#">Careers</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium">Follow</div>
          <div className="mt-3 flex gap-3 text-foreground/70">
            <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter size={18} /></a>
            <a href="#" aria-label="GitHub" className="hover:text-foreground"><Github size={18} /></a>
            <a href="/contact" aria-label="Email" className="hover:text-foreground"><Mail size={18} /></a>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-foreground/70">
          <p>© {new Date().getFullYear()} AI Verify. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:opacity-80" href="#">Terms</a>
            <a className="hover:opacity-80" href="#">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


