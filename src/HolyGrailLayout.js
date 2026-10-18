import "./HolyGrailLayout.css";

const HolyGrailLayout = () => {
  return (
    <div className="holy-grail">
      {/* Header */}
      <header className="holy-grail-header">Header</header>

      {/* Center container for the three columns */}
      <div className="holy-grail-body">
        {/* Navigation */}
        <nav className="holy-grail-nav">Navigation</nav>

        {/* Main Content */}
        <main className="holy-grail-main">Main</main>

        {/* Sidebar */}
        <aside className="holy-grail-sidebar">Sidebar</aside>
      </div>

      {/* Footer */}
      <footer className="holy-grail-footer">Footer</footer>
    </div>
  );
};

export default HolyGrailLayout;