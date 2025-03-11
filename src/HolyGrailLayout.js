const HolyGrailLayout = () => {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-[60px] bg-[#ff6f61] flex items-center justify-center">
          Header
        </header>
  
        {/* Center container for the three columns */}
        <div className="flex flex-1">
          {/* Navigation */}
          <nav className="w-[100px] bg-[#ff6f61] flex items-center justify-center">
            Navigation
          </nav>
  
          {/* Main Content */}
          <main className="flex-1 bg-[#ffe4c4] flex items-center justify-center">
            Main
          </main>
  
          {/* Sidebar */}
          <aside className="w-[100px] bg-[#deb887] flex items-center justify-center">
            Sidebar
          </aside>
        </div>
  
        {/* Footer */}
        <footer className="h-[100px] bg-[#708090] flex items-center justify-center">
          Footer
        </footer>
      </div>
    );
  };
  
  export default HolyGrailLayout;