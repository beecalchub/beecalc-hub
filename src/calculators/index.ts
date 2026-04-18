import React from 'react';

import { ApiaryCarryingCapacityCalculator } from './apiary-carrying-capacity/Component';
import { ApiaryChecklistGeneratorCalculator } from './apiary-checklist-generator/Component';
import { ApiaryComparisonCalculator } from './apiary-comparison/Component';
import { ApiaryEquipmentPlannerCalculator } from './apiary-equipment-planner/Component';
import { ApiaryKpiDashboardCalculator } from './apiary-kpi-dashboard/Component';
import { ApiaryLayoutCalculator } from './apiary-layout/Component';
import { ApiaryProfitCalculator } from './apiary-profit/Component';
import { ApiaryTotalFeedCalculator } from './apiary-total-feed/Component';
import { ApiaryWideMiteDashboardCalculator } from './apiary-wide-mite-dashboard/Component';
import { BatchScalingCalculator } from './batch-scaling/Component';
import { BeeForageRadiusCalculator } from './bee-forage-radius/Component';
import { BeekeepingBudgetCalculator } from './beekeeping-budget/Component';
import { BeginnerHiveSetupCalculator } from './beginner-hive-setup/Component';
import { BreakEvenCalculator } from './break-even/Component';
import { BreederSelectionScorecardCalculator } from './breeder-selection-scorecard/Component';
import { BroodAreaCalculator } from './brood-area/Component';
import { BroodBreakEffectCalculator } from './brood-break-effect/Component';
import { BroodPatternScoringCalculator } from './brood-pattern-scoring/Component';
import { CanISplitThisHiveCalculator } from './can-i-split-this-hive/Component';
import { CandleYieldCalculator } from './candle-yield/Component';
import { CappingsWaxYieldCalculator } from './cappings-wax-yield/Component';
import { CashFlowBySeasonCalculator } from './cash-flow-by-season/Component';
import { ColonyGrowthProjectionCalculator } from './colony-growth-projection/Component';
import { ColonyHealthIndexCalculator } from './colony-health-index/Component';
import { ColonyScoringSaleValueCalculator } from './colony-scoring-sale-value/Component';
import { CombHoneyYieldCalculator } from './comb-honey-yield/Component';
import { CommercialLaborSchedulingCalculator } from './commercial-labor-scheduling/Component';
import { CostPerHiveCalculator } from './cost-per-hive/Component';
import { CustomQuoteBuilderCalculator } from './custom-quote-builder/Component';
import { DateIntervalCalculator } from './date-interval/Component';
import { DeadoutAnalysisCalculator } from './deadout-analysis/Component';
import { DiseaseSymptomScoringCalculator } from './disease-symptom-scoring/Component';
import { DoINeedToFeedCalculator } from './do-i-need-to-feed/Component';
import { DroneBroodRemovalImpactCalculator } from './drone-brood-removal-impact/Component';
import { DroneSaturationCalculator } from './drone-saturation/Component';
import { EggToEmergenceTimelineCalculator } from './egg-to-emergence-timeline/Component';
import { ElectricFenceRequirementCalculator } from './electric-fence-requirement/Component';
import { EmergencyFeedingCalculator } from './emergency-feeding/Component';
import { ExpansionPlanningCalculator } from './expansion-planning/Component';
import { ExtractionDayPlannerCalculator } from './extraction-day-planner/Component';
import { ExtractorLoadCalculator } from './extractor-load/Component';
import { FallPreparationCalculator } from './fall-preparation/Component';
import { FeedCostCalculator } from './feed-cost/Component';
import { FeedRequirementCalculator } from './feed-requirement/Component';
import { FondantRecipeCalculator } from './fondant-recipe/Component';
import { ForageGapCalculator } from './forage-gap/Component';
import { FoundationSheetRequirementCalculator } from './foundation-sheet-requirement/Component';
import { FoundationlessFrameSpacingCalculator } from './foundationless-frame-spacing/Component';
import { FrameCountByConfigCalculator } from './frame-count-by-config/Component';
import { FrameCoveragePercentCalculator } from './frame-coverage-percent/Component';
import { GraftAcceptanceRateCalculator } from './graft-acceptance-rate/Component';
import { HarvestEstimatorCalculator } from './harvest-estimator/Component';
import { HiveBalancingCalculator } from './hive-balancing/Component';
import { HivePopulationEstimatorCalculator } from './hive-population-estimator/Component';
import { HiveStandHeightFootprintCalculator } from './hive-stand-height-footprint/Component';
import { HiveStrengthGradingCalculator } from './hive-strength-grading/Component';
import { HoneyBottlingCalculator } from './honey-bottling/Component';
import { HoneyDensityWeightConverterCalculator } from './honey-density-weight-converter/Component';
import { HoneyJarCasePackCalculator } from './honey-jar-case-pack/Component';
import { HoneyMoistureCorrectionCalculator } from './honey-moisture-correction/Component';
import { HoneyRevenueCalculator } from './honey-revenue/Component';
import { HoneySettlingTankSizeCalculator } from './honey-settling-tank-size/Component';
import { HowMuchHoneyCanIExpectCalculator } from './how-much-honey-can-i-expect/Component';
import { InbreedingRiskLineageCalculator } from './inbreeding-risk-lineage/Component';
import { InspectionIntervalCalculator } from './inspection-interval/Component';
import { InspectionNoteToScoreCalculator } from './inspection-note-to-score/Component';
import { InspectionRecommendationEngineCalculator } from './inspection-recommendation-engine/Component';
import { InventoryValueCalculator } from './inventory-value/Component';
import { JarInventoryPlannerCalculator } from './jar-inventory-planner/Component';
import { JarLabelQuantityCalculator } from './jar-label-quantity/Component';
import { LaborCostCalculator } from './labor-cost/Component';
import { LandAreaCoverageCalculator } from './land-area-coverage/Component';
import { LangstrothBoxVolumeCalculator } from './langstroth-box-volume/Component';
import { LipBalmSoapBatchCalculator } from './lip-balm-soap-batch/Component';
import { LocalBloomCalendarCalculator } from './local-bloom-calendar/Component';
import { MainFlowCountdownCalculator } from './main-flow-countdown/Component';
import { MatingWindowCalculator } from './mating-window/Component';
import { MetricImperialConverterCalculator } from './metric-imperial-converter/Component';
import { MigratoryRouteProfitabilityCalculator } from './migratory-route-profitability/Component';
import { MiteDropTrendCalculator } from './mite-drop-trend/Component';
import { MoistureShrinkLossCalculator } from './moisture-shrink-loss/Component';
import { MoistureTemperatureLogCalculator } from './moisture-temperature-log/Component';
import { MouseGuardOpeningCalculator } from './mouse-guard-opening/Component';
import { MultipleHiveTotalizerCalculator } from './multiple-hive-totalizer/Component';
import { NailScrewMaterialCalculator } from './nail-screw-material/Component';
import { NectarPotentialCalculator } from './nectar-potential/Component';
import { NucBuildUpCalculator } from './nuc-build-up/Component';
import { NucShipmentPlanningCalculator } from './nuc-shipment-planning/Component';
import { OavDosingCalculator } from './oav-dosing/Component';
import { OverwinteringReadinessCalculator } from './overwintering-readiness/Component';
import { PackageBeeVsNucCalculator } from './package-bee-vs-nuc/Component';
import { PaintStainQuantityCalculator } from './paint-stain-quantity/Component';
import { PalletLoadingCalculator } from './pallet-loading/Component';
import { PlantingCalculatorPollinatorCalculator } from './planting-calculator-pollinator/Component';
import { PollenHarvestCalculator } from './pollen-harvest/Component';
import { PollenPattyBatchCalculator } from './pollen-patty-batch/Component';
import { PollinationContractPricingCalculator } from './pollination-contract-pricing/Component';
import { PollinationDeploymentPlannerCalculator } from './pollination-deployment-planner/Component';
import { PollinationRevenueCalculator } from './pollination-revenue/Component';
import { PropolisYieldValueCalculator } from './propolis-yield-value/Component';
import { ProteinNeedEstimatorCalculator } from './protein-need-estimator/Component';
import { QueenBankCapacityCalculator } from './queen-bank-capacity/Component';
import { QueenCageCandyCalculator } from './queen-cage-candy/Component';
import { QueenProductionProfitabilityCalculator } from './queen-production-profitability/Component';
import { QueenRearingTimelineCalculator } from './queen-rearing-timeline/Component';
import { QueenReplacementTimingCalculator } from './queen-replacement-timing/Component';
import { QueenrightnessCheckerCalculator } from './queenrightness-checker/Component';
import { ReplacementCostWinterLossesCalculator } from './replacement-cost-winter-losses/Component';
import { ResistanceRotationPlannerCalculator } from './resistance-rotation-planner/Component';
import { RetailPricingCalculator } from './retail-pricing/Component';
import { RoiCalculator } from './roi/Component';
import { RoyalJellyProductionCalculator } from './royal-jelly-production/Component';
import { ShadeSunExposureCalculator } from './shade-sun-exposure/Component';
import { SmallHiveBeetleTrapCalculator } from './small-hive-beetle-trap/Component';
import { SplitPlanningCalculator } from './split-planning/Component';
import { SpringBuildupCalculator } from './spring-buildup/Component';
import { StorageSpaceCalculator } from './storage-space/Component';
import { SugarSyrupCalculator } from './sugar-syrup/Component';
import { SuperAdditionTimingCalculator } from './super-addition-timing/Component';
import { SuperRequirementCalculator } from './super-requirement/Component';
import { SwarmRiskCalculator } from './swarm-risk/Component';
import { SyrupConcentrationConverterCalculator } from './syrup-concentration-converter/Component';
import { ThresholdActionCalculator } from './threshold-action/Component';
import { TrailerCapacityCalculator } from './trailer-capacity/Component';
import { TransportLoadPollinationCalculator } from './transport-load-pollination/Component';
import { TravelSurchargeCalculator } from './travel-surcharge/Component';
import { TreatmentCostCalculator } from './treatment-cost/Component';
import { TreatmentTimingCalculator } from './treatment-timing/Component';
import { VarroaGrowthProjectionCalculator } from './varroa-growth-projection/Component';
import { VarroaInfestationRateCalculator } from './varroa-infestation-rate/Component';
import { VentilationCalculator } from './ventilation/Component';
import { WaterRequirementEstimatorCalculator } from './water-requirement-estimator/Component';
import { WaxMothRiskCalculator } from './wax-moth-risk/Component';
import { WaxRenderingYieldCalculator } from './wax-rendering-yield/Component';
import { WeatherLinkedNectarFlowCalculator } from './weather-linked-nectar-flow/Component';
import { WhatJarPriceShouldIChargeCalculator } from './what-jar-price-should-i-charge/Component';
import { WholesaleVsRetailCalculator } from './wholesale-vs-retail/Component';
import { WindbreakCalculator } from './windbreak/Component';
import { WinterLossReplacementCalculator } from './winter-loss-replacement/Component';
import { WinterStoresCalculator } from './winter-stores/Component';
import { WrappingInsulationCalculator } from './wrapping-insulation/Component';
import { YieldPerHiveBenchmarkCalculator } from './yield-per-hive-benchmark/Component';

