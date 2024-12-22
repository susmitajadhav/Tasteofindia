import React, { Suspense, lazy } from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import PublicRoute from './Components/PublicRoute';
import ProtectedRoute from './Components/ProtectedRoute';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const CuisineDetailPage = lazy(() => import('./Components/CuisineDetailPage'));

// Lazy-loaded Components for better performance
const Banner = lazy(() => import('./Components/Banner'));
const AboutUs = lazy(() => import('./Components/AboutUs'));
const KitchenTips = lazy(() => import('./Components/KitchenTips'));
const RecipePage = lazy(() => import('./Components/RecipePage'));
const AllRecipesPage = lazy(() => import('./Components/AllRecipesPage'));
const ThelaMenu = lazy(() => import('./Components/ThelaMenu'));
const OccasionDetailPage = lazy(() => import('./Components/OccasionDetailPage'));
const TasteDetailPage = lazy(() => import('./Components/TasteDetailPage'));
const MealDetailPage = lazy(() => import('./Components/MealDetailPage'));
const DietDetailPage = lazy(() => import('./Components/DietDetailPage'));
const ThaliSection = lazy(() => import('./Components/ThaliSection'));
const ThaliDetailPage = lazy(() => import('./Components/ThaliDetailPage'));
const LatestRecipes = lazy(() => import('./Components/LatestRecipes'));
const RecipeCarousel = lazy(() => import('./Components/RecipeCarousel'));
const TodayMenu = lazy(() => import('./Components/TodayMenu'));
const SuperDelicious = lazy(() => import('./Components/SuperDelicious'));
const FeaturePosts = lazy(() => import('./Components/FeaturePosts'));
const UniqueFood = lazy(() => import('./Components/UniqueFood'));
const AddRecipePage = lazy(() => import('./Components/AddRecipePage'));
const IngredientsDetailPage = lazy(() => import('./Components/IngredientsDetailPage'));
//const AllIngredientsPage = lazy(() => import('./Components/AllIngredientsPage'));
const Recipe = lazy(() => import('./Components/Recipe'));
const Recipe1 = lazy(() => import('./Components/Recipe1'));
const WishlistPage = lazy(() => import('./Components/WishlistPage'));
const LoginSignup = lazy(() => import('./Components/LoginSignup'));
const Cake = lazy(() => import('./Components/Cake'));
const Icecream = lazy(() => import('./Components/Icecream'));
const EasyRecipesPage = lazy(() => import('./Components/EasyRecipesPage'));
const SearchRecipe = lazy(() => import('./Components/SearchRecipe'));
const Privacy = lazy(() => import('./Components/Privacy'));
const Faq = lazy(() => import('./Components/Faq'));
const Contact = lazy(() => import('./Components/Contact'));
const Blog = lazy(() => import('./Components/Blog'));
const Terms = lazy(() => import('./Components/Terms'));

// Layout component for shared header, navbar, and footer
function Layout({ children }) {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <>
            <Header />
            <Navbar />
            {isHomePage && (
                <>
                    <Banner />
                    <ThaliSection />
                    <RecipeCarousel />
                    <TodayMenu />
                    <LatestRecipes />
                    <SuperDelicious />
                    <FeaturePosts />
                    <UniqueFood />
                </>
            )}
            {children}
            <Footer />
        </>
    );
}

// Main App component
const App = () => {
    return (
        <AuthProvider>
            <WishlistProvider>
            <Router>

                    <ScrollToTop />
                    <div className="App">
                    <Suspense fallback={<div style={{ minHeight: '300px' }}>Loading...</div>}>
                            <Routes>
                                {/* Public Route for Login/Signup */}
                                <Route path="/login" element={<LoginSignup />} />

                                {/* Protected Route for Adding Recipe */}
                                <Route path="/add-recipe" element={<ProtectedRoute element={<AddRecipePage />} />} />

                                {/* Home Page */}
                                <Route path="/" element={<Layout />} />

                                {/* Recipe Detail Page */}
                                <Route path="/recipe/:id" element={<Layout><Recipe /></Layout>} />

                                   {/* Recipe Detail Page */}
                                   <Route path="/recipe1/:id" element={<Layout><Recipe1 /></Layout>} />

                                {/* Search Recipe Page */}
                                <Route path="/search" element={<SearchRecipe />} />

                                {/* Thali Detail Pages */}
                                <Route path="/thali" element={<Layout><ThaliDetailPage /></Layout>} />
                                <Route path="/thali/:thali" element={<Layout><ThaliDetailPage /></Layout>} />

                                {/* All Recipes Page */}
                                <Route path="/all-recipes" element={<Layout><AllRecipesPage /></Layout>} />

                                {/* Wishlist Page */}
                                <Route path="/wishlist" element={<Layout><WishlistPage /></Layout>} />

                                {/* About Us Page */}
                                <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />

                                {/* Kitchen Tips Page */}
                                <Route path="/kitchen-tips" element={<Layout><KitchenTips /></Layout>} />

                                {/* Dynamic Recipe Category Page */}
                                <Route path="/recipes/:category" element={<Layout><RecipePage /></Layout>} />

                                {/* Cuisine Detail Page */}
                                <Route path="/cuisine/:cuisine" element={<Layout><CuisineDetailPage /></Layout>} />

                                {/* Occasion Detail Page */}
                                <Route path="/occasion/:occasionName" element={<Layout><OccasionDetailPage /></Layout>} />

                                {/* Meal Detail Page */}
                                <Route path="/meal/:mealType" element={<Layout><MealDetailPage /></Layout>} />

                                {/* Dietary Category Pages */}
                                <Route path="/diet/:dietType/:subDietType?" element={<Layout><DietDetailPage /></Layout>} />

                                {/* Taste Detail Page */}
                                <Route path="/taste/:tasteName" element={<Layout><TasteDetailPage /></Layout>} />

                                {/* Ingredients Detail Page */}
                                <Route path="/ingredients/:ingredientName" element={<Layout><IngredientsDetailPage /></Layout>} />

                                 {/* Ingredients Detail Page */}
                                {/* <Route path="/ingredients/:All Ingredients" element={<Layout><AllIngredientsPage /></Layout>} /> */}

                                {/* Thela Menu Page */}
                                <Route path="/thela" element={<Layout><ThelaMenu /></Layout>} />

                                {/* Cake and Ice Cream Pages */}
                                <Route path="/cake" element={<Layout><Cake /></Layout>} />
                                <Route path="/ice-cream" element={<Layout><Icecream /></Layout>} />

                                {/* Easy Recipes Page */}
                                <Route path="/easy-recipes" element={<Layout><EasyRecipesPage /></Layout>} />

                                {/* FAQs Page */}
                                <Route path="/faqs" element={<Layout><Faq /></Layout>} />

                                {/* Blog, Privacy Policy, Contact, Terms Pages */}
                                <Route path="/privacy-policy" element={<Layout><Privacy /></Layout>} />
                                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                                <Route path="/blog" element={<Layout><Blog /></Layout>} />
                                <Route path="/terms" element={<Layout><Terms /></Layout>} />
                            </Routes>
                        </Suspense>
                    </div>
                </Router>
            </WishlistProvider>
        </AuthProvider>
    );
};

export default App;
