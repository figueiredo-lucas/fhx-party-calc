import { Injectable } from '@angular/core';

/*
8 - 250 0.0982
7 - 240 0.1095
6 - 225 0.125
5 - 210 0.145
4 - 190 0.175
3 - 170 0.216
2 - 140 0.3
1 - 100 0
*/

const SHARING_PERCENTAGE = [0, 0.3, 0.216, 0.175, 0.145, 0.125, 0.1095, 0.0982];

@Injectable({
  providedIn: 'root'
})
export class PartyCalcService {

  constructor() { }

  factors = {
    exp: {
      upper: 1.04,
      lower: 0.94
    },
    avg: {
      upper: 1.02, // 1.02
      lower: 0.94  // 0.94
    },
    partyLevel: 0.055,
    sharingPerc: SHARING_PERCENTAGE
  }

  private calculateXp(baseExp: number, playerLevel: number, npcLevel: number, serverXpRate: number) {
    if (playerLevel < npcLevel) {
      return baseExp * serverXpRate * Math.pow(this.factors.exp.upper, ((npcLevel - 1) - playerLevel));
    }
    return baseExp * serverXpRate * Math.pow(this.factors.exp.lower, (playerLevel - (npcLevel - 1)));
  }

  private calculateAvgLevelFactor(playerLevel: number, avgPlayerLevel: number) {
    if (playerLevel > avgPlayerLevel) {
      return Math.pow(this.factors.avg.upper, (playerLevel - avgPlayerLevel))
    }
    return Math.pow(this.factors.avg.lower, (avgPlayerLevel - playerLevel))
  }

  // exported function
  calculatePartyXp(baseExp: number, playerLevel: number, npcLevel: number, avgPlayerLevel: number, numberOfMembers: number, partyLevel: number, serverXpRate: number) {
    console.log(this.factors.sharingPerc.map((s, i) => s * i));
    const expSharingPercentage = 1 - (this.factors.sharingPerc[numberOfMembers - 1] * (numberOfMembers - 1))
    const partyGrowthPercentage = 1 + (this.factors.partyLevel * (partyLevel - 1))

    return this.calculateXp(baseExp, playerLevel, npcLevel, serverXpRate)
      * expSharingPercentage
      * this.calculateAvgLevelFactor(playerLevel, avgPlayerLevel)
      * partyGrowthPercentage
  }
}
