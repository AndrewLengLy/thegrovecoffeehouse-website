/**
 * The menu.
 *
 * This file is the product. One published review of this cafe says the sandwich
 * menu was not visible and the customer had to open Instagram before a menu was
 * handed over. Everything below exists so that never happens again.
 *
 * SOURCE, and its limits.
 *
 * Prices and the drink descriptions come from a photograph of the shop's own
 * framed board, found on their joe.coffee listing. The sections here mirror the
 * sections on that board. Two consequences worth knowing:
 *
 *   1. The photograph is undated. Prices move. Everything here has to be checked
 *      against the current board before launch, and re-checked whenever it
 *      changes. TODO(andrew).
 *   2. Two values were not legible even at maximum magnification, and are left
 *      out rather than guessed: the price of the Golden Honey Latte, and the
 *      description of the Cookie Butter Dirty Chai. Mexican Mocha reads 7.75
 *      where every other favorite reads 7.65, so confirm that one specifically.
 *
 * Items marked `offBoard` came from named drinks in real customer reviews but do
 * not appear on the current board. They carry no price, because we do not have
 * one and because a rotating item should be asked about rather than quoted.
 *
 * There is no food on that board at all, so the food section below is still
 * review sourced and still has no prices. TODO(andrew): get the food menu.
 */

export type Season = "spring" | "summer" | "fall" | "winter";

export type Category =
  | "seasonal"
  | "coffee"
  | "favorites"
  | "matcha"
  | "noncoffee"
  | "blended"
  | "food";

export type MenuItem = {
  slug: string;
  name: string;
  category: Category;
  season?: Season;
  available: boolean;
  /** One sensory line. Never a spec dump. */
  oneLiner: string;
  /** What is actually in it. Taken from the shop's own board where it says. */
  whatsInIt: string;
  /** Omitted when we do not have a confirmed price. */
  price?: string;
  /** Named in reviews but not on the current board. */
  offBoard?: boolean;
};

/** Section headings are brand voice, never a generic label. */
export const CATEGORY_LABEL: Record<Category, string> = {
  seasonal: "On the board right now",
  coffee: "Coffee, straight up",
  favorites: "The favorites",
  matcha: "The matcha lineup",
  noncoffee: "Not coffee",
  blended: "Blended and cold",
  food: "Food, actual food",
};

export const CATEGORY_BLURB: Record<Category, string> = {
  seasonal: "These rotate. When one goes, it goes until next year.",
  coffee: "The everyday list. Espresso, drip, and cold brew, done properly.",
  favorites: "The ones people drive here for.",
  matcha: "Whisked, not scooped from a powder jug. The longest list in the shop.",
  noncoffee: "Tea, chai, and the ones with no coffee in them at all.",
  blended: "Cold and blended. Add an espresso shot for 95 cents.",
  food: "Yes, there is a real food menu. Here is all of it, in one place.",
};

export const SEASON_LABEL: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  fall: "Fall",
  winter: "Winter",
};

/** Order matters. Seasonal leads, food is never buried. */
export const CATEGORY_ORDER: Category[] = [
  "seasonal",
  "favorites",
  "matcha",
  "coffee",
  "noncoffee",
  "blended",
  "food",
];

