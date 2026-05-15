const BOARD_SIZE = 6;
const MATCH_SIZE = 2;
const FLIP_BACK_DELAY = 800;

const fruits = [
  { key: "apple", name: "사과", color: "#ff4d6d", accent: "#ffd166" },
  { key: "banana", name: "바나나", color: "#ffe66d", accent: "#f4a261" },
  { key: "grape", name: "포도", color: "#9b5de5", accent: "#f15bb5" },
  { key: "kiwi", name: "키위", color: "#80ed99", accent: "#2d6a4f" },
  { key: "lemon", name: "레몬", color: "#f9f871", accent: "#43aa8b" },
  { key: "peach", name: "복숭아", color: "#ffafcc", accent: "#ff758f" },
  { key: "cherry", name: "체리", color: "#d90429", accent: "#ffccd5" },
  { key: "melon", name: "멜론", color: "#b8f2a4", accent: "#57cc99" },
  { key: "orange", name: "오렌지", color: "#ff9f1c", accent: "#ffbf69" },
  { key: "strawberry", name: "딸기", color: "#ef233c", accent: "#ffccd5" },
  { key: "pineapple", name: "파인애플", color: "#ffd60a", accent: "#7cb518" },
  { key: "blueberry", name: "블루베리", color: "#4361ee", accent: "#90e0ef" },
  { key: "mango", name: "망고", color: "#ffb703", accent: "#fb8500" },
  { key: "watermelon", name: "수박", color: "#2ec4b6", accent: "#e71d36" },
  { key: "pear", name: "배", color: "#d9ed92", accent: "#76c893" },
  { key: "plum", name: "자두", color: "#7209b7", accent: "#f72585" },
  { key: "coconut", name: "코코넛", color: "#f1faee", accent: "#a98467" },
  { key: "avocado", name: "아보카도", color: "#95d5b2", accent: "#40916c" },
];

function shuffle(items) {
  const shuffledItems = [...items];

  for (let i = shuffledItems.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const currentItem = shuffledItems[i];

    shuffledItems[i] = shuffledItems[randomIndex];
    shuffledItems[randomIndex] = currentItem;
  }

  return shuffledItems;
}

function createCards() {
  const fruitPairs = [...fruits, ...fruits];
  const shuffledFruits = shuffle(fruitPairs);

  return shuffledFruits.map(function (fruit, index) {
    return {
      id: index,
      fruit: fruit,
      isOpen: false,
      isMatched: false,
    };
  });
}
