import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom'; // To navigate to the recipe page by category
import './RecipeCarousel.css';  // Make sure to include your custom CSS

const RecipeCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,  // Display 8 items at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,  // Autoplay interval for smooth experience
        responsive: [
            { breakpoint: 1440, settings: { slidesToShow: 6, slidesToScroll: 1 } },
            { breakpoint: 1024, settings: { slidesToShow: 5, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } } // Change to show 2 slides at 480px
        ]
    };
    
    // Carousel data (You can replace this with dynamic data later)
    const foodItems = [
        { img: 'https://w7.pngwing.com/pngs/216/888/png-transparent-roast-chicken-barbecue-chicken-roasting-chicken-meat-roast-chicken-food-animals-baking-thumbnail.png', title: 'Chicken', category: 'chicken' },
        { img: 'https://media.istockphoto.com/id/528360281/photo/garden-salad-overhead-view.jpg?s=612x612&w=0&k=20&c=QcCXQyxzG27ttYrgcblJvwOUkmWfsvV2Q54TEFikOuM=', title: 'Salad', category: 'salad' },
        { img: 'https://img.freepik.com/free-photo/tasty-top-view-sliced-pizza-italian-traditional-round-pizza_90220-1357.jpg', title: 'Pizza', category: 'pizza' },
        { img: 'https://media.istockphoto.com/id/1252605665/photo/chilli-garlic-hakka-noodles-in-black-bowl-isolated-on-white-background-indo-chinese.jpg?s=612x612&w=0&k=20&c=lesS8Wt5JVauAqjVh9uPfoiGr1ZjsnjHWZyKw3zLg2E=', title: 'Noodles', category: 'noodles' },
        { img: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2023/07/vegetable-curry-recipe.jpg', title: 'Curry', category: 'curry' },
        { img: 'https://img.freepik.com/free-photo/fresh-orange-juice-glass-marble-background_1150-45567.jpg?t=st=1729750093~exp=1729753693~hmac=4e3f04d3fcb50ac813c2f458db1628faa38d8d612a7c6b0d58a23854c9f341ce&w=360', title: 'Beverages', category: 'beverages' },
        { img: 'https://www.shutterstock.com/image-photo/chicken-biryani-quick-tasty-dum-600nw-2468105649.jpg', title: 'Biryani', category: 'biryani' },
        { img: 'https://img.freepik.com/premium-photo/plate-healthy-food-full-nutrition-top-view_252051-7945.jpg', title: 'Diet', category: 'diet' },
        { img: 'https://img.freepik.com/premium-photo/cheese-cake-top-view_891428-1169.jpg', title: 'Dessert', category: 'dessert' },
        { img: 'https://media.istockphoto.com/id/962102780/photo/tomato-soup-in-a-white-bowl-isolated-on-white-background-top-view-copy-space-traditional-cold.jpg?s=612x612&w=0&k=20&c=GPmG4OmndYpfDUyskKUEftgJSDbRi-dC45P7E5meLMA=', title: 'Soup', category: 'soup' }
    ];

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {foodItems.map((food, index) => (
                    <div key={index} className="image-container">
                        <Link to={`/recipes/${food.category}`}>
                            <img src={food.img} alt={food.title} className="circle-image" />
                            <h4 className="image-title">{food.title}</h4>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default RecipeCarousel;
