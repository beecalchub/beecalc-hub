export interface HoneyRevenueInputs {
  jarSizeOz: number;
  jarCount: number;
  pricePerJar: number;
  wholesalePercent: number;
  wholesaleDiscount: number;
}

export interface HoneyRevenueResult {
  retailJars: number;
  wholesaleJars: number;
  retailRevenue: number;
  wholesaleRevenue: number;
  totalRevenue: number;
  avgRevenuePerJar: number;
  revenuePerLb: number;
}

export function calculateHoneyRevenue(inputs: HoneyRevenueInputs): HoneyRevenueResult {
  const { jarCount, pricePerJar, wholesalePercent, wholesaleDiscount, jarSizeOz } = inputs;

  const wholesaleJars = Math.round(jarCount * (wholesalePercent / 100));
  const retailJars = jarCount - wholesaleJars;

  const wholesalePrice = pricePerJar * (1 - wholesaleDiscount / 100);
  const retailRevenue = Math.round(retailJars * pricePerJar * 100) / 100;
  const wholesaleRevenue = Math.round(wholesaleJars * wholesalePrice * 100) / 100;
  const totalRevenue = Math.round((retailRevenue + wholesaleRevenue) * 100) / 100;
  const avgRevenuePerJar = jarCount > 0 ? Math.round((totalRevenue / jarCount) * 100) / 100 : 0;

  const totalLbs = (jarCount * jarSizeOz) / 16;
  const revenuePerLb = totalLbs > 0 ? Math.round((totalRevenue / totalLbs) * 100) / 100 : 0;

  return { retailJars, wholesaleJars, retailRevenue, wholesaleRevenue, totalRevenue, avgRevenuePerJar, revenuePerLb };
}
