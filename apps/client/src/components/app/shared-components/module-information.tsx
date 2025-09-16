export const ModuleInformation = ({
  mode,
  name,
  description,
}: {
  mode?: string;
  name: string;
  description: string;
}) => {
  return (
    <div>
      {mode && (
        <p className="uppercase tracking-widest text-sm mb-2 text-primary/70">
          <small>{mode}</small>
        </p>
      )}
      <h1 className="tracking-wider text-xl font-semibold text-primary">
        {name}
      </h1>
      <p className="tracking-wider text-xs">{description}</p>
    </div>
  );
};
