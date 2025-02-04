function TriggerButton() {
  return (
    <button
      className="mt-4 flex items-center rounded text-blue-500 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      onClick={() => setIsExpanded(!isExpanded)}
      aria-expanded={isExpanded}
    >
      {isExpanded ? (
        <>
          <ChevronUp className="mr-2 h-4 w-4" />
          Hide details
        </>
      ) : (
        <>
          <ChevronDown className="mr-2 h-4 w-4" />
          Show details
        </>
      )}
    </button>
  );
}
