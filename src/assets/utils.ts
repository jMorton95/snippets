import { type Item } from "./types";

export function searchDescriptions(param: string, obj: Item, acc: Item[] = []): Item[] {
  if (obj.description?.includes(param)) {
    acc.push({ ...obj, next: null });
  }

  if (obj.next !== null && obj.next.length > 0) {
    obj.next.forEach((x) => searchDescriptions(param, x, acc));
  }

  return [...acc];
}

export function flattenItems(obj: Item, acc: Item[] = []): Item[] {
  acc.push({ ...obj, next: null });

  if (obj.next !== null && obj.next.length > 0) {
    obj.next.forEach((x) => flattenItems(x, acc));
  }

  return [...acc];
}

export function findHeadings(obj: Item, acc: string[] = []): string[] {
  if (obj.heading) acc.push(obj.heading);

  if (obj.next !== null && obj.next.length > 0) {
    obj.next.forEach((x) => findHeadings(x, acc));
  }


  return [...acc];
}

// export function getDescriptions(obj: Item, acc: string[] = []): string[] {
//   if (obj.next !== null && obj.next.length > 0) {
//     obj.next.map((x) => getDescriptions(x, acc));
//   }

//   if (obj.description) {
//     acc.push(obj.description);
//   }

//   return [...acc];
// }

