import{a as g,r as a,b as j,j as e,L as r}from"./index-BfCW7Qao.js";const f=()=>{const{addToWishlist:c,removeFromWishlist:l,wishlistItems:d}=g(),[t,m]=a.useState([]),[h,u]=a.useState(!0),[o,p]=a.useState(null);a.useEffect(()=>{j.get("https://backend-testofindia.onrender.com/api/recipe?category=todays").then(s=>{m(s.data.data)}).catch(s=>{console.error("Error fetching today’s menu:",s),p("Failed to load today’s menu. Please try again.")}).finally(()=>{u(!1)})},[]);const i=s=>d.some(n=>n.id===s),x=s=>{i(s._id)?l(s._id):c({id:s._id,name:s.RecipeName,image:s.Images})};return e.jsxs("div",{className:"container1",children:[e.jsx("div",{className:"n1",children:e.jsx("h1",{children:"Today's Menu"})}),h?e.jsx("p",{className:"loading-message",children:"Loading today’s menu, please wait..."}):o?e.jsx("p",{className:"error-message",children:o}):e.jsx("div",{className:"menu",children:t.length===0?e.jsx("p",{children:"No items available for today’s menu."}):t.map(s=>e.jsxs("div",{className:"menu-item",children:[e.jsxs(r,{to:`/recipe/${s._id}`,className:"card-link",children:[e.jsx("img",{src:s.Images,alt:s.RecipeName,className:"menu-item-img"}),e.jsx("h2",{children:s.RecipeName}),e.jsx("p",{children:s.Description})," "]}),e.jsx("div",{className:`wishlist-icon ${i(s._id)?"active":""}`,onClick:n=>{n.stopPropagation(),x(s)},children:e.jsx("i",{className:`bi ${i(s._id)?"bi-heart-fill":"bi-heart"}`})}),e.jsx(r,{to:`/recipe/${s._id}`,className:"today-menu-view-button",children:"View Recipe"})]},s._id))})]})};export{f as default};