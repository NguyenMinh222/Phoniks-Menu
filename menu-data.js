/*
  PHONIKS QR MENU
  Фото клади в папку /images
  PNG поддерживается: image: "images/pho-bo.webp"
  Граммовка: weight: "350 г" или weight: "450 г + рис 120 г"
*/

const CATEGORIES = {
  all: { ru: "Все", en: "All", vn: "Tất cả", zh: "全部" },
  soups: { ru: "Супы", en: "Soups", vn: "Súp", zh: "汤类" },
  noodles: { ru: "Лапша", en: "Noodles", vn: "Mì", zh: "面类" },
  bowls: { ru: "Боулы", en: "Bowls", vn: "Tô trộn", zh: "拌饭碗" },
  rice: { ru: "Рис", en: "Rice", vn: "Cơm", zh: "米饭" },
  hot: { ru: "Горячее", en: "Hot dishes", vn: "Món nóng", zh: "热菜" },
  salads: { ru: "Салаты", en: "Salads", vn: "Gỏi", zh: "沙拉" },
  snacks: { ru: "Закуски", en: "Snacks", vn: "Món ăn nhẹ", zh: "小吃" },
  vegan: { ru: "Веганское", en: "Vegan", vn: "Món chay", zh: "纯素" },
  sets: { ru: "Сеты для двоих", en: "Sets for two", vn: "Set cho hai người", zh: "双人套餐" },
  kids: { ru: "Детское", en: "Kids", vn: "Trẻ em", zh: "儿童餐" },
  extra: { ru: "Дополнительно", en: "Extra", vn: "Món thêm", zh: "加点" },
  desserts: { ru: "Десерты", en: "Desserts", vn: "Tráng miệng", zh: "甜点" },
  drinks: { ru: "Напитки", en: "Drinks", vn: "Đồ uống", zh: "饮品" }
};

