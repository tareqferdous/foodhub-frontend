import { CartItem } from "@/types/cartTypes";

export const groupByProvider = (items: CartItem[]) => {
  return items.reduce(
    (acc, item) => {
      if (!acc[item.providerId]) {
        acc[item.providerId] = {
          providerId: item.providerId,
          providerName: item.providerName,
          items: [],
        };
      }

      acc[item.providerId].items.push(item);
      return acc;
    },
    {} as Record<
      string,
      { providerId: string; providerName: string; items: CartItem[] }
    >,
  );
};
