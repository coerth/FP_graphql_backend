import Deck from "../../mongoose/models/Deck";
import { combinations } from 'mathjs';

function hypergeometric(drawCount: number, typeCount: number, nonTypeCount: number, successCount: number) {
  const totalPopulation = typeCount + nonTypeCount;
  if (successCount > typeCount || drawCount - successCount > nonTypeCount) {
    return 0;
  }
  return (
    (combinations(typeCount, successCount) * combinations(nonTypeCount, drawCount - successCount)) /
    combinations(totalPopulation, drawCount)
  );
}

const statQueries = {
  drawProbabilities: async (_: any, { deckId, drawCount }: { deckId: string; drawCount: number }) => {
    try {
      const deck = await Deck.findById(deckId);
      if (!deck) {
        throw new Error('Deck not found');
      }

      const { totalCards, totalLands, totalCreatures, totalPlaneswalkers, totalArtifacts, totalEnchantments, totalInstants, totalSorceries, oneDrops, twoDrops, threePlusDrops } = deck.deckStats;

      const calculateProbability = (totalType: number, successCount: number) => {
        if (drawCount > totalCards || totalType <= 0) {
          return 0;
        }
        
        return hypergeometric(drawCount, totalType, totalCards - totalType, successCount);
      };

      return {
        totalCards,
        totalUniqueCards: deck.deckStats.totalUniqueCards,
        totalLands: {
          one: totalLands > 0 ? 1 - calculateProbability(totalLands, 0) : 0,
          two: totalLands > 1 ? calculateProbability(totalLands, 2) : 0,
          three: totalLands > 2 ? calculateProbability(totalLands, 3) : 0
        },
        totalCreatures: totalCreatures > 0 ? 1 - calculateProbability(totalCreatures, 0) : 0,
        totalPlaneswalkers: totalPlaneswalkers > 0 ? 1 - calculateProbability(totalPlaneswalkers, 0) : 0,
        totalArtifacts: totalArtifacts > 0 ? 1 - calculateProbability(totalArtifacts, 0) : 0,
        totalEnchantments: totalEnchantments > 0 ? 1 - calculateProbability(totalEnchantments, 0) : 0,
        totalInstants: totalInstants > 0 ? 1 - calculateProbability(totalInstants, 0) : 0,
        totalSorceries: totalSorceries > 0 ? 1 - calculateProbability(totalSorceries, 0) : 0,
        oneDrops: oneDrops > 0 ? 1 - calculateProbability(oneDrops, 0) : 0,
        twoDrops: twoDrops > 0 ? 1 - calculateProbability(twoDrops, 0) : 0,
        threePlusDrops: threePlusDrops > 0 ? 1 - calculateProbability(threePlusDrops, 0) : 0,
      };
    } catch (error) {
      console.error("Error in drawProbabilities:", error);
      throw error;
    }
  }
};

export default statQueries;