const MENU = [
  {
    id: "tom-yam",
    category: "soups",
    price: 18,
    // weight: {
    //   ru: "450 гр",
    //   en: "450 gr",
    //   vn: "450 gr",
    //   zh: "450 dk"
    // },
    weight: "уточняется",
    image: "images/tom-yum.webp",
    spicy: true,
    hit: true,
    ru: {
      name: "Том Ям",
      description: "Острый тайский суп с креветками, мидиями, кальмаром, шампиньонами, грибами шитаки и кокосовым молоком. Подаётся с рисом."
    },
    en: {
      name: "Tom Yum",
      description: "Spicy Thai soup with shrimp, mussels, squid, champignons, shiitake mushrooms and coconut milk. Served with rice."
    },
    vn: {
      name: "Tom Yum",
      description: "Súp Thái cay với tôm, vẹm, mực, nấm, nấm hương và nước cốt dừa. Ăn kèm cơm."
    },
    zh: {
      name: "冬阴功汤",
      description: "酸辣泰式汤，配虾、青口贝、鱿鱼、蘑菇、香菇和椰奶。搭配米饭。"
    }
  },
  {
    id: "tom-kha",
    category: "soups",
    price: null,
    weight: "уточняется",
    image: "images/tom-kha.png",
    spicy: false,
    hit: false,
    ru: {
      name: "Том Кха",
      description: "Нежный кокосовый суп с курицей, грибами и ароматом лемонграсса. Баланс сливочного вкуса, лёгкой кислинки и азиатских специй."
    },
    en: {
      name: "Tom Kha",
      description: "Delicate coconut soup with chicken, mushrooms and lemongrass aroma. A balance of creamy taste, light sourness and Asian spices."
    },
    vn: {
      name: "Tom Kha",
      description: "Súp dừa nhẹ với gà, nấm và hương sả. Vị béo dịu, chua nhẹ và gia vị châu Á."
    },
    zh: {
      name: "椰香鸡汤",
      description: "柔和椰奶汤，配鸡肉、蘑菇和香茅，带有奶香、微酸和亚洲香料风味。"
    }
  },
  {
    id: "laksa",
    category: "soups",
    price: null,
    weight: "уточняется",
    image: "images/laksa.png",
    spicy: true,
    hit: false,
    ru: {
      name: "Лакса",
      description: "Насыщенный пряный суп на кокосовом молоке с лапшой и морепродуктами."
    },
    en: {
      name: "Laksa",
      description: "Rich spicy coconut milk soup with noodles and seafood."
    },
    vn: {
      name: "Laksa",
      description: "Súp cay đậm vị với nước cốt dừa, mì và hải sản."
    },
    zh: {
      name: "叻沙",
      description: "浓郁辛香椰奶汤，配面条和海鲜。"
    }
  },
  {
    id: "pho-bo",
    category: "soups",
    price: 22,
    weight: "уточняется",
    image: "images/pho-bo.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Фо Бо",
      description: "Легендарный вьетнамский суп с говядиной, рисовой лапшой, наваристым бульоном и большим количеством зелени. Подаётся с чесночным уксусом, острым перцем и лимоном."
    },
    en: {
      name: "Pho Bo",
      description: "Legendary Vietnamese beef noodle soup with rich broth and fresh herbs. Served with garlic vinegar, chili and lemon."
    },
    vn: {
      name: "Phở Bò",
      description: "Phở bò truyền thống với nước dùng đậm đà, bánh phở và nhiều rau thơm. Ăn kèm giấm tỏi, ớt và chanh."
    },
    zh: {
      name: "牛肉粉",
      description: "经典越南牛肉河粉，配浓郁汤底和大量香草。搭配蒜醋、辣椒和柠檬。"
    }
  },
  {
    id: "pho-ga",
    category: "soups",
    price: 19,
    weight: "уточняется",
    image: "images/pho-ga.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Фо Га",
      description: "Традиционный вьетнамский суп с курицей, рисовой лапшой, ароматной зеленью и наваристым бульоном. Подаётся с чесночным уксусом, острым перцем и лимоном."
    },
    en: {
      name: "Pho Ga",
      description: "Traditional Vietnamese chicken noodle soup with herbs and rich broth. Served with garlic vinegar, chili and lemon."
    },
    vn: {
      name: "Phở Gà",
      description: "Phở gà truyền thống với bánh phở, rau thơm và nước dùng đậm đà. Ăn kèm giấm tỏi, ớt và chanh."
    },
    zh: {
      name: "鸡肉粉",
      description: "传统越南鸡肉河粉，配香草和浓郁汤底。搭配蒜醋、辣椒和柠檬。"
    }
  },
  {
    id: "pho-tom",
    category: "soups",
    price: 24,
    weight: "уточняется",
    image: "images/pho-tom.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Фо Том",
      description: "Рисовая лапша в насыщенном бульоне с креветками и свежей зеленью."
    },
    en: {
      name: "Pho Tom",
      description: "Rice noodles in rich broth with shrimp and fresh herbs."
    },
    vn: {
      name: "Phở Tôm",
      description: "Bánh phở trong nước dùng đậm đà với tôm và rau thơm tươi."
    },
    zh: {
      name: "鲜虾河粉",
      description: "浓郁汤底米粉，配鲜虾和新鲜香草。"
    }
  },
  {
    id: "pho-dau",
    category: ["soups", "vegan"],
    price: 18,
    weight: "уточняется",
    image: "images/pho-tofu.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Фо Дау",
      description: "Рисовая лапша в насыщенном бульоне с сыром тофу и свежей зеленью."
    },
    en: {
      name: "Pho Dau",
      description: "Rice noodles in rich broth with tofu and fresh herbs."
    },
    vn: {
      name: "Phở Đậu",
      description: "Bánh phở trong nước dùng đậm đà với đậu phụ và rau thơm tươi."
    },
    zh: {
      name: "豆腐河粉",
      description: "浓郁汤底米粉，配豆腐和新鲜香草。"
    }
  },
  {
    id: "mi-tom-soup",
    category: "soups",
    price: 12,
    weight: "уточняется",
    image: "images/mi-tom-ga.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Ми Том",
      description: "Суп с вьетнамской лапшой на наваристом бульоне, курицей, пекинской капустой и жареным яйцом."
    },
    en: {
      name: "Mi Tom",
      description: "Vietnamese noodle soup with rich broth, chicken, Chinese cabbage and fried egg."
    },
    vn: {
      name: "Mì Tôm",
      description: "Súp mì Việt Nam với nước dùng đậm đà, gà, cải thảo và trứng chiên."
    },
    zh: {
      name: "越南汤面",
      description: "越南汤面，配浓郁汤底、鸡肉、白菜和煎蛋。"
    }
  },
  {
    id: "mi-tom-chicken",
    category: "noodles",
    price: 19,
    weight: "уточняется",
    image: "images/mi-xao-all.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Ми Том с курицей",
      description: "Жареная вьетнамская лапша с курицей, луком, грибами, брокколи и пекинской капустой в воке."
    },
    en: {
      name: "Mi Tom with Chicken",
      description: "Fried Vietnamese noodles with chicken, onion, mushrooms, broccoli and Chinese cabbage in a wok."
    },
    vn: {
      name: "Mì Tôm Xào Gà",
      description: "Mì Việt Nam xào với gà, hành tây, nấm, bông cải xanh và cải thảo."
    },
    zh: {
      name: "鸡肉炒越南面",
      description: "越南炒面，配鸡肉、洋葱、蘑菇、西兰花和白菜。"
    }
  },
  {
    id: "mi-tom-beef",
    category: "noodles",
    price: 21,
    weight: "уточняется",
    image: "images/mi-tom-beef.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Ми Том с говядиной",
      description: "Жареная вьетнамская лапша с говядиной, луком, грибами, брокколи и пекинской капустой в воке."
    },
    en: {
      name: "Mi Tom with Beef",
      description: "Fried Vietnamese noodles with beef, onion, mushrooms, broccoli and Chinese cabbage in a wok."
    },
    vn: {
      name: "Mì Tôm Xào Bò",
      description: "Mì Việt Nam xào với bò, hành tây, nấm, bông cải xanh và cải thảo."
    },
    zh: {
      name: "牛肉炒越南面",
      description: "越南炒面，配牛肉、洋葱、蘑菇、西兰花和白菜。"
    }
  },
  {
    id: "mi-tom-shrimp",
    category: "noodles",
    price: 23,
    weight: "уточняется",
    image: "images/mi-tom-shrimp.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Ми Том с креветками",
      description: "Жареная вьетнамская лапша с креветками, луком, грибами, брокколи и пекинской капустой в воке."
    },
    en: {
      name: "Mi Tom with Shrimp",
      description: "Fried Vietnamese noodles with shrimp, onion, mushrooms, broccoli and Chinese cabbage in a wok."
    },
    vn: {
      name: "Mì Tôm Xào Tôm",
      description: "Mì Việt Nam xào với tôm, hành tây, nấm, bông cải xanh và cải thảo."
    },
    zh: {
      name: "鲜虾炒越南面",
      description: "越南炒面，配鲜虾、洋葱、蘑菇、西兰花和白菜。"
    }
  },
  {
    id: "pho-sao-chicken",
    category: "noodles",
    price: 21,
    weight: "уточняется",
    image: "images/pho-sao-chicken.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Фо Сао с курицей",
      description: "Жареная рисовая лапша с курицей, луком, стручковой фасолью, цукини, бобами эдамаме, перцем и морковью."
    },
    en: {
      name: "Pho Sao with Chicken",
      description: "Fried rice noodles with chicken, onion, green beans, zucchini, edamame, pepper and carrot."
    },
    vn: {
      name: "Phở Xào Gà",
      description: "Phở xào với gà, hành tây, đậu cô ve, bí ngòi, edamame, ớt chuông và cà rốt."
    },
    zh: {
      name: "鸡肉炒河粉",
      description: "炒河粉，配鸡肉、洋葱、四季豆、西葫芦、毛豆、甜椒和胡萝卜。"
    }
  },
  {
    id: "pho-sao-beef",
    category: "noodles",
    price: 22,
    weight: "уточняется",
    image: "images/pho-xao-bo.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Фо Сао с говядиной",
      description: "Жареная рисовая лапша с говядиной, луком, стручковой фасолью, цукини, бобами эдамаме, перцем и морковью."
    },
    en: {
      name: "Pho Sao with Beef",
      description: "Fried rice noodles with beef, onion, green beans, zucchini, edamame, pepper and carrot."
    },
    vn: {
      name: "Phở Xào Bò",
      description: "Phở xào với bò, hành tây, đậu cô ve, bí ngòi, edamame, ớt chuông và cà rốt."
    },
    zh: {
      name: "牛肉炒河粉",
      description: "炒河粉，配牛肉、洋葱、四季豆、西葫芦、毛豆、甜椒和胡萝卜。"
    }
  },
  {
    id: "pho-sao-shrimp",
    category: "noodles",
    price: 24,
    weight: "уточняется",
    image: "images/pho-sao-shrimp.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Фо Сао с креветками",
      description: "Жареная рисовая лапша с креветками, луком, стручковой фасолью, цукини, бобами эдамаме, перцем и морковью."
    },
    en: {
      name: "Pho Sao with Shrimp",
      description: "Fried rice noodles with shrimp, onion, green beans, zucchini, edamame, pepper and carrot."
    },
    vn: {
      name: "Phở Xào Tôm",
      description: "Phở xào với tôm, hành tây, đậu cô ve, bí ngòi, edamame, ớt chuông và cà rốt."
    },
    zh: {
      name: "鲜虾炒河粉",
      description: "炒河粉，配鲜虾、洋葱、四季豆、西葫芦、毛豆、甜椒和胡萝卜。"
    }
  },
  {
    id: "pho-sao-mix",
    category: "noodles",
    price: 28,
    weight: "уточняется",
    image: "images/pho-sao-mix.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Фо Сао микс",
      description: "Жареная рисовая лапша с двумя видами мяса на выбор, луком, стручковой фасолью, цукини, бобами эдамаме, перцем и морковью."
    },
    en: {
      name: "Pho Sao Mix",
      description: "Fried rice noodles with two types of meat of your choice, onion, green beans, zucchini, edamame, pepper and carrot."
    },
    vn: {
      name: "Phở Xào Mix",
      description: "Phở xào với hai loại thịt tùy chọn, hành tây, đậu cô ve, bí ngòi, edamame, ớt chuông và cà rốt."
    },
    zh: {
      name: "混合炒河粉",
      description: "炒河粉，可选两种肉，配洋葱、四季豆、西葫芦、毛豆、甜椒和胡萝卜。"
    }
  },
  {
    id: "mien-chicken",
    category: "noodles",
    price: 21,
    weight: "уточняется",
    image: "images/mien-chicken.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Миен с курицей",
      description: "Стеклянная лапша с курицей, зелёным луком, грибами, сладким перцем и брокколи."
    },
    en: {
      name: "Mien with Chicken",
      description: "Glass noodles with chicken, green onions, mushrooms, sweet peppers, and broccoli."
    },
    vn: {
      name: "Miến Xào Gà",
      description: "Miến trộn với thịt gà, hành lá, nấm, ớt chuông và bông cải xanh."
    },
    zh: {
      name: "鸡肉粉丝",
      description: "粉丝配鸡肉、葱、蘑菇、甜椒和西兰花。"
    }
  },
  {
    id: "mien-beef",
    category: "noodles",
    price: 23,
    weight: "уточняется",
    image: "images/mien-beef.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Миен с говядиной",
      description: "Стеклянная лапша с говядиной, зелёным луком, грибами, сладким перцем и брокколи."
    },
    en: {
      name: "Mien with Beef",
      description: "Glass noodles with beef, green onions, mushrooms, sweet peppers, and broccoli."
    },
    vn: {
      name: "Miến Xào Bò",
      description: "Miến trộn với thịt bò, hành lá, nấm, ớt chuông và bông cải xanh."
    },
    zh: {
      name: "牛肉粉丝",
      description: "粉丝配牛肉、葱、蘑菇、甜椒和西兰花。"
    }
  },
  {
    id: "mien-shrimp",
    category: "noodles",
    price: 24,
    weight: "уточняется",
    image: "images/mien-xao-tom.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Миен с креветками",
      description: "Стеклянная лапша с креветками, зелёным луком, грибами, сладким перцем и брокколи."
    },
    en: {
      name: "Mien with Shrimp",
      description: "Glass noodles with shrimp, green onions, mushrooms, sweet peppers, and broccoli."
    },
    vn: {
      name: "Miến Xào Tôm",
      description: "Miến trộn với tôm, hành lá, nấm, ớt chuông và bông cải xanh."
    },
    zh: {
      name: "鲜虾粉丝",
      description: "粉丝配虾、葱、蘑菇、甜椒和西兰花。"
    }
  },
    {
    id: "wok-chicken",
    category: "noodles",
    price: 21,
    weight: "уточняется",
    image: "images/mi-wok.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Вок с курицей",
      description: "Яичная лапша, обжаренная в воке с курицей, луком, бобами эдамаме, стручковой фасолью, сладким перцем и морковью."
    },
    en: {
      name: "Wok with Chicken",
      description: "Egg noodles stir-fried in a wok with chicken, onion, edamame, green beans, sweet pepper and carrot."
    },
    vn: {
      name: "Mì Trứng Xào Gà",
      description: "Mì trứng xào với gà, hành tây, edamame, đậu cô ve, ớt chuông và cà rốt."
    },
    zh: {
      name: "鸡肉炒蛋面",
      description: "蛋面配鸡肉、洋葱、毛豆、四季豆、甜椒和胡萝卜。"
    }
  },
  {
    id: "wok-beef",
    category: "noodles",
    price: 24,
    weight: "уточняется",
    image: "images/wok-beef.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Вок с говядиной",
      description: "Яичная лапша, обжаренная в воке с говядиной, луком, бобами эдамаме, стручковой фасолью, сладким перцем и морковью."
    },
    en: {
      name: "Wok with Beef",
      description: "Egg noodles stir-fried in a wok with beef, onion, edamame, green beans, sweet pepper and carrot."
    },
    vn: {
      name: "Mì Trứng Xào Bò",
      description: "Mì trứng xào với bò, hành tây, edamame, đậu cô ve, ớt chuông và cà rốt."
    },
    zh: {
      name: "牛肉炒蛋面",
      description: "蛋面配牛肉、洋葱、毛豆、四季豆、甜椒和胡萝卜。"
    }
  },
  {
    id: "udon-beef-unagi",
    category: "noodles",
    price: 27,
    weight: "уточняется",
    image: "images/udon-beef-unagi.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Удон с говядиной унаги",
      description: "Пшеничная лапша удон с говядиной в сладко-солёном соусе унаги, с луком, шампиньонами, шитаки и луком-пореем."
    },
    en: {
      name: "Udon with Beef Unagi",
      description: "Wheat udon noodles with beef in sweet-salty unagi sauce, onion, champignons, shiitake and leek."
    },
    vn: {
      name: "Udon Bò Sốt Unagi",
      description: "Mì udon với bò sốt unagi mặn ngọt, hành tây, nấm mỡ, nấm hương và tỏi tây."
    },
    zh: {
      name: "鳗鱼汁牛肉乌冬",
      description: "乌冬面配牛肉、甜咸鳗鱼汁、洋葱、蘑菇、香菇和大葱。"
    }
  },
  {
    id: "udon-shrimp-curry",
    category: "noodles",
    price: 29,
    weight: "уточняется",
    image: "images/udon-shrimp-curry.webp",
    spicy: true,
    hit: false,
    ru: {
      name: "Удон с креветками карри",
      description: "Удон с креветками в пряном карри-соусе, с луком, бобами эдамаме, стручковой фасолью, брокколи и морковью."
    },
    en: {
      name: "Udon with Shrimp Curry",
      description: "Udon noodles with shrimp in spicy curry sauce, onion, edamame, green beans, broccoli and carrot."
    },
    vn: {
      name: "Udon Tôm Cà Ri",
      description: "Mì udon với tôm sốt cà ri cay, hành tây, edamame, đậu cô ve, bông cải xanh và cà rốt."
    },
    zh: {
      name: "咖喱虾乌冬",
      description: "乌冬面配鲜虾、咖喱酱、洋葱、毛豆、四季豆、西兰花和胡萝卜。"
    }
  },
  {
    id: "udon-chicken-curry",
    category: "noodles",
    price: 25,
    weight: "уточняется",
    image: "images/udon-chicken-curry.webp",
    spicy: true,
    hit: false,
    ru: {
      name: "Удон с курицей карри",
      description: "Удон с курицей в насыщенном карри-соусе, с луком, бобами эдамаме, стручковой фасолью, брокколи и морковью."
    },
    en: {
      name: "Udon with Chicken Curry",
      description: "Udon noodles with chicken in rich curry sauce, onion, edamame, green beans, broccoli and carrot."
    },
    vn: {
      name: "Udon Gà Cà Ri",
      description: "Mì udon với gà sốt cà ri đậm vị, hành tây, edamame, đậu cô ve, bông cải xanh và cà rốt."
    },
    zh: {
      name: "咖喱鸡乌冬",
      description: "乌冬面配鸡肉、咖喱酱、洋葱、毛豆、四季豆、西兰花和胡萝卜。"
    }
  },
  {
    id: "mi-chon-chicken",
    category: "bowls",
    price: 19,
    weight: "уточняется",
    image: "images/mi-chon-chicken.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Ми Чон с курицей",
      description: "В основе вьетнамская лапша. Сверху обжаренная курица в соусе майо-чили, свежий огурец, сладкий перец, чука, грибы, жареное яйцо, арахис и соус унаги."
    },
    en: {
      name: "Mi Chon with Chicken",
      description: "Vietnamese noodles topped with fried chicken in mayo-chili sauce, cucumber, sweet pepper, chuka, mushrooms, fried egg, peanuts and unagi sauce."
    },
    vn: {
      name: "Mì Trộn Gà",
      description: "Mì Việt Nam với gà xào sốt mayo ớt, dưa leo, ớt chuông, rong biển chuka, nấm, trứng chiên, đậu phộng và sốt unagi."
    },
    zh: {
      name: "鸡肉拌面",
      description: "越南面配蛋黄辣酱鸡肉、黄瓜、甜椒、海藻、蘑菇、煎蛋、花生和鳗鱼汁。"
    }
  },
  {
    id: "mi-chon-beef",
    category: "bowls",
    price: 22,
    weight: "уточняется",
    image: "images/mi-chon-beef.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Ми Чон с говядиной",
      description: "В основе вьетнамская лапша. Сверху обжаренная говядина в устрично-унаги соусе, свежий огурец, сладкий перец, чука, грибы, жареное яйцо и арахис."
    },
    en: {
      name: "Mi Chon with Beef",
      description: "Vietnamese noodles topped with fried beef in oyster-unagi sauce, cucumber, sweet pepper, chuka, mushrooms, fried egg and peanuts."
    },
    vn: {
      name: "Mì Trộn Bò",
      description: "Mì Việt Nam với bò xào sốt hàu-unagi, dưa leo, ớt chuông, rong biển chuka, nấm, trứng chiên và đậu phộng."
    },
    zh: {
      name: "牛肉拌面",
      description: "越南面配蚝油鳗鱼汁牛肉、黄瓜、甜椒、海藻、蘑菇、煎蛋和花生。"
    }
  },
  {
    id: "mi-chon-shrimp",
    category: "bowls",
    price: 24,
    weight: "уточняется",
    image: "images/mi-chon-shrimp.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Ми Чон с креветками",
      description: "В основе вьетнамская лапша. Сверху обжаренные креветки в соусе майо-чили, свежий огурец, сладкий перец, чука, грибы, жареное яйцо, арахис и соус унаги."
    },
    en: {
      name: "Mi Chon with Shrimp",
      description: "Vietnamese noodles topped with fried shrimp in mayo-chili sauce, cucumber, sweet pepper, chuka, mushrooms, fried egg, peanuts and unagi sauce."
    },
    vn: {
      name: "Mì Trộn Tôm",
      description: "Mì Việt Nam với tôm xào sốt mayo ớt, dưa leo, ớt chuông, rong biển chuka, nấm, trứng chiên, đậu phộng và sốt unagi."
    },
    zh: {
      name: "鲜虾拌面",
      description: "越南面配蛋黄辣酱鲜虾、黄瓜、甜椒、海藻、蘑菇、煎蛋、花生和鳗鱼汁。"
    }
  },
  {
    id: "com-chon-shrimp",
    category: "bowls",
    price: 26,
    weight: "уточняется",
    image: "images/com-tron.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Кэм Чон с креветками",
      description: "В основе рис. Сверху обжаренные креветки в соусе майо-чили, свежий огурец, сладкий перец, чука, грибы, жареное яйцо, арахис и соус унаги."
    },
    en: {
      name: "Com Chon with Shrimp",
      description: "Rice bowl topped with fried shrimp in mayo-chili sauce, cucumber, sweet pepper, chuka, mushrooms, fried egg, peanuts and unagi sauce."
    },
    vn: {
      name: "Cơm Trộn Tôm",
      description: "Cơm với tôm xào sốt mayo ớt, dưa leo, ớt chuông, rong biển chuka, nấm, trứng chiên, đậu phộng và sốt unagi."
    },
    zh: {
      name: "鲜虾拌饭",
      description: "米饭配蛋黄辣酱鲜虾、黄瓜、甜椒、海藻、蘑菇、煎蛋、花生和鳗鱼汁。"
    }
  },
  {
    id: "com-chon-beef",
    category: "bowls",
    price: 24,
    weight: "уточняется",
    image: "images/com-chon-beef.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Кэм Чон с говядиной",
      description: "В основе рис. Сверху обжаренная говядина в устрично-унаги соусе, свежий огурец, сладкий перец, чука, грибы, жареное яйцо и арахис."
    },
    en: {
      name: "Com Chon with Beef",
      description: "Rice bowl topped with fried beef in oyster-unagi sauce, cucumber, sweet pepper, chuka, mushrooms, fried egg and peanuts."
    },
    vn: {
      name: "Cơm Trộn Bò",
      description: "Cơm với bò xào sốt hàu-unagi, dưa leo, ớt chuông, rong biển chuka, nấm, trứng chiên và đậu phộng."
    },
    zh: {
      name: "牛肉拌饭",
      description: "米饭配蚝油鳗鱼汁牛肉、黄瓜、甜椒、海藻、蘑菇、煎蛋和花生。"
    }
  },
  {
    id: "com-chon-chicken",
    category: "bowls",
    price: 21,
    weight: "уточняется",
    image: "images/com-chon-chicken.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Кэм Чон с курицей",
      description: "В основе рис. Сверху обжаренная курица в соусе майо-чили, свежий огурец, сладкий перец, чука, грибы, жареное яйцо, арахис и соус унаги."
    },
    en: {
      name: "Com Chon with Chicken",
      description: "Rice bowl topped with fried chicken in mayo-chili sauce, cucumber, sweet pepper, chuka, mushrooms, fried egg, peanuts and unagi sauce."
    },
    vn: {
      name: "Cơm Trộn Gà",
      description: "Cơm với gà xào sốt mayo ớt, dưa leo, ớt chuông, rong biển chuka, nấm, trứng chiên, đậu phộng và sốt unagi."
    },
    zh: {
      name: "鸡肉拌饭",
      description: "米饭配蛋黄辣酱鸡肉、黄瓜、甜椒、海藻、蘑菇、煎蛋、花生和鳗鱼汁。"
    }
  },
  {
    id: "com-rang-chicken",
    category: "rice",
    price: 22,
    weight: "уточняется",
    image: "images/com-rang.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Кэм Занг с курицей",
      description: "Жареный рис с курицей, луком, морковью, бобами эдамаме, стручковой фасолью и брокколи."
    },
    en: {
      name: "Com Rang with Chicken",
      description: "Fried rice with chicken, onion, carrot, edamame, green beans and broccoli."
    },
    vn: {
      name: "Cơm Rang Gà",
      description: "Cơm rang với gà, hành tây, cà rốt, edamame, đậu cô ve và bông cải xanh."
    },
    zh: {
      name: "鸡肉炒饭",
      description: "炒饭配鸡肉、洋葱、胡萝卜、毛豆、四季豆和西兰花。"
    }
  },
  {
    id: "com-rang-beef",
    category: "rice",
    price: 25,
    weight: "уточняется",
    image: "images/com-rang-beef.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Кэм Занг с говядиной",
      description: "Жареный рис с говядиной, луком, морковью, бобами эдамаме, стручковой фасолью и брокколи."
    },
    en: {
      name: "Com Rang with Beef",
      description: "Fried rice with beef, onion, carrot, edamame, green beans and broccoli."
    },
    vn: {
      name: "Cơm Rang Bò",
      description: "Cơm rang với bò, hành tây, cà rốt, edamame, đậu cô ve và bông cải xanh."
    },
    zh: {
      name: "牛肉炒饭",
      description: "炒饭配牛肉、洋葱、胡萝卜、毛豆、四季豆和西兰花。"
    }
  },
  {
    id: "com-rang-shrimp",
    category: "rice",
    price: 28,
    weight: "уточняется",
    image: "images/com-rang-shrimp.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Кэм Занг с креветками",
      description: "Жареный рис с креветками, луком, морковью, бобами эдамаме, стручковой фасолью и брокколи."
    },
    en: {
      name: "Com Rang with Shrimp",
      description: "Fried rice with shrimp, onion, carrot, edamame, green beans and broccoli."
    },
    vn: {
      name: "Cơm Rang Tôm",
      description: "Cơm rang với tôm, hành tây, cà rốt, edamame, đậu cô ve và bông cải xanh."
    },
    zh: {
      name: "鲜虾炒饭",
      description: "炒饭配鲜虾、洋葱、胡萝卜、毛豆、四季豆和西兰花。"
    }
  },
  {
    id: "bun-cha",
    category: "hot",
    price: 26,
    weight: "уточняется",
    image: "images/bun-cha.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Бун Ча",
      description: "Свинина на раскалённых камнях, рисовая лапша бун, свежая зелень и традиционный вьетнамский соус."
    },
    en: {
      name: "Bun Cha",
      description: "Pork served on hot stones with bun rice noodles, fresh herbs and traditional Vietnamese sauce."
    },
    vn: {
      name: "Bún Chả",
      description: "Thịt heo trên đá nóng, bún, rau thơm tươi và nước chấm Việt Nam truyền thống."
    },
    zh: {
      name: "烤猪肉米粉",
      description: "热石猪肉，配越南米粉、新鲜香草和传统越南酱汁。"
    }
  },
  {
    id: "bun-cha-nem",
    category: "hot",
    price: null,
    weight: "уточняется",
    image: "images/bun-cha-nem.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Бун Ча Нем",
      description: "Свинина на углях с хрустящим немом, рисовая лапша бун, свежая зелень и традиционный вьетнамский соус."
    },
    en: {
      name: "Bun Cha Nem",
      description: "Grilled pork with crispy nem, bun rice noodles, fresh herbs and traditional Vietnamese sauce."
    },
    vn: {
      name: "Bún Chả Nem",
      description: "Thịt heo nướng với nem giòn, bún, rau thơm tươi và nước chấm Việt Nam truyền thống."
    },
    zh: {
      name: "烤猪肉春卷米粉",
      description: "炭烤猪肉配脆春卷、越南米粉、新鲜香草和传统越南酱汁。"
    }
  },
  {
    id: "bun-nem",
    category: "hot",
    price: null,
    weight: "уточняется",
    image: "images/bun-nem.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Бун Нем",
      description: "Хрустящий нем, рисовая лапша бун, свежая зелень и традиционный вьетнамский соус."
    },
    en: {
      name: "Bun Nem",
      description: "Crispy nem with bun rice noodles, fresh herbs and traditional Vietnamese sauce."
    },
    vn: {
      name: "Bún Nem",
      description: "Nem giòn ăn cùng bún, rau thơm tươi và nước chấm Việt Nam truyền thống."
    },
    zh: {
      name: "春卷米粉",
      description: "脆春卷配越南米粉、新鲜香草和传统越南酱汁。"
    }
  },
  {
    id: "thit-nuong",
    category: "hot",
    price: null,
    weight: "уточняется",
    image: "images/thit-nuong.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Тхит Нэнг",
      description: "Мясо на раскалённых камнях, замаринованное во вьетнамских специях."
    },
    en: {
      name: "Thit Nuong",
      description: "Meat served on hot stones, marinated with Vietnamese spices."
    },
    vn: {
      name: "Thịt Nướng",
      description: "Thịt ướp gia vị Việt Nam, phục vụ trên đá nóng."
    },
    zh: {
      name: "越式烤肉",
      description: "越南香料腌制肉类，热石上桌。"
    }
  },
  {
    id: "bo-luc-lac",
    category: "hot",
    price: 31,
    weight: "уточняется",
    image: "images/bo-luc-lac.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Бо Лук Лак",
      description: "Знаменитая вьетнамская говядина кубиками, обжаренная на сильном огне, с крупными кусочками лука и болгарского перца трёх цветов."
    },
    en: {
      name: "Bo Luc Lac",
      description: "Famous Vietnamese shaking beef cubes stir-fried over high heat with large pieces of onion and three-color bell pepper."
    },
    vn: {
      name: "Bò Lúc Lắc",
      description: "Bò Việt Nam cắt khối, xào lửa lớn với hành tây và ớt chuông ba màu."
    },
    zh: {
      name: "越式摇牛肉",
      description: "经典越南牛肉粒，大火快炒，配洋葱和三色甜椒。"
    }
  },
  {
    id: "bo-sao",
    category: "hot",
    price: 27,
    weight: "уточняется",
    image: "images/bo-xao.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Бо Сао",
      description: "Жареная говядина с овощами: лук, брокколи, цукини, грибы, сладкий перец и пекинская капуста на раскалённой сковороде."
    },
    en: {
      name: "Bo Sao",
      description: "Stir-fried beef with onion, broccoli, zucchini, mushrooms, sweet pepper and Chinese cabbage on a hot pan."
    },
    vn: {
      name: "Bò Xào",
      description: "Bò xào với hành tây, bông cải xanh, bí ngòi, nấm, ớt chuông và cải thảo trên chảo nóng."
    },
    zh: {
      name: "炒牛肉",
      description: "热锅炒牛肉，配洋葱、西兰花、西葫芦、蘑菇、甜椒和白菜。"
    }
  },
  {
    id: "ga-sao",
    category: "hot",
    price: 24,
    weight: "уточняется",
    image: "images/ga-xao.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Га Сао",
      description: "Жареная курица с овощами: лук, брокколи, цукини, грибы, сладкий перец и пекинская капуста на раскалённой сковороде."
    },
    en: {
      name: "Ga Sao",
      description: "Stir-fried chicken with onion, broccoli, zucchini, mushrooms, sweet pepper and Chinese cabbage on a hot pan."
    },
    vn: {
      name: "Gà Xào",
      description: "Gà xào với hành tây, bông cải xanh, bí ngòi, nấm, ớt chuông và cải thảo trên chảo nóng."
    },
    zh: {
      name: "炒鸡肉",
      description: "热锅炒鸡肉，配洋葱、西兰花、西葫芦、蘑菇、甜椒和白菜。"
    }
  },
  {
    id: "hai-san-sao",
    category: "hot",
    price: null,
    weight: "уточняется",
    image: "images/hai-san.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Хай Сан Сао",
      description: "Жареные креветки, кальмар и мидии с овощами: лук, брокколи, цукини, грибы, сладкий перец и пекинская капуста на раскалённой сковороде."
    },
    en: {
      name: "Hai San Sao",
      description: "Stir-fried shrimp, squid and mussels with onion, broccoli, zucchini, mushrooms, sweet pepper and Chinese cabbage on a hot pan."
    },
    vn: {
      name: "Hải Sản Xào",
      description: "Tôm, mực và vẹm xào với hành tây, bông cải xanh, bí ngòi, nấm, ớt chuông và cải thảo trên chảo nóng."
    },
    zh: {
      name: "炒海鲜",
      description: "热锅炒虾、鱿鱼和青口贝，配洋葱、西兰花、西葫芦、蘑菇、甜椒和白菜。"
    }
  },

  {
    id: "chicken-sweet-chili",
    category: "hot",
    price: 17,
    weight: "уточняется",
    image: "images/ga-sweet-chili.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Курица Свит Чили",
      description: "Хрустящая курица, обжаренная с ростками маша в соусе свит чили и посыпанная арахисом. Подаётся с белым рисом."
    },
    en: {
      name: "Sweet Chili Chicken",
      description: "Crispy chicken stir-fried with mung bean sprouts in sweet chili sauce and topped with peanuts. Served with white rice."
    },
    vn: {
      name: "Gà Sweet Chili",
      description: "Gà giòn xào với giá đỗ trong sốt sweet chili, rắc đậu phộng. Ăn kèm cơm trắng."
    },
    zh: {
      name: "甜辣鸡",
      description: "脆鸡肉配绿豆芽和甜辣酱，撒花生。搭配白米饭。"
    }
  },
  {
    id: "chicken-mat-aung",
    category: "hot",
    price: 19,
    weight: "уточняется",
    image: "images/ga-mat-ong.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Курица Мат Аунг",
      description: "Курица в соево-медовом соусе с луком, стручковой фасолью, сладким перцем, грибами и пекинской капустой. Подаётся с белым рисом."
    },
    en: {
      name: "Mat Aung Chicken",
      description: "Chicken in soy-honey sauce with onion, green beans, sweet pepper, mushrooms and Chinese cabbage. Served with white rice."
    },
    vn: {
      name: "Gà Mật Ong",
      description: "Gà sốt đậu nành mật ong với hành tây, đậu cô ve, ớt chuông, nấm và cải thảo. Ăn kèm cơm trắng."
    },
    zh: {
      name: "蜂蜜酱油鸡",
      description: "鸡肉配蜂蜜酱油、洋葱、四季豆、甜椒、蘑菇和白菜。搭配白米饭。"
    }
  },
  {
    id: "chicken-cam",
    category: "hot",
    price: null,
    weight: "уточняется",
    image: "images/chicken-cam.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Курица Кам",
      description: "Хрустящая курица в апельсиновом соусе с бобами эдамаме. Подаётся с белым рисом."
    },
    en: {
      name: "Orange Chicken",
      description: "Crispy chicken in orange sauce with edamame. Served with white rice."
    },
    vn: {
      name: "Gà Sốt Cam",
      description: "Gà giòn sốt cam với edamame. Ăn kèm cơm trắng."
    },
    zh: {
      name: "橙汁鸡",
      description: "脆鸡肉配橙汁酱和毛豆。搭配白米饭。"
    }
  },
  {
    id: "chicken-kai",
    category: "hot",
    price: 21,
    weight: "уточняется",
    image: "images/chicken-kai.webp",
    spicy: true,
    hit: false,
    ru: {
      name: "Курица Кай",
      description: "Хрустящая курица в остром соусе, обжаренная с луком, морковью, болгарским перцем и стручковой фасолью. Подаётся с белым рисом."
    },
    en: {
      name: "Kai Chicken",
      description: "Crispy chicken in spicy sauce, stir-fried with onion, carrot, bell pepper and green beans. Served with white rice."
    },
    vn: {
      name: "Gà Cay",
      description: "Gà giòn sốt cay, xào với hành tây, cà rốt, ớt chuông và đậu cô ve. Ăn kèm cơm trắng."
    },
    zh: {
      name: "辣味鸡",
      description: "脆鸡肉配辣酱、洋葱、胡萝卜、甜椒和四季豆。搭配白米饭。"
    }
  },
  {
    id: "shrimp-mat-aung",
    category: "hot",
    price: 23,
    weight: "уточняется",
    image: "images/tom-mat-ong.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Креветки Мат Аунг",
      description: "Креветки в соево-медовом соусе, обжаренные с луком, грибами, стручковой фасолью, морковью и пекинской капустой. Подаются с белым рисом."
    },
    en: {
      name: "Mat Aung Shrimp",
      description: "Shrimp in soy-honey sauce, stir-fried with onion, mushrooms, green beans, carrot and Chinese cabbage. Served with white rice."
    },
    vn: {
      name: "Tôm Mật Ong",
      description: "Tôm sốt đậu nành mật ong, xào với hành tây, nấm, đậu cô ve, cà rốt và cải thảo. Ăn kèm cơm trắng."
    },
    zh: {
      name: "蜂蜜酱油虾",
      description: "虾配蜂蜜酱油，炒洋葱、蘑菇、四季豆、胡萝卜和白菜。搭配白米饭。"
    }
  },
  {
    id: "shrimp-mayo",
    category: "hot",
    price: 23,
    weight: "уточняется",
    image: "images/shrimp-mayo.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Креветки Майо",
      description: "Хрустящие креветки в сливочно-пряном соусе, обжаренные с луком, брокколи и морковью. Подаются с белым рисом."
    },
    en: {
      name: "Mayo Shrimp",
      description: "Crispy shrimp in creamy spicy sauce, stir-fried with onion, broccoli and carrot. Served with white rice."
    },
    vn: {
      name: "Tôm Sốt Mayo",
      description: "Tôm giòn sốt mayo béo cay, xào với hành tây, bông cải xanh và cà rốt. Ăn kèm cơm trắng."
    },
    zh: {
      name: "蛋黄酱虾",
      description: "脆虾配奶香微辣酱，炒洋葱、西兰花和胡萝卜。搭配白米饭。"
    }
  },
  {
    id: "beef-kai",
    category: "hot",
    price: 24,
    weight: "уточняется",
    image: "images/beef-kai.webp",
    spicy: true,
    hit: false,
    ru: {
      name: "Говядина Кай",
      description: "Острая говядина с ярким пряным вкусом, обжаренная с луком, цукини, морковью и пекинской капустой. Подаётся с белым рисом."
    },
    en: {
      name: "Kai Beef",
      description: "Spicy beef with bold Asian flavor, stir-fried with onion, zucchini, carrot and Chinese cabbage. Served with white rice."
    },
    vn: {
      name: "Bò Cay",
      description: "Bò cay đậm vị, xào với hành tây, bí ngòi, cà rốt và cải thảo. Ăn kèm cơm trắng."
    },
    zh: {
      name: "辣味牛肉",
      description: "香辣牛肉，炒洋葱、西葫芦、胡萝卜和白菜。搭配白米饭。"
    }
  },
  {
    id: "beef-mat-aung",
    category: "hot",
    price: 25,
    weight: "уточняется",
    image: "images/bo-mat-ong.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Говядина Мат Аунг",
      description: "Говядина в медовом соусе с лёгкой карамелизацией, обжаренная с луком, грибами и морковью. Подаётся с белым рисом."
    },
    en: {
      name: "Mat Aung Beef",
      description: "Beef in honey sauce with light caramelization, stir-fried with onion, mushrooms and carrot. Served with white rice."
    },
    vn: {
      name: "Bò Mật Ong",
      description: "Bò sốt mật ong hơi caramel, xào với hành tây, nấm và cà rốt. Ăn kèm cơm trắng."
    },
    zh: {
      name: "蜂蜜牛肉",
      description: "蜂蜜酱牛肉，轻微焦糖化，炒洋葱、蘑菇和胡萝卜。搭配白米饭。"
    }
  },
  {
    id: "fish-mayo",
    category: "hot",
    price: null,
    weight: "уточняется",
    image: "images/fish-mayo.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Ка Майо",
      description: "Тилапия в кляре, обжаренная с луком, брокколи и бобами эдамаме в фирменном соусе майо. Подаётся с белым рисом."
    },
    en: {
      name: "Fish Mayo",
      description: "Battered tilapia stir-fried with onion, broccoli and edamame in signature mayo sauce. Served with white rice."
    },
    vn: {
      name: "Cá Sốt Mayo",
      description: "Cá rô phi tẩm bột, xào với hành tây, bông cải xanh và edamame trong sốt mayo. Ăn kèm cơm trắng."
    },
    zh: {
      name: "蛋黄酱鱼",
      description: "裹粉罗非鱼，配洋葱、西兰花和毛豆，用招牌蛋黄酱炒制。搭配白米饭。"
    }
  },
  {
    id: "fish-unagi",
    category: "hot",
    price: null,
    weight: "уточняется",
    image: "images/fish-unagi.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Ка Унаги",
      description: "Тилапия в кляре, обжаренная с луком и стручковой фасолью в соусе унаги. Подаётся с белым рисом."
    },
    en: {
      name: "Fish Unagi",
      description: "Battered tilapia stir-fried with onion and green beans in unagi sauce. Served with white rice."
    },
    vn: {
      name: "Cá Sốt Unagi",
      description: "Cá rô phi tẩm bột, xào với hành tây và đậu cô ve trong sốt unagi. Ăn kèm cơm trắng."
    },
    zh: {
      name: "鳗鱼汁鱼",
      description: "裹粉罗非鱼，配洋葱和四季豆，用鳗鱼汁炒制。搭配白米饭。"
    }
  },
  {
    id: "tofu-sweet-chili",
    category: ["hot", "vegan"],
    price: 16,
    weight: "уточняется",
    image: "images/tofu-sweet-chili.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Тофу Свит Чили",
      description: "Хрустящий тофу в сладко-остром соусе, обжаренный с луком, морковью, болгарским перцем и стручковой фасолью. Подаётся с белым рисом."
    },
    en: {
      name: "Sweet Chili Tofu",
      description: "Crispy tofu in sweet-spicy sauce, stir-fried with onion, carrot, bell pepper and green beans. Served with white rice."
    },
    vn: {
      name: "Đậu Phụ Sweet Chili",
      description: "Đậu phụ giòn sốt ngọt cay, xào với hành tây, cà rốt, ớt chuông và đậu cô ve. Ăn kèm cơm trắng."
    },
    zh: {
      name: "甜辣豆腐",
      description: "脆豆腐配甜辣酱，炒洋葱、胡萝卜、甜椒和四季豆。搭配白米饭。"
    }
  },
  {
    id: "eggplant-kai",
    category: ["hot", "vegan"],
    price: 15,
    weight: "уточняется",
    image: "images/ca-tim-cay.webp",
    spicy: true,
    hit: false,
    ru: {
      name: "Баклажан Кай",
      description: "Пикантный баклажан в остром азиатском соусе с луком и брокколи. Подаётся с белым рисом."
    },
    en: {
      name: "Kai Eggplant",
      description: "Spicy eggplant in hot Asian sauce with onion and broccoli. Served with white rice."
    },
    vn: {
      name: "Cà Tím Cay",
      description: "Cà tím cay trong sốt châu Á với hành tây và bông cải xanh. Ăn kèm cơm trắng."
    },
    zh: {
      name: "辣味茄子",
      description: "香辣亚洲酱茄子，配洋葱和西兰花。搭配白米饭。"
    }
  },
  {
    id: "crispy-broccoli",
    category: ["hot", "vegan"],
    price: null,
    weight: "уточняется",
    image: "images/broccoli-crispy.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Криспи брокколи",
      description: "Брокколи в хрустящем кляре, обжаренные в сладком соусе с арахисом. Подаётся с белым рисом."
    },
    en: {
      name: "Crispy Broccoli",
      description: "Broccoli in crispy batter, fried in sweet sauce with peanuts. Served with white rice."
    },
    vn: {
      name: "Bông Cải Giòn",
      description: "Bông cải xanh tẩm bột giòn, xào trong sốt ngọt với đậu phộng. Ăn kèm cơm trắng."
    },
    zh: {
      name: "脆炸西兰花",
      description: "脆浆西兰花，配甜酱和花生。搭配白米饭。"
    }
  },

  {
    id: "nom-tom",
    category: "salads",
    price: 18,
    weight: "уточняется",
    image: "images/nom-tom.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Ном Том",
      description: "Свежий вьетнамский салат с креветками, огурцом, сладким перцем, морковью, ростками маша, репчатым луком, кинзой и арахисом."
    },
    en: {
      name: "Nom Tom",
      description: "Fresh Vietnamese salad with shrimp, cucumber, sweet pepper, carrot, mung bean sprouts, onion, cilantro and peanuts."
    },
    vn: {
      name: "Nộm Tôm",
      description: "Gỏi Việt Nam tươi với tôm, dưa leo, ớt chuông, cà rốt, giá đỗ, hành tây, rau mùi và đậu phộng."
    },
    zh: {
      name: "鲜虾越南沙拉",
      description: "新鲜越南沙拉，配虾、黄瓜、甜椒、胡萝卜、绿豆芽、洋葱、香菜和花生。"
    }
  },
  {
    id: "nom-ga",
    category: "salads",
    price: 16,
    weight: "уточняется",
    image: "images/nom-ga.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Ном Га",
      description: "Лёгкий салат с курицей, огурцом, сладким перцем, морковью, ростками маша, репчатым луком, кинзой и арахисом."
    },
    en: {
      name: "Nom Ga",
      description: "Light chicken salad with cucumber, sweet pepper, carrot, mung bean sprouts, onion, cilantro and peanuts."
    },
    vn: {
      name: "Nộm Gà",
      description: "Gỏi gà nhẹ với dưa leo, ớt chuông, cà rốt, giá đỗ, hành tây, rau mùi và đậu phộng."
    },
    zh: {
      name: "鸡肉越南沙拉",
      description: "清爽鸡肉沙拉，配黄瓜、甜椒、胡萝卜、绿豆芽、洋葱、香菜和花生。"
    }
  },
  {
    id: "smashed-cucumbers",
    category: "salads",
    price: null,
    weight: "уточняется",
    image: "images/smashed-cucumbers.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Битые огурцы",
      description: "Хрустящие битые огурцы в азиатской заправке."
    },
    en: {
      name: "Smashed Cucumbers",
      description: "Crunchy smashed cucumbers in Asian dressing."
    },
    vn: {
      name: "Dưa Leo Đập",
      description: "Dưa leo đập giòn với nước sốt châu Á."
    },
    zh: {
      name: "拍黄瓜",
      description: "爽脆拍黄瓜，配亚洲风味酱汁。"
    }
  },
  {
    id: "white-rice",
    category: ["extra", "vegan"],
    price: 2.5,
    weight: "уточняется",
    image: "images/white-rice.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Белый рис",
      description: "Варёный белый рис."
    },
    en: {
      name: "White Rice",
      description: "Steamed white rice."
    },
    vn: {
      name: "Cơm Trắng",
      description: "Cơm trắng hấp."
    },
    zh: {
      name: "白米饭",
      description: "蒸白米饭。"
    }
  },
  {
    id: "fried-rice-egg",
    category: "extra",
    price: 3.5,
    weight: "уточняется",
    image: "images/com-rang-trung.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Жареный рис с яйцом",
      description: "Жареный рис с яйцом в соевом соусе."
    },
    en: {
      name: "Fried Rice with Egg",
      description: "Fried rice with egg in soy sauce."
    },
    vn: {
      name: "Cơm Rang Trứng",
      description: "Cơm rang với trứng và nước tương."
    },
    zh: {
      name: "鸡蛋炒饭",
      description: "酱油鸡蛋炒饭。"
    }
  },
  {
    id: "banh-bot-mi",
    category: "extra",
    price: null,
    weight: "уточняется",
    image: "images/banh-bot-mi.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Бань Бот Ми",
      description: "Вьетнамские лепёшки с зелёным луком."
    },
    en: {
      name: "Banh Bot Mi",
      description: "Vietnamese flatbreads with green onion."
    },
    vn: {
      name: "Bánh Bột Mì",
      description: "Bánh bột mì Việt Nam với hành lá."
    },
    zh: {
      name: "越南葱饼",
      description: "越南风味葱香面饼。"
    }
  },
  {
    id: "strips-fries",
    category: "kids",
    price: 12,
    weight: "уточняется",
    image: "images/strips-fries.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Стрипсы фри",
      description: "Кусочки хрустящей курицы с картофелем фри."
    },
    en: {
      name: "Chicken Strips with Fries",
      description: "Crispy chicken strips with French fries."
    },
    vn: {
      name: "Gà Giòn Khoai Tây Chiên",
      description: "Miếng gà giòn ăn kèm khoai tây chiên."
    },
    zh: {
      name: "鸡柳薯条",
      description: "香脆鸡柳配薯条。"
    }
  },
  {
    id: "thit-nuong-fries",
    category: "kids",
    price: null,
    weight: "уточняется",
    image: "images/thit-nuong-fries.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Шашлыки фри",
      description: ""
    },
    en: {
      name: "",
      description: ""
    },
    vn: {
      name: "",
      description: ""
    },
    zh: {
      name: "",
      description: ""
    }
  },
  // {
  //   id: "octopus-in-the-pool",
  //   category: "kids",
  //   price: null,
  //   weight: "уточняется",
  //   image: "images/octopus-in-the-pool.webp",
  //   spicy: false,
  //   hit: false,
  //   ru: {
  //     name: "Осминоги в бассейне",
  //     description: ""
  //   },
  //   en: {
  //     name: "",
  //     description: ""
  //   },
  //   vn: {
  //     name: "",
  //     description: ""
  //   },
  //   zh: {
  //     name: "",
  //     description: ""
  //   }
  // },
  {
    id: "sleeping-bear",
    category: "kids",
    price: null,
    weight: "уточняется",
    image: "images/sleeping-bear.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Спящий мишка",
      description: "Рис в форме мишки с одеялом из омлета и подушкой из жареной курицы и фасоли в соусе терияки."
    },
    en: {
      name: "Sleeping Bear",
      description: "Bear-shaped rice with an omelet blanket and a pillow of fried chicken and beans in teriyaki sauce."
    },
    vn: {
      name: "Gấu Ngủ",
      description: "Cơm hình gấu với chăn trứng, gà chiên và đậu sốt teriyaki."
    },
    zh: {
      name: "睡觉小熊",
      description: "小熊造型米饭，配蛋皮被子、照烧鸡肉和豆类。"
    }
  },
  {
    id: "octopus-pool",
    category: "kids",
    price: null,
    weight: "уточняется",
    image: "images/octopus-in-the-pool.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Осьминожки в бассейне",
      description: "Сосиски в виде осьминогов с рисом и соусом."
    },
    en: {
      name: "Octopuses in the Pool",
      description: "Octopus-shaped sausages with rice and sauce."
    },
    vn: {
      name: "Bạch Tuộc Trong Hồ",
      description: "Xúc xích tạo hình bạch tuộc ăn cùng cơm và sốt."
    },
    zh: {
      name: "泳池小章鱼",
      description: "章鱼造型香肠，配米饭和酱汁。"
    }
  },
  {
    id: "banh-bao",
    category: "snacks",
    price: 9,
    weight: "уточняется",
    image: "images/banh-bao.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Бань Бао",
      description: "Паровая булочка с сочной мясной начинкой, грибами муэр, фунчозой, луком и варёным яйцом."
    },
    en: {
      name: "Banh Bao",
      description: "Steamed bun with juicy meat filling, wood ear mushrooms, glass noodles, onion and boiled egg."
    },
    vn: {
      name: "Bánh Bao",
      description: "Bánh bao hấp với nhân thịt, nấm mèo, miến, hành và trứng luộc."
    },
    zh: {
      name: "越南包子",
      description: "蒸包子，配肉馅、木耳、粉丝、洋葱和水煮蛋。"
    }
  },
  // {
  //   id: "corn-dog",
  //   category: "snacks",
  //   price: null,
  //   weight: "уточняется",
  //   image: "images/corn-dog.webp",
  //   spicy: false,
  //   hit: true,
  //   ru: {
  //     name: "Корн-Дог",
  //     description: ""
  //   },
  //   en: {
  //     name: "Corn-Dog",
  //     description: ""
  //   },
  //   vn: {
  //     name: "Corn-Dog",
  //     description: ""
  //   },
  //   zh: {
  //     name: "玉米热狗",
  //     description: ""
  //   }
  // },
  {
    id: "batat-fried",
    category: "snacks",
    price: 11,
    weight: "уточняется",
    image: "images/batat-frie.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Жареный сладкий картофель (Батат)",
      description: "Сладкий картофель с хрустящей корочкой."
    },
    en: {
      name: "Fried Sweet Potato",
      description: "Sweet potato fries with crispy crust."
    },
    vn: {
      name: "Khoai lang chiên",
      description: "Khoai lang chiên giòn."
    },
    zh: {
      name: "炸红薯条",
      description: "香脆红薯条。"
    }
  },
  // {
  //   id: "bao-burger-chicken",
  //   category: "snacks",
  //   price: null,
  //   weight: "уточняется",
  //   image: "images/bao-burger-chicken.webp",
  //   spicy: false,
  //   hit: true,
  //   ru: {
  //     name: "Бао бургер с курицей",
  //     description: "Паровая булочка бао, фирменный соус, огурец, маринованный дайкон, морковь и хрустящая курочка."
  //   },
  //   en: {
  //     name: "Chicken Bao Burger",
  //     description: "Steamed bao bun with signature sauce, cucumber, pickled daikon, carrot and crispy chicken."
  //   },
  //   vn: {
  //     name: "Burger Bao Gà",
  //     description: "Bánh bao mềm với sốt đặc biệt, dưa leo, củ cải muối, cà rốt và gà giòn."
  //   },
  //   zh: {
  //     name: "鸡肉刈包",
  //     description: "蒸刈包配招牌酱、黄瓜、腌萝卜、胡萝卜和脆鸡肉。"
  //   }
  // },
  // {
  //   id: "bao-burger-shrimp",
  //   category: "snacks",
  //   price: null,
  //   weight: "уточняется",
  //   image: "images/bao-burger-shrimp.webp",
  //   spicy: false,
  //   hit: false,
  //   ru: {
  //     name: "Бао бургер с креветками",
  //     description: "Паровая булочка бао, фирменный соус, огурец, маринованный дайкон, морковь и креветки."
  //   },
  //   en: {
  //     name: "Shrimp Bao Burger",
  //     description: "Steamed bao bun with signature sauce, cucumber, pickled daikon, carrot and shrimp."
  //   },
  //   vn: {
  //     name: "Burger Bao Tôm",
  //     description: "Bánh bao mềm với sốt đặc biệt, dưa leo, củ cải muối, cà rốt và tôm."
  //   },
  //   zh: {
  //     name: "鲜虾刈包",
  //     description: "蒸刈包配招牌酱、黄瓜、腌萝卜、胡萝卜和鲜虾。"
  //   }
  // },
  {
    id: "nem",
    category: "snacks",
    price: 16,
    weight: "уточняется",
    image: "images/nem.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Нем (3 шт)",
      description: "Хрустящие вьетнамские роллы с мясной начинкой, фунчозой, морковью, луком и грибами муэр."
    },
    en: {
      name: "Nem (3 pcs)",
      description: "Crispy Vietnamese rolls with meat filling, glass noodles, carrot, onion and wood ear mushrooms."
    },
    vn: {
      name: "Nem Rán (3 cái)",
      description: "Nem rán giòn với thịt, miến, cà rốt, hành và nấm mèo."
    },
    zh: {
      name: "越南炸春卷（3个）",
      description: "酥脆越南春卷，配肉馅、粉丝、胡萝卜、洋葱和木耳。"
    }
  },
  {
    id: "nem-hai-san",
    category: "snacks",
    price: null,
    weight: "уточняется",
    image: "images/nem-hai-san.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Нем Хай Сан",
      description: "Хрустящие вьетнамские роллы с начинкой из креветок, лука и майонеза."
    },
    en: {
      name: "Seafood Nem",
      description: "Crispy Vietnamese rolls with shrimp, onion and mayonnaise filling."
    },
    vn: {
      name: "Nem Hải Sản",
      description: "Nem giòn với nhân tôm, hành tây và sốt mayonnaise."
    },
    zh: {
      name: "海鲜春卷",
      description: "酥脆越南春卷，配虾仁、洋葱和蛋黄酱。"
    }
  },
  {
    id: "goi-cuon",
    category: "snacks",
    price: 12,
    weight: "уточняется",
    image: "images/goi-cuon.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Гой Куон (2 шт)",
      description: "Свежие рисовые роллы с креветками, свининой, тофу, омлетом, рисовой лапшой и свежими овощами."
    },
    en: {
      name: "Goi Cuon (2 pcs)",
      description: "Fresh rice rolls with shrimp, pork, tofu, omelet, rice noodles and fresh vegetables."
    },
    vn: {
      name: "Gỏi Cuốn (2 cuốn)",
      description: "Gỏi cuốn tươi với tôm, thịt heo, đậu phụ, trứng, bún và rau sống."
    },
    zh: {
      name: "越南春卷（2个）",
      description: "新鲜米纸卷，配虾、猪肉、豆腐、蛋饼、米粉和蔬菜。"
    }
  },

  {
    id: "tom-chien",
    category: "snacks",
    price: 21,
    weight: "уточняется",
    image: "images/tom-chien.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Том Чиен (10 шт)",
      description: "Хрустящие креветки во фритюре."
    },
    en: {
      name: "Tom Chien (10 pcs)",
      description: "Crispy deep-fried shrimp."
    },
    vn: {
      name: "Tôm Chiên (10 cuốn)",
      description: "Tôm chiên giòn."
    },
    zh: {
      name: "炸虾",
      description: "香脆炸虾。(10个）"
    }
  },
  {
    id: "corn-dog",
    category: "snacks",
    price: null,
    weight: "уточняется",
    image: "images/corn-dog.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Корн-дог",
      description: "Жареная сосиска в хрустящем тесте."
    },
    en: {
      name: "Corn Dog",
      description: "Fried sausage in crispy batter."
    },
    vn: {
      name: "Corn Dog",
      description: "Xúc xích chiên giòn trong lớp bột."
    },
    zh: {
      name: "热狗棒",
      description: "裹面糊油炸香肠。"
    }
  },
  {
    id: "xuc-xich-nuong",
    category: "snacks",
    price: 9,
    weight: "уточняется",
    image: "images/xuc-xich-nuong.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Суксик Нэнг",
      description: "Вьетнамские сосиски на раскалённых камнях."
    },
    en: {
      name: "Vietnamese Sausages",
      description: "Vietnamese sausages served on hot stones."
    },
    vn: {
      name: "Xúc Xích Nướng",
      description: "Xúc xích Việt Nam phục vụ trên đá nóng."
    },
    zh: {
      name: "越南烤香肠",
      description: "热石越南香肠。"
    }
  },
  {
    id: "pho-mai-chien",
    category: "snacks",
    price: 16,
    weight: "уточняется",
    image: "images/pho-mai-chien.webp",
    spicy: false,
    hit: true,
    ru: {
      name: "Фо Май Чиен",
      description: "Жареный сыр моцарелла с хрустящей корочкой."
    },
    en: {
      name: "Fried Mozzarella",
      description: "Fried mozzarella cheese with crispy crust."
    },
    vn: {
      name: "Phô Mai Chiên",
      description: "Phô mai mozzarella chiên giòn."
    },
    zh: {
      name: "炸芝士",
      description: "香脆炸马苏里拉芝士。"
    }
  },
  {
    id: "beer-set",
    category: ["snacks", "sets"],
    price: null,
    weight: "уточняется",
    image: "images/beer-set.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Сет для двоих",
      description: "Большой набор закусок для компании."
    },
    en: {
      name: "Sharing Set",
      description: "Large snack set for sharing."
    },
    vn: {
      name: "Set Cho Hai Người",
      description: "Set món ăn nhẹ lớn dành cho hai người hoặc nhóm."
    },
    zh: {
      name: "双人拼盘",
      description: "适合两人或朋友分享的大份小吃拼盘。"
    }
  },

  {
    id: "dessert-coming-soon",
    category: "desserts",
    price: null,
    weight: "уточняется",
    image: "images/dessert-coming-soon.webp",
    spicy: false,
    hit: false,
    ru: {
      name: "Скоро",
      description: "Мы готовим для вас фирменные десерты PHONIKS."
    },
    en: {
      name: "Coming Soon",
      description: "We are preparing signature PHONIKS desserts."
    },
    vn: {
      name: "Sắp Ra Mắt",
      description: "Chúng tôi đang chuẩn bị các món tráng miệng đặc trưng của PHONIKS."
    },
    zh: {
      name: "即将推出",
      description: "PHONIKS 招牌甜点即将上线。"
    }
  }

];
