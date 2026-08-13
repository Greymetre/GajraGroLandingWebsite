import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
  en: {
    translation: {
    "home":{
      "hero_title": "Engineered for uptime",
      "hero_subtitle": "Reliability.Availability.Affordability.",
      "part_finder": "Part Finder",
      "by_brand": "By Brand",
      "new_launches": "New Launches",
      "search_here": "Search Here",
      "reels":"Reels",
    },

    //  popup card to find parts
    "PartsfindModal":{
    "title":"Find the Right Parts Faster", 
    "subtitle":"You can find the product you are looking for faster by entering the search criteria correctly.", 
    "modalName":"Model Name",
    "GGNo.":"GG No.",
    "description":"Part Description",
    "OE":"OE Part",
    "Specification":"Specification",
    "findbutton":"Find Auto Parts",
    },

    "footer": {
        "contact_us": "Contact Us",
        "phone": "Phone Number",
        "email": "E-Mail",
        "address": "Address",
        "address_detail": "Gajra Gears Pvt. Ltd. Station Road, DEWAS (M.P) - 455001",
        "copyright": "Copyright 2026 © Gajra Gears. All rights reserved."
      },

      "brands":{
        "title":"Brands Name",
        "searchPlaceholder": "Search {{brand}} models..."


      },
      "products":{
        "title":"Product List",
        "specification-head":"Specification",
        "description-head":"Description",
         "content":" Essay writing involves a structured process that includes preparation, drafting, and revision to effectively communicate ideas and arguments. Essay writing involves a structured process that includes preparation, drafting, and revision to effectively communicate ideas and arguments. Essay writing involves a structured process that includes preparation, drafting, and revision to effectively communicate ideas and arguments. Essay writing involves a structured process that includes preparation, drafting, and revision to effectively communicate ideas and arguments. Essay writing involves a structured process that includes preparation, drafting, and revision to effectively communicate ideas and arguments. Essay writing involves a structured process that includes preparation, drafting, and revision to effectively communicate ideas and arguments. Essay writing involves a structured process that includes preparation, drafting, and revision to effectively communicate ideas and arguments.",
         "review-head":"Reviews",
        

      },
      "mobile-head": {
    "page_name": "Page Name",
    "brand_name": "Brand Name",
    "product_details": "Product Details",
    "customer_details": "Customer Details",
    
  }
    

    
    }
  },
  hi: {
    translation: {
        "home":{
      "hero_title": "अधिकतम अपटाइम के लिए विकसित",
      "hero_subtitle": "विश्वसनीयता।  उपलब्धता।  किफायतीपन।",
      "part_finder": "पार्ट फाइंडर",
      "by_brand": "ब्रांड के अनुसार",
      "new_launches": "नई लॉन्च",
      "search_here": "यहाँ खोजें ",
      "reels":"रील्स",
        },

      //  popup card to find parts
      "PartsfindModal":{
    "title":"सही पार्ट्स जल्दी खोजें", 
    "subtitle":"आप सही खोज मानदंड दर्ज करके जिस उत्पाद की तलाश कर रहे हैं, उसे जल्दी ढूंढ सकते हैं।", 
    "modalName":"मॉडल का नाम",
    "GGNo.":"जीजी नंबर",
    "description":"पार्ट का विवरण",
    "OE":"ओई पार्ट",
    "specification":"विशेष विवरण",
    "findbutton":"ऑटो पार्ट्स खोजें",
      },

    "footer": {
        "contact_us": "संपर्क करें",
        "phone": "फ़ोन नंबर",
        "email": "ई-मेल",
        "address": "पता",
        "address_detail": "गजरा गियर्स प्राइवेट लिमिटेड स्टेशन रोड, देवास (म.प्र.) - 455001",
        "copyright": "कॉपीराइट 2026 © गजरा गियर्स। सर्वाधिकार सुरक्षित।"
      },

      "brands":{
        "title":"हमारे ब्रांड",
        "searchPlaceholder": "{{brand}} model खोजें..."
        

      }
      ,
      "products":{
        "title":"उत्पादों की सूची",
        "specification-head":"विशेष विवरण",
        "description-head":"उत्पाद विवरण",
        "content":"निबंध लेखन एक संरचित प्रक्रिया है जिसमें तैयारी, प्रारूप तैयार करना (ड्राफ्टिंग) और संशोधन शामिल होते हैं, ताकि विचारों और तर्कों को प्रभावी ढंग से प्रस्तुत किया जा सके। निबंध लेखन एक संरचित प्रक्रिया है जिसमें तैयारी, प्रारूप तैयार करना (ड्राफ्टिंग) और संशोधन शामिल होते हैं, ताकि विचारों और तर्कों को प्रभावी ढंग से प्रस्तुत किया जा सके। निबंध लेखन एक संरचित प्रक्रिया है जिसमें तैयारी, प्रारूप तैयार करना (ड्राफ्टिंग) और संशोधन शामिल होते हैं, ताकि विचारों और तर्कों को प्रभावी ढंग से प्रस्तुत किया जा सके। निबंध लेखन एक संरचित प्रक्रिया है जिसमें तैयारी, प्रारूप तैयार करना (ड्राफ्टिंग) और संशोधन शामिल होते हैं, ताकि विचारों और तर्कों को प्रभावी ढंग से प्रस्तुत किया जा सके। निबंध लेखन एक संरचित प्रक्रिया है जिसमें तैयारी, प्रारूप तैयार करना (ड्राफ्टिंग) और संशोधन शामिल होते हैं, ताकि विचारों और तर्कों को प्रभावी ढंग से प्रस्तुत किया जा सके। निबंध लेखन एक संरचित प्रक्रिया है जिसमें तैयारी, प्रारूप तैयार करना (ड्राफ्टिंग) और संशोधन शामिल होते हैं, ताकि विचारों और तर्कों को प्रभावी ढंग से प्रस्तुत किया जा सके। निबंध लेखन एक संरचित प्रक्रिया है जिसमें तैयारी, प्रारूप तैयार करना (ड्राफ्टिंग) और संशोधन शामिल होते हैं, ताकि विचारों और तर्कों को प्रभावी ढंग से प्रस्तुत किया जा सके।",
        "review-head":"ग्राहक समीक्षाएँ",

      },
      "mobile-head": {
    "page_name": "पेज का नाम",
    "brand_name": "ब्रांड का नाम",
    "product_details": "उत्पाद विवरण",
    "customer_details": "ग्राहक विवरण",
   
  }
    }
  }
},
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;