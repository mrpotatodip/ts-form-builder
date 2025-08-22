export const queryKeyFactory = {
  all: () => ["users"],
  lists: () => [...queryKeyFactory.all(), "list"],
  list: (filter: Record<string, any>) => [
    ...queryKeyFactory.lists(),
    { filter },
  ],
  details: () => [...queryKeyFactory.all(), "detail"],
  detail: (id: string | number) => [...queryKeyFactory.details(), { id }],
} as const;
