export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-white/5 py-12 px-6 relative z-10 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/50 font-light tracking-wide">
        <div>&copy; {new Date().getFullYear()} Strawberrry Inc. All rights reserved.</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
        <div className="font-medium text-white/70">
          Made by pragati lunkad
        </div>
      </div>
    </footer>
  );
}
