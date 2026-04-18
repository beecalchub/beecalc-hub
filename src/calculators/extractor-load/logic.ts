export interface ExtractorLoadInputs { extractorFrameCapacity: number; totalFrames: number; frameType: 'deep' | 'medium' | 'shallow'; }
export interface ExtractorLoadResult { totalLoads: number; framesPerLoad: number; lastLoadFrames: number; estimatedHoneyPerLoadLbs: number; totalHoneyLbs: number; totalHoneyKg: number; balanceNote: string; }
const LBS_PER_FRAME: Record<string, number> = { deep: 8, medium: 5, shallow: 3.5 };
export function calculateExtractorLoad(inputs: ExtractorLoadInputs): ExtractorLoadResult {
  const { extractorFrameCapacity, totalFrames, frameType } = inputs;
  const totalLoads = Math.ceil(totalFrames / extractorFrameCapacity);
  const framesPerLoad = extractorFrameCapacity;
  const lastLoadFrames = totalFrames % extractorFrameCapacity || extractorFrameCapacity;
  const lbsPerFrame = LBS_PER_FRAME[frameType];
  const estimatedHoneyPerLoadLbs = Math.round(framesPerLoad * lbsPerFrame * 10) / 10;
  const totalHoneyLbs = Math.round(totalFrames * lbsPerFrame * 10) / 10;
  const balanceNote = lastLoadFrames < extractorFrameCapacity && lastLoadFrames < extractorFrameCapacity / 2 ? 'Last load is less than half full - balance extractor with empty frames to prevent wobbling.' : 'Loads are well balanced.';
  return { totalLoads, framesPerLoad, lastLoadFrames, estimatedHoneyPerLoadLbs, totalHoneyLbs, totalHoneyKg: Math.round(totalHoneyLbs * 0.4536 * 10) / 10, balanceNote };
}
