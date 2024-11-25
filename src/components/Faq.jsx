import React, { useState } from "react";
import './Faq.css'; // Importing the CSS file

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions (FAQ)</h2>
        <div className="faq-list">

          {/* FAQ Item 1 */}
          <div className="faq-item">
            <div
              className="faq-question-wrapper"
              onClick={() => toggleAnswer(1)}
            >
              <h3 className="faq-question">How can I find recipes based on dietary preferences?</h3>
              <span className={`faq-toggle-icon ${openIndex === 1 ? 'open' : ''}`}>
                {openIndex === 1 ? '-' : '+'}
              </span>
            </div>
            <div className={`faq-answer ${openIndex === 1 ? 'open' : ''}`}>
              <p>
                You can use our recipe filters to find meals that suit your dietary needs such as vegan, gluten-free, paleo, and more. Simply navigate to the "Recipes" section and choose the filter that applies to your preference.
              </p>
            </div>
          </div>

          {/* FAQ Item 2 */}
          <div className="faq-item">
            <div
              className="faq-question-wrapper"
              onClick={() => toggleAnswer(2)}
            >
              <h3 className="faq-question">Are all your recipes suitable for beginners?</h3>
              <span className={`faq-toggle-icon ${openIndex === 2 ? 'open' : ''}`}>
                {openIndex === 2 ? '-' : '+'}
              </span>
            </div>
            <div className={`faq-answer ${openIndex === 2 ? 'open' : ''}`}>
              <p>
                Yes, we offer a wide range of recipes, from beginner-friendly dishes to more advanced ones. Each recipe is marked with difficulty levels, so you can easily find one that matches your skillset.
              </p>
            </div>
          </div>

          {/* FAQ Item 3 */}
          <div className="faq-item">
            <div
              className="faq-question-wrapper"
              onClick={() => toggleAnswer(3)}
            >
              <h3 className="faq-question">Can I substitute ingredients in your recipes?</h3>
              <span className={`faq-toggle-icon ${openIndex === 3 ? 'open' : ''}`}>
                {openIndex === 3 ? '-' : '+'}
              </span>
            </div>
            <div className={`faq-answer ${openIndex === 3 ? 'open' : ''}`}>
              <p>
                Absolutely! Many of our recipes offer suggestions for ingredient substitutions to accommodate your dietary restrictions or preferences. Feel free to modify based on availability or taste.
              </p>
            </div>
          </div>

          {/* FAQ Item 4 */}
          <div className="faq-item">
            <div
              className="faq-question-wrapper"
              onClick={() => toggleAnswer(4)}
            >
              <h3 className="faq-question">Do you offer nutritional information with your recipes?</h3>
              <span className={`faq-toggle-icon ${openIndex === 4 ? 'open' : ''}`}>
                {openIndex === 4 ? '-' : '+'}
              </span>
            </div>
            <div className={`faq-answer ${openIndex === 4 ? 'open' : ''}`}>
              <p>
                Yes, we provide detailed nutritional information for most recipes, including calories, macronutrients, and sometimes vitamins and minerals. You can find this information at the bottom of each recipe page.
              </p>
            </div>
          </div>

          {/* FAQ Item 5 */}
          <div className="faq-item">
            <div
              className="faq-question-wrapper"
              onClick={() => toggleAnswer(5)}
            >
              <h3 className="faq-question">Can I share your recipes with others?</h3>
              <span className={`faq-toggle-icon ${openIndex === 5 ? 'open' : ''}`}>
                {openIndex === 5 ? '-' : '+'}
              </span>
            </div>
            <div className={`faq-answer ${openIndex === 5 ? 'open' : ''}`}>
              <p>
                Yes, you are welcome to share our recipes with your friends and family! We only ask that you give proper credit and link back to our website when sharing recipes online.
              </p>
            </div>
          </div>

          {/* Add more questions here */}

          {/* Example - FAQ Item 6 */}
          <div className="faq-item">
            <div
              className="faq-question-wrapper"
              onClick={() => toggleAnswer(6)}
            >
              <h3 className="faq-question">How do I save a recipe for later?</h3>
              <span className={`faq-toggle-icon ${openIndex === 6 ? 'open' : ''}`}>
                {openIndex === 6 ? '-' : '+'}
              </span>
            </div>
            <div className={`faq-answer ${openIndex === 6 ? 'open' : ''}`}>
              <p>
                You can save your favorite recipes by creating an account and adding them to your saved list. This way, you can easily access them at any time from your profile.
              </p>
            </div>
          </div>

          {/* Continue adding more questions and answers */}

        </div>
      </div>
    </div>
  );
};

export default FAQ;