export const menu: MenuItem[] = [
  /* ---------------- Seasonal ---------------- */
  {
    slug: "elphabas-brew",
    name: "Elphaba's Brew",
    category: "seasonal",
    season: "fall",
    available: true,
    oneLiner: "Pumpkin underneath, green on top.",
    whatsInIt: "A pumpkin latte with matcha, finished with cinnamon foam.",
  },
  {
    slug: "apple-hill",
    name: "Apple Hill",
    category: "seasonal",
    season: "fall",
    available: true,
    oneLiner: "Apples and cool air, the whole drive up.",
    whatsInIt: "A seasonal apple drink, on the board while fall lasts.",
  },
  {
    slug: "spring-flower",
    name: "Spring Flower",
    category: "seasonal",
    season: "spring",
    available: false,
    oneLiner: "Raspberry and lavender, like a yard in April.",
    whatsInIt: "Raspberry and lavender together, tart and floral.",
  },


  /* Summer 2026 board. Names and descriptions are the shop's own, from their
     "Grove Summer Favorites" post of 7 July 2026. No prices were shown.
     TODO(andrew): confirm which of these are still pouring in September. */
  {
    slug: "bee-nana",
    name: "Bee-nana latte or matcha",
    category: "seasonal",
    season: "summer",
    available: true,
    oneLiner: "Banana, cream, and a pinch of salt on top.",
    whatsInIt: "Creamy banana latte or matcha, topped with foam and a sprinkle of sea salt.",
  },
  {
    slug: "mango-oasis",
    name: "Mango Oasis",
    category: "seasonal",
    season: "summer",
    available: true,
    oneLiner: "Mango sticky rice, if it were a drink.",
    whatsInIt: "Inspired by mango sticky rice. Matcha with coconut mango cold foam, a condensed milk drizzle, and black seed on top.",
  },
  {
    slug: "ubedan-latte",
    name: "Ubedan latte",
    category: "seasonal",
    season: "summer",
    available: true,
    oneLiner: "Purple underneath, green foam on top.",
    whatsInIt: "Ube latte topped with pandan cold foam.",
  },
  {
    slug: "jasmine-cloud",
    name: "Jasmine Cloud",
    category: "seasonal",
    season: "summer",
    available: true,
    oneLiner: "Jasmine tea under a soft green cloud.",
    whatsInIt: "Jasmine iced tea with a matcha cold foam.",
  },
  {
    slug: "coconut-mango-cream-chai",
    name: "Coconut mango cream chai",
    category: "seasonal",
    season: "summer",
    available: true,
    oneLiner: "Warm spice, cold tropical foam.",
    whatsInIt: "Chai latte topped with coconut mango cold foam.",
  },
  {
    slug: "miso-blue",
    name: "Miso Blue",
    category: "seasonal",
    season: "summer",
    available: true,
    oneLiner: "Salty caramel, blueberry, and green tea in one cup.",
    whatsInIt: "Miso salted caramel matcha with blueberry cold foam.",
  },
  {
    slug: "golden-hour-nitro",
    name: "Golden Hour Nitro",
    category: "seasonal",
    season: "summer",
    available: true,
    oneLiner: "Cold, creamy, and lit from the top.",
    whatsInIt: "Nitro cold brew with salted honey cold foam.",
  },
  {
    slug: "rose-dalgona",
    name: "Rose Dalgona",
    category: "seasonal",
    season: "summer",
    available: true,
    oneLiner: "Rose milk with a whipped coffee cap.",
    whatsInIt: "Rose milk with dalgona whipped coffee foam on top.",
  },

  /* ---------------- Favorites ---------------- */
  {
    slug: "gulab-jamun-latte",
    name: "Gulab jamun latte",
    category: "favorites",
    available: true,
    oneLiner: "Rose and cardamom, sweet and milky.",
    whatsInIt: "Cardamom, rose, and saffron.",
    price: "7.65",
  },
  {
    slug: "baklava-latte",
    name: "Baklava latte",
    category: "favorites",
    available: true,
    oneLiner: "Honey and warm spice, with a nutty finish.",
    whatsInIt: "Orange blossom, cinnamon, and honey.",
    price: "7.65",
  },
  {
    slug: "brown-sugar-cinnamon-latte",
    name: "Brown sugar cinnamon latte",
    category: "favorites",
    available: true,
    oneLiner: "Brown sugar and cinnamon, and not much argument.",
    whatsInIt: "A latte with brown sugar and cinnamon.",
    price: "7.65",
  },
  {
    slug: "orchard-apple-dirty-chai",
    name: "Orchard apple dirty chai",
    category: "favorites",
    available: true,
    oneLiner: "Apple and spice, with the espresso underneath.",
    whatsInIt: "Apple and espresso chai.",
    price: "7.65",
  },
  {
    slug: "cookie-butter-dirty-chai",
    name: "Cookie butter dirty chai",
    category: "favorites",
    available: true,
    oneLiner: "Chai with a shot, and a biscuit note over the top.",
    // TODO(andrew): the board's own description was not legible. Confirm it.
    whatsInIt: "Cookie butter and espresso chai.",
    price: "7.65",
  },
  {
    slug: "mexican-mocha",
    name: "Mexican mocha",
    category: "favorites",
    available: true,
    oneLiner: "Chocolate first, then a slow warmth at the back.",
    whatsInIt: "Chocolate, condensed milk, and cayenne.",
    // TODO(andrew): reads 7.75 where every other favorite reads 7.65. Confirm.
    price: "7.75",
  },
  {
    slug: "camp-rock",
    name: "Camp Rock",
    category: "favorites",
    available: true,
    oneLiner: "A campfire without the smoke.",
    whatsInIt: "Chocolate and marshmallow mocha.",
    price: "7.65",
  },
  {
    slug: "caramel-macchiato",
    name: "Caramel macchiato",
    category: "favorites",
    available: true,
    oneLiner: "Caramel and vanilla, the easy order.",
    whatsInIt: "Caramel vanilla latte.",
    price: "7.65",
  },
  {
    slug: "spanish-latte",
    name: "Spanish latte",
    category: "favorites",
    available: true,
    oneLiner: "Sweet and creamy, stronger than it lets on.",
    whatsInIt: "Quad shot, condensed milk, cinnamon, and your choice of milk.",
    price: "7.65",
  },
  {
    slug: "honey-bunches-of-oats",
    name: "Honey bunches of oats",
    category: "favorites",
    available: true,
    oneLiner: "Like the last of the cereal bowl, in a good way.",
    whatsInIt: "Honey, cinnamon, vanilla, and oat milk.",
    price: "7.65",
  },
  {
    slug: "golden-honey-latte",
    name: "Golden honey latte",
    category: "favorites",
    available: true,
    oneLiner: "Turmeric gold, warm and a little earthy.",
    whatsInIt: "Turmeric, cinnamon, honey, and milk.",
    // Price on the board was not legible. Left out rather than guessed.
  },
  {
    slug: "nutella-mocha",
    name: "Nutella mocha",
    category: "favorites",
    available: true,
    offBoard: true,
    oneLiner: "Chocolate and hazelnut, thick and sweet.",
    whatsInIt: "Espresso and steamed milk with chocolate hazelnut spread.",
  },
  {
    slug: "banana-creme-latte",
    name: "Banana crème latte",
    category: "favorites",
    available: true,
    offBoard: true,
    oneLiner: "Soft banana, sweet cream, espresso underneath.",
    whatsInIt: "Espresso and steamed milk with banana crème.",
  },

  /* ---------------- Matcha ---------------- */
  {
    slug: "biscoff-banana-matcha",
    name: "Biscoff banana matcha",
    category: "matcha",
    available: true,
    oneLiner: "Banana and cookie butter over green tea.",
    whatsInIt: "Banana milk matcha with cookie butter. Whole milk only.",
    price: "8.65",
  },
  {
    slug: "berry-cherry",
    name: "Berry cherry",
    category: "matcha",
    available: true,
    oneLiner: "Strawberry and cherry, straight through the green.",
    whatsInIt: "Strawberry and cherry fruit puree matcha latte.",
    price: "8.80",
  },
  {
    slug: "peaches-and-dream",
    name: "Peaches and dream",
    category: "matcha",
    available: true,
    oneLiner: "Peach and condensed milk, thick and sweet.",
    whatsInIt: "Peach puree and condensed milk matcha.",
    price: "8.80",
  },
  {
    slug: "forest-berry-matcha",
    name: "Forest berry matcha",
    category: "matcha",
    available: true,
    oneLiner: "Dark berries and white chocolate.",
    whatsInIt: "Wildberry and white chocolate matcha.",
    price: "8.80",
  },
  {
    slug: "ruby-bliss",
    name: "Ruby bliss",
    category: "matcha",
    available: true,
    oneLiner: "Pink white chocolate, tart at the edges.",
    whatsInIt: "Ruby white chocolate matcha.",
    price: "8.65",
  },
  {
    slug: "rosey-posey",
    name: "Rosey posey",
    category: "matcha",
    available: true,
    oneLiner: "Rose and vanilla, soft all the way down.",
    whatsInIt: "Rose and vanilla matcha.",
    price: "8.80",
  },
  {
    slug: "mango-rango",
    name: "Mango rango",
    category: "matcha",
    available: true,
    oneLiner: "Mango, loud and cold.",
    whatsInIt: "Mango matcha.",
    price: "8.75",
  },
  {
    slug: "sakura-matcha",
    name: "Sakura matcha",
    category: "matcha",
    available: true,
    oneLiner: "Cherry blossom, barely there and better for it.",
    whatsInIt: "Cherry blossom matcha.",
    price: "8.65",
  },
  {
    slug: "earth-mama-matcha",
    name: "Earth Mama matcha",
    category: "matcha",
    available: true,
    offBoard: true,
    oneLiner: "Grassy, green, and quiet.",
    whatsInIt: "Matcha whisked with milk. No coffee in it.",
  },
  {
    slug: "strawberry-matcha",
    name: "Strawberry matcha",
    category: "matcha",
    available: true,
    offBoard: true,
    oneLiner: "Strawberry first, matcha right behind it.",
    whatsInIt: "Matcha and milk poured over strawberry, served iced.",
  },
  {
    slug: "iced-matcha-raspberry-foam",
    name: "Iced matcha with raspberry foam",
    category: "matcha",
    available: true,
    offBoard: true,
    oneLiner: "Tart pink foam over cold green tea.",
    whatsInIt: "Iced matcha and milk under a whipped raspberry cold foam.",
  },

  /* ---------------- Coffee ---------------- */
  {
    slug: "black-coffee",
    name: "Black coffee",
    category: "coffee",
    available: true,
    oneLiner: "Just coffee, and enough of it.",
    whatsInIt: "Drip coffee.",
    price: "3.25",
  },
  {
    slug: "espresso",
    name: "Espresso",
    category: "coffee",
    available: true,
    oneLiner: "Two ounces, nowhere to hide.",
    whatsInIt: "A shot of espresso.",
    price: "4.00",
  },
  {
    slug: "pour-over",
    name: "Pour over",
    category: "coffee",
    available: true,
    oneLiner: "Made a cup at a time, while you wait.",
    whatsInIt: "Coffee brewed to order, by hand.",
    price: "4.50",
  },
  {
    slug: "americano",
    name: "Americano",
    category: "coffee",
    available: true,
    oneLiner: "Espresso, opened up with hot water.",
    whatsInIt: "Espresso and hot water.",
    price: "4.25",
  },
  {
    slug: "cortado",
    name: "Cortado",
    category: "coffee",
    available: true,
    oneLiner: "Short, strong, cut with just enough milk.",
    whatsInIt: "Espresso cut with a small amount of steamed milk.",
    price: "4.40",
  },
  {
    slug: "macchiato",
    name: "Macchiato",
    category: "coffee",
    available: true,
    oneLiner: "Espresso with a spoonful of foam on top.",
    whatsInIt: "Espresso marked with steamed milk foam.",
    price: "4.25",
  },
  {
    slug: "cappuccino",
    name: "Cappuccino",
    category: "coffee",
    available: true,
    oneLiner: "More foam than a latte, more milk than a macchiato.",
    whatsInIt: "Espresso with steamed milk and a thick cap of foam.",
    price: "4.75",
  },
  {
    slug: "mocha",
    name: "Mocha",
    category: "coffee",
    available: true,
    oneLiner: "Chocolate and espresso, the reliable one.",
    whatsInIt: "Espresso, chocolate, and steamed milk.",
    price: "6.50",
  },
  {
    slug: "latte",
    name: "Latte",
    category: "coffee",
    available: true,
    oneLiner: "The one you already know how you like.",
    whatsInIt: "Espresso and steamed milk.",
    price: "6.45",
  },
  {
    slug: "cold-brew",
    name: "Cold brew",
    category: "coffee",
    available: true,
    oneLiner: "Steeped cold and slow. Smoother than it is strong, but only just.",
    whatsInIt: "Coffee steeped cold, served over ice.",
    price: "5.85",
  },
  {
    slug: "vietnamese-iced-coffee",
    name: "Vietnamese iced coffee",
    category: "coffee",
    available: true,
    offBoard: true,
    oneLiner: "Dark and sweet, poured slow over ice.",
    whatsInIt: "Strong dark coffee with sweetened condensed milk, over ice.",
  },

  /* ---------------- Not coffee ---------------- */
  {
    slug: "hot-tea",
    name: "Hot tea",
    category: "noncoffee",
    available: true,
    oneLiner: "Whatever is in the tin today.",
    whatsInIt: "Hot tea, various flavors.",
    price: "3.75",
  },
  {
    slug: "iced-tea",
    name: "Iced tea",
    category: "noncoffee",
    available: true,
    oneLiner: "Cold tea, over a lot of ice.",
    whatsInIt: "Iced tea, various flavors.",
    price: "4.75",
  },
  {
    slug: "chai-latte",
    name: "Chai latte",
    category: "noncoffee",
    available: true,
    oneLiner: "Warm spice, no coffee needed.",
    whatsInIt: "Spiced chai with steamed milk.",
    price: "6.95",
  },
  {
    slug: "matcha-latte",
    name: "Matcha latte",
    category: "noncoffee",
    available: true,
    oneLiner: "The plain one, and the best test of the matcha.",
    whatsInIt: "Matcha whisked with steamed milk.",
    price: "7.90",
  },
  {
    slug: "matcha-americano",
    name: "Matcha americano",
    category: "noncoffee",
    available: true,
    oneLiner: "Matcha with water instead of milk. Clean and green.",
    whatsInIt: "Matcha and hot water.",
    price: "7.10",
  },
  {
    slug: "refresher",
    name: "Refresher",
    category: "noncoffee",
    available: true,
    oneLiner: "Cold and fruity, no coffee in sight.",
    whatsInIt: "A fruit refresher, various flavors.",
    price: "6.85",
  },
  {
    slug: "hot-chocolate",
    name: "Hot chocolate",
    category: "noncoffee",
    available: true,
    oneLiner: "For whoever came along and does not drink coffee.",
    whatsInIt: "Steamed milk and chocolate.",
    price: "4.85",
  },

  /* ---------------- Blended ---------------- */
  {
    slug: "neelis-cold-coffee",
    name: "Neelis cold coffee",
    category: "blended",
    available: true,
    oneLiner: "The house blended coffee, and the one to start with.",
    whatsInIt: "Blended cold coffee.",
    price: "7.00",
  },
  {
    slug: "date-and-banana",
    name: "Date and banana",
    category: "blended",
    available: true,
    oneLiner: "Dates and banana, closer to a shake than a coffee.",
    whatsInIt: "Blended dates and banana.",
    price: "7.00",
  },
  {
    slug: "mocha-chip",
    name: "Mocha chip",
    category: "blended",
    available: true,
    oneLiner: "Chocolate chip, in a cup, cold.",
    whatsInIt: "Blended mocha with chocolate chip.",
    price: "6.75",
  },
  {
    slug: "caramel-white-chocolate",
    name: "Caramel white chocolate",
    category: "blended",
    available: true,
    oneLiner: "Sweet, and it knows it.",
    whatsInIt: "Blended caramel and white chocolate.",
    price: "6.75",
  },
  {
    slug: "cherry-berry-dream",
    name: "Cherry berry dream",
    category: "blended",
    available: true,
    oneLiner: "Cherry and berry, cold and thick.",
    whatsInIt: "Blended cherry and berry.",
    price: "7.25",
  },

  /* ---------------- Food ---------------- */
  {
    slug: "california-crunch-avocado-toast",
    name: "California crunch avocado toast",
    category: "food",
    available: true,
    offBoard: true,
    oneLiner: "Cool avocado, something crisp on top, good bread underneath.",
    whatsInIt: "Smashed avocado on toasted bread, seasoned and finished with crunch.",
  },
  {
    slug: "millennial-avocado-toast",
    name: "Millennial avocado toast",
    category: "food",
    available: true,
    offBoard: true,
    oneLiner: "Smashed avocado, a little heat, citrus at the end.",
    whatsInIt: "Toasted bread piled with smashed avocado, seasoned simply.",
  },
  {
    slug: "everything-bagel",
    name: "Everything bagel",
    category: "food",
    available: true,
    offBoard: true,
    oneLiner: "Toasted, seedy, still warm when it reaches the table.",
    whatsInIt: "A bagel in the classic everything blend of sesame, poppy, garlic, onion, and salt.",
  },
  {
    slug: "pastrami-sandwich",
    name: "Pastrami sandwich",
    category: "food",
    available: true,
    offBoard: true,
    oneLiner: "Warm pastrami, piled high, on bread that holds up.",
    whatsInIt: "Sliced pastrami piled on bread and served warm.",
  },
  {
    slug: "scones",
    name: "Scones",
    category: "food",
    available: true,
    offBoard: true,
    oneLiner: "Crumbly edges, soft middle, better with coffee.",
    whatsInIt: "A butter scone from the case. Ask what is out today.",
  },
  {
    slug: "black-magic-cookie",
    name: "Black magic cookie",
    category: "food",
    available: true,
    offBoard: true,
    oneLiner: "Dark, fudgy, and gone faster than you planned.",
    whatsInIt: "A deep chocolate cookie with a crackly top and a soft middle.",
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const seasonalItems = menu.filter((i) => i.category === "seasonal");

/**
 * What the home page rail shows: the seasonal board first, then the drinks that
 * are the actual reason to drive here rather than to a chain.
 */
export const railItems: MenuItem[] = [
  ...menu.filter((i) => i.category === "seasonal" && i.available),
  ...menu.filter((i) => i.category === "favorites" && !i.offBoard),
].slice(0, 14);

export function itemsInCategory(category: Category): MenuItem[] {
  return menu.filter((i) => i.category === category);
}

/** Straight off the bottom of their board. */
export const milkOptions = [
  "Whole milk",
  "Low fat milk (2%)",
  "Non fat milk",
  "Oat milk, add $1",
  "Almond milk, add $1.25",
];

export const extras = ["Extra shot, $1.75", "Whip cream, 45 cents", "Syrup, 95 cents"];

/**
 * The one line at the top of the home page.
 * TODO(andrew): confirm the current seasonal feature with the owners and update
 * this whenever the board changes.
 */
const FEATURED_SLUG = "elphabas-brew";

const featured =
  menu.find((i) => i.slug === FEATURED_SLUG) ?? seasonalItems.find((i) => i.available);

export const announcement = {
  line: featured ? `${featured.name} is on the board right now.` : "A new seasonal drink is on the board.",
  linkLabel: "See what is pouring",
  href: "/menu#seasonal",
};

/** Said plainly, everywhere the menu appears. */
export const menuCaveat =
  "Prices are from the board in the shop and the board changes. A few things here rotate in and out, so if you are coming for something specific, call ahead and we will tell you what is on.";

export const marqueePhrases = [
  "Now pouring",
  "Beans from Chocolate Fish",
  "Roasted in Sacramento",
  "Poured in Roseville",
  "Room to work",
  "Stay as long as you like",
];
