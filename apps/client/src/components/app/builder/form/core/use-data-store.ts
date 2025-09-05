import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { BuilderFields, BuilderFormDBs } from "./schema-core";

type BearStore = {
  fields: BuilderFields[];
  formDBs: BuilderFormDBs[];
  initializeData: (
    fields: BuilderFields[],
    formDBs: BuilderFormDBs[] | undefined
  ) => void;
  insertData: (item: BuilderFields) => void;
  updateBulkData: (fields: BuilderFields[], isDirty?: boolean) => void;
  deleteData: (id: string) => void;
  cleanUpData: () => void;
  isDirty: boolean;
};

export const useDataStore = create<BearStore>()(
  persist(
    (set, get) => ({
      fields: [],
      formDBs: [],
      initializeData: (fields, formDBs) =>
        set({ fields, formDBs, isDirty: false }),
      insertData: (item) =>
        set({ fields: [...get().fields, item], isDirty: true }),
      updateBulkData: (fields, isDirty = true) => {
        set({
          fields,
          ...(isDirty === true ? { isDirty: true } : {}),
        });
      },
      deleteData: (id) =>
        set({
          fields: get().fields.filter((item) => item.id !== id),
          isDirty: true,
        }),
      cleanUpData: () => set({ isDirty: false }),
      isDirty: false,
    }),
    {
      name: "betterforms", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
