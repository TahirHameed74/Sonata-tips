import { ChannelStats, RankCriterion } from "@/types/ChannelStats";
import normalizeData from "./normalizeData";
import calculateWeightedScores from "./calculateWeightedScores";
import rankItems from "./rankChannels";

function sortChannels(channelStats: ChannelStats[]) {
  const criteria: RankCriterion[] = [
    { name: 'numberOfNotes', weight: .333 },
    { name: 'numberOfSongs', weight: .333 },
    { name: 'numberOfCurators', weight: .333 },
  ];

  const normalizedData = normalizeData(channelStats, criteria);
  const weightedScores = calculateWeightedScores(normalizedData, criteria);
  const rankedItems = rankItems(channelStats, weightedScores);

  return rankedItems;
}

export default sortChannels;
