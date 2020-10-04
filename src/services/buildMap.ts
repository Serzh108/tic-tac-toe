interface IBuildMap {
  (fieldArr: (number | null)[]): any[];
}

const buildMap: IBuildMap = fieldArr => {
  const resultArr = [];
  const downArr = [];
  const upArr = [];

  for (let j = 0; j < 3; j++) {
    const rowArr = [];
    for (let i = j * 3; i < 3 * (j + 1); i++) rowArr.push([fieldArr[i], i]);
    resultArr.push(rowArr);

    const columnArr = [];
    for (let i = 0; i < 3; i++)
      columnArr.push([fieldArr[i * 3 + j], i * 3 + j]);
    resultArr.push(columnArr);

    downArr.push([fieldArr[j + j * 3], j + j * 3]);
    upArr.push([fieldArr[(j + 1) * 2], (j + 1) * 2]);
  }
  resultArr.push(downArr);
  resultArr.push(upArr.reverse());

  return resultArr;
};

export default buildMap;
