export interface ForageRadiusInputs {
  radiusMiles: number;
  colonyCount: number;
}

export interface ForageRadiusResult {
  radiusMiles: number;
  radiusKm: number;
  areaSqMiles: number;
  areaSqKm: number;
  areaAcres: number;
  areaHectares: number;
  acresPerColony: number;
  hectaresPerColony: number;
  competitionLevel: string;
}

export function calculateForageRadius(inputs: ForageRadiusInputs): ForageRadiusResult {
  const { radiusMiles, colonyCount } = inputs;
  const radiusKm = radiusMiles * 1.60934;
  const areaSqMiles = Math.PI * radiusMiles * radiusMiles;
  const areaSqKm = Math.PI * radiusKm * radiusKm;
  const areaAcres = areaSqMiles * 640;
  const areaHectares = areaSqKm * 100;
  const acresPerColony = colonyCount > 0 ? areaAcres / colonyCount : areaAcres;
  const hectaresPerColony = colonyCount > 0 ? areaHectares / colonyCount : areaHectares;

  let competitionLevel: string;
  if (acresPerColony > 500) competitionLevel = 'Very low competition - abundant forage per colony.';
  else if (acresPerColony > 200) competitionLevel = 'Low competition - good forage availability.';
  else if (acresPerColony > 80) competitionLevel = 'Moderate competition - monitor nectar flow.';
  else if (acresPerColony > 30) competitionLevel = 'High competition - consider reducing colony density or supplemental feeding.';
  else competitionLevel = 'Very high competition - likely forage stressed. Reduce colonies or relocate.';

  return {
    radiusMiles: Math.round(radiusMiles * 100) / 100,
    radiusKm: Math.round(radiusKm * 100) / 100,
    areaSqMiles: Math.round(areaSqMiles * 100) / 100,
    areaSqKm: Math.round(areaSqKm * 100) / 100,
    areaAcres: Math.round(areaAcres),
    areaHectares: Math.round(areaHectares),
    acresPerColony: Math.round(acresPerColony),
    hectaresPerColony: Math.round(hectaresPerColony),
    competitionLevel,
  };
}
