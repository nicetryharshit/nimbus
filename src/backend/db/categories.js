import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Sci-Fi",
    description:
      "Explore mind-bending worlds of advanced technology, interstellar travel, and futuristic possibilities.",
  },
  {
    _id: uuid(),
    categoryName: "Mystery",
    description:
      "Uncover thrilling secrets, solve puzzling crimes, and unravel enigmatic plots in a race against time.",
  },
  {
    _id: uuid(),
    categoryName: "Fantasy",
    description:
      "Uncover thrilling secrets, solve puzzling crimes, and unravel enigmatic plots in a race against time.",
  },
];
