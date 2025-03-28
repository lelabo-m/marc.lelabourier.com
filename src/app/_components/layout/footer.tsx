export const Footer = () => {
  const buildDate = new Date();
  const formattedDate = buildDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  return (
    <footer className="mt-12 border-t border-gray-200 pt-6">
      <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between text-xs md:flex-row">
        <p>
          {"©"} {buildDate.getFullYear()}{" "}
          {"Marc Le Labourier. All rights reserved."}
        </p>
        <p className="mt-2 md:mt-0">
          {"Last updated:"} {formattedDate}
        </p>
      </div>
    </footer>
  );
};
