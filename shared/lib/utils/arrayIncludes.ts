export const arrayIncludesAll = <Values>(arr: Values[], values: Values[]) =>
  values.every((v) => arr.includes(v));

export const arrayIncludesSome = <Values>(arr: Values[], values: Values[]) =>
  values.some((v) => arr.includes(v));
