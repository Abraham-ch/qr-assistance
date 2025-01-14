import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/styles/index.css';

function VanillaCalendar({ config, onDateSelect, ...attributes }) {
  const ref = useRef(null);
  const [calendar, setCalendar] = useState(null);

  useEffect(() => {
    if (!ref.current) return;

    const calendarConfig = {
      ...config,
      onClickDate(self, event) {
        const selectedDate = self.context.selectedDates[0];
        if (onDateSelect) {
          onDateSelect(selectedDate);
        }
        if (config?.onClickDate) {
          config.onClickDate(self, event);
        }
      }
    };

    setCalendar(new Calendar(ref.current, calendarConfig));
  }, [ref, config, onDateSelect]);

  useEffect(() => {
    if (!calendar) return;
    calendar.init();
  }, [calendar]);

  return <div {...attributes} ref={ref}></div>;
}

export default VanillaCalendar;
