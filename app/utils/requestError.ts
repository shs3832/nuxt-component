export const isAbortError = (error: unknown) => {
  return error instanceof DOMException && error.name === "AbortError";
};
