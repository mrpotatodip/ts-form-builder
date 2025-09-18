import { formatDistanceToNow, format } from "date-fns";

export const dateToTimeAgo = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return formatDistanceToNow(date, {
    addSuffix: true,
  });
};

export const dateToFormat = (
  dateString: string,
  formatString: string = "dd/MM/yyyy hh:mm:ss"
) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return format(date, formatString);
};

export const dateToInputText = (
  dateString: string,
  formatString: string = "yyyy-MM-dd hh:mm:ss"
) => {
  if (!dateString) return "";
  console.log(
    format(new Date(dateString), formatString),
    " format(new Date(dateString), formatString)"
  );
  return format(new Date(dateString), formatString);
};
