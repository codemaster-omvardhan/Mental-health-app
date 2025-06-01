const quotes = [
    "You are stronger than you think.",
    "Progress, not perfection.",
    "One day at a time.",
    "It's okay to not be okay.",
    "Keep going, you're doing great.",
    "Be kind to yourself.",
    "Small steps lead to big change.",
    "Your feelings are valid.",
    "Healing takes time. Be patient.",
    "You’ve made it through 100% of your bad days."
  ];
  
  export const getRandomQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  };
  