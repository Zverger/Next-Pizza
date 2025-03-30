import { Api } from "@/shared/services/api-client";

export type MyParameters<T> = T extends (...args: any) => any
  ? Parameters<T>
  : never;
export type MyReturnType<T> = T extends (...args: any) => any
  ? ReturnType<T>
  : never;

type Unpromise<T> = T extends Promise<infer U> ? U : never;

export type UnpromiseReturnType<T> = Unpromise<MyReturnType<T>>;

type ValuesOf<T> = T[keyof T];

type TypeHasPropertyFields<Type, PropertyFields extends {}> = {
  [Property in keyof Type]: Type[Property] extends PropertyFields
    ? Property
    : never;
};

export type ConditionalKeysOf<
  Type,
  ConditionalPropertyFields extends {}
> = ValuesOf<TypeHasPropertyFields<Type, ConditionalPropertyFields>>;

type T = UnpromiseReturnType<
  (typeof Api)["products" | "ingredients"]["getAll"]
>;
