import useAddressList from "@/features/address/api/useAddressList";
import { Search } from "lucide-react";
import { useMemo } from "react";
import Select, { OptionProps, SingleValue, components } from "react-select";

type AddressSelectOptionType = {
  label: string;
  value: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

type Props = {
  onChange: (value?: string) => void;
  value?: string | null | undefined;
};

const Option = (props: OptionProps<AddressSelectOptionType>) => {
  return (
    <div className="flex flex-col m-4 rounded-md">
      <components.Option {...props} className="rounded-md">
        <span>
          {props.data.first_name} {props.data.last_name}
        </span>
        <div className="flex gap-2 items-center">
          <span className="underline">{props.data.email}</span>
          <span>{props.data.phone_number}</span>
        </div>
      </components.Option>
    </div>
  );
};
export const AddressBookSearch = ({ value, onChange }: Props) => {
  const onSelect = (option: SingleValue<AddressSelectOptionType>) => {
    onChange(option?.value);
  };

  const { data, isLoading } = useAddressList({ page: 1, search: "" });

  const addressOptions = data?.data.addresses.map((address) => ({
    label: address.first_name,
    value: address.id,
    first_name: address.first_name,
    last_name: address.last_name,
    email: address.email,
    phone_number: address.phone_number,
  }));

  const formattedValue = useMemo(() => {
    return addressOptions?.find((option) => option.value === value);
  }, [addressOptions, value]);
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
        components={{ Option }}
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
        isMulti={false}
        value={formattedValue}
        onChange={(newValue) => onSelect(newValue)}
        options={addressOptions}
        isDisabled={isLoading}
        isLoading={isLoading}
      />
    </div>
  );
};
