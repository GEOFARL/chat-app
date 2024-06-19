const debounce = <F extends (...args: unknown[]) => void>(
  func: F,
  wait: number
): F => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisType<F>, ...args: Parameters<F>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  } as F;
};

export { debounce };
