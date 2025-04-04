import { useMemo } from "react";

/**
 * Группируем все уникальные значения поля 'contentField' из 'items' по полю "by" и мемоизирует это,
 * @example useSetGroupBy([{id:0, size:2, color: 'red'}, {id:0, size:1, color: 'red'}, {id:0, size:2, color:'blue'}],
 *                        'size', 'color') => {'1': Set(['blue']), '2': Set(['red', 'blue'])}
 * @param items
 * @param by
 * @param contentField
 * @returns {[id: items[by]] : Set<items[contentField] | null>}
 */

export const useSetGroupBy = <
  Items extends {},
  By extends keyof Items,
  Content extends Exclude<keyof Items, By>
>(
  items: Items[],
  by: By,
  contentField: Content
) => {
  return useMemo(
    () =>
      items.reduce<{
        [id: string]: Set<Items[Content] | null> | undefined;
      }>(
        (acc, item) =>
          item[by]
            ? acc[String(item[by])]
              ? (acc[String(item[by])]?.add(item[contentField]), acc)
              : {
                  ...acc,
                  [String(item[by])]: new Set([item[contentField]]),
                }
            : acc,
        {}
      ),
    [items, by, contentField]
  );
};
