import { useState } from 'react';
import './TabsSwitch.css';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "HTML",
      content: `HTML (HyperText Markup Language) is the standard markup language for documents 
                designed to be displayed in a web browser. It defines the content and structure 
                of web content.`
    },
    {
      title: "CSS",
      content: `CSS (Cascading Style Sheets) is a style sheet language used for describing the 
                presentation of a document written in HTML. CSS describes how elements should be 
                rendered on screen, on paper, in speech, or on other media.`
    },
    {
      title: "JavaScript",
      content: `JavaScript is a programming language that is one of the core technologies of 
                the World Wide Web. It enables interactive web pages and is an essential part 
                of web applications.`
    }
  ];

  return (
    <div className="tabs-container">
      {/* Tab Headers */}
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;