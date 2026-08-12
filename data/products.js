// Mock product data. Replace with real API data later.
export const categories = ["chocolate", "baklava", "candy", "cakes"];

function imgs(seed) {
  return [
    "https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2240,c_limit/chocolate-chip-cookie.jpg",
"https://theeburgerdude.com/wp-content/uploads/2023/12/Cookie-New-01-2048x2048.jpg"   
 // `https://placehold.co/800x800/F7F3EE/262220?font=montserrat&text=${seed}+1`,
    // `https://placehold.co/800x800/F7F3EE/262220?font=montserrat&text=${seed}+2`,
    // `https://placehold.co/800x800/F7F3EE/262220?font=montserrat&text=${seed}+3`,
  ];
}

export const products = [
  {
    id: "choc-box-1",
    category: "chocolate",
    images: imgs("Choc.Box"),
    price: 180,
    oldPrice: 240,
    name: { en: "Belgian Truffle Box (12 pcs)", tr: "Belçika Trüf Kutusu (12 adet)" },
    description: {
      en: "Twelve hand-rolled dark chocolate truffles dusted with cocoa, filled with smooth ganache.",
      tr: "Kakao tozuyla kaplanmış, yumuşak ganaj dolgulu on iki elde yapılmış bitter çikolata trüf.",
    },
  },
  {
    id: "choc-bar-1",
    category: "chocolate",
    images: imgs("Choc.Bar"),
    price: 45,
    name: { en: "Hazelnut Milk Chocolate Bar", tr: "Fındıklı Sütlü Çikolata Bar" },
    description: {
      en: "Creamy milk chocolate bar packed with roasted hazelnut pieces.",
      tr: "Kavrulmuş fındık parçacıklarıyla dolu kremalı sütlü çikolata bar." ,
    },
  },
  {
    id: "choc-assort-1",
    category: "chocolate",
    images: imgs("Choc.Assort"),
    price: 220,
    oldPrice: 260,
    name: { en: "Assorted Pralines Tin", tr: "Karışık Praline Kutusu" },
    description: {
      en: "A festive tin of assorted pralines: pistachio, caramel, and orange peel.",
      tr: "Fıstıklı, karamelli ve portakal kabuklu çeşitli pralinlerden oluşan şık bir kutu.",
    },
  },
  {
    id: "baklava-pist-1",
    category: "baklava",
    images: imgs("Baklava.Pist"),
    price: 160,
    name: { en: "Pistachio Baklava (1kg)", tr: "Antep Fıstıklı Baklava (1kg)" },
    description: {
      en: "Crispy layered pastry soaked in light syrup, filled generously with pistachio.",
      tr: "Hafif şerbetli, bol Antep fıstıklı, çıtır katlı geleneksel baklava.",
    },
  },
  {
    id: "baklava-walnut-1",
    category: "baklava",
    images: imgs("Baklava.Walnut"),
    price: 140,
    oldPrice: 170,
    name: { en: "Walnut Baklava (1kg)", tr: "Cevizli Baklava (1kg)" },
    description: {
      en: "Classic walnut baklava, baked fresh daily with a rich buttery aroma.",
      tr: "Her gün taze pişirilen, zengin tereyağı kokulu klasik cevizli baklava.",
    },
  },
  {
    id: "kunefe-1",
    category: "baklava",
    images: imgs("Kunefe"),
    price: 95,
    name: { en: "Künefe with Cream", tr: "Kaymaklı Künefe" },
    description: {
      en: "Shredded pastry crisped to order, layered with melted cheese and clotted cream.",
      tr: "Sipariş üzerine çıtırlaştırılan, eriyen peynir ve kaymak ile servis edilen künefe.",
    },
  },
  {
    id: "candy-mix-1",
    category: "candy",
    images: imgs("Candy.Mix"),
    price: 60,
    name: { en: "Fruit Hard Candy Mix (500g)", tr: "Karışık Meyveli Şeker (500g)" },
    description: {
      en: "A colourful mix of fruit-flavoured hard candy, perfect for sharing.",
      tr: "Paylaşmak için ideal, rengarenk meyve aromalı sert şeker karışımı.",
    },
  },
  {
    id: "turkish-delight-1",
    category: "candy",
    images: imgs("Delight"),
    price: 85,
    oldPrice: 110,
    name: { en: "Rose Turkish Delight (500g)", tr: "Gül Aromalı Lokum (500g)" },
    description: {
      en: "Soft rose-flavoured Turkish delight, dusted with icing sugar.",
      tr: "Pudra şekeri ile kaplanmış, yumuşak gül aromalı lokum.",
    },
  },
  {
    id: "cake-choc-1",
    category: "cakes",
    images: imgs("Cake.Choc"),
    price: 320,
    name: { en: "Triple Chocolate Cake", tr: "Üçlü Çikolatalı Pasta" },
    description: {
      en: "Layers of dark, milk, and white chocolate sponge with ganache filling.",
      tr: "Bitter, sütlü ve beyaz çikolata katmanlarından oluşan ganajlı pasta.",
    },
  },
  {
    id: "cake-redvelvet-1",
    category: "cakes",
    images: imgs("Cake.RedVelvet"),
    price: 290,
    oldPrice: 340,
    name: { en: "Red Velvet Cake", tr: "Kırmızı Kadife Pasta" },
    description: {
      en: "Classic red velvet sponge with cream cheese frosting.",
      tr: "Krem peynirli kremayla kaplanmış klasik kırmızı kadife pasta.",
    },
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category) {
  return products.filter((p) => p.category === category);
}
