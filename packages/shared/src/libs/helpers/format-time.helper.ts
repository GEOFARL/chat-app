import { format } from 'date-fns';

const formatTime = (time: Date) => {
  return format(time, 'h:mm a');
};

export { formatTime };
