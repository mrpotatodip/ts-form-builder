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
      <h1 className="uppercase tracking-widest text-lg font-semibold text-primary">
        {name}
      </h1>
      <p className="uppercase tracking-widest text-xs">{description}</p>
    </div>
  );
};
