export const shortUUID = (uuid: string) => {
  if (!uuid) return "";
  return `${uuid.slice(0, 4)}...${uuid.slice(-4)}`;
};
