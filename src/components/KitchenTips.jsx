import React from 'react';
import styles from './KitchenTips.module.css'; // Import CSS Module

const pastelColors = [
  "#A8D5BA", "#FFB6C1", "#FAD6A5", "#B5EAD7", "#FFC3A0",
  "#FFDAC1", "#FFB7B2", "#F4E8C1", "#D4B9D9", "#AFCBFF",
  "#FFE6A7", "#D5CABD", "#CBD4C2", "#FCE1E4", "#FFD3BA",
  "#BAE1FF", "#E3E3E3", "#C7CEEA", "#FFC3CE", "#B9E8D9",
  "#E2A6FF", "#FFDEE9", "#D1F2EB", "#FFDACF", "#FFF4C1",
  "#BFF0D7", "#D0CFF1", "#F3D1F4", "#FFE4E1", "#E8D8C3",
  "#C9E4CA", "#FBE7C6", "#C3E6A4", "#F8B195", "#E8F0A4",
  "#A0E4FF", "#B7D8FF", "#FFDEE9", "#B4E3FA", "#F2E4D5"
];



const tips = [
  {
    title: "Tip 1",
    imagePath: "https://minimalistbaker.com/wp-content/uploads/2017/10/How-to-Make-the-BEST-Vegetable-Broth-1-Pot-use-up-old-vegetable-scraps-BIG-flavor-vegan-plantbased-healthy-soup-vegetablebroth-recipe-glutenfree-2.jpg", // Image path added directly after the title
    english: "Use fresh ingredients to ensure the best flavor.",
    hindi: "सर्वोत्तम स्वाद सुनिश्चित करने के लिए ताज़ा सामग्री का उपयोग करें।"
  },
  {
    title: "Tip 2",
    imagePath: "https://pbs.twimg.com/media/D2AbnaZX0AATERM.jpg", // Image path added directly after the title
    english: "Don't overcrowd the pan, cook in batches if necessary.",
    hindi: "पैन में ज्यादा भीडभाड न करें, आवश्यक होने पर बैच में पकाएं।"
  },
  {
    title: "Tip 3",
     imagePath:"https://static.langimg.com/thumb/95693041/samayam-tamil-95693041.jpg?imgsize=52194&width=380&height=214&resizemode=75",
    english: "Use the right cooking oil for the dish.",
    hindi: "व्यंजन के लिए सही खाना पकाने का तेल उपयोग करें।"
  },
  {
    title: "Tip 4",
    imagePath:"https://media.istockphoto.com/id/504132672/photo/burnt-toast.jpg?s=612x612&w=0&k=20&c=iiy4tN3M8dXPIaP-6XnNkqA9A7Umzsnb2d2hEK5JMYw=",
    english: "Don't overcook, it can make the dish dry and tasteless.",
    hindi: "ज्यादा पकाने से बचें, इससे व्यंजन सूखा और स्वादहीन हो सकता है।"
  },
  {
    title: "Tip 5",
    imagePath:"https://www.seriouseats.com/thmb/9wR_tCe_lp1eV0ZqK1Cmdhto0Qs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2014__12__20141216-cooked-steak-vicky-wasik-12028129-98b64a0c2936461b99133ae75914f22b.jpg",
    english: "Let meat rest after cooking to enhance flavor.",
    hindi: "पकाने के बाद मांस को आराम करने दें ताकि इसका स्वाद बेहतर हो सके।"
  },
  {
    title: "Tip 6",
    imagePath:"https://i0.wp.com/vuniversity.in/wp-content/uploads/2023/10/Cuts-of-Vegetables.png?fit=600%2C399&ssl=1",
    english: "Cut vegetables evenly to ensure they cook uniformly.",
    hindi: "सभी सब्जियों को समान आकार में काटें ताकि वे समान रूप से पक सकें।"
  },
  {
    title: "Tip 7",
    imagePath:"https://www.touchbistro.com/wp-content/uploads/2021/03/food-presentation-tips-inset-1.jpg",
    english: "Always taste your dish before serving.",
    hindi: "परोसने से पहले अपने व्यंजन का स्वाद ज़रूर चखें।"
  },
  {
    title: "Tip 8",
    imagePath:"https://storage.googleapis.com/gen-atmedia/3/2016/09/07e4c0b153f0f04c40d4c181ea7c03932dd9c108.jpeg",
    english: "Keep your knives sharp for easier cutting.",
    hindi: "आसान काटने के लिए अपने चाकू को धारदार रखें।"
  },
  {
    title: "Tip 9",
    imagePath:"https://www.chowhound.com/img/gallery/tips-for-adjusting-your-oven-temperature-based-on-what-youre-cooking/intro-1713972987.jpg",
    english: "Preheat your oven for consistent baking results.",
    hindi: "समरूप बेकिंग के परिणाम के लिए अपने ओवन को पहले से गरम करें।"
  },
  {
    title: "Tip 10",
    imagePath:"https://www.simplyrecipes.com/thmb/KCb9IGbRFE0VJMz6Rok42qeV0tE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Sourdough-Pancakes-METHOD-01-644d2f1c429742c795388849135d718d.jpg",
    english: "Use room temperature ingredients when baking.",
    hindi: "बेकिंग करते समय कमरे के तापमान वाली सामग्री का उपयोग करें।"
  },
  {
    title: "Tip 11",
    imagePath:"https://www.kingsfordcharcoal.com.au/wp-content/uploads/2016/08/KFD_SKEWER-0025-1024x622.jpg",
    english: "Soak skewers in water before grilling to prevent burning.",
    hindi: "स्क्यूअर्स को जलने से रोकने के लिए ग्रिल करने से पहले पानी में भिगोएं।"
  },
  {
    title: "Tip 12",
    imagePath:"https://www.simplyrecipes.com/thmb/4hxDxUBG3gnpn6oQEnqhcFYHHoc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-How-To-Frost-Cake-LEAD-03-206f11bd2f16442fa88d4fdc5a62e957.jpg",
    english: "Let your cake cool completely before frosting.",
    hindi: "फ्रॉस्टिंग से पहले केक को पूरी तरह से ठंडा होने दें।"
  },
  {
    title: "Tip 13",
    imagePath:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/7/9/0/FN_How-to-Boil-Potatoes-02_s4x3.jpg.rend.hgtvcom.616.462.suffix/1404936439965.jpeg",
    english: "Boil potatoes with the skin on to retain nutrients.",
    hindi: "आलू को छिलके सहित उबालें ताकि पोषक तत्व बने रहें।"
  },
  {
    title: "Tip 14",
    imagePath:"https://i.pinimg.com/originals/a2/0a/da/a20ada5a8e6d1f46cff51ed81af24405.jpg",
    english: "Store herbs in the fridge to keep them fresh longer.",
    hindi: "जड़ी-बूटियों को ताज़ा रखने के लिए फ्रिज में रखें।"
  },
  {
    title: "Tip 15",
    imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRynX7FnD0RHMUjtdpMFqemywciiNhqc2G5yNa-4rOxZanRau8sLOfJ1PSdWE2RfRvxoow&usqp=CAU",
    english: "Use parchment paper to avoid sticking when baking.",
    hindi: "चिपकने से बचाने के लिए बेकिंग के समय पार्चमेंट पेपर का उपयोग करें।"
  },
  {
    title: "Tip 16",
    imagePath:"https://atkfamily.com/wp-content/uploads/2014/08/stp_classicbeefchili_addspices_01.jpg?w=558",
    english: "Taste and season as you cook to achieve the best flavor.",
    hindi: "स्वाद चखते हुए मसाले डालें।"
  },
  {
    title: "Tip 17",
    imagePath:"https://cdn.apartmenttherapy.info/image/upload/v1599666719/k/Photo/Lifestyle/2020-09-Cleaning-Showdown-Plastic-Cutting-Boards/Method-3-halved-lemons%20/2020_showdown_cleancuttingboard_method3shot2_303.jpg",
    english: "Use lemon to clean cutting boards and remove stains.",
    hindi: "कटिंग बोर्ड साफ करने के लिए नींबू का उपयोग करें।"
  },
  {
    title: "Tip 18",
    imagePath:"https://www.microfiberwholesale.com/cdn/shop/articles/7Z1A0963_1200x800.jpg?v=1598297052",
    english: "Keep your workspace clean to prevent cross-contamination.",
    hindi: "क्रॉस-संदूषण से बचने के लिए अपना कार्यस्थल साफ रखें।"
  },
  {
    title: "Tip 19",
    imagePath:"https://www.mashed.com/img/gallery/25-cool-ice-cube-hacks-you-should-try/use-ice-cube-trays-to-freeze-homemade-stock-1655751021.jpg",
    english: "Freeze leftover broth in ice cube trays for easy use later.",
    hindi: "बचा हुआ शोरबा आइस ट्रे में जमा कर रखें, ताकि बाद में इस्तेमाल कर सकें।"
  },
  {
    title: "Tip 20",
    imagePath:"https://webappstatic.buzzfeed.com/static/2018-02/28/13/asset/buzzfeed-prod-fastlane-01/sub-buzz-16291-1519842677-1.jpg?resize=625:936",
    english: "Chop onions under cold water to prevent tears.",
    hindi: "आँसू से बचने के लिए प्याज को ठंडे पानी में काटें।"
  },
  {
    title: "Tip 21",
    imagePath:"https://i0.wp.com/happyhealthymama.com/wp-content/uploads/2018/10/How-To-Keep-Apple-Slices-From-Turning-Brown.jpg?resize=980%2C1469&ssl=1",
    english: "Use salt to prevent apples from browning.",
    hindi: "सेब के भूरे होने से बचाने के लिए नमक का उपयोग करें।"
  },
  {
    title: "Tip 22",
    imagePath:"https://i0.wp.com/vickypham.com/wp-content/uploads/2024/01/9455a-2023_08_27eosm506734.jpg?resize=1000%2C1000",
    english: "Peel ginger with a spoon to avoid waste.",
    hindi: "कम बर्बादी के लिए अदरक को छीलने के लिए चम्मच का उपयोग करें।"
  },
  {
    title: "Tip 23",
    imagePath:"https://www.marthastewart.com/thmb/exwuCjdlkZFxBGLHEUicAGhTcbo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/should-you-refrigerate-tomatoes-getty-0623-58cddadf126c4a39a88d656f2cff379d.jpg",
    english: "Store tomatoes at room temperature to retain flavor.",
    hindi: "टमाटर को कमरे के तापमान पर रखें ताकि उनका स्वाद बना रहे।"
  },
  {
    title: "Tip 24",
    imagePath:"https://kitchenambition.b-cdn.net/wp-content/uploads/2022/02/adding-sugar-740x492.jpg",
    english: "Add a pinch of sugar to balance a too-spicy dish.",
    hindi: "बहुत मसालेदार व्यंजन को संतुलित करने के लिए थोड़ी चीनी डालें।"
  },
  {
    title: "Tip 25",
    imagePath:"https://cdn.shopify.com/s/files/1/0275/7941/6665/files/23_1024x1024.webp?v=1719646055",
    english: "Clean stainless steel with vinegar for a streak-free shine.",
    hindi: "स्टेनलेस स्टील की सतह को साफ करने के लिए सिरका का उपयोग करें।"
  },
  {
    title: "Tip 26",
    imagePath:"https://cdn.shopify.com/s/files/1/2289/1873/files/Mixed_beans_soaking-min_86c0f2c5-d5f4-47e2-9ca3-61f8bb30c799.jpg?v=1668531561",
    english: "Pre-soak beans to reduce cooking time.",
    hindi: "बीन्स को पहले से भिगोएं ताकि पकाने का समय कम हो।"
  },
  {
    title: "Tip 27",
    imagePath:"https://cdnimg.webstaurantstore.com/uploads/blog/2019/8/img01.jpg",
    english: "Rest red meat after cooking for 5-10 minutes to enhance flavor.",
    hindi: "लाल मांस को पकाने के बाद 5-10 मिनट आराम करने दें।"
  },
  {
    title: "Tip 28",
    imagePath:"https://www.verywellhealth.com/thmb/TsUje4DmZm5sOrKCBbEaOyOiwf4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1466994948-996b0fc9540240f99a90c2859f8832fb.jpg",
    english: "Add salt early when cooking pasta.",
    hindi: "पास्ता पकाते समय शुरू में ही नमक डालें।"
  },
  {
    title: "Tip 29",
    imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT96WNXIgr6DCBEnxka1EA96UMkUaE6G671Bg&s",
    english: "Keep the pantry stocked with basic spices.",
    hindi: "अपने पैंट्री में बुनियादी मसाले रखें।"
  },
  {
    title: "Tip 30",
    imagePath:"https://www.tastingtable.com/img/gallery/mistakes-everyone-makes-when-frying-food/overcrowding-the-frying-pan-1642790090.jpg",
    english: "Never overcrowd the frying pan, it lowers the temperature.",
    hindi: "तलने वाले पैन में बहुत अधिक खाना न डालें, इससे तापमान कम हो जाता है।"
  },
  {
    title: "Tip 31",
    imagePath:"https://media.istockphoto.com/id/171346138/photo/isolated-shot-of-hand-squeezing-a-lemon-against-white-background.jpg?s=612x612&w=0&k=20&c=qzH-0r_yU9U3S5bJLIzqowU-ATQiUiyBNnVA8vKe3PQ=",
    english: "Add a dash of lemon to brighten flavors.",
    hindi: "स्वाद को ताज़ा करने के लिए थोड़ा नींबू का रस डालें।"
  },
  {
    title: "Tip 32",
    imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbuOUn5_nTv8RSuxNi-w3nE6Ru1kngiULolw&s",
    english: "Use wooden spoons to stir hot dishes to avoid scratches.",
    marathi: "गरम पदार्थ ढवळण्यासाठी लाकडी चमचे वापरा.",
    hindi: "गरम व्यंजन हिलाने के लिए लकड़ी के चम्मच का उपयोग करें।"
  },
  {
    title: "Tip 33",
    imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbzy5ycc_H50CXyhjVa8aasSdTfEh2kjg52g&s",
    english: "Rinse rice before cooking to remove excess starch.",
    hindi: "अतिरिक्त स्टार्च हटाने के लिए चावल को पकाने से पहले धो लें।"
  },
  {
    title: "Tip 34",
    imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYOpItNEgqf0Gn-8l4dRivdUr-1wqaoGCa3UYHI_kv9KLAA_ThmigLxU3_HHU3g0q5SLg&usqp=CAU",
    english: "Store spices in a cool, dark place to retain potency.",
    hindi: "मसालों को ठंडी और अंधेरी जगह पर रखें।"
  },
  {
    title: "Tip 35",
    imagePath:"https://bvn.deodap.com/cdn/shop/files/1500x15001_1.jpg?v=1722776443",
    english: "Blot fried food with paper towels to remove excess oil.",
    hindi: "तले हुए खाने को पेपर टॉवेल से दबाकर अतिरिक्त तेल निकालें।"
  },
  {
    title: "Tip 36",
    imagePath:"https://www.jessicagavin.com/wp-content/uploads/2020/07/how-to-cook-pasta-2.jpg",
    english: "Always cook pasta al dente for the best texture.",
    hindi: "पास्ता को सही बनावट के लिए हमेशा अल डेंटे पकाएं।"
  },
  {
    title: "Tip 37",
    imagePath:"https://www.wikihow.com/images/thumb/e/e5/Keep-Wine-After-Being-Opened-Step-2.jpg/v4-460px-Keep-Wine-After-Being-Opened-Step-2.jpg.webp",
    english: "Store opened wine in the fridge to maintain freshness.",
    hindi: "खुली हुई शराब को ताज़ा रखने के लिए फ्रिज में रखें।"
  },
  {
    title: "Tip 38",
    imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrOg35GcRYtHdMMkqV7RUUt5mLtXF1ubOgjw&s",
    english: "For fluffier rice, let it sit covered after cooking.",
    hindi: "फूले हुए चावल के लिए, पकने के बाद इसे ढककर रखें।"
  },
  {
    title: "Tip 39",
    imagePath:"https://static.wixstatic.com/media/e5e583_dd2899ad8c8a4a53bed0e0079f3d9952~mv2.jpg/v1/fill/w_566,h_755,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e5e583_dd2899ad8c8a4a53bed0e0079f3d9952~mv2.jpg",
    english: "Toast nuts to bring out their natural flavor.",
    hindi: "नट्स का प्राकृतिक स्वाद निकालने के लिए उन्हें टोस्ट करें।"
  },
  {
    title: "Tip 40",
    imagePath:"https://static.toiimg.com/thumb/imgsize-613205,msid-67754964/67754964.jpg?width=500&resizemode=4",
    english: "Use fresh herbs as a garnish for a burst of flavor.",
    hindi: "स्वाद को बढ़ाने के लिए ताज़ी जड़ी-बूटियों का उपयोग करें।"
  }
];



const KitchenTips = () => {
  return (
    <section className={styles.tipsSection}>
      <div className={styles.tipsGrid}>
        {tips.map((tip, index) => (
          <div
            className={styles.tipCard}
            key={index}
            style={{ backgroundColor: pastelColors[index % pastelColors.length] }}
          >
            <img
              src={tip.imagePath}
              alt={`Image for ${tip.title}`}
              className={styles.tipImage}
            />
            <h3 className={styles.tipTitle}>{tip.title}</h3>
            <p className={styles.tipText}>English: {tip.english}</p>
            <p className={styles.tipText}>हिंदी: {tip.hindi}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KitchenTips;