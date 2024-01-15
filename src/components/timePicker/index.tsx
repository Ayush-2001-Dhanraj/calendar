import React from "react";

interface TimePickerProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedHour: string;
  selectedMinute: string;
  selectedPeriod: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  onChange,
  selectedHour,
  selectedMinute,
  selectedPeriod,
}) => {
  const hours: string[] = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes: string[] = Array.from({ length: 4 }, (_, i) =>
    (i * 15).toString().padStart(2, "0")
  );
  const periods: string[] = ["AM", "PM"];

  return (
    <>
      <select id="hours" name="hours" onChange={onChange} value={selectedHour}>
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>

      <select
        id="minutes"
        name="minutes"
        onChange={onChange}
        value={selectedMinute}
      >
        {minutes.map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>

      <select
        id="period"
        name="period"
        onChange={onChange}
        value={selectedPeriod}
      >
        {periods.map((period) => (
          <option key={period} value={period}>
            {period}
          </option>
        ))}
      </select>
    </>
  );
};

export default TimePicker;
