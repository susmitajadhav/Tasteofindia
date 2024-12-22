import{a as j,r as a,j as e,L as o,b as g}from"./index-BfCW7Qao.js";const v=()=>{const{addToWishlist:d,removeFromWishlist:n,wishlistItems:p}=j(),[r,h]=a.useState([]),[u,x]=a.useState(!0),[l,t]=a.useState(null);a.useEffect(()=>{(async()=>{try{const i=await g.get("https://backend-testofindia.onrender.com/api/recipe",{params:{category:"Delicious"}});i.data&&i.data.data?h(i.data.data):t("No delicious recipes found")}catch(i){console.error("Error fetching delicious recipes:",i),t("Failed to fetch delicious recipes")}finally{x(!1)}})()},[]);const c=s=>p.some(i=>i.id===s),m=s=>{c(s._id)?n(s._id):d({id:s._id,name:s.RecipeName,image:s.Images})};return e.jsxs("div",{className:"super-delicious",children:[e.jsx("h1",{children:"Super Delicious"}),u?e.jsx("p",{children:"Loading delicious recipes, please wait..."}):l?e.jsx("p",{children:l}):e.jsx("div",{className:"grid-container",children:r.length===0?e.jsx("p",{children:"No delicious recipes found!"}):r.map(s=>e.jsxs("div",{className:"card",children:[e.jsxs(o,{to:`/recipe/${s._id}`,className:"card-link",children:[e.jsx("img",{src:s.Images,alt:s.RecipeName})," ",e.jsx("div",{className:"title",children:s.RecipeName})," ",e.jsx("div",{className:"stars",children:Array(5).fill().map((i,f)=>e.jsx("span",{className:"star",children:"★"},f))})]}),e.jsx(o,{to:`/recipe/${s._id}`,className:"recipe-view-button",children:"View Recipe"})," ",e.jsx("div",{className:`wishlist-icon ${c(s._id)?"active":""}`,onClick:i=>{i.stopPropagation(),m(s)},children:e.jsx("i",{className:`bi ${c(s._id)?"bi-heart-fill":"bi-heart"}`})})]},s._id))})]})};export{v as default};