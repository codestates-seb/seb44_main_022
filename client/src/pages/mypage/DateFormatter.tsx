interface DateFormatterProps {
  timestamp: string;
}

const DateFormatter = ({ timestamp }: DateFormatterProps) => {
  const formattedTimestamp = formatTimestamp(timestamp);
  return   <span>
    {formattedTimestamp}
    </span>;
};

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default DateFormatter;