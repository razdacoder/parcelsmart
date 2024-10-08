import { Search } from "lucide-react";
import { useMemo } from "react";
import Select, { SingleValue } from "react-select";

type Props = {
  onChange: (value?: string) => void;
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
};

export const AddressBookSearch = ({
  value,
  onChange,
  disabled,
  options = [],
}: Props) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);
  return (
    <div className="relative">
      <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground z-10" />
      <Select
        placeholder="Search from address book"
        className="text-sm h-10 dark:text-black shadow-sm border-input bg-[#F4FDF8]"
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
            backgroundColor: "inherit",
            paddingInlineStart: "30px",
            borderRadius: "6px",
          }),
          indicatorSeparator: (base) => ({
            ...base,
            display: "none",
          }),
          dropdownIndicator: (base) => ({
            ...base,
            display: "none",
          }),
        }}
        value={formattedValue}
        onChange={onSelect}
        options={options}
        isDisabled={disabled}
      />
    </div>
  );
};
