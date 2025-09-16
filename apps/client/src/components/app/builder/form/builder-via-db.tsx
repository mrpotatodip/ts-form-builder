import { useCallback } from "react";

import { Fields } from "./core/schema-core";
import { BuilderFieldsInitValues } from "./core/schema-core";
import { useCollectionsDetail as useCollectionsFormsDetail } from "~/services/collections/forms-collection";

export const BuilderViaDB = () => {
  const { data, handleUpdate } = useCollectionsFormsDetail();

  const handleAddTo = useCallback(
    (type: Fields) => {
      const [{ json, ...updateValues }] = data;
      const payload = {
        ...updateValues,
        json: { fields: [...json.fields, BuilderFieldsInitValues(type)] },
      };
      handleUpdate(payload);
    },
    [data, handleUpdate],
  );

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="uppercase tracking-widest text-xs">Fields</h2>
      <div className="flex gap-4 flex-wrap mt-2">
        {Fields.map((item, index) => (
          <div
            key={index}
            onClick={() => handleAddTo(item.value)}
            className="relative bg-primary hover:bg-primary/90 text-accent dark:text-white rounded-sm py-1.5 px-4 cursor-pointer w-21 h-22"
          >
            <div className="absolute left-2 bottom-2">
              <p className="uppercase tracking-widest leading-3 text-sm">
                <small>{item.label}</small>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
