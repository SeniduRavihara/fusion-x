const FooterSection = () => {
  return (
    <footer className="w-full py-12 bg-black">
      <div className="max-w-6xl mx-auto px-6 text-center text-white/80">
        <p>© {new Date().getFullYear()} FusionX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;
