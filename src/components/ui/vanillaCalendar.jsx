import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

function VanillaCalendar({ config, ...attributes }) {
  const ref = useRef(null);
  const [calendar, setCalendar] = useState(null);

  useEffect(() => {
    if (!ref.current) return;
    setCalendar(new Calendar(ref.current, config));
  }, [ref, config]);

  useEffect(() => {
    if (!calendar) return;
    calendar.init();
  }, [calendar]);

  return <div {...attributes} ref={ref}></div>;
}

export default VanillaCalendar;
