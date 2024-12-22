import{u as x,r as t,a as N,j as s,L as l,b as j}from"./index-BfCW7Qao.js";const v=()=>{const{category:i}=x(),[c,r]=t.useState([]),[d,m]=t.useState(!0),[n,h]=t.useState(null),{wishlistItems:p,addToWishlist:g,removeFromWishlist:f}=N();t.useEffect(()=>{i&&(async()=>{try{const a=await j.get(`https://backend-testofindia.onrender.com/api/recipe?category=${i}`);a.data&&a.data.data?r(a.data.data):r([])}catch{h("Failed to fetch recipes. Please try again.")}finally{m(!1)}})()},[i]);const o=e=>p.some(a=>a.id===e),u=e=>{o(e._id)?f(e._id):g({id:e._id,name:e.RecipeName,image:e.Images})};return d?s.jsx("div",{className:"loading",children:"Loading recipes..."}):n?s.jsxs("div",{className:"error-message",children:["Error: ",n]}):s.jsxs("div",{className:"recipe-page-container",children:[s.jsxs("h1",{className:"recipe-page-title",children:["Recipes for ",i]}),s.jsx("div",{className:"recipe-page-grid",children:c.length>0?c.map(e=>s.jsxs("div",{className:"recipe-card",children:[s.jsxs(l,{to:`/recipe/${e._id}`,className:"recipe-link",children:[s.jsx("img",{src:e.Images,alt:e.RecipeName,className:"recipe-image"}),s.jsx("h2",{className:"recipe-name",children:e.RecipeName})]}),s.jsx("button",{className:"wishlist-button1",onClick:()=>u(e),children:s.jsx("i",{className:`fas fa-heart ${o(e._id)?"red":""}`})}),s.jsx(l,{to:`/recipe/${e._id}`,className:"cara-view-recipe-button",children:"View Recipe"})]},e._id)):s.jsx("p",{className:"no-recipes-message",children:"No recipes found for this category."})})]})};export{v as default};