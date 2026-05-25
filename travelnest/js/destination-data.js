// Shared destination data used across multiple pages
const destinationData = [
  {
    name: "Paris", country: "France", continent: "Europe",
    image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Paris is the capital of France and one of the most visited cities in the world. Famous for art, fashion, gastronomy and culture.",
    attractions: ["Eiffel Tower", "The Louvre Museum", "Notre-Dame Cathedral", "Champs-Élysées"],
    costs: [
      { category: "Accommodation", budget: 15000, mid: 40000, luxury: 90000 },
      { category: "Food", budget: 6000, mid: 15000, luxury: 35000 },
      { category: "Transport", budget: 2500, mid: 6000, luxury: 15000 }
    ]
  },
  {
    name: "Tokyo", country: "Japan", continent: "Asia",
    image: "https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Tokyo is Japan's bustling capital, mixing ultramodern and traditional culture. Known for electronics, anime, and incredible food.",
    attractions: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Tower", "Harajuku"],
    costs: [
      { category: "Accommodation", budget: 12000, mid: 35000, luxury: 80000 },
      { category: "Food", budget: 4000, mid: 10000, luxury: 25000 },
      { category: "Transport", budget: 3000, mid: 7000, luxury: 18000 }
    ]
  },
  {
    name: "Bali", country: "Indonesia", continent: "Asia",
    image: "https://images.unsplash.com/photo-1711609110590-5ad5c4599e56?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Bali is a tropical island known for its lush landscapes, volcanic mountains, and vibrant arts and culture scene.",
    attractions: ["Uluwatu Temple", "Tegallalang Rice Terraces", "Seminyak Beach", "Mount Batur"],
    costs: [
      { category: "Accommodation", budget: 8000, mid: 20000, luxury: 60000 },
      { category: "Food", budget: 2500, mid: 6000, luxury: 14000 },
      { category: "Transport", budget: 1500, mid: 4500, luxury: 10000 }
    ]
  },
  {
    name: "New York", country: "USA", continent: "Americas",
    image: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "New York City is the most populous city in the US. Famous for its iconic skyline, Broadway shows, and diverse culture.",
    attractions: ["Statue of Liberty", "Central Park", "Times Square", "Brooklyn Bridge"],
    costs: [
      { category: "Accommodation", budget: 20000, mid: 50000, luxury: 120000 },
      { category: "Food", budget: 8000, mid: 20000, luxury: 45000 },
      { category: "Transport", budget: 6000, mid: 15000, luxury: 35000 }
    ]
  },
  {
    name: "Cape Town", country: "South Africa", continent: "Africa",
    image: "https://plus.unsplash.com/premium_photo-1697730061063-ad499e343f26?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Cape Town is a port city on South Africa's southwest coast. It's dominated by Table Mountain and has incredible wildlife nearby.",
    attractions: ["Table Mountain", "Boulders Beach Penguins", "Robben Island", "V&A Waterfront"],
    costs: [
      { category: "Accommodation", budget: 12000, mid: 30000, luxury: 70000 },
      { category: "Food", budget: 4000, mid: 10000, luxury: 25000 },
      { category: "Transport", budget: 2500, mid: 7000, luxury: 17000 }
    ]
  },
  {
    name: "Sydney", country: "Australia", continent: "Oceania",
    image: "https://images.unsplash.com/photo-1546268060-2592ff93ee24?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Sydney is Australia's largest city, famous for its harbour, beaches, and the iconic Opera House.",
    attractions: ["Sydney Opera House", "Bondi Beach", "Harbour Bridge", "Royal Botanic Garden"],
    costs: [
      { category: "Accommodation", budget: 18000, mid: 45000, luxury: 100000 },
      { category: "Food", budget: 5000, mid: 13000, luxury: 32000 },
      { category: "Transport", budget: 4500, mid: 11000, luxury: 25000 }
    ]
  },
  {
    name: "Rome", country: "Italy", continent: "Europe",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1096&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Rome, Italy's capital, is a cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture.",
    attractions: ["Colosseum", "Vatican City", "Trevi Fountain", "Pantheon"],
    costs: [
      { category: "Accommodation", budget: 13000, mid: 34000, luxury: 85000 },
      { category: "Food", budget: 4500, mid: 12000, luxury: 28000 },
      { category: "Transport", budget: 3000, mid: 7000, luxury: 16000 }
    ]
  },
  {
    name: "Rio de Janeiro", country: "Brazil", continent: "Americas",
    image: "https://images.unsplash.com/photo-1700677866571-43199bcbc593?q=80&w=1330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Rio de Janeiro is a vibrant city on Brazil's Atlantic coast known for its Carnival festival, samba and stunning beaches.",
    attractions: ["Christ the Redeemer", "Copacabana Beach", "Sugarloaf Mountain", "Ipanema Beach"],
    costs: [
      { category: "Accommodation", budget: 10000, mid: 26000, luxury: 65000 },
      { category: "Food", budget: 3500, mid: 9000, luxury: 22000 },
      { category: "Transport", budget: 2500, mid: 6500, luxury: 15000 }
    ]
  }
];
