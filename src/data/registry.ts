import type { CalculatorMeta } from '@/types/calculator';

const SPREAD_META: Record<string, { description: string; shortDescription: string; keywords: string[]; relatedSlugs: string[] }> = {
  "egg-to-emergence-timeline": {
    "description": "Track the development timeline from egg to emergence for workers, drones, and queens with exact dates for each stage.",
    "shortDescription": "Egg-to-emergence dates by caste.",
    "keywords": [
      "egg",
      "emergence",
      "timeline",
      "development",
      "brood",
      "caste"
    ],
    "relatedSlugs": [
      "queen-rearing-timeline",
      "brood-area",
      "colony-growth-projection"
    ]
  },
  "swarm-risk": {
    "description": "Score your colony swarm risk from queen cells, congestion, season, and queen age, with prioritized actions to prevent swarming.",
    "shortDescription": "Assess swarm risk and prevent it.",
    "keywords": [
      "swarm",
      "risk",
      "queen cells",
      "congestion",
      "prevention"
    ],
    "relatedSlugs": [
      "can-i-split-this-hive",
      "split-planning",
      "super-requirement"
    ]
  },
  "hive-balancing": {
    "description": "Equalize weak and strong colonies by calculating how many brood frames to transfer between them.",
    "shortDescription": "Balance strong and weak hives.",
    "keywords": [
      "balance",
      "equalize",
      "brood",
      "frames",
      "transfer"
    ],
    "relatedSlugs": [
      "split-planning",
      "hive-strength-grading",
      "colony-growth-projection"
    ]
  },
  "colony-growth-projection": {
    "description": "Project colony population growth week by week from your current bees and brood, with a configurable growth rate.",
    "shortDescription": "Project colony population growth.",
    "keywords": [
      "growth",
      "projection",
      "population",
      "buildup",
      "forecast"
    ],
    "relatedSlugs": [
      "hive-population-estimator",
      "spring-buildup",
      "nuc-build-up"
    ]
  },
  "apiary-carrying-capacity": {
    "description": "Estimate how many hives your forage area can support based on acreage, flora quality, and nearby competing colonies.",
    "shortDescription": "How many hives your land supports.",
    "keywords": [
      "carrying capacity",
      "forage",
      "stocking",
      "density",
      "apiary"
    ],
    "relatedSlugs": [
      "nectar-potential",
      "land-area-coverage",
      "bee-forage-radius"
    ]
  },
  "queen-replacement-timing": {
    "description": "Decide whether and when to replace your queen based on age, brood pattern, temperament, and honey production.",
    "shortDescription": "When to requeen your colony.",
    "keywords": [
      "queen",
      "replace",
      "requeen",
      "timing",
      "brood pattern"
    ],
    "relatedSlugs": [
      "queen-rearing-timeline",
      "can-i-split-this-hive",
      "breeder-selection-scorecard"
    ]
  },
  "nuc-build-up": {
    "description": "Project how a nucleus colony builds up week by week to fill a full box, adjusted for feeding intensity.",
    "shortDescription": "Project nuc growth to full hive.",
    "keywords": [
      "nuc",
      "buildup",
      "growth",
      "frames",
      "feeding"
    ],
    "relatedSlugs": [
      "split-planning",
      "colony-growth-projection",
      "spring-buildup"
    ]
  },
  "wax-rendering-yield": {
    "description": "Estimate clean wax yield from raw comb by rendering method and cleanliness, plus slumgum waste and value.",
    "shortDescription": "Estimate wax rendering yield.",
    "keywords": [
      "wax",
      "rendering",
      "yield",
      "cappings",
      "slumgum"
    ],
    "relatedSlugs": [
      "cappings-wax-yield",
      "candle-yield",
      "foundation-sheet-requirement"
    ]
  },
  "foundation-sheet-requirement": {
    "description": "Calculate how many foundation sheets you need across all hives, boxes, and frame sizes, with cost estimate.",
    "shortDescription": "Foundation sheets needed and cost.",
    "keywords": [
      "foundation",
      "sheets",
      "frames",
      "wax",
      "requirement"
    ],
    "relatedSlugs": [
      "frame-count-by-config",
      "foundationless-frame-spacing",
      "apiary-equipment-planner"
    ]
  },
  "candle-yield": {
    "description": "Calculate how many candles you can make from your beeswax by candle type, with wick, cost, and profit estimates.",
    "shortDescription": "Candles from your beeswax.",
    "keywords": [
      "candle",
      "wax",
      "yield",
      "wick",
      "profit"
    ],
    "relatedSlugs": [
      "wax-rendering-yield",
      "lip-balm-soap-batch",
      "cappings-wax-yield"
    ]
  },
  "lip-balm-soap-batch": {
    "description": "Scale beeswax product batches (lip balm, lotion bars, soap) with oils, essentials, cost, and profit.",
    "shortDescription": "Scale wax product batches.",
    "keywords": [
      "lip balm",
      "soap",
      "lotion",
      "batch",
      "beeswax"
    ],
    "relatedSlugs": [
      "candle-yield",
      "wax-rendering-yield",
      "batch-scaling"
    ]
  },
  "propolis-yield-value": {
    "description": "Estimate propolis harvest and value across your hives by collection method and season length.",
    "shortDescription": "Estimate propolis yield and value.",
    "keywords": [
      "propolis",
      "yield",
      "value",
      "trap",
      "harvest"
    ],
    "relatedSlugs": [
      "pollen-harvest",
      "royal-jelly-production",
      "wax-rendering-yield"
    ]
  },
  "royal-jelly-production": {
    "description": "Estimate royal jelly production from cell bars, graft counts, and acceptance rate, with seasonal value.",
    "shortDescription": "Estimate royal jelly output.",
    "keywords": [
      "royal jelly",
      "production",
      "grafting",
      "cells",
      "value"
    ],
    "relatedSlugs": [
      "graft-acceptance-rate",
      "queen-rearing-timeline",
      "pollen-harvest"
    ]
  },
  "pollen-harvest": {
    "description": "Estimate pollen trap yield across hives and season, with a warning to protect colony brood needs.",
    "shortDescription": "Estimate pollen trap yield.",
    "keywords": [
      "pollen",
      "trap",
      "harvest",
      "yield",
      "protein"
    ],
    "relatedSlugs": [
      "protein-need-estimator",
      "propolis-yield-value",
      "royal-jelly-production"
    ]
  },
  "inspection-interval": {
    "description": "Get a recommended inspection interval based on season, experience level, and whether the colony has issues.",
    "shortDescription": "How often to inspect.",
    "keywords": [
      "inspection",
      "interval",
      "schedule",
      "frequency",
      "season"
    ],
    "relatedSlugs": [
      "apiary-checklist-generator",
      "inspection-note-to-score",
      "inspection-recommendation-engine"
    ]
  },
  "disease-symptom-scoring": {
    "description": "Score observed symptoms to flag possible diseases like AFB, EFB, chalkbrood, or DWV, with recommended actions.",
    "shortDescription": "Score disease symptoms.",
    "keywords": [
      "disease",
      "symptoms",
      "AFB",
      "EFB",
      "diagnosis"
    ],
    "relatedSlugs": [
      "colony-health-index",
      "deadout-analysis",
      "queenrightness-checker"
    ]
  },
  "queenrightness-checker": {
    "description": "Determine whether your colony is queenright from eggs, larvae, queen sightings, and laying workers.",
    "shortDescription": "Is your colony queenright?",
    "keywords": [
      "queenright",
      "queenless",
      "eggs",
      "laying workers",
      "diagnosis"
    ],
    "relatedSlugs": [
      "queen-replacement-timing",
      "brood-pattern-scoring",
      "do-i-need-to-feed"
    ]
  },
  "brood-pattern-scoring": {
    "description": "Grade brood pattern quality from empty cells, capped ratio, and visual solidity to gauge queen performance.",
    "shortDescription": "Grade brood pattern quality.",
    "keywords": [
      "brood",
      "pattern",
      "scoring",
      "queen",
      "solid"
    ],
    "relatedSlugs": [
      "inspection-note-to-score",
      "colony-health-index",
      "queenrightness-checker"
    ]
  },
  "colony-health-index": {
    "description": "Combine population, brood, stores, mites, and disease into a single colony health index and grade.",
    "shortDescription": "Overall colony health score.",
    "keywords": [
      "health",
      "index",
      "score",
      "colony",
      "assessment"
    ],
    "relatedSlugs": [
      "inspection-note-to-score",
      "hive-strength-grading",
      "disease-symptom-scoring"
    ]
  },
  "deadout-analysis": {
    "description": "Diagnose the likely cause of a dead colony from cluster size, stores, mites, and other clues, with prevention tips.",
    "shortDescription": "Diagnose why a colony died.",
    "keywords": [
      "deadout",
      "dead",
      "winter loss",
      "diagnosis",
      "prevention"
    ],
    "relatedSlugs": [
      "colony-health-index",
      "replacement-cost-winter-losses",
      "overwintering-readiness"
    ]
  },
  "langstroth-box-volume": {
    "description": "Calculate the internal volume and honey capacity of Langstroth boxes by depth and frame count.",
    "shortDescription": "Langstroth box volume and capacity.",
    "keywords": [
      "langstroth",
      "box",
      "volume",
      "capacity",
      "deep"
    ],
    "relatedSlugs": [
      "frame-count-by-config",
      "super-requirement",
      "honey-settling-tank-size"
    ]
  },
  "frame-count-by-config": {
    "description": "Total the frames needed across your hives by box configuration and frame width, with cost estimate.",
    "shortDescription": "Frames needed for your setup.",
    "keywords": [
      "frames",
      "count",
      "configuration",
      "boxes",
      "cost"
    ],
    "relatedSlugs": [
      "foundation-sheet-requirement",
      "apiary-equipment-planner",
      "langstroth-box-volume"
    ]
  },
  "apiary-equipment-planner": {
    "description": "Build a complete equipment shopping list and budget scaled to your hive count and setup level.",
    "shortDescription": "Plan and budget your equipment.",
    "keywords": [
      "equipment",
      "planner",
      "budget",
      "shopping",
      "setup"
    ],
    "relatedSlugs": [
      "beginner-hive-setup",
      "beekeeping-budget",
      "frame-count-by-config"
    ]
  },
  "foundationless-frame-spacing": {
    "description": "Calculate how many foundationless frames fit a box and the ideal gap for natural comb building.",
    "shortDescription": "Foundationless frame spacing.",
    "keywords": [
      "foundationless",
      "frames",
      "spacing",
      "natural comb",
      "gap"
    ],
    "relatedSlugs": [
      "frame-count-by-config",
      "foundation-sheet-requirement",
      "langstroth-box-volume"
    ]
  },
  "pallet-loading": {
    "description": "Plan hive pallet loading and truck loads for moving colonies at commercial scale.",
    "shortDescription": "Plan pallet and truck loads.",
    "keywords": [
      "pallet",
      "loading",
      "truck",
      "migratory",
      "transport"
    ],
    "relatedSlugs": [
      "trailer-capacity",
      "transport-load-pollination",
      "pollination-deployment-planner"
    ]
  },
  "trailer-capacity": {
    "description": "Calculate how many hives fit on a trailer by dimensions and stack height, with loaded weight.",
    "shortDescription": "Hives per trailer load.",
    "keywords": [
      "trailer",
      "capacity",
      "hives",
      "weight",
      "transport"
    ],
    "relatedSlugs": [
      "pallet-loading",
      "transport-load-pollination",
      "storage-space"
    ]
  },
  "storage-space": {
    "description": "Estimate storage space needed for your beekeeping equipment by operation size.",
    "shortDescription": "Equipment storage space needed.",
    "keywords": [
      "storage",
      "space",
      "equipment",
      "warehouse",
      "shed"
    ],
    "relatedSlugs": [
      "apiary-equipment-planner",
      "frame-count-by-config",
      "inventory-value"
    ]
  },
  "paint-stain-quantity": {
    "description": "Calculate paint or stain needed to protect your hive boxes, with coats and cost.",
    "shortDescription": "Paint or stain for your hives.",
    "keywords": [
      "paint",
      "stain",
      "protection",
      "boxes",
      "quantity"
    ],
    "relatedSlugs": [
      "apiary-equipment-planner",
      "nail-screw-material",
      "frame-count-by-config"
    ]
  },
  "nail-screw-material": {
    "description": "Estimate fasteners needed to assemble your boxes and frames, with packages and cost.",
    "shortDescription": "Fasteners for assembly.",
    "keywords": [
      "nails",
      "screws",
      "fasteners",
      "assembly",
      "material"
    ],
    "relatedSlugs": [
      "frame-count-by-config",
      "apiary-equipment-planner",
      "paint-stain-quantity"
    ]
  },
  "hive-stand-height-footprint": {
    "description": "Recommend hive stand height and footprint for accessibility and spacing.",
    "shortDescription": "Hive stand height and spacing.",
    "keywords": [
      "hive stand",
      "height",
      "footprint",
      "ergonomics",
      "spacing"
    ],
    "relatedSlugs": [
      "apiary-layout",
      "beginner-hive-setup",
      "apiary-equipment-planner"
    ]
  },
  "apiary-layout": {
    "description": "Plan your apiary layout (row, pairs, horseshoe, or cluster) with space and area needed.",
    "shortDescription": "Plan your apiary layout.",
    "keywords": [
      "apiary",
      "layout",
      "arrangement",
      "spacing",
      "placement"
    ],
    "relatedSlugs": [
      "hive-stand-height-footprint",
      "shade-sun-exposure",
      "windbreak"
    ]
  },
  "electric-fence-requirement": {
    "description": "Size an electric fence for bear protection with wire strands, energizer output, and cost.",
    "shortDescription": "Electric fence for bear protection.",
    "keywords": [
      "electric fence",
      "bear",
      "protection",
      "wire",
      "energizer"
    ],
    "relatedSlugs": [
      "apiary-layout",
      "windbreak",
      "apiary-equipment-planner"
    ]
  },
  "spring-buildup": {
    "description": "Plan spring buildup feeding to reach target strength before the main flow.",
    "shortDescription": "Plan spring buildup to flow.",
    "keywords": [
      "spring",
      "buildup",
      "feeding",
      "flow",
      "growth"
    ],
    "relatedSlugs": [
      "do-i-need-to-feed",
      "colony-growth-projection",
      "main-flow-countdown"
    ]
  },
  "main-flow-countdown": {
    "description": "Count down to your main nectar flow and know when to add supers.",
    "shortDescription": "Countdown to the main flow.",
    "keywords": [
      "flow",
      "countdown",
      "supers",
      "timing",
      "nectar"
    ],
    "relatedSlugs": [
      "super-addition-timing",
      "super-requirement",
      "forage-gap"
    ]
  },
  "fall-preparation": {
    "description": "Build a fall prep checklist with stores deficit, sugar needed, and mite check reminders.",
    "shortDescription": "Prepare colonies for winter.",
    "keywords": [
      "fall",
      "preparation",
      "winter",
      "stores",
      "checklist"
    ],
    "relatedSlugs": [
      "overwintering-readiness",
      "winter-stores",
      "wrapping-insulation"
    ]
  },
  "winter-loss-replacement": {
    "description": "Estimate expected winter losses and the cost to replace them by method.",
    "shortDescription": "Budget winter loss replacement.",
    "keywords": [
      "winter",
      "loss",
      "replacement",
      "nucs",
      "cost"
    ],
    "relatedSlugs": [
      "replacement-cost-winter-losses",
      "deadout-analysis",
      "overwintering-readiness"
    ]
  },
  "local-bloom-calendar": {
    "description": "See a regional bloom calendar of key nectar sources and the main flow window.",
    "shortDescription": "Regional bloom calendar.",
    "keywords": [
      "bloom",
      "calendar",
      "forage",
      "nectar",
      "region"
    ],
    "relatedSlugs": [
      "forage-gap",
      "nectar-potential",
      "main-flow-countdown"
    ]
  },
  "forage-gap": {
    "description": "Calculate dearth periods between flows and whether feeding is needed to bridge them.",
    "shortDescription": "Bridge the forage gap.",
    "keywords": [
      "forage",
      "gap",
      "dearth",
      "feeding",
      "flow"
    ],
    "relatedSlugs": [
      "local-bloom-calendar",
      "do-i-need-to-feed",
      "spring-buildup"
    ]
  },
  "super-addition-timing": {
    "description": "Decide when to add the next super based on fill level, flow stage, and weather.",
    "shortDescription": "When to add the next super.",
    "keywords": [
      "super",
      "timing",
      "add",
      "flow",
      "fill"
    ],
    "relatedSlugs": [
      "super-requirement",
      "main-flow-countdown",
      "extraction-day-planner"
    ]
  },
  "wrapping-insulation": {
    "description": "Plan winter wrapping and insulation with target R-value and material cost by climate.",
    "shortDescription": "Winter wrapping and insulation.",
    "keywords": [
      "wrapping",
      "insulation",
      "winter",
      "R-value",
      "cold"
    ],
    "relatedSlugs": [
      "overwintering-readiness",
      "ventilation",
      "fall-preparation"
    ]
  },
  "ventilation": {
    "description": "Size hive ventilation for winter or summer by climate to manage moisture and heat.",
    "shortDescription": "Hive ventilation sizing.",
    "keywords": [
      "ventilation",
      "moisture",
      "airflow",
      "winter",
      "summer"
    ],
    "relatedSlugs": [
      "wrapping-insulation",
      "overwintering-readiness",
      "fall-preparation"
    ]
  },
  "mating-window": {
    "description": "Calculate the queen mating window from emergence date and latitude.",
    "shortDescription": "Queen mating window dates.",
    "keywords": [
      "mating",
      "window",
      "queen",
      "virgin",
      "drone"
    ],
    "relatedSlugs": [
      "queen-rearing-timeline",
      "drone-saturation",
      "graft-acceptance-rate"
    ]
  },
  "drone-saturation": {
    "description": "Estimate drone saturation for good queen mating from nearby drone colonies.",
    "shortDescription": "Drone saturation for mating.",
    "keywords": [
      "drone",
      "saturation",
      "mating",
      "DCA",
      "queen"
    ],
    "relatedSlugs": [
      "mating-window",
      "queen-rearing-timeline",
      "breeder-selection-scorecard"
    ]
  },
  "queen-cage-candy": {
    "description": "Calculate powdered sugar and honey needed to make queen cage candy plugs.",
    "shortDescription": "Queen cage candy recipe.",
    "keywords": [
      "queen cage",
      "candy",
      "sugar",
      "introduction",
      "plug"
    ],
    "relatedSlugs": [
      "queen-rearing-timeline",
      "mating-window",
      "queen-bank-capacity"
    ]
  },
  "breeder-selection-scorecard": {
    "description": "Score queens on production, temperament, mite tolerance, wintering, and buildup to pick breeders.",
    "shortDescription": "Score queens for breeding.",
    "keywords": [
      "breeder",
      "selection",
      "scorecard",
      "genetics",
      "queen"
    ],
    "relatedSlugs": [
      "queen-replacement-timing",
      "inbreeding-risk-lineage",
      "graft-acceptance-rate"
    ]
  },
  "inbreeding-risk-lineage": {
    "description": "Assess inbreeding risk from generations tracked, breeder count, and outcross frequency.",
    "shortDescription": "Assess inbreeding risk.",
    "keywords": [
      "inbreeding",
      "lineage",
      "genetics",
      "outcross",
      "diversity"
    ],
    "relatedSlugs": [
      "breeder-selection-scorecard",
      "drone-saturation",
      "queen-production-profitability"
    ]
  },
  "graft-acceptance-rate": {
    "description": "Track graft acceptance rate and get tips to improve queen-rearing success.",
    "shortDescription": "Track graft acceptance.",
    "keywords": [
      "graft",
      "acceptance",
      "queen rearing",
      "cells",
      "success"
    ],
    "relatedSlugs": [
      "queen-rearing-timeline",
      "royal-jelly-production",
      "breeder-selection-scorecard"
    ]
  },
  "queen-production-profitability": {
    "description": "Model the profitability of selling queens across a season with costs and labor.",
    "shortDescription": "Queen-selling profitability.",
    "keywords": [
      "queen",
      "production",
      "profit",
      "sales",
      "business"
    ],
    "relatedSlugs": [
      "apiary-profit",
      "breeder-selection-scorecard",
      "custom-quote-builder"
    ]
  },
  "transport-load-pollination": {
    "description": "Plan loads, weight, driving time, and fuel cost for moving hives to pollination.",
    "shortDescription": "Plan pollination transport.",
    "keywords": [
      "transport",
      "load",
      "pollination",
      "fuel",
      "hives"
    ],
    "relatedSlugs": [
      "pollination-deployment-planner",
      "pallet-loading",
      "travel-surcharge"
    ]
  },
  "pollination-deployment-planner": {
    "description": "Plan hive distribution across fields with setup days and project timeline.",
    "shortDescription": "Plan pollination deployment.",
    "keywords": [
      "pollination",
      "deployment",
      "fields",
      "hives",
      "planning"
    ],
    "relatedSlugs": [
      "transport-load-pollination",
      "pollination-revenue",
      "pollination-contract-pricing"
    ]
  },
  "pollination-revenue": {
    "description": "Calculate pollination revenue from hives deployed, per-hive rate, and crop bonuses.",
    "shortDescription": "Calculate pollination revenue.",
    "keywords": [
      "pollination",
      "revenue",
      "contract",
      "crops",
      "income"
    ],
    "relatedSlugs": [
      "pollination-contract-pricing",
      "pollination-deployment-planner",
      "custom-quote-builder"
    ]
  },
  "travel-surcharge": {
    "description": "Calculate a fair travel surcharge from mileage, rate, and fuel cost for services.",
    "shortDescription": "Calculate a travel surcharge.",
    "keywords": [
      "travel",
      "surcharge",
      "mileage",
      "fuel",
      "fee"
    ],
    "relatedSlugs": [
      "transport-load-pollination",
      "custom-quote-builder",
      "pollination-revenue"
    ]
  },
  "multiple-hive-totalizer": {
    "description": "Total harvest, cost, revenue, and profit across many hives from per-hive averages.",
    "shortDescription": "Total your whole apiary.",
    "keywords": [
      "total",
      "apiary",
      "harvest",
      "revenue",
      "profit"
    ],
    "relatedSlugs": [
      "yield-per-hive-benchmark",
      "apiary-profit",
      "apiary-kpi-dashboard"
    ]
  },
  "honey-jar-case-pack": {
    "description": "Calculate cases needed to pack your jars, with partial cases and material cost.",
    "shortDescription": "Pack jars into cases.",
    "keywords": [
      "jars",
      "case",
      "pack",
      "packaging",
      "shipping"
    ],
    "relatedSlugs": [
      "jar-inventory-planner",
      "jar-label-quantity",
      "honey-bottling"
    ]
  },
  "frame-coverage-percent": {
    "description": "Calculate what percentage of a frame is covered by bees or brood.",
    "shortDescription": "Frame coverage percentage.",
    "keywords": [
      "frame",
      "coverage",
      "percent",
      "bees",
      "brood"
    ],
    "relatedSlugs": [
      "brood-area",
      "hive-population-estimator",
      "brood-pattern-scoring"
    ]
  },
  "moisture-temperature-log": {
    "description": "Check whether honey is stable and ready to bottle from moisture and temperature readings.",
    "shortDescription": "Log honey moisture and temp.",
    "keywords": [
      "moisture",
      "temperature",
      "honey",
      "bottling",
      "stable"
    ],
    "relatedSlugs": [
      "honey-moisture-correction",
      "moisture-shrink-loss",
      "honey-bottling"
    ]
  },
  "yield-per-hive-benchmark": {
    "description": "Benchmark your per-hive yield against regional averages and see your rank.",
    "shortDescription": "Benchmark your yield.",
    "keywords": [
      "yield",
      "benchmark",
      "average",
      "per hive",
      "region"
    ],
    "relatedSlugs": [
      "harvest-estimator",
      "multiple-hive-totalizer",
      "apiary-kpi-dashboard"
    ]
  },
  "inspection-recommendation-engine": {
    "description": "Get a data-driven recommendation on whether to inspect now from timing, weather, and colony state.",
    "shortDescription": "Should you inspect now?",
    "keywords": [
      "inspection",
      "recommendation",
      "timing",
      "weather",
      "decision"
    ],
    "relatedSlugs": [
      "inspection-interval",
      "apiary-checklist-generator",
      "inspection-note-to-score"
    ]
  },
  "apiary-kpi-dashboard": {
    "description": "See key apiary KPIs (yield, profit, margin, losses, mites) and an overall health rating.",
    "shortDescription": "Your apiary KPI dashboard.",
    "keywords": [
      "KPI",
      "dashboard",
      "metrics",
      "profit",
      "performance"
    ],
    "relatedSlugs": [
      "multiple-hive-totalizer",
      "apiary-comparison",
      "yield-per-hive-benchmark"
    ]
  },
  "colony-scoring-sale-value": {
    "description": "Score a colony and estimate its fair sale value from population, queen, brood, and equipment.",
    "shortDescription": "Value a colony for sale.",
    "keywords": [
      "colony",
      "sale",
      "value",
      "scoring",
      "price"
    ],
    "relatedSlugs": [
      "hive-strength-grading",
      "package-bee-vs-nuc",
      "custom-quote-builder"
    ]
  },
  "commercial-labor-scheduling": {
    "description": "Plan crew size and days to complete tasks across many hives at commercial scale.",
    "shortDescription": "Schedule commercial labor.",
    "keywords": [
      "labor",
      "scheduling",
      "crew",
      "commercial",
      "workforce"
    ],
    "relatedSlugs": [
      "labor-cost",
      "commercial-labor-scheduling",
      "apiary-kpi-dashboard"
    ]
  },
  "migratory-route-profitability": {
    "description": "Model the profitability of a migratory route with revenue, fuel, and labor.",
    "shortDescription": "Migratory route profitability.",
    "keywords": [
      "migratory",
      "route",
      "profit",
      "pollination",
      "commercial"
    ],
    "relatedSlugs": [
      "pollination-revenue",
      "transport-load-pollination",
      "apiary-kpi-dashboard"
    ]
  },
  "weather-linked-nectar-flow": {
    "description": "Predict nectar flow strength from temperature, rainfall, and daylight conditions.",
    "shortDescription": "Predict nectar flow by weather.",
    "keywords": [
      "weather",
      "nectar",
      "flow",
      "prediction",
      "forecast"
    ],
    "relatedSlugs": [
      "forage-gap",
      "main-flow-countdown",
      "nectar-potential"
    ]
  },
  "apiary-comparison": {
    "description": "Compare two apiaries side by side on per-hive yield and losses.",
    "shortDescription": "Compare two apiaries.",
    "keywords": [
      "apiary",
      "comparison",
      "yield",
      "performance",
      "benchmark"
    ],
    "relatedSlugs": [
      "yield-per-hive-benchmark",
      "apiary-kpi-dashboard",
      "multiple-hive-totalizer"
    ]
  },
  "queen-bank-capacity": {
    "description": "Calculate how many caged queens a bank frame setup can hold and the nurse bees needed.",
    "shortDescription": "Queen bank capacity.",
    "keywords": [
      "queen bank",
      "capacity",
      "cages",
      "nurse bees",
      "storage"
    ],
    "relatedSlugs": [
      "queen-cage-candy",
      "queen-rearing-timeline",
      "queen-production-profitability"
    ]
  },
  "nuc-shipment-planning": {
    "description": "Plan nuc shipments with box type, screen area, cost, and shipping tips.",
    "shortDescription": "Plan nuc shipments.",
    "keywords": [
      "nuc",
      "shipment",
      "shipping",
      "boxes",
      "planning"
    ],
    "relatedSlugs": [
      "nuc-build-up",
      "pallet-loading",
      "custom-quote-builder"
    ]
  },
  "custom-quote-builder": {
    "description": "Build a custom service quote with base rate, travel, service fees, and suggested deposit.",
    "shortDescription": "Build a custom service quote.",
    "keywords": [
      "quote",
      "pricing",
      "service",
      "estimate",
      "deposit"
    ],
    "relatedSlugs": [
      "pollination-contract-pricing",
      "travel-surcharge",
      "pollination-revenue"
    ]
  }
};

