import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const sections = ["home", "about", "gallary", "contact"];

  // Smooth scroll handler for anchor links
  const handleScroll = (e, sec) => {
    e.preventDefault();
    const element = document.getElementById(sec);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <nav
      className="fixed top-0 w-full backdrop-blur bg-white/10 z-50 shadow-md"
      role="navigation"
      aria-label="Primary"
    >
      <div className="max-w-4xl mx-auto flex justify-between p-4 items-center">
        <div className="text-xl font-bold select-none">MyPortfolio</div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          {sections.map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              className="cursor-pointer hover:text-blue-600 transition-colors"
              onClick={(e) => handleScroll(e, sec)}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl focus:outline-none"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white/90 p-4 space-y-4"
          role="menu"
          aria-label="Mobile navigation menu"
        >
          {sections.map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              className="block cursor-pointer hover:text-blue-600"
              onClick={(e) => handleScroll(e, sec)}
              role="menuitem"
              tabIndex={0}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
