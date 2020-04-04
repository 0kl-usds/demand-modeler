export const getYMaxFromMaxCases = (maxCases: number): number =>
  Math.ceil(maxCases / 50) * 50;

export const formatNum = (labelValue: number) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

       ? parseFloat(String(Math.abs(Number(labelValue)) / 1.0e+9)).toFixed(1) + "B"
       // Six Zeroes for Millions
       : Math.abs(Number(labelValue)) >= 1.0e+6

       ? parseFloat(String(Math.abs(Number(labelValue)) / 1.0e+6)).toFixed(1) + "M"
       // Three Zeroes for Thousands
       : Math.abs(Number(labelValue)) >= 1.0e+3

       ? parseFloat(String(Math.abs(Number(labelValue)) / 1.0e+3)).toFixed(0) + "K"

       : Math.abs(Number(labelValue));

   }
