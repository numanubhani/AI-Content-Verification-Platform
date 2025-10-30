export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-foreground/70">
        <p>© {new Date().getFullYear()} AI Verify. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a className="hover:opacity-80" href="#">Twitter</a>
          <a className="hover:opacity-80" href="#">GitHub</a>
        </div>
      </div>
    </footer>
  );
}


