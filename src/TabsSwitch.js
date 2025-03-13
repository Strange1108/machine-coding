import { useState } from 'react';

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
    <div className="max-w-2xl mx-auto p-4">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-medium ${
              activeTab === index
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;