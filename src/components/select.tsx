import { Loader } from "lucide-react";
import { useMemo } from "react";
import Select, { SingleValue } from "react-select";

type Props = {
  onChange: (value?: string) => void;
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
  isLoading?: boolean;
};

export const PSelect = ({
  value,
  onChange,
  disabled,
  options = [],
  placeholder,
  isLoading,
}: Props) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);
  return (
    <Select
      placeholder={placeholder}
      className="text-sm h-10 dark:text-black shadow-sm border-input rounded-md"
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#157C7B",
        },
      })}
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: "6px",
        }),
        indicatorSeparator: (base) => ({
          ...base,
          display: "none",
        }),
      }}
      components={{
        LoadingIndicator: () =>
          isLoading ? (
            <Loader className="size-3.5 animate-spin text-primary" />
          ) : null,
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      isDisabled={disabled}
      isLoading={isLoading}
    />
  );
};
