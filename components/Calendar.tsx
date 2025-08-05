import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";

type CalendarWithIconProps = {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
};

type CustomInputProps = {
  onClick?: () => void;
};

const CalendarWithIcon = ({
  startDate,
  setStartDate,
}: CalendarWithIconProps) => {
  const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ onClick }, ref) => (
      <button
        onClick={onClick}
        ref={ref}
        className="p-2 hover:bg-gray-200 rounded-full"
      >
        <Calendar className="w-4 h-4 p-0.5 cursor-pointer" />
      </button>
    )
  );

  CustomInput.displayName = "CustomInput";

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<CustomInput />}
      minDate={startDate}
      dateFormat="MMMM d, yyyy"
      popperPlacement="bottom"
    />
  );
};

export default CalendarWithIcon;
