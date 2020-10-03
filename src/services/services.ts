interface ICompStep {
  (curField: (number | null)[], triad: (number | null)[]): number;
}

const compStep: ICompStep = (curField, triad = []) => {
  let next;
  // =======---=======
  const set1 = new Set(curField);
  if (set1.has(1) && !set1.has(2)) {
    if (curField.indexOf(1) !== 4) return 4;
    else return 0;
  }

  console.log('triad = ', triad);
  const set2 = new Set(triad);
  if (set2.size === 2 && set2.has(null)) {
    const cross = triad.filter(item => item === 1).length;
    const zero = triad.filter(item => item === 2).length;
    console.log('cross = ', cross);
    console.log('zero = ', zero);
    if (zero === 2) {
      console.log('zero -> null on # :', triad.indexOf(null));
      return triad.indexOf(null);
    }
    if (cross === 2) {
      console.log('cross -> null on # :', triad.indexOf(null));
      return triad.indexOf(null);
    }
  }

  // =======---=======
  do {
    next = Math.floor(Math.random() * 9);
  } while (curField[next] !== null);
  console.log('random = ', next);
  return next;
};

export default compStep;
