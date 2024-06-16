import { type ClassNameValue, twMerge } from 'tailwind-merge';

const getValidClassNames = (...inputs: ClassNameValue[]): string => {
  return twMerge(inputs);
};

export { getValidClassNames };
