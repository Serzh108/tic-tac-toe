import BuildMap from './buildMap';

interface ICompStep {
  (curField: (number | null)[], currentGamer: number): number;
}

const compStep: ICompStep = (curField, currentGamer) => {
  let next;
  const CurrentMap = BuildMap(curField);
  const compGamer = currentGamer === 1 ? 2 : 1;
  // --== first step ==--
  const set1 = new Set(curField);
  if (set1.has(currentGamer) && !set1.has(compGamer)) {
    if (curField.indexOf(currentGamer) !== 4) return 4;
    else return 0;
  }
  // --== /first step ==--
  // --== second step ==--
  //  ------------ Can Comp win next step? -------------
  // nextWinStep(CurrentMap, compGamer);

  for (let i = 0; i < 8; i++) {
    const triadInit = CurrentMap[i];
    const triadItem = [triadInit[0][0], triadInit[1][0], triadInit[2][0]];
    const triadIndex = [triadInit[0][1], triadInit[1][1], triadInit[2][1]];
    const set0 = new Set(triadItem);
    if (set0.size === 2 && set0.has(null)) {
      const compGamerLength = triadItem.filter(item => item === compGamer)
        .length;
      if (compGamerLength === 2) {
        return triadIndex[triadItem.indexOf(null)];
      }
    }
  }
  //  ------------ /Can Comp win next step? -------------
  //  ------------ Can Player win next step? -------------
  // nextWinStep(CurrentMap, currentGamer);

  for (let i = 0; i < 8; i++) {
    const triadInit = CurrentMap[i];
    const triadItem = [triadInit[0][0], triadInit[1][0], triadInit[2][0]];
    const triadIndex = [triadInit[0][1], triadInit[1][1], triadInit[2][1]];
    const set0 = new Set(triadItem);
    if (set0.size === 2 && set0.has(null)) {
      const currentGamerLength = triadItem.filter(item => item === currentGamer)
        .length;
      if (currentGamerLength === 2) {
        return triadIndex[triadItem.indexOf(null)];
      }
    }
  }
  //  ------------ /Can Player win next step? -------------
  // --== /second step ==--
  // --== Player fork ==--
  const secondStep = curField.filter(item => item !== null).length;
  if (secondStep === 3) {
    if (curField[1] === currentGamer && curField[1] === curField[3]) return 0;
    if (curField[1] === currentGamer && curField[1] === curField[5]) return 2;
    if (curField[3] === currentGamer && curField[7] === curField[3]) return 6;
    if (curField[3] === currentGamer && curField[7] === curField[5]) return 8;
  }
  // --== /Player fork ==--
  // =======-- random choice --=======
  do {
    next = Math.floor(Math.random() * 9);
  } while (curField[next] !== null);
  return next;
};

export default compStep;
