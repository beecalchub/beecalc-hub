export const SITE_NAME = 'BeeCalc Hub';
export const SITE_TAGLINE = 'Professional Beekeeping Calculators';
export const SITE_DESCRIPTION =
  'Free, practical calculators for beekeepers - from feeding and honey production to varroa management and business planning.';
export const SITE_URL = 'https://beecalchub.com';

export const MAX_RECENT_CALCULATORS = 12;
export const SEARCH_MIN_CHARS = 2;

// Beekeeping domain constants
export const BEE_CONSTANTS = {
  QUEEN_LAYING_RATE_PER_DAY: 1500,
  EGG_TO_WORKER_DAYS: 21,
  EGG_TO_DRONE_DAYS: 24,
  EGG_TO_QUEEN_DAYS: 16,
  WORKER_LIFESPAN_SUMMER_DAYS: 35,
  WORKER_LIFESPAN_WINTER_DAYS: 150,
  CELLS_PER_LANGSTROTH_DEEP_FRAME: 7000,
  CELLS_PER_LANGSTROTH_MEDIUM_FRAME: 4900,
  FRAMES_PER_DEEP_BOX: 10,
  FRAMES_PER_MEDIUM_BOX: 10,
  HONEY_LBS_PER_DEEP_FRAME: 8,
  HONEY_LBS_PER_MEDIUM_FRAME: 5,
  HONEY_DENSITY_LBS_PER_GALLON: 12,
  HONEY_DENSITY_KG_PER_LITER: 1.42,
  IDEAL_MOISTURE_PERCENT: 18.0,
  MAX_MOISTURE_PERCENT: 18.6,
  WINTER_STORES_LBS_NORTH: 80,
  WINTER_STORES_LBS_MODERATE: 60,
  WINTER_STORES_LBS_SOUTH: 40,
  OAV_GRAMS_PER_BROOD_BOX: 1,
  OAV_MAX_GRAMS: 4,
  SUGAR_WATER_1_TO_1_RATIO: 1,
  SUGAR_WATER_2_TO_1_RATIO: 2,
  VARROA_THRESHOLD_PERCENT_SPRING: 2,
  VARROA_THRESHOLD_PERCENT_LATE_SUMMER: 3,
  FORAGING_RADIUS_KM: 5,
  FORAGING_RADIUS_MILES: 3.1,
  AVG_COLONY_POPULATION: 50000,
  STRONG_COLONY_POPULATION: 60000,
  WEAK_COLONY_POPULATION: 20000,
} as const;

export const HONEY_JAR_SIZES = {
  '2oz': { oz: 2, ml: 60, label: '2 oz / 60 ml' },
  '8oz': { oz: 8, ml: 227, label: '8 oz / 227 ml (Half Pint)' },
  '12oz': { oz: 12, ml: 340, label: '12 oz / 340 ml' },
  '16oz': { oz: 16, ml: 454, label: '1 lb / 454 ml (Pint)' },
  '24oz': { oz: 24, ml: 680, label: '1.5 lb / 680 ml' },
  '32oz': { oz: 32, ml: 907, label: '2 lb / 907 ml (Quart)' },
  '48oz': { oz: 48, ml: 1361, label: '3 lb / 1361 ml' },
  '64oz': { oz: 64, ml: 1814, label: '5 lb / 1814 ml' },
} as const;

export type JarSizeKey = keyof typeof HONEY_JAR_SIZES;
