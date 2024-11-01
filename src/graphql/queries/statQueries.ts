import Deck from "../../mongoose/models/Deck";
import { combinations } from 'mathjs';

function hypergeometric(drawCount: number, typeCount: number, nonTypeCount: number, successCount: number) {
  const totalPopulation = typeCount + nonTypeCount;
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
          one: 1 - calculateProbability(totalLands, 0),
          two: calculateProbability(totalLands, 2),
          three: calculateProbability(totalLands, 3)
        },
        totalCreatures: 1 - calculateProbability(totalCreatures, 0),
        totalPlaneswalkers: 1 - calculateProbability(totalPlaneswalkers, 0),
        totalArtifacts: 1 - calculateProbability(totalArtifacts, 0),
        totalEnchantments: 1 - calculateProbability(totalEnchantments, 0),
        totalInstants: 1 - calculateProbability(totalInstants, 0),
        totalSorceries: 1 - calculateProbability(totalSorceries, 0),
        oneDrops: 1 - calculateProbability(oneDrops, 0),
        twoDrops: 1 - calculateProbability(twoDrops, 0),
        threePlusDrops: 1 - calculateProbability(threePlusDrops, 0),
      };
    } catch (error) {
      console.error("Error in drawProbabilities:", error);
      throw error;
    }
  }
};

export default statQueries;
