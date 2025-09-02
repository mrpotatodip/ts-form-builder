// import { useAppForm } from "~/components/custom-form";

// import { OrganizationJsonSchema } from "shared";

// import { useCollectionQuery as useOrganizationCQ } from "~/services/collections/use-organizations-collection";

// export const useBuilderForm = () => {
//   const { create } = useOrganizationCQ();

//   const form = useAppForm({
//     defaultValues: {
//       name: "",
//       party_uuid: "ad5a0626-9b8a-460b-9bbd-960cf505e2ed",
//       status: "active",
//       author_party_uuid: "ad5a0626-9b8a-460b-9bbd-960cf505e2ed",
//     },
//     validators: {
//       onChange: OrganizationJsonSchema,
//     },
//     onSubmit: ({ value }) => {
//       create({
//         ...value,
//         status: "active" as "active",
//         uuid: "ad5a0626-9b8a-460b-9bbd-960cf505e2ed",
//         id: 0,
//         createdAt: String(new Date()),
//       });
//     },
//   });

//   return { form };
// };
