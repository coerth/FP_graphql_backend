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

      const calculateProbability = (totalType: number) => {
        if (drawCount > totalCards || totalType <= 0) {
          return 0; // Probability is zero if the number of draws or successes is invalid
        }
      
        // Calculate the probability of drawing zero of this type
        const probabilityOfZero = hypergeometric(drawCount, totalType, totalCards - totalType, 0);
        
        // Calculate the probability of drawing at least one of this type
        return 1 - probabilityOfZero;
      };
      

      return {
        totalCards,
        totalUniqueCards: deck.deckStats.totalUniqueCards,
        totalLands: calculateProbability(totalLands),
        totalCreatures: calculateProbability(totalCreatures),
        totalPlaneswalkers: calculateProbability(totalPlaneswalkers),
        totalArtifacts: calculateProbability(totalArtifacts),
        totalEnchantments: calculateProbability(totalEnchantments),
        totalInstants: calculateProbability(totalInstants),
        totalSorceries: calculateProbability(totalSorceries),
        oneDrops: calculateProbability(oneDrops),
        twoDrops: calculateProbability(twoDrops),
        threePlusDrops: calculateProbability(threePlusDrops),
      };
    } catch (error) {
      console.error("Error in drawProbabilities:", error);
      throw error;
    }
  }
};

export default statQueries;