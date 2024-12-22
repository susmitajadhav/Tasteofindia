import{r as t,j as s,L as b,b as d}from"./index-BfCW7Qao.js";const w=()=>{const[h,m]=t.useState([]),[p,f]=t.useState(!0),[c,o]=t.useState(""),[u,g]=t.useState([]);t.useEffect(()=>{(async()=>{var a,r;try{const[i,j]=await Promise.all([d.get("https://recipe-backend-gx1f.onrender.com/api/recipe",{params:{category:"Thela"}}),d.get("https://recipe-backend-gx1f.onrender.com/api/recipe",{params:{category:"Street Food"}})]),N=((a=i.data)==null?void 0:a.data)||[],R=((r=j.data)==null?void 0:r.data)||[],n=[...N,...R];n.length>0?m(n):o("No recipes found for Thela or Street Food.")}catch(i){o("Error fetching recipes. Please try again later."),console.error("Error fetching recipes:",i)}finally{f(!1)}})()},[]);const x=e=>{g(a=>a.includes(e)?a.filter(r=>r!==e):[...a,e])},l=e=>u.includes(e);return p?s.jsx("div",{className:"spinner-border",children:"Loading Recipes..."}):c?s.jsx("div",{className:"alert alert-danger",children:c}):s.jsxs("div",{className:"thela-container",children:[s.jsx("h1",{className:"thela-heading",children:"Thela Menu"}),s.jsxs("div",{className:"thela-description",children:[s.jsx("img",{src:"https://mir-s3-cdn-cf.behance.net/projects/404/022ab2179873579.Y3JvcCwxMzczLDEwNzQsMjY1LDA.jpg",alt:"Thela Menu",className:"thela-image"}),s.jsx("p",{children:"Welcome to our Thela Menu! Discover a wide range of delicious street food and recipes made with love. Each recipe is crafted to bring you the true flavors of the streets, offering a blend of traditional and modern tastes."})]}),s.jsx("div",{className:"thela-row",children:h.map(e=>s.jsxs("div",{className:"thela-card",children:[s.jsx("img",{src:e.Images||"https://via.placeholder.com/150",alt:e.RecipeName||"Recipe Image",className:"thela-card-img"}),s.jsx("div",{className:"thela-card-body",children:s.jsx("h5",{className:"thela-card-title",children:e.RecipeName||"No Name"})}),s.jsx("button",{className:`wishlist-button ${l(e._id)?"red":""}`,onClick:a=>{a.preventDefault(),x(e._id)},children:s.jsx("i",{className:`fas fa-heart ${l(e._id)?"red":""}`})}),s.jsx(b,{to:`/recipe/${e._id}`,className:"thela-view-recipe-button",children:"View Recipe"})]},e._id))})]})};export{w as default};
