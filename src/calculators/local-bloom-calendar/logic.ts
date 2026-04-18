export interface Inputs { region: 'northeast' | 'southeast' | 'midwest' | 'southwest' | 'northwest' | 'pacific'; }
export interface Result { blooms: Array<{ plant: string; start: string; peak: string }>; mainFlow: string; note: string; }
export function calculate(i: Inputs): Result {
  const data: Record<string, { blooms: Array<{ plant: string; start: string; peak: string }>; main: string }> = {
    northeast: { blooms: [{ plant: 'Dandelion', start: 'Apr', peak: 'May' }, { plant: 'Black locust', start: 'May', peak: 'Jun' }, { plant: 'White clover', start: 'May', peak: 'Jun' }, { plant: 'Basswood', start: 'Jun', peak: 'Jul' }, { plant: 'Goldenrod', start: 'Aug', peak: 'Sep' }], main: 'June-July' },
    southeast: { blooms: [{ plant: 'Tupelo', start: 'Mar', peak: 'Apr' }, { plant: 'Gallberry', start: 'Apr', peak: 'May' }, { plant: 'Clover', start: 'Apr', peak: 'Jun' }, { plant: 'Cotton', start: 'Jun', peak: 'Aug' }], main: 'April-June' },
    midwest: { blooms: [{ plant: 'Dandelion', start: 'Apr', peak: 'May' }, { plant: 'White clover', start: 'May', peak: 'Jul' }, { plant: 'Soybean', start: 'Jul', peak: 'Aug' }, { plant: 'Goldenrod', start: 'Aug', peak: 'Sep' }], main: 'May-August' },
    southwest: { blooms: [{ plant: 'Mesquite', start: 'Apr', peak: 'May' }, { plant: 'Citrus', start: 'Mar', peak: 'Apr' }, { plant: 'Cotton', start: 'Jun', peak: 'Aug' }, { plant: 'Alfalfa', start: 'Apr', peak: 'Oct' }], main: 'April-June' },
    northwest: { blooms: [{ plant: 'Big leaf maple', start: 'Mar', peak: 'Apr' }, { plant: 'Blackberry', start: 'May', peak: 'Jun' }, { plant: 'Fireweed', start: 'Jul', peak: 'Aug' }], main: 'May-July' },
    pacific: { blooms: [{ plant: 'Eucalyptus', start: 'Dec', peak: 'Mar' }, { plant: 'Almond', start: 'Feb', peak: 'Mar' }, { plant: 'Star thistle', start: 'Jun', peak: 'Aug' }, { plant: 'Sage', start: 'May', peak: 'Jun' }], main: 'February-August' },
  };
  const d = data[i.region];
  return { blooms: d.blooms, mainFlow: d.main, note: 'Verify exact timing with your local beekeeping association - elevation and microclimate matter.' };
}
