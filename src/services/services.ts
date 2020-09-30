interface ICompStep {
  (curField: (number | null)[]): number;
}

const compStep: ICompStep = curField => {
  let next;
  do {
    next = Math.floor(Math.random() * 9);
  } while (curField[next] !== null);
  return next;
};

export default compStep;
