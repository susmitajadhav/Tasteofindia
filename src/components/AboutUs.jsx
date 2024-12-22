import React from "react";
import './AboutUs.css'; // Ensure your CSS file is imported correctly

const AboutUs = () => {
  return (
    <div>
      <main>
      <section className="about-section">
  <div className="container">
    <h2 className="section-title">About Us</h2>
    
    <div className="about-banner">
      <img 
        src="https://img.freepik.com/premium-photo/table-with-many-plates-food-including-food-plate-food_1316278-9481.jpg" 
        alt="About Us Banner" 
        className="about-banner-img img-fluid" 
      />
    </div>
    
    <p className="about-text">
      Welcome to our Food Recipe Website! We are passionate food enthusiasts dedicated to sharing a world of flavors with you. Our mission is to make cooking enjoyable and accessible for everyone, whether you're a seasoned chef or a kitchen novice. Explore, experiment, and elevate your culinary skills with us!
    </p>
    <p className="about-text">
      With our handpicked recipes, from simple, quick meals to lavish spreads for special occasions, we aim to create moments of togetherness. We believe that food is a universal language that connects people and creates lasting memories.
    </p>
    <p className="about-text">
      Join us on this flavorful journey and let’s make cooking an adventure full of taste and joy.
    </p>
  </div>
</section>


<section className="journey-section">
  <div className="container">
    <div className="row d-flex align-items-center">
      {/* Left Column for Image */}
      <div className="col-12 col-md-6 content-image">
        <img 
          src="https://img.freepik.com/premium-photo/table-food-with-view-beach-ocean_954226-75674.jpg" 
          alt="Our Journey" 
          className="img-fluid journey-image" 
        />
      </div>

      {/* Right Column for Text */}
      <div className="col-12 col-md-6 content-text">
        <h2 className="section-title">Our Journey</h2>
        <p>
          Our culinary adventure began with a shared passion for food. What started as a small kitchen experiment has grown into a platform for food lovers across the globe. From our humble beginnings to becoming a vibrant community, our journey has been fueled by creativity and the joy of bringing people together through the art of cooking.
        </p>
        <p>
          Over the years, we’ve curated a rich collection of recipes inspired by diverse cuisines, each crafted to tell a story of flavor and culture. We invite you to join us on this journey, explore new recipes, and create your own culinary masterpieces.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="vision-section">
  <div className="container">
    <div className="row d-flex align-items-center">
      {/* Left Column for Text */}
      <div className="col-12 col-md-6 content-text">
        <h2 className="section-title">Our Vision</h2>
        <p>
          At the heart of our vision is a belief that food is more than sustenance. It is a means of connection and expression. We aim to empower every home cook to create dishes that not only nourish the body but also feed the soul. By providing access to a diverse array of recipes, we aspire to make cooking an exciting, inclusive experience for all.
        </p>
        <p>
          We dream of a world where cooking is an enjoyable journey for everyone, where kitchens become spaces of joy, creativity, and community.
        </p>
      </div>

      {/* Right Column for Image */}
      <div className="col-12 col-md-6 content-image">
        <img 
          src="https://images7.alphacoders.com/132/thumb-1920-1324469.png" 
          alt="Our Vision" 
          className="img-fluid vision-image" 
        />
      </div>
    </div>
  </div>
</section>

<section className="healthy-section">
  <div className="container">
    <div className="row">
      {/* Left side - Image */}
      <div className="col-12 col-md-6">
        <img 
          src="https://img.freepik.com/premium-photo/greek-yogurt-bowl-with-fresh-berries-almond-white-wooden-background-top-view_1162225-35283.jpg?semt=ais_hybrid" 
          alt="healthy content"
          className="img-fluid"
        />
      </div>

      {/* Right side - Heading */}
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <h2 className="section-title">Healthy Recipes</h2>
      </div>
    </div>

    {/* Full-width content below */}
    <div className="row">
      <div className="col-12">
        <p>
          Welcome to our health-focused recipe website, where eating well meets delicious flavors! We are dedicated to providing recipes that cater to a wide range of dietary needs, including vegan, gluten-free, low-carb, paleo, and keto-friendly options. Our mission is to make healthy eating accessible and enjoyable for everyone, whether you're managing specific health conditions or simply aiming for a balanced lifestyle.
        </p>
        <p>
          All of our recipes use fresh, wholesome ingredients that are packed with nutrients to support your overall well-being. We prioritize meals that are not only good for your body but also exciting for your taste buds. From heart-healthy dishes to diabetic-friendly meals and high-protein snacks, you'll find a variety of options that fit seamlessly into your daily routine.
        </p>
        <p>
          Whether you're a busy parent, fitness enthusiast, or someone exploring healthier food choices, our easy-to-follow recipes make cooking nutritious meals simple and rewarding. Join us on this journey to better health, one delicious recipe at a time.
        </p>
      </div>
    </div>
  </div>
</section>

</main>
    </div>
  );
};

export default AboutUs;