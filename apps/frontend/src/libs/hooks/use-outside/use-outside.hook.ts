import { useCallback, useEffect, useRef } from '~/libs/hooks/hooks.js';

const useOutside = ({
  isOpen,
  onClose,
  notTriggerElements,
}: {
  isOpen: boolean;
  onClose: () => void;
  notTriggerElements?: (HTMLElement | null)[];
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (
          !notTriggerElements ||
          notTriggerElements
            .map((element) => !element!.contains(event.target as Node))
            .every((v) => v)
        ) {
          onClose();
        }
      }
    },
    [onClose, notTriggerElements]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return ref;
};

export { useOutside };
