export const getFirstErroredOptionIndex = (
  optionErrors: readonly unknown[] | undefined,
) => optionErrors?.findIndex(Boolean) ?? -1;
