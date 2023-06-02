export function removeSpecialCharacters(str:string):string {
  const pattern = /[^\w\s\u0400-\u04FF.]/g;
  const underscored = str.replaceAll(/\s/g, '_');
  const noSpecialChars = underscored.replace(pattern, '');
  return noSpecialChars;
}