export const calculatorComponents: Record<string, React.ComponentType> = {
  'apiary-carrying-capacity': ApiaryCarryingCapacityCalculator,
  'apiary-checklist-generator': ApiaryChecklistGeneratorCalculator,
  'apiary-comparison': ApiaryComparisonCalculator,
  'apiary-equipment-planner': ApiaryEquipmentPlannerCalculator,
  'apiary-kpi-dashboard': ApiaryKpiDashboardCalculator,
  'apiary-layout': ApiaryLayoutCalculator,
  'apiary-profit': ApiaryProfitCalculator,
  'apiary-total-feed': ApiaryTotalFeedCalculator,
  'apiary-wide-mite-dashboard': ApiaryWideMiteDashboardCalculator,
  'batch-scaling': BatchScalingCalculator,
  'bee-forage-radius': BeeForageRadiusCalculator,
  'beekeeping-budget': BeekeepingBudgetCalculator,
  'beginner-hive-setup': BeginnerHiveSetupCalculator,
  'break-even': BreakEvenCalculator,
  'breeder-selection-scorecard': BreederSelectionScorecardCalculator,
  'brood-area': BroodAreaCalculator,
  'brood-break-effect': BroodBreakEffectCalculator,
  'brood-pattern-scoring': BroodPatternScoringCalculator,
  'can-i-split-this-hive': CanISplitThisHiveCalculator,
  'candle-yield': CandleYieldCalculator,
  'cappings-wax-yield': CappingsWaxYieldCalculator,
  'cash-flow-by-season': CashFlowBySeasonCalculator,
  'colony-growth-projection': ColonyGrowthProjectionCalculator,
  'colony-health-index': ColonyHealthIndexCalculator,
  'colony-scoring-sale-value': ColonyScoringSaleValueCalculator,
  'comb-honey-yield': CombHoneyYieldCalculator,
  'commercial-labor-scheduling': CommercialLaborSchedulingCalculator,
  'cost-per-hive': CostPerHiveCalculator,
  'custom-quote-builder': CustomQuoteBuilderCalculator,
  'date-interval': DateIntervalCalculator,
  'deadout-analysis': DeadoutAnalysisCalculator,
  'disease-symptom-scoring': DiseaseSymptomScoringCalculator,
  'do-i-need-to-feed': DoINeedToFeedCalculator,
  'drone-brood-removal-impact': DroneBroodRemovalImpactCalculator,
  'drone-saturation': DroneSaturationCalculator,
  'egg-to-emergence-timeline': EggToEmergenceTimelineCalculator,
  'electric-fence-requirement': ElectricFenceRequirementCalculator,
  'emergency-feeding': EmergencyFeedingCalculator,
  'expansion-planning': ExpansionPlanningCalculator,
  'extraction-day-planner': ExtractionDayPlannerCalculator,
  'extractor-load': ExtractorLoadCalculator,
  'fall-preparation': FallPreparationCalculator,
  'feed-cost': FeedCostCalculator,
  'feed-requirement': FeedRequirementCalculator,
  'fondant-recipe': FondantRecipeCalculator,
  'forage-gap': ForageGapCalculator,
  'foundation-sheet-requirement': FoundationSheetRequirementCalculator,
  'foundationless-frame-spacing': FoundationlessFrameSpacingCalculator,
  'frame-count-by-config': FrameCountByConfigCalculator,
  'frame-coverage-percent': FrameCoveragePercentCalculator,
  'graft-acceptance-rate': GraftAcceptanceRateCalculator,
  'harvest-estimator': HarvestEstimatorCalculator,
  'hive-balancing': HiveBalancingCalculator,
  'hive-population-estimator': HivePopulationEstimatorCalculator,
  'hive-stand-height-footprint': HiveStandHeightFootprintCalculator,
  'hive-strength-grading': HiveStrengthGradingCalculator,
  'honey-bottling': HoneyBottlingCalculator,
  'honey-density-weight-converter': HoneyDensityWeightConverterCalculator,
  'honey-jar-case-pack': HoneyJarCasePackCalculator,
  'honey-moisture-correction': HoneyMoistureCorrectionCalculator,
  'honey-revenue': HoneyRevenueCalculator,
  'honey-settling-tank-size': HoneySettlingTankSizeCalculator,
  'how-much-honey-can-i-expect': HowMuchHoneyCanIExpectCalculator,
  'inbreeding-risk-lineage': InbreedingRiskLineageCalculator,
  'inspection-interval': InspectionIntervalCalculator,
  'inspection-note-to-score': InspectionNoteToScoreCalculator,
  'inspection-recommendation-engine': InspectionRecommendationEngineCalculator,
  'inventory-value': InventoryValueCalculator,
  'jar-inventory-planner': JarInventoryPlannerCalculator,
  'jar-label-quantity': JarLabelQuantityCalculator,
  'labor-cost': LaborCostCalculator,
  'land-area-coverage': LandAreaCoverageCalculator,
  'langstroth-box-volume': LangstrothBoxVolumeCalculator,
  'lip-balm-soap-batch': LipBalmSoapBatchCalculator,
  'local-bloom-calendar': LocalBloomCalendarCalculator,
  'main-flow-countdown': MainFlowCountdownCalculator,
  'mating-window': MatingWindowCalculator,
  'metric-imperial-converter': MetricImperialConverterCalculator,
  'migratory-route-profitability': MigratoryRouteProfitabilityCalculator,
  'mite-drop-trend': MiteDropTrendCalculator,
  'moisture-shrink-loss': MoistureShrinkLossCalculator,
  'moisture-temperature-log': MoistureTemperatureLogCalculator,
  'mouse-guard-opening': MouseGuardOpeningCalculator,
  'multiple-hive-totalizer': MultipleHiveTotalizerCalculator,
  'nail-screw-material': NailScrewMaterialCalculator,
  'nectar-potential': NectarPotentialCalculator,
  'nuc-build-up': NucBuildUpCalculator,
  'nuc-shipment-planning': NucShipmentPlanningCalculator,
  'oav-dosing': OavDosingCalculator,
  'overwintering-readiness': OverwinteringReadinessCalculator,
  'package-bee-vs-nuc': PackageBeeVsNucCalculator,
  'paint-stain-quantity': PaintStainQuantityCalculator,
  'pallet-loading': PalletLoadingCalculator,
  'planting-calculator-pollinator': PlantingCalculatorPollinatorCalculator,
  'pollen-harvest': PollenHarvestCalculator,
  'pollen-patty-batch': PollenPattyBatchCalculator,
  'pollination-contract-pricing': PollinationContractPricingCalculator,
  'pollination-deployment-planner': PollinationDeploymentPlannerCalculator,
  'pollination-revenue': PollinationRevenueCalculator,
  'propolis-yield-value': PropolisYieldValueCalculator,
  'protein-need-estimator': ProteinNeedEstimatorCalculator,
  'queen-bank-capacity': QueenBankCapacityCalculator,
  'queen-cage-candy': QueenCageCandyCalculator,
  'queen-production-profitability': QueenProductionProfitabilityCalculator,
  'queen-rearing-timeline': QueenRearingTimelineCalculator,
  'queen-replacement-timing': QueenReplacementTimingCalculator,
  'queenrightness-checker': QueenrightnessCheckerCalculator,
  'replacement-cost-winter-losses': ReplacementCostWinterLossesCalculator,
  'resistance-rotation-planner': ResistanceRotationPlannerCalculator,
  'retail-pricing': RetailPricingCalculator,
  'roi': RoiCalculator,
  'royal-jelly-production': RoyalJellyProductionCalculator,
  'shade-sun-exposure': ShadeSunExposureCalculator,
  'small-hive-beetle-trap': SmallHiveBeetleTrapCalculator,
  'split-planning': SplitPlanningCalculator,
  'spring-buildup': SpringBuildupCalculator,
  'storage-space': StorageSpaceCalculator,
  'sugar-syrup': SugarSyrupCalculator,
  'super-addition-timing': SuperAdditionTimingCalculator,
  'super-requirement': SuperRequirementCalculator,
  'swarm-risk': SwarmRiskCalculator,
  'syrup-concentration-converter': SyrupConcentrationConverterCalculator,
  'threshold-action': ThresholdActionCalculator,
  'trailer-capacity': TrailerCapacityCalculator,
  'transport-load-pollination': TransportLoadPollinationCalculator,
  'travel-surcharge': TravelSurchargeCalculator,
  'treatment-cost': TreatmentCostCalculator,
  'treatment-timing': TreatmentTimingCalculator,
  'varroa-growth-projection': VarroaGrowthProjectionCalculator,
  'varroa-infestation-rate': VarroaInfestationRateCalculator,
  'ventilation': VentilationCalculator,
  'water-requirement-estimator': WaterRequirementEstimatorCalculator,
  'wax-moth-risk': WaxMothRiskCalculator,
  'wax-rendering-yield': WaxRenderingYieldCalculator,
  'weather-linked-nectar-flow': WeatherLinkedNectarFlowCalculator,
  'what-jar-price-should-i-charge': WhatJarPriceShouldIChargeCalculator,
  'wholesale-vs-retail': WholesaleVsRetailCalculator,
  'windbreak': WindbreakCalculator,
  'winter-loss-replacement': WinterLossReplacementCalculator,
  'winter-stores': WinterStoresCalculator,
  'wrapping-insulation': WrappingInsulationCalculator,
  'yield-per-hive-benchmark': YieldPerHiveBenchmarkCalculator,
};
