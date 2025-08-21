import { Link, useRouterState } from "@tanstack/react-router";
const Header = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-extrabold tracking-tight text-2xl">
          Aegis<span className="text-primary">Express</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" label="Home" active={pathname === "/"} />
          <NavLink
            to="/about"
            label="About"
            active={pathname.startsWith("/about")}
          />
          <NavLink
            to="/blogs/"
            label="Blogs"
            active={pathname.startsWith("/blogs")}
          />
          <NavLink
            to="/track/"
            label="Track"
            active={pathname.startsWith("/track")}
          />
          <NavLink
            to="/contact"
            label="Contact"
            active={pathname.startsWith("/contact")}
          />
        </nav>
      </div>
    </header>
  );
};

function NavLink({
  to,
  label,
  active,
}: {
  to: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      to={to as string}
      className={`text-sm font-medium hover:opacity-80 transition-opacity ${active ? "text-primary" : "text-neutral-700"}`}
    >
      {label}
    </Link>
  );
}
export default Header;
