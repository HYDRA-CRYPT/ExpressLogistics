const Footer = () => {
  return (
    <footer className="border-t border-black/10">
      <div className="container mx-auto px-4 py-10 text-sm text-neutral-600 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Aegis Express Logistics</p>
        <p className="opacity-80">Fast. Transparent. Global.</p>
      </div>
    </footer>
  );
};

export default Footer;
