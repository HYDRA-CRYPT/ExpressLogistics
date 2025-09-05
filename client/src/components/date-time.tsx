import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DatePickerDemoProps {
  value: string; // ISO string from formData
  onChange: (value: string) => void; // callback to update formData
  allowTimeSelection?: boolean; // Make time selection optional
}

export default function DatePickerDemo({
  value,
  onChange,
  allowTimeSelection = true, // Default to true for backward compatibility
}: DatePickerDemoProps) {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : today
  );
  const [time, setTime] = useState<string | undefined>(
    value ? new Date(value).toISOString().slice(11, 16) : "10:00"
  );

  const timeSlots = [
    { time: "09:00", available: false },
    { time: "09:30", available: false },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: true },
    { time: "12:00", available: false },
    { time: "12:30", available: true },
    { time: "13:00", available: true },
    { time: "13:30", available: true },
    { time: "14:00", available: true },
    { time: "14:30", available: false },
    { time: "15:00", available: false },
    { time: "15:30", available: true },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
    { time: "17:00", available: true },
    { time: "17:30", available: true },
    { time: "18:00", available: true },
    { time: "18:30", available: true },
    { time: "19:00", available: true },
    { time: "19:30", available: true },
    { time: "20:00", available: true },
    { time: "20:30", available: true },
    { time: "21:00", available: true },
    { time: "21:30", available: true },
    { time: "22:00", available: true },
    { time: "22:30", available: true },
    { time: "23:00", available: true },
    { time: "23:30", available: true },
    { time: "24:00", available: true },
  ];

  const handleTimeSelect = (t: string) => {
    if (!date) return;
    setTime(t);

    const [hours, minutes] = t.split(":").map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);

    onChange(combined.toISOString()); // update formData
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate) return;
    setDate(newDate);

    if (!allowTimeSelection) {
      // If time selection is not allowed, use start of day
      const dateOnly = new Date(newDate);
      dateOnly.setHours(0, 0, 0, 0);
      onChange(dateOnly.toISOString());
      return;
    }

    setTime(undefined);
    // Reset time in formData if time was previously set
    if (value) onChange("");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative w-full max-w-[250px]">
          <Button
            type="button"
            variant="outline"
            mode="input"
            className="w-full justify-start text-left font-normal bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              <span className="text-zinc-900 dark:text-white">
                {format(date, "PPP")}{" "}
                {allowTimeSelection && time ? ` - ${time}` : ""}
              </span>
            ) : (
              <span className="text-zinc-500 dark:text-zinc-400">
                {allowTimeSelection ? "Pick a date and time" : "Pick a date"}
              </span>
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
        align="start"
      >
        <div className="flex max-sm:flex-col">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="p-2 sm:pe-5"
            disabled={[{ before: today }]}
          />
          {allowTimeSelection && (
            <div className="relative w-full max-sm:h-48 sm:w-40">
              <div className="absolute inset-0 py-4 max-sm:border-t border-zinc-200 dark:border-zinc-700">
                <ScrollArea className="h-full sm:border-s border-zinc-200 dark:border-zinc-700">
                  <div className="space-y-3">
                    <div className="flex h-5 shrink-0 items-center px-5">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {date ? format(date, "EEEE, d") : "Pick a date"}
                      </p>
                    </div>
                    <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                      {timeSlots.map(({ time: timeSlot, available }) => (
                        <Button
                          key={timeSlot}
                          variant={time === timeSlot ? "primary" : "outline"}
                          size="sm"
                          className={`w-full ${
                            time === timeSlot
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-transparent border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                          }`}
                          onClick={() => handleTimeSelect(timeSlot)}
                          disabled={!available}
                        >
                          {timeSlot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