export const calculatorRegistry: CalculatorMeta[] = [
  // ═══════════════════════════════════════════
  // COLONY & HIVE MANAGEMENT
  // ═══════════════════════════════════════════
  {
    slug: 'hive-population-estimator',
    title: 'Hive Population Estimator',
    categorySlug: 'colony-and-hive-management',
    type: 'estimate',
    description: 'Estimate total bee population from frame coverage observations during inspections. Helps gauge colony strength for management decisions.',
    shortDescription: 'Estimate total bees from frame coverage.',
    icon: '🐝',
    isMvp: true,
    keywords: ['population', 'bees', 'colony strength', 'frame coverage', 'inspection'],
    relatedSlugs: ['brood-area', 'split-planning', 'overwintering-readiness'],
  },
  {
    slug: 'brood-area',
    title: 'Brood Area Calculator',
    categorySlug: 'colony-and-hive-management',
    type: 'exact',
    description: 'Calculate the total brood area across frames to assess queen performance and colony health. Enter coverage per frame to get totals.',
    shortDescription: 'Calculate total brood area across frames.',
    icon: '🥚',
    isMvp: true,
    keywords: ['brood', 'eggs', 'larvae', 'queen', 'frames', 'brood pattern'],
    relatedSlugs: ['hive-population-estimator', 'queen-rearing-timeline', 'split-planning'],
  },
  {
    slug: 'queen-rearing-timeline',
    title: 'Queen Rearing Timeline Calculator',
    shortTitle: 'Queen Timeline',
    categorySlug: 'colony-and-hive-management',
    type: 'planner',
    description: 'Plan your queen rearing schedule with day-by-day milestones from graft to mated queen. Export to iCal for calendar integration.',
    shortDescription: 'Plan queen rearing with exportable milestones.',
    icon: '👑',
    isMvp: true,
    keywords: ['queen', 'graft', 'timeline', 'mating', 'calendar', 'ical', 'rearing'],
    relatedSlugs: ['brood-area', 'hive-population-estimator', 'split-planning'],
  },
  {
    slug: 'split-planning',
    title: 'Split Planning Calculator',
    categorySlug: 'colony-and-hive-management',
    type: 'decision-helper',
    description: 'Determine if your colony is strong enough to split, how many splits to make, and what resources each new colony needs.',
    shortDescription: 'Assess readiness and plan hive splits.',
    icon: '✂️',
    isMvp: true,
    keywords: ['split', 'divide', 'nuc', 'increase', 'swarm prevention'],
    relatedSlugs: ['hive-population-estimator', 'brood-area', 'overwintering-readiness'],
  },
  {
    slug: 'overwintering-readiness',
    title: 'Overwintering Readiness Calculator',
    shortTitle: 'Winter Readiness',
    categorySlug: 'colony-and-hive-management',
    type: 'scorecard',
    description: 'Score your colony\'s winter preparedness across population, stores, health, and equipment. Get a clear go/no-go assessment.',
    shortDescription: 'Score colony readiness for winter.',
    icon: '❄️',
    isMvp: true,
    keywords: ['winter', 'overwintering', 'preparation', 'stores', 'cluster', 'survival'],
    relatedSlugs: ['winter-stores', 'hive-population-estimator', 'varroa-infestation-rate'],
  },
  // Non-MVP colony management
  ...[
    { slug: 'egg-to-emergence-timeline', title: 'Egg-to-Emergence Timeline', type: 'planner' as const },
    { slug: 'swarm-risk', title: 'Swarm Risk Calculator', type: 'scorecard' as const },
    { slug: 'hive-balancing', title: 'Hive Balancing Calculator', type: 'decision-helper' as const },
    { slug: 'colony-growth-projection', title: 'Colony Growth Projection', type: 'projection' as const },
    { slug: 'apiary-carrying-capacity', title: 'Apiary Carrying Capacity', type: 'estimate' as const },
    { slug: 'queen-replacement-timing', title: 'Queen Replacement Timing', type: 'planner' as const },
    { slug: 'nuc-build-up', title: 'Nuc Build-Up Calculator', type: 'projection' as const },
  ].map((c) => ({
    slug: c.slug,
    title: c.title,
    categorySlug: 'colony-and-hive-management',
    type: c.type,
    description: SPREAD_META[c.slug]?.description ?? `${c.title}. Free, practical beekeeping calculator.`,
    shortDescription: SPREAD_META[c.slug]?.shortDescription ?? `${c.title}.`,
    icon: '🏠',
    isMvp: true,
    keywords: SPREAD_META[c.slug]?.keywords ?? [c.slug.replace(/-/g, ' ')],
    relatedSlugs: SPREAD_META[c.slug]?.relatedSlugs ?? [],
  })),

  // ═══════════════════════════════════════════
  // FEEDING & NUTRITION
  // ═══════════════════════════════════════════
  {
    slug: 'sugar-syrup',
    title: 'Sugar Syrup Mixing Calculator',
    shortTitle: 'Sugar Syrup',
    categorySlug: 'feeding-and-nutrition',
    type: 'exact',
    description: 'Calculate exact sugar and water amounts for 1:1 (spring) or 2:1 (fall) syrup. Supports batch sizes from single feeder to bulk mixing.',
    shortDescription: 'Mix perfect sugar syrup every time.',
    icon: '🧪',
    isMvp: true,
    keywords: ['sugar', 'syrup', 'feeding', 'mix', 'ratio', '1:1', '2:1', 'spring', 'fall'],
    relatedSlugs: ['feed-cost', 'winter-stores', 'feed-requirement'],
  },
  {
    slug: 'winter-stores',
    title: 'Winter Stores Calculator',
    categorySlug: 'feeding-and-nutrition',
    type: 'estimate',
    description: 'Estimate how much stored honey/sugar your colony needs to survive winter based on your climate zone, colony size, and winter length.',
    shortDescription: 'Estimate winter food requirements.',
    icon: '🏔️',
    isMvp: true,
    keywords: ['winter', 'stores', 'honey', 'survival', 'feeding', 'weight'],
    relatedSlugs: ['sugar-syrup', 'feed-cost', 'overwintering-readiness'],
  },
  {
    slug: 'feed-cost',
    title: 'Feed Cost Calculator',
    categorySlug: 'feeding-and-nutrition',
    type: 'exact',
    description: 'Calculate the total cost of feeding your apiary based on sugar prices, syrup ratios, and number of hives to feed.',
    shortDescription: 'Calculate total feeding costs.',
    icon: '💲',
    isMvp: true,
    keywords: ['cost', 'sugar', 'feeding', 'budget', 'expense', 'price'],
    relatedSlugs: ['sugar-syrup', 'winter-stores', 'cost-per-hive'],
  },
  // MVP feeding calculators (batch 2)
  {
    slug: 'fondant-recipe',
    title: 'Fondant Recipe Calculator',
    categorySlug: 'feeding-and-nutrition',
    type: 'exact',
    description: 'Calculate exact ingredient amounts for cooked fondant, no-cook sugar boards, or cream fondant. Includes step-by-step instructions.',
    shortDescription: 'Mix fondant with precise ingredients.',
    icon: '🧁',
    isMvp: true,
    keywords: ['fondant', 'sugar board', 'winter feed', 'emergency feed', 'candy', 'recipe'],
    relatedSlugs: ['sugar-syrup', 'winter-stores', 'feed-cost'],
  },
  {
    slug: 'pollen-patty-batch',
    title: 'Pollen Patty Batch Calculator',
    categorySlug: 'feeding-and-nutrition',
    type: 'exact',
    description: 'Calculate pollen substitute, sugar, water, and honey amounts for a batch of pollen patties. Standard, high-protein, and budget recipes.',
    shortDescription: 'Scale pollen patty recipes to any batch size.',
    icon: '🫓',
    isMvp: true,
    keywords: ['pollen', 'patty', 'protein', 'substitute', 'nutrition', 'spring feeding'],
    relatedSlugs: ['fondant-recipe', 'sugar-syrup', 'feed-cost'],
  },
  {
    slug: 'apiary-total-feed',
    title: 'Apiary Total Feed Calculator',
    categorySlug: 'feeding-and-nutrition',
    type: 'exact',
    description: 'Calculate total syrup, sugar, and cost to feed your entire apiary. Enter per-hive deficits and get a bulk shopping list.',
    shortDescription: 'Total feed needs across all hives.',
    icon: '📋',
    isMvp: true,
    keywords: ['apiary', 'total', 'feed', 'bulk', 'sugar', 'syrup', 'shopping list'],
    relatedSlugs: ['sugar-syrup', 'winter-stores', 'feed-cost'],
  },
  {
    slug: 'feed-requirement',
    title: 'Feed Requirement Calculator',
    categorySlug: 'feeding-and-nutrition',
    type: 'estimate',
    description: 'Estimate how much feed your apiary needs based on colony size, season, current stores, and feeding duration. Includes syrup and sugar amounts.',
    shortDescription: 'How much feed does your apiary need?',
    icon: '📏',
    isMvp: true,
    keywords: ['feed', 'requirement', 'consumption', 'season', 'stores', 'deficit'],
    relatedSlugs: ['sugar-syrup', 'winter-stores', 'feed-cost'],
  },
  {
    slug: 'emergency-feeding',
    title: 'Emergency Feeding Calculator',
    categorySlug: 'feeding-and-nutrition',
    type: 'decision-helper',
    description: 'Determine if your colony needs emergency feeding based on stores, temperature, and time until forage. Recommends the right feed method for conditions.',
    shortDescription: 'Is it an emergency? What to feed and how.',
    icon: '🚨',
    isMvp: true,
    keywords: ['emergency', 'starvation', 'feeding', 'fondant', 'dry sugar', 'urgent'],
    relatedSlugs: ['winter-stores', 'fondant-recipe', 'sugar-syrup'],
  },
  {
    slug: 'protein-need-estimator',
    title: 'Protein Need Estimator',
    categorySlug: 'feeding-and-nutrition',
    type: 'estimate',
    description: 'Estimate pollen supplement needs based on brood level, natural pollen availability, and supplementation duration. Calculates patty count and cost.',
    shortDescription: 'Estimate pollen patty needs.',
    icon: '🌾',
    isMvp: true,
    keywords: ['protein', 'pollen', 'supplement', 'patty', 'nutrition', 'brood'],
    relatedSlugs: ['pollen-patty-batch', 'feed-requirement', 'feed-cost'],
  },
  {
    slug: 'syrup-concentration-converter',
    title: 'Syrup Concentration Converter',
    categorySlug: 'feeding-and-nutrition',
    type: 'converter',
    description: 'Convert between sugar-to-water ratios and Brix readings. Shows density, sugar content per gallon, and seasonal use recommendations.',
    shortDescription: 'Convert syrup ratios to Brix and back.',
    icon: '🔀',
    isMvp: true,
    keywords: ['syrup', 'concentration', 'brix', 'ratio', 'density', 'refractometer'],
    relatedSlugs: ['sugar-syrup', 'honey-moisture-correction', 'metric-imperial-converter'],
  },

  // ═══════════════════════════════════════════
  // HONEY PRODUCTION & EXTRACTION
  // ═══════════════════════════════════════════
  {
    slug: 'honey-bottling',
    title: 'Honey Bottling Calculator',
    categorySlug: 'honey-production-and-extraction',
    type: 'exact',
    description: 'Calculate how many jars of each size you can fill from your total honey harvest. Accounts for honey density and common jar sizes.',
    shortDescription: 'Plan jar quantities from your harvest.',
    icon: '🫙',
    isMvp: true,
    keywords: ['bottling', 'jars', 'filling', 'packaging', 'harvest'],
    relatedSlugs: ['honey-revenue', 'jar-inventory-planner', 'harvest-estimator'],
  },
  {
    slug: 'honey-revenue',
    title: 'Honey Revenue Calculator',
    categorySlug: 'honey-production-and-extraction',
    type: 'exact',
    description: 'Project revenue from your honey sales by jar size, quantity, and price point. Compare retail, wholesale, and farmers market scenarios.',
    shortDescription: 'Project honey sales revenue.',
    icon: '💵',
    isMvp: true,
    keywords: ['revenue', 'income', 'sales', 'price', 'profit', 'honey'],
    relatedSlugs: ['honey-bottling', 'retail-pricing', 'apiary-profit'],
  },
  {
    slug: 'honey-moisture-correction',
    title: 'Honey Moisture Correction Calculator',
    shortTitle: 'Moisture Correction',
    categorySlug: 'honey-production-and-extraction',
    type: 'exact',
    description: 'Determine if your honey is at the correct moisture level for bottling and how much weight you\'ll lose during dehumidification.',
    shortDescription: 'Check and correct honey moisture.',
    icon: '💧',
    isMvp: true,
    keywords: ['moisture', 'refractometer', 'water content', 'dehumidify', 'quality'],
    relatedSlugs: ['honey-bottling', 'harvest-estimator', 'honey-revenue'],
  },
  {
    slug: 'harvest-estimator',
    title: 'Honey Harvest Estimator',
    shortTitle: 'Harvest Estimator',
    categorySlug: 'honey-production-and-extraction',
    type: 'estimate',
    description: 'Estimate your total honey harvest based on number of supers, frame coverage, and honey weight per frame.',
    shortDescription: 'Estimate total harvest yield.',
    icon: '📊',
    isMvp: true,
    keywords: ['harvest', 'yield', 'super', 'frames', 'production', 'estimate'],
    relatedSlugs: ['super-requirement', 'honey-bottling', 'honey-revenue'],
  },
  {
    slug: 'jar-inventory-planner',
    title: 'Jar Inventory Planner',
    categorySlug: 'honey-production-and-extraction',
    type: 'planner',
    description: 'Plan how many jars, lids, and labels to order based on your expected harvest and preferred jar size mix.',
    shortDescription: 'Plan jar and supply orders.',
    icon: '📦',
    isMvp: true,
    keywords: ['jars', 'inventory', 'labels', 'lids', 'supplies', 'ordering'],
    relatedSlugs: ['honey-bottling', 'harvest-estimator', 'honey-revenue'],
  },
  {
    slug: 'super-requirement',
    title: 'Super Requirement Calculator',
    categorySlug: 'honey-production-and-extraction',
    type: 'estimate',
    description: 'Calculate how many honey supers you need based on expected flow strength, colony count, and your equipment type.',
    shortDescription: 'Determine how many supers to add.',
    icon: '📐',
    isMvp: true,
    keywords: ['super', 'boxes', 'honey', 'flow', 'equipment', 'capacity'],
    relatedSlugs: ['harvest-estimator', 'honey-bottling', 'hive-population-estimator'],
  },
  // Non-MVP honey production
  // MVP honey production (batch 2)
  {
    slug: 'jar-label-quantity',
    title: 'Jar Label Quantity Calculator',
    categorySlug: 'honey-production-and-extraction',
    type: 'exact',
    description: 'Calculate how many labels, sheets, and rolls to order based on your jar counts, label-per-jar count, and waste buffer.',
    shortDescription: 'Plan label orders for your jars.',
    icon: '🏷️',
    isMvp: true,
    keywords: ['labels', 'jars', 'printing', 'ordering', 'packaging', 'sheets', 'rolls'],
    relatedSlugs: ['honey-bottling', 'jar-inventory-planner', 'honey-revenue'],
  },
  {
    slug: 'cappings-wax-yield',
    title: 'Cappings Wax Yield Calculator',
    categorySlug: 'honey-production-and-extraction',
    type: 'estimate',
    description: 'Estimate rendered beeswax and recovered cappings honey from your harvest based on uncapping and rendering methods.',
    shortDescription: 'Estimate wax and honey from cappings.',
    icon: '🕯️',
    isMvp: true,
    keywords: ['cappings', 'wax', 'rendering', 'beeswax', 'byproduct', 'uncapping'],
    relatedSlugs: ['harvest-estimator', 'honey-bottling', 'honey-revenue'],
  },
  {
    slug: 'extraction-day-planner',
    title: 'Extraction Day Planner',
    categorySlug: 'honey-production-and-extraction',
    type: 'planner',
    description: 'Plan your extraction day - calculate total loads, time needed, and a start time to finish by your target. Accounts for helpers and setup/cleanup.',
    shortDescription: 'Plan extraction day timing.',
    icon: '⏱️',
    isMvp: true,
    keywords: ['extraction', 'day', 'planner', 'time', 'loads', 'schedule'],
    relatedSlugs: ['extractor-load', 'harvest-estimator', 'honey-bottling'],
  },
  {
    slug: 'extractor-load',
    title: 'Extractor Load Calculator',
    categorySlug: 'honey-production-and-extraction',
    type: 'exact',
    description: 'Calculate how many extractor loads you need for your frames, honey per load, and balance warnings for partial loads.',
    shortDescription: 'Plan extractor loads.',
    icon: '🔄',
    isMvp: true,
    keywords: ['extractor', 'load', 'frames', 'spin', 'capacity'],
    relatedSlugs: ['extraction-day-planner', 'harvest-estimator', 'honey-bottling'],
  },
  {
    slug: 'honey-settling-tank-size',
    title: 'Honey Settling Tank Size',
    categorySlug: 'honey-production-and-extraction',
    type: 'exact',
    description: 'Determine the right settling tank size based on your harvest volume, batch count, and settling duration.',
    shortDescription: 'Size your settling tank.',
    icon: '🪣',
    isMvp: true,
    keywords: ['settling', 'tank', 'bucket', 'size', 'bottling', 'air bubbles'],
    relatedSlugs: ['honey-bottling', 'harvest-estimator', 'extraction-day-planner'],
  },
  {
    slug: 'comb-honey-yield',
    title: 'Comb Honey Yield Calculator',
    categorySlug: 'honey-production-and-extraction',
    type: 'estimate',
    description: 'Estimate comb honey yield and value from Ross Rounds, cut comb, or cassette sections based on completion rate.',
    shortDescription: 'Estimate comb honey yield and value.',
    icon: '🍯',
    isMvp: true,
    keywords: ['comb', 'honey', 'ross round', 'cut comb', 'section', 'yield'],
    relatedSlugs: ['harvest-estimator', 'honey-revenue', 'cappings-wax-yield'],
  },
  {
    slug: 'honey-density-weight-converter',
    title: 'Honey Density/Weight Converter',
    categorySlug: 'honey-production-and-extraction',
    type: 'converter',
    description: 'Convert between honey weight and volume using moisture-adjusted density. Shows specific gravity, lbs per gallon, and fluid ounces.',
    shortDescription: 'Convert honey weight to volume and back.',
    icon: '⚖️',
    isMvp: true,
    keywords: ['density', 'weight', 'volume', 'convert', 'gallon', 'specific gravity'],
    relatedSlugs: ['honey-bottling', 'honey-moisture-correction', 'metric-imperial-converter'],
  },
  {
    slug: 'moisture-shrink-loss',
    title: 'Moisture Shrink/Loss Calculator',
    categorySlug: 'honey-production-and-extraction',
    type: 'exact',
    description: 'Calculate weight loss when drying honey from its current moisture to a target level. Shows revenue impact of the shrink.',
    shortDescription: 'Weight loss from drying honey.',
    icon: '📉',
    isMvp: true,
    keywords: ['moisture', 'shrink', 'loss', 'weight', 'drying', 'dehumidifier'],
    relatedSlugs: ['honey-moisture-correction', 'honey-bottling', 'honey-revenue'],
  },

  // ═══════════════════════════════════════════
  // WAX & HIVE PRODUCTS
  // ═══════════════════════════════════════════
  ...[
    { slug: 'wax-rendering-yield', title: 'Wax Rendering Yield Calculator', type: 'estimate' as const },
    { slug: 'foundation-sheet-requirement', title: 'Foundation Sheet Requirement', type: 'exact' as const },
    { slug: 'candle-yield', title: 'Candle Yield Calculator', type: 'exact' as const },
    { slug: 'lip-balm-soap-batch', title: 'Lip Balm / Soap Batch Calculator', type: 'exact' as const },
    { slug: 'propolis-yield-value', title: 'Propolis Yield / Value Calculator', type: 'estimate' as const },
    { slug: 'royal-jelly-production', title: 'Royal Jelly Production Calculator', type: 'estimate' as const },
    { slug: 'pollen-harvest', title: 'Pollen Harvest Calculator', type: 'estimate' as const },
  ].map((c) => ({
    slug: c.slug,
    title: c.title,
    categorySlug: 'wax-and-hive-products',
    type: c.type,
    description: SPREAD_META[c.slug]?.description ?? `${c.title}. Free, practical beekeeping calculator.`,
    shortDescription: SPREAD_META[c.slug]?.shortDescription ?? `${c.title}.`,
    icon: '🕯️',
    isMvp: true,
    keywords: SPREAD_META[c.slug]?.keywords ?? [c.slug.replace(/-/g, ' ')],
    relatedSlugs: SPREAD_META[c.slug]?.relatedSlugs ?? [],
  })),

  // ═══════════════════════════════════════════
  // VARROA & PEST MANAGEMENT
  // ═══════════════════════════════════════════
  {
    slug: 'varroa-infestation-rate',
    title: 'Varroa Infestation Rate Calculator',
    shortTitle: 'Varroa Rate',
    categorySlug: 'varroa-and-pest-management',
    type: 'exact',
    description: 'Calculate your varroa mite infestation percentage from alcohol wash or sugar roll counts. Includes treatment threshold guidance.',
    shortDescription: 'Calculate mite percentage from wash counts.',
    icon: '🔬',
    isMvp: true,
    keywords: ['varroa', 'mites', 'infestation', 'alcohol wash', 'sugar roll', 'threshold'],
    relatedSlugs: ['oav-dosing', 'overwintering-readiness', 'treatment-timing'],
  },
  {
    slug: 'oav-dosing',
    title: 'OAV Dosing Calculator',
    categorySlug: 'varroa-and-pest-management',
    type: 'exact',
    description: 'Calculate the correct oxalic acid vaporization (OAV) dose based on brood box count and hive configuration. Includes safety notes.',
    shortDescription: 'Calculate OAV dose for your hive setup.',
    icon: '💨',
    isMvp: true,
    keywords: ['oxalic', 'acid', 'vaporization', 'OAV', 'treatment', 'dose', 'varroa'],
    relatedSlugs: ['varroa-infestation-rate', 'treatment-timing', 'overwintering-readiness'],
  },
  // MVP varroa (batch 2)
  {
    slug: 'threshold-action',
    title: 'Threshold Action Calculator',
    shortTitle: 'Mite Threshold',
    categorySlug: 'varroa-and-pest-management',
    type: 'decision-helper',
    description: 'Determine whether your mite levels require treatment based on season, colony status, and flow timing. Shows suitable treatment options.',
    shortDescription: 'Should you treat? Get a clear action plan.',
    icon: '🎯',
    isMvp: true,
    keywords: ['threshold', 'mite', 'action', 'treatment', 'decision', 'when to treat'],
    relatedSlugs: ['varroa-infestation-rate', 'oav-dosing', 'treatment-cost'],
  },
  {
    slug: 'treatment-cost',
    title: 'Treatment Cost Calculator',
    categorySlug: 'varroa-and-pest-management',
    type: 'exact',
    description: 'Calculate the annual cost of your varroa treatment plan across all hives. Compare treatment methods and adjust rounds per year.',
    shortDescription: 'Annual varroa treatment costs.',
    icon: '💊',
    isMvp: true,
    keywords: ['treatment', 'cost', 'varroa', 'OAV', 'apivar', 'formic', 'budget'],
    relatedSlugs: ['oav-dosing', 'varroa-infestation-rate', 'cost-per-hive'],
  },
  { slug: 'treatment-timing', title: 'Treatment Timing Calculator', categorySlug: 'varroa-and-pest-management', type: 'planner',
    description: 'Schedule your next varroa treatment based on last treatment date, method, and honey flow timing. Visual timeline with key dates.',
    shortDescription: 'Schedule your next treatment.', icon: '📅', isMvp: true,
    keywords: ['treatment', 'timing', 'schedule', 'when', 'next', 'calendar'],
    relatedSlugs: ['varroa-infestation-rate', 'oav-dosing', 'threshold-action'] },
  { slug: 'mite-drop-trend', title: 'Mite Drop Trend Calculator', categorySlug: 'varroa-and-pest-management', type: 'projection',
    description: 'Track sticky board mite drops over time to determine if mite levels are rising, stable, or falling after treatment.',
    shortDescription: 'Track mite drop trends over time.', icon: '📉', isMvp: true,
    keywords: ['mite', 'drop', 'trend', 'sticky board', 'monitoring', 'tracking'],
    relatedSlugs: ['varroa-infestation-rate', 'threshold-action', 'varroa-growth-projection'] },
  { slug: 'apiary-wide-mite-dashboard', title: 'Apiary-Wide Mite Dashboard', categorySlug: 'varroa-and-pest-management', type: 'dashboard',
    description: 'Enter mite levels for every hive in your apiary. See average levels, hives above threshold, and which need retesting.',
    shortDescription: 'Mite status across all your hives.', icon: '📊', isMvp: true,
    keywords: ['apiary', 'dashboard', 'mite', 'overview', 'all hives', 'status'],
    relatedSlugs: ['varroa-infestation-rate', 'threshold-action', 'mite-drop-trend'] },
  { slug: 'varroa-growth-projection', title: 'Varroa Growth Projection', categorySlug: 'varroa-and-pest-management', type: 'projection',
    description: 'Project mite population growth over months with optional treatment impact. See when levels reach critical threshold.',
    shortDescription: 'Project mite growth over time.', icon: '📈', isMvp: true,
    keywords: ['varroa', 'growth', 'projection', 'forecast', 'compound', 'critical'],
    relatedSlugs: ['varroa-infestation-rate', 'threshold-action', 'treatment-timing'] },
  { slug: 'brood-break-effect', title: 'Brood Break Effect Calculator', categorySlug: 'varroa-and-pest-management', type: 'estimate',
    description: 'Calculate the mite reduction from a brood break, with or without OAV treatment during the broodless period.',
    shortDescription: 'Mite reduction from brood breaks.', icon: '⏸️', isMvp: true,
    keywords: ['brood', 'break', 'queenless', 'mite', 'reduction', 'requeening'],
    relatedSlugs: ['oav-dosing', 'varroa-infestation-rate', 'drone-brood-removal-impact'] },
  { slug: 'drone-brood-removal-impact', title: 'Drone Brood Removal Impact', categorySlug: 'varroa-and-pest-management', type: 'estimate',
    description: 'Estimate mites trapped and overall reduction from drone comb removal cycles as part of integrated pest management.',
    shortDescription: 'Mite trapping via drone comb removal.', icon: '🪤', isMvp: true,
    keywords: ['drone', 'brood', 'removal', 'trapping', 'IPM', 'comb'],
    relatedSlugs: ['brood-break-effect', 'varroa-infestation-rate', 'threshold-action'] },
  { slug: 'resistance-rotation-planner', title: 'Resistance Rotation Planner', categorySlug: 'varroa-and-pest-management', type: 'planner',
    description: 'Plan a multi-year treatment rotation across chemistry classes to slow resistance development. Shows spring/summer/fall schedule.',
    shortDescription: 'Rotate treatments to prevent resistance.', icon: '🔄', isMvp: true,
    keywords: ['resistance', 'rotation', 'chemistry', 'plan', 'amitraz', 'organic acid'],
    relatedSlugs: ['treatment-cost', 'treatment-timing', 'oav-dosing'] },
  { slug: 'small-hive-beetle-trap', title: 'Small Hive Beetle Trap Calculator', categorySlug: 'varroa-and-pest-management', type: 'exact',
    description: 'Calculate how many SHB traps and oil you need based on hive count, trap type, and infestation level. Includes management tips.',
    shortDescription: 'SHB trap and oil requirements.', icon: '🪲', isMvp: true,
    keywords: ['small hive beetle', 'SHB', 'trap', 'oil', 'beetle', 'infestation'],
    relatedSlugs: ['wax-moth-risk', 'mouse-guard-opening', 'threshold-action'] },
  { slug: 'mouse-guard-opening', title: 'Mouse Guard / Opening Calculator', categorySlug: 'varroa-and-pest-management', type: 'exact',
    description: 'Calculate mouse guard needs, maximum opening size (3/8"), and seasonal install/remove timing with ventilation assessment.',
    shortDescription: 'Mouse guard sizing and timing.', icon: '🐭', isMvp: true,
    keywords: ['mouse', 'guard', 'entrance', 'opening', 'winter', 'protection'],
    relatedSlugs: ['overwintering-readiness', 'small-hive-beetle-trap', 'wax-moth-risk'] },
  { slug: 'wax-moth-risk', title: 'Wax Moth Risk Calculator', categorySlug: 'varroa-and-pest-management', type: 'scorecard',
    description: 'Score your wax moth risk based on temperature, storage method, colony strength, comb volume, and chemical protection.',
    shortDescription: 'Assess wax moth risk for stored comb.', icon: '🦋', isMvp: true,
    keywords: ['wax moth', 'risk', 'storage', 'comb', 'greater wax moth', 'protection'],
    relatedSlugs: ['small-hive-beetle-trap', 'mouse-guard-opening', 'overwintering-readiness'] },

  // ═══════════════════════════════════════════
  // DISEASE & INSPECTION SUPPORT
  // ═══════════════════════════════════════════
  ...[
    { slug: 'inspection-interval', title: 'Inspection Interval Calculator', type: 'planner' as const },
    { slug: 'disease-symptom-scoring', title: 'Disease Symptom Scoring', type: 'scorecard' as const },
    { slug: 'queenrightness-checker', title: 'Queenrightness Checker', type: 'decision-helper' as const },
    { slug: 'brood-pattern-scoring', title: 'Brood Pattern Scoring', type: 'scorecard' as const },
    { slug: 'colony-health-index', title: 'Colony Health Index', type: 'scorecard' as const },
    { slug: 'deadout-analysis', title: 'Deadout Analysis Calculator', type: 'scorecard' as const },
  ].map((c) => ({
    slug: c.slug,
    title: c.title,
    categorySlug: 'disease-and-inspection-support',
    type: c.type,
    description: SPREAD_META[c.slug]?.description ?? `${c.title}. Free, practical beekeeping calculator.`,
    shortDescription: SPREAD_META[c.slug]?.shortDescription ?? `${c.title}.`,
    icon: '🩺',
    isMvp: true,
    keywords: SPREAD_META[c.slug]?.keywords ?? [c.slug.replace(/-/g, ' ')],
    relatedSlugs: SPREAD_META[c.slug]?.relatedSlugs ?? [],
  })),

  // ═══════════════════════════════════════════
  // EQUIPMENT & BUILD
  // ═══════════════════════════════════════════
  ...[
    { slug: 'langstroth-box-volume', title: 'Langstroth Box Volume Calculator', type: 'exact' as const },
    { slug: 'frame-count-by-config', title: 'Frame Count by Configuration', type: 'exact' as const },
    { slug: 'apiary-equipment-planner', title: 'Apiary Equipment Planner', type: 'planner' as const },
    { slug: 'foundationless-frame-spacing', title: 'Foundationless Frame Spacing', type: 'exact' as const },
    { slug: 'pallet-loading', title: 'Pallet Loading Calculator', type: 'exact' as const },
    { slug: 'trailer-capacity', title: 'Trailer Capacity Calculator', type: 'exact' as const },
    { slug: 'storage-space', title: 'Storage Space Calculator', type: 'exact' as const },
    { slug: 'paint-stain-quantity', title: 'Paint / Stain Quantity Calculator', type: 'exact' as const },
    { slug: 'nail-screw-material', title: 'Nail / Screw Material Calculator', type: 'exact' as const },
    { slug: 'hive-stand-height-footprint', title: 'Hive Stand Height & Footprint', type: 'exact' as const },
    { slug: 'apiary-layout', title: 'Apiary Layout Calculator', type: 'planner' as const },
    { slug: 'electric-fence-requirement', title: 'Electric Fence Requirement', type: 'exact' as const },
  ].map((c) => ({
    slug: c.slug,
    title: c.title,
    categorySlug: 'equipment-and-build',
    type: c.type,
    description: SPREAD_META[c.slug]?.description ?? `${c.title}. Free, practical beekeeping calculator.`,
    shortDescription: SPREAD_META[c.slug]?.shortDescription ?? `${c.title}.`,
    icon: '🔨',
    isMvp: true,
    keywords: SPREAD_META[c.slug]?.keywords ?? [c.slug.replace(/-/g, ' ')],
    relatedSlugs: SPREAD_META[c.slug]?.relatedSlugs ?? [],
  })),

  // ═══════════════════════════════════════════
  // SEASONAL PLANNING
  // ═══════════════════════════════════════════
  ...[
    { slug: 'spring-buildup', title: 'Spring Buildup Calculator', type: 'planner' as const },
    { slug: 'main-flow-countdown', title: 'Main Flow Countdown', type: 'planner' as const },
    { slug: 'fall-preparation', title: 'Fall Preparation Calculator', type: 'planner' as const },
    { slug: 'winter-loss-replacement', title: 'Winter Loss Replacement Calculator', type: 'exact' as const },
    { slug: 'local-bloom-calendar', title: 'Local Bloom Calendar', type: 'planner' as const },
    { slug: 'forage-gap', title: 'Forage Gap Calculator', type: 'estimate' as const },
    { slug: 'super-addition-timing', title: 'Super Addition Timing', type: 'planner' as const },
    { slug: 'wrapping-insulation', title: 'Wrapping / Insulation Calculator', type: 'exact' as const },
    { slug: 'ventilation', title: 'Ventilation Calculator', type: 'exact' as const },
  ].map((c) => ({
    slug: c.slug,
    title: c.title,
    categorySlug: 'seasonal-planning',
    type: c.type,
    description: SPREAD_META[c.slug]?.description ?? `${c.title}. Free, practical beekeeping calculator.`,
    shortDescription: SPREAD_META[c.slug]?.shortDescription ?? `${c.title}.`,
    icon: '📅',
    isMvp: true,
    keywords: SPREAD_META[c.slug]?.keywords ?? [c.slug.replace(/-/g, ' ')],
    relatedSlugs: SPREAD_META[c.slug]?.relatedSlugs ?? [],
  })),

  // ═══════════════════════════════════════════
  // QUEEN BREEDING & GENETICS
  // ═══════════════════════════════════════════
  ...[
    { slug: 'mating-window', title: 'Mating Window Calculator', type: 'planner' as const },
    { slug: 'drone-saturation', title: 'Drone Saturation Calculator', type: 'estimate' as const },
    { slug: 'queen-cage-candy', title: 'Queen Cage Candy Calculator', type: 'exact' as const },
    { slug: 'breeder-selection-scorecard', title: 'Breeder Selection Scorecard', type: 'scorecard' as const },
    { slug: 'inbreeding-risk-lineage', title: 'Inbreeding Risk / Lineage Tracker', type: 'scorecard' as const },
    { slug: 'graft-acceptance-rate', title: 'Graft Acceptance Rate Calculator', type: 'estimate' as const },
    { slug: 'queen-production-profitability', title: 'Queen Production Profitability', type: 'exact' as const },
  ].map((c) => ({
    slug: c.slug,
    title: c.title,
    categorySlug: 'queen-breeding-and-genetics',
    type: c.type,
    description: SPREAD_META[c.slug]?.description ?? `${c.title}. Free, practical beekeeping calculator.`,
    shortDescription: SPREAD_META[c.slug]?.shortDescription ?? `${c.title}.`,
    icon: '👑',
    isMvp: true,
    keywords: SPREAD_META[c.slug]?.keywords ?? [c.slug.replace(/-/g, ' ')],
    relatedSlugs: SPREAD_META[c.slug]?.relatedSlugs ?? [],
  })),

  // ═══════════════════════════════════════════
  // POLLINATION SERVICES
  // ═══════════════════════════════════════════
  {
    slug: 'pollination-contract-pricing',
    title: 'Pollination Contract Pricing Calculator',
    shortTitle: 'Pollination Pricing',
    categorySlug: 'pollination-services',
    type: 'exact',
    description: 'Calculate fair contract pricing for pollination services based on hive count, transport distance, crop type, and service duration.',
    shortDescription: 'Price pollination service contracts.',
    icon: '🌻',
    isMvp: true,
    keywords: ['pollination', 'contract', 'pricing', 'commercial', 'almonds', 'transport'],
    relatedSlugs: ['apiary-profit', 'cost-per-hive', 'retail-pricing'],
  },
  {
    slug: 'hive-strength-grading',
    title: 'Hive Strength Grading Calculator',
    shortTitle: 'Strength Grade',
    categorySlug: 'pollination-services',
    type: 'scorecard',
    description: 'Score colony strength across population, brood, queen, temperament, and health. Determines if a hive meets pollination contract standards.',
    shortDescription: 'Grade hive strength for pollination.',
    icon: '💪',
    isMvp: true,
    keywords: ['strength', 'grading', 'pollination', 'score', 'colony', 'contract'],
    relatedSlugs: ['pollination-contract-pricing', 'hive-population-estimator', 'overwintering-readiness'],
  },
  ...[
    { slug: 'transport-load-pollination', title: 'Transport/Load for Pollination', type: 'exact' as const },
    { slug: 'pollination-deployment-planner', title: 'Pollination Deployment Planner', type: 'planner' as const },
    { slug: 'pollination-revenue', title: 'Pollination Revenue Calculator', type: 'exact' as const },
    { slug: 'travel-surcharge', title: 'Travel Surcharge Calculator', type: 'exact' as const },
  ].map((c) => ({
    slug: c.slug,
    title: c.title,
    categorySlug: 'pollination-services',
    type: c.type,
    description: SPREAD_META[c.slug]?.description ?? `${c.title}. Free, practical beekeeping calculator.`,
    shortDescription: SPREAD_META[c.slug]?.shortDescription ?? `${c.title}.`,
    icon: '🌻',
    isMvp: true,
    keywords: SPREAD_META[c.slug]?.keywords ?? [c.slug.replace(/-/g, ' ')],
    relatedSlugs: SPREAD_META[c.slug]?.relatedSlugs ?? [],
  })),

  // ═══════════════════════════════════════════
  // BUSINESS & PROFITABILITY
  // ═══════════════════════════════════════════
  {
    slug: 'cost-per-hive',
    title: 'Cost Per Hive Calculator',
    categorySlug: 'business-and-profitability',
    type: 'exact',
    description: 'Break down your annual cost per hive including equipment, feed, treatments, labor, and overhead. Essential for profitability analysis.',
    shortDescription: 'Calculate annual cost per hive.',
    icon: '🧮',
    isMvp: true,
    keywords: ['cost', 'hive', 'expense', 'budget', 'annual', 'overhead'],
    relatedSlugs: ['apiary-profit', 'retail-pricing', 'feed-cost'],
  },
  {
    slug: 'apiary-profit',
    title: 'Apiary Profit Calculator',
    categorySlug: 'business-and-profitability',
    type: 'exact',
    description: 'Calculate net profit for your entire apiary operation by combining revenue streams and subtracting all costs.',
    shortDescription: 'Calculate total apiary profit.',
    icon: '📈',
    isMvp: true,
    keywords: ['profit', 'revenue', 'income', 'apiary', 'business', 'net income'],
    relatedSlugs: ['cost-per-hive', 'honey-revenue', 'retail-pricing'],
  },
  {
    slug: 'retail-pricing',
    title: 'Retail Pricing Calculator',
    categorySlug: 'business-and-profitability',
    type: 'exact',
    description: 'Determine optimal retail prices for your honey based on cost of production, desired margin, market rates, and jar size.',
    shortDescription: 'Set optimal honey retail prices.',
    icon: '🏷️',
    isMvp: true,
    keywords: ['pricing', 'retail', 'margin', 'markup', 'honey price', 'market'],
    relatedSlugs: ['honey-revenue', 'cost-per-hive', 'apiary-profit'],
  },
  {
    slug: 'break-even',
    title: 'Break-Even Calculator',
    categorySlug: 'business-and-profitability',
    type: 'exact',
    description: 'Calculate how many units you need to sell to cover all fixed costs. Shows contribution margin and break-even revenue.',
    shortDescription: 'Find your break-even point.',
    icon: '📊',
    isMvp: true,
    keywords: ['break even', 'profit', 'fixed costs', 'margin', 'units', 'revenue'],
    relatedSlugs: ['apiary-profit', 'retail-pricing', 'cost-per-hive'],
  },
  {
    slug: 'wholesale-vs-retail',
    title: 'Wholesale vs Retail Comparison',
    shortTitle: 'Wholesale vs Retail',
    categorySlug: 'business-and-profitability',
    type: 'decision-helper',
    description: 'Compare net profit between selling 100% retail, 100% wholesale, or a mix. Accounts for sell-through rates and time costs.',
    shortDescription: 'Compare retail, wholesale, and mixed strategies.',
    icon: '⚖️',
    isMvp: true,
    keywords: ['wholesale', 'retail', 'comparison', 'profit', 'sell-through', 'strategy'],
    relatedSlugs: ['retail-pricing', 'honey-revenue', 'apiary-profit'],
  },
  { slug: 'labor-cost', title: 'Labor Cost Calculator', categorySlug: 'business-and-profitability', type: 'exact',
    description: 'Calculate the true cost of your beekeeping labor - inspections, extraction, feeding, mite treatment, and maintenance. See your hourly investment per hive.',
    shortDescription: 'Value your beekeeping time.', icon: '⏰', isMvp: true,
    keywords: ['labor', 'cost', 'time', 'hours', 'wage', 'opportunity cost'],
    relatedSlugs: ['cost-per-hive', 'apiary-profit', 'roi'] },
  { slug: 'roi', title: 'ROI Calculator', categorySlug: 'business-and-profitability', type: 'exact',
    description: 'Calculate return on investment for your beekeeping operation. Shows annual ROI, payback period, and a multi-year cumulative profit projection.',
    shortDescription: 'Return on your beekeeping investment.', icon: '📈', isMvp: true,
    keywords: ['ROI', 'return', 'investment', 'payback', 'profit', 'projection'],
    relatedSlugs: ['break-even', 'apiary-profit', 'cost-per-hive'] },
  { slug: 'expansion-planning', title: 'Expansion Planning Calculator', categorySlug: 'business-and-profitability', type: 'projection',
    description: 'Plan your apiary growth from current to target hive count over multiple years. Models splits vs purchases, accounts for winter losses, and projects costs.',
    shortDescription: 'Plan multi-year apiary growth.', icon: '🚀', isMvp: true,
    keywords: ['expansion', 'growth', 'planning', 'target', 'splits', 'scale up'],
    relatedSlugs: ['break-even', 'replacement-cost-winter-losses', 'roi'] },
  { slug: 'package-bee-vs-nuc', title: 'Package Bee vs Nuc Comparison', shortTitle: 'Package vs Nuc', categorySlug: 'business-and-profitability', type: 'decision-helper',
    description: 'Side-by-side comparison of package bees vs 5-frame nucs across 10 factors including cost, build-up speed, queen acceptance, and disease risk.',
    shortDescription: 'Compare packages and nucs side by side.', icon: '📦', isMvp: true,
    keywords: ['package', 'nuc', 'comparison', 'which', 'buy', 'bees'],
    relatedSlugs: ['beginner-hive-setup', 'beekeeping-budget', 'expansion-planning'] },
  { slug: 'replacement-cost-winter-losses', title: 'Replacement Cost After Winter Losses', shortTitle: 'Winter Loss Cost', categorySlug: 'business-and-profitability', type: 'exact',
    description: 'Estimate the cost of replacing colonies lost over winter based on your loss rate and replacement method (nucs, packages, or splits).',
    shortDescription: 'Cost of replacing winter losses.', icon: '❄️', isMvp: true,
    keywords: ['replacement', 'winter', 'losses', 'dead', 'cost', 'mortality'],
    relatedSlugs: ['overwintering-readiness', 'expansion-planning', 'cost-per-hive'] },
  { slug: 'inventory-value', title: 'Inventory Value Calculator', categorySlug: 'business-and-profitability', type: 'exact',
    description: 'Calculate the total value of your beekeeping equipment, hives, stock, and honey inventory. Useful for insurance, taxes, or selling your operation.',
    shortDescription: 'Total value of your beekeeping assets.', icon: '🏦', isMvp: true,
    keywords: ['inventory', 'value', 'assets', 'equipment', 'insurance', 'worth'],
    relatedSlugs: ['cost-per-hive', 'beginner-hive-setup', 'roi'] },
  { slug: 'cash-flow-by-season', title: 'Cash Flow by Season', shortTitle: 'Seasonal Cash Flow', categorySlug: 'business-and-profitability', type: 'projection',
    description: 'Map your revenue and costs across all four seasons to find your peak cash need and identify which seasons are profitable vs cash-draining.',
    shortDescription: 'Track money in and out by season.', icon: '💸', isMvp: true,
    keywords: ['cash flow', 'season', 'revenue', 'costs', 'quarterly', 'budget'],
    relatedSlugs: ['apiary-profit', 'break-even', 'labor-cost'] },

  // ═══════════════════════════════════════════
  // EDUCATION & HOBBYIST
  // ═══════════════════════════════════════════
  {
    slug: 'beginner-hive-setup',
    title: 'Beginner Hive Setup Calculator',
    shortTitle: 'Beginner Setup',
    categorySlug: 'education-and-hobbyist',
    type: 'planner',
    description: 'Plan your first beehive with a complete equipment list, estimated costs, and step-by-step setup guidance for new beekeepers.',
    shortDescription: 'Plan your first hive setup and costs.',
    icon: '🌱',
    isMvp: true,
    keywords: ['beginner', 'starter', 'first hive', 'setup', 'equipment', 'new beekeeper'],
    relatedSlugs: ['cost-per-hive', 'sugar-syrup', 'hive-population-estimator'],
  },
  {
    slug: 'beekeeping-budget',
    title: 'Beekeeping Budget Calculator',
    categorySlug: 'education-and-hobbyist',
    type: 'planner',
    description: 'Plan your entire beekeeping budget - first-year and recurring costs for equipment, bees, feeding, mite treatment, and extraction. Includes a categorized line-item breakdown.',
    shortDescription: 'Full budget planner for new beekeepers.',
    icon: '💰',
    isMvp: true,
    keywords: ['budget', 'cost', 'first year', 'starter', 'equipment', 'money'],
    relatedSlugs: ['beginner-hive-setup', 'cost-per-hive', 'break-even'],
  },
  {
    slug: 'inspection-note-to-score',
    title: 'Inspection Note-to-Score',
    shortTitle: 'Inspection Score',
    categorySlug: 'education-and-hobbyist',
    type: 'scorecard',
    description: 'Turn your hive inspection observations into a scored assessment. Grades queen status, brood pattern, population, temperament, stores, and health with alerts and action items.',
    shortDescription: 'Score your inspection observations.',
    icon: '📋',
    isMvp: true,
    keywords: ['inspection', 'score', 'grade', 'observation', 'checklist', 'assessment'],
    relatedSlugs: ['hive-strength-grading', 'overwintering-readiness', 'apiary-checklist-generator'],
  },
  {
    slug: 'apiary-checklist-generator',
    title: 'Apiary Checklist Generator',
    categorySlug: 'education-and-hobbyist',
    type: 'planner',
    description: 'Generate a seasonal, interactive checklist for your apiary visit. Covers inspection, varroa, seasonal tasks, and equipment - with priority levels and a progress tracker.',
    shortDescription: 'Season-specific checklists for your apiary.',
    icon: '✅',
    isMvp: true,
    keywords: ['checklist', 'inspection', 'seasonal', 'tasks', 'to-do', 'apiary visit'],
    relatedSlugs: ['inspection-note-to-score', 'threshold-action', 'beginner-hive-setup'],
  },
  {
    slug: 'can-i-split-this-hive',
    title: 'Can I Split This Hive?',
    shortTitle: 'Can I Split?',
    categorySlug: 'education-and-hobbyist',
    type: 'decision-helper',
    description: 'Answer whether your colony is strong enough to split based on population, brood, stores, timing, and queen availability. Includes step-by-step splitting instructions.',
    shortDescription: 'Should you split? Get a clear answer.',
    icon: '✂️',
    isMvp: true,
    keywords: ['split', 'can I', 'decision', 'nuc', 'divide', 'increase'],
    relatedSlugs: ['split-planning', 'hive-strength-grading', 'queen-rearing-timeline'],
  },
  {
    slug: 'do-i-need-to-feed',
    title: 'Do I Need to Feed?',
    shortTitle: 'Need to Feed?',
    categorySlug: 'education-and-hobbyist',
    type: 'decision-helper',
    description: 'Get a clear yes/no/monitor answer on whether your colony needs feeding based on stores, population, season, and forage availability. Recommends what, how much, and how often.',
    shortDescription: 'Should you be feeding? Find out.',
    icon: '🍽️',
    isMvp: true,
    keywords: ['feed', 'need', 'decision', 'starvation', 'stores', 'beginner'],
    relatedSlugs: ['emergency-feeding', 'feed-requirement', 'winter-stores'],
  },
  {
    slug: 'how-much-honey-can-i-expect',
    title: 'How Much Honey Can I Expect?',
    shortTitle: 'Honey Expectation',
    categorySlug: 'education-and-hobbyist',
    type: 'estimate',
    description: 'Estimate your honey yield based on region, hive age, colony strength, local forage, and weather. Perfect for new beekeepers setting realistic expectations.',
    shortDescription: 'Set realistic honey harvest expectations.',
    icon: '🍯',
    isMvp: true,
    keywords: ['honey', 'expect', 'yield', 'how much', 'first year', 'beginner'],
    relatedSlugs: ['harvest-estimator', 'honey-revenue', 'beginner-hive-setup'],
  },
  {
    slug: 'what-jar-price-should-i-charge',
    title: 'What Jar Price Should I Charge?',
    shortTitle: 'Jar Pricing',
    categorySlug: 'education-and-hobbyist',
    type: 'decision-helper',
    description: 'Calculate a competitive jar price based on your costs, venue, region, and premium qualities (raw, varietal, organic). Shows profit per jar and margin.',
    shortDescription: 'Find the right price for your honey.',
    icon: '🏷️',
    isMvp: true,
    keywords: ['price', 'jar', 'charge', 'how much', 'sell', 'farmers market'],
    relatedSlugs: ['retail-pricing', 'honey-revenue', 'wholesale-vs-retail'],
  },

  // ═══════════════════════════════════════════
  // ENVIRONMENTAL & FORAGE
  // ═══════════════════════════════════════════
  {
    slug: 'bee-forage-radius',
    title: 'Bee Forage Radius Calculator',
    categorySlug: 'environmental-and-forage',
    type: 'exact',
    description: 'Calculate the total foraging area around your apiary in acres or hectares. Visualize how colony count affects local forage competition.',
    shortDescription: 'Calculate foraging area and competition.',
    icon: '🗺️',
    isMvp: true,
    keywords: ['forage', 'radius', 'area', 'range', 'flight', 'competition'],
    relatedSlugs: ['hive-population-estimator', 'pollination-contract-pricing'],
  },
  {
    slug: 'water-requirement-estimator',
    title: 'Water Requirement Estimator',
    categorySlug: 'environmental-and-forage',
    type: 'estimate',
    description: 'Estimate daily and weekly water needs for your apiary based on hive count, season, temperature, and distance to the nearest water source. Includes container sizing and refill schedule.',
    shortDescription: 'Estimate apiary water needs by season.',
    icon: '💧',
    isMvp: true,
    keywords: ['water', 'requirement', 'hydration', 'source', 'container', 'summer', 'heat'],
    relatedSlugs: ['bee-forage-radius', 'hive-population-estimator'],
  },
  { slug: 'land-area-coverage', title: 'Land Area Coverage Calculator', categorySlug: 'environmental-and-forage', type: 'exact',
    description: 'Calculate land area in acres/hectares from dimensions, determine max hive capacity, and estimate plantable area for pollinator forage.',
    shortDescription: 'Calculate land area and hive capacity.', icon: '📐', isMvp: true,
    keywords: ['land', 'area', 'acres', 'hectares', 'coverage', 'capacity'],
    relatedSlugs: ['bee-forage-radius', 'planting-calculator-pollinator', 'nectar-potential'] },
  { slug: 'planting-calculator-pollinator', title: 'Planting Calculator for Pollinators', shortTitle: 'Pollinator Planting', categorySlug: 'environmental-and-forage', type: 'planner',
    description: 'Get a plant list with quantities and costs for your pollinator garden. Filtered by soil, sun, and bloom season with a bloom calendar.',
    shortDescription: 'Plan a pollinator garden for your bees.', icon: '🌸', isMvp: true,
    keywords: ['planting', 'pollinator', 'garden', 'flowers', 'forage', 'bloom'],
    relatedSlugs: ['nectar-potential', 'land-area-coverage', 'bee-forage-radius'] },
  { slug: 'nectar-potential', title: 'Nectar Potential Calculator', categorySlug: 'environmental-and-forage', type: 'estimate',
    description: 'Estimate the honey production potential of your area based on dominant flora, forage radius, quality, and competing hives.',
    shortDescription: 'How much honey can your area produce?', icon: '🌼', isMvp: true,
    keywords: ['nectar', 'potential', 'flora', 'yield', 'competition', 'carrying capacity'],
    relatedSlugs: ['bee-forage-radius', 'how-much-honey-can-i-expect', 'land-area-coverage'] },
  { slug: 'shade-sun-exposure', title: 'Shade/Sun Exposure Calculator', shortTitle: 'Sun Exposure', categorySlug: 'environmental-and-forage', type: 'estimate',
    description: 'Assess whether your hive site gets enough sun. Accounts for morning vs afternoon sun, tree canopy, building shadows, and climate.',
    shortDescription: 'Is your hive site sunny enough?', icon: '☀️', isMvp: true,
    keywords: ['shade', 'sun', 'exposure', 'site', 'location', 'canopy'],
    relatedSlugs: ['windbreak', 'bee-forage-radius', 'water-requirement-estimator'] },
  { slug: 'windbreak', title: 'Windbreak Calculator', categorySlug: 'environmental-and-forage', type: 'exact',
    description: 'Determine if you need a windbreak, how tall and long it should be, and compare material options with costs and installation timelines.',
    shortDescription: 'Size a windbreak for your apiary.', icon: '🌬️', isMvp: true,
    keywords: ['windbreak', 'wind', 'protection', 'fence', 'hedge', 'shelter'],
    relatedSlugs: ['shade-sun-exposure', 'overwintering-readiness', 'mouse-guard-opening'] },

  // ═══════════════════════════════════════════
  // DATA CONVERSION & UTILITY
  // ═══════════════════════════════════════════
  {
    slug: 'metric-imperial-converter',
    title: 'Metric-Imperial Converter for Beekeeping',
    shortTitle: 'Unit Converter',
    categorySlug: 'data-conversion-and-utility',
    type: 'converter',
    description: 'Convert between metric and imperial units commonly used in beekeeping - weight, volume, length, area, and temperature.',
    shortDescription: 'Convert beekeeping units instantly.',
    icon: '🔄',
    isMvp: true,
    keywords: ['convert', 'metric', 'imperial', 'units', 'weight', 'volume', 'temperature'],
    relatedSlugs: ['batch-scaling', 'sugar-syrup'],
  },
  {
    slug: 'batch-scaling',
    title: 'Batch Scaling Calculator',
    categorySlug: 'data-conversion-and-utility',
    type: 'exact',
    description: 'Scale any beekeeping recipe or formula up or down. Enter original quantities and your desired batch size to get adjusted amounts.',
    shortDescription: 'Scale recipes and formulas up or down.',
    icon: '⚖️',
    isMvp: true,
    keywords: ['scale', 'batch', 'recipe', 'multiply', 'divide', 'adjust'],
    relatedSlugs: ['sugar-syrup', 'metric-imperial-converter'],
  },
  {
    slug: 'date-interval',
    title: 'Date Interval Calculator',
    categorySlug: 'data-conversion-and-utility',
    type: 'exact',
    description: 'Calculate days between two dates, or add/subtract days from a date. Includes quick-access buttons for common beekeeping intervals like egg-to-emergence timelines.',
    shortDescription: 'Days between dates with beekeeping presets.',
    icon: '📅',
    isMvp: true,
    keywords: ['date', 'interval', 'days', 'calendar', 'timeline', 'emergence', 'countdown'],
    relatedSlugs: ['queen-rearing-timeline', 'batch-scaling', 'metric-imperial-converter'],
  },
  ...[
    { slug: 'multiple-hive-totalizer', title: 'Multiple-Hive Totalizer', type: 'exact' as const },
    { slug: 'honey-jar-case-pack', title: 'Honey Jar Case Pack Calculator', type: 'exact' as const },
    { slug: 'frame-coverage-percent', title: 'Frame Coverage Percent Calculator', type: 'exact' as const },
    { slug: 'moisture-temperature-log', title: 'Moisture & Temperature Log', type: 'dashboard' as const },
    { slug: 'yield-per-hive-benchmark', title: 'Yield Per Hive Benchmark', type: 'estimate' as const },
  ].map((c) => ({
    slug: c.slug,
    title: c.title,
    categorySlug: 'data-conversion-and-utility',
    type: c.type,
    description: SPREAD_META[c.slug]?.description ?? `${c.title}. Free, practical beekeeping calculator.`,
    shortDescription: SPREAD_META[c.slug]?.shortDescription ?? `${c.title}.`,
    icon: '🔄',
    isMvp: true,
    keywords: SPREAD_META[c.slug]?.keywords ?? [c.slug.replace(/-/g, ' ')],
    relatedSlugs: SPREAD_META[c.slug]?.relatedSlugs ?? [],
  })),

  // ═══════════════════════════════════════════
  // ADVANCED / PREMIUM
  // ═══════════════════════════════════════════
  ...[
    { slug: 'inspection-recommendation-engine', title: 'Inspection-Based Recommendation Engine', type: 'decision-helper' as const },
    { slug: 'apiary-kpi-dashboard', title: 'Apiary KPI Dashboard', type: 'dashboard' as const },
    { slug: 'colony-scoring-sale-value', title: 'Colony Scoring for Sale Value', type: 'scorecard' as const },
    { slug: 'commercial-labor-scheduling', title: 'Commercial Labor Scheduling', type: 'planner' as const },
    { slug: 'migratory-route-profitability', title: 'Migratory Route Profitability', type: 'projection' as const },
    { slug: 'weather-linked-nectar-flow', title: 'Weather-Linked Nectar Flow Predictor', type: 'projection' as const },
    { slug: 'apiary-comparison', title: 'Apiary Comparison Calculator', type: 'dashboard' as const },
    { slug: 'queen-bank-capacity', title: 'Queen Bank Capacity Calculator', type: 'exact' as const },
    { slug: 'nuc-shipment-planning', title: 'Nuc Shipment Planning Calculator', type: 'planner' as const },
    { slug: 'custom-quote-builder', title: 'Custom Quote Builder', type: 'planner' as const },
  ].map((c) => ({
    slug: c.slug,
    title: c.title,
    categorySlug: 'advanced-premium',
    type: c.type,
    description: SPREAD_META[c.slug]?.description ?? `${c.title}. Free, practical beekeeping calculator.`,
    shortDescription: SPREAD_META[c.slug]?.shortDescription ?? `${c.title}.`,
    icon: '⚡',
    isMvp: true,
    keywords: SPREAD_META[c.slug]?.keywords ?? [c.slug.replace(/-/g, ' ')],
    relatedSlugs: SPREAD_META[c.slug]?.relatedSlugs ?? [],
  })),
];

// ─── Lookup helpers ───────────────────────────────────────

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return calculatorRegistry.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(categorySlug: string): CalculatorMeta[] {
  return calculatorRegistry.filter((c) => c.categorySlug === categorySlug);
}

export function getMvpCalculators(): CalculatorMeta[] {
  return calculatorRegistry.filter((c) => c.isMvp);
}

export function getAllSlugs(): string[] {
  return calculatorRegistry.map((c) => c.slug);
}

export function getRelatedCalculators(slug: string): CalculatorMeta[] {
  const calc = getCalculatorBySlug(slug);
  if (!calc) return [];
  return calc.relatedSlugs
    .map(getCalculatorBySlug)
    .filter((c): c is CalculatorMeta => c !== undefined);
}
