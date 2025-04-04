import React from "react";
import { useForm, Controller } from "react-hook-form";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import MultiSelect from "../../../components/form/MultiSelect";
import Radio from "../../../components/form/input/Radio";
import Checkbox from "../../../components/form/input/Checkbox"; // Assuming this exists

const formJson = {
    register: {
      title: "Register",
      subtitle: "This is a registration form. Please enter your information.",
      group: [
        {
          title: "Full Name",
          items: [
            { title: "First Name", type: "text", required: true },
            { title: "Last Name", type: "text", required: true }
          ]
        },
        {
          title: "Additional Information",
          items: [
            {
              title: "Gender",
              type: "radio",
              required: true,
              options: [
                { value: "male", text: "Male" },
                { value: "female", text: "Female" },
                { value: "other", text: "Other" }
              ]
            },
            {
              title: "Country",
              type: "dropdown",
              required: true,
              options: [
                { value: "us", text: "United States" },
                { value: "in", text: "India" },
                { value: "uk", text: "United Kingdom" },
                { value: "au", text: "Australia" },
                { value: "other", text: "Other" }
              ]
            },
            {
              title: "Hobbies",
              type: "chips",
              required: false,
              options: [
                { value: "reading", text: "Reading" },
                { value: "traveling", text: "Traveling" },
                { value: "gaming", text: "Gaming" },
                { value: "cooking", text: "Cooking" },
                { value: "music", text: "Music" }
              ]
            },
            {
              title: "Languages Known",
              type: "checkbox",
              required: false,
              options: [
                { value: "english", text: "English" },
                { value: "hindi", text: "Hindi" },
                { value: "spanish", text: "Spanish" },
                { value: "french", text: "French" },
                { value: "german", text: "German" }
              ]
            }
          ]
        }
      ]
    }
  };  

type FormField = {
  title: string;
  type: "text" | "radio" | "dropdown" | "checkbox" | "chips";
  required?: boolean;
  options?: { value: string; text: string }[];
};

const GenerateView: React.FC = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log("Form Submitted:", data);
  };

  const renderField = (item: FormField, index: number) => {
    const key = `${item.title}-${index}`;

    switch (item.type) {
      case "text":
        return (
          <Controller
            key={key}
            name={item.title}
            control={control}
            rules={{ required: item.required }}
            render={({ field }) => (
              <div className="mb-5">
                <Label>{item.title}{item.required && <span className="text-red-500">*</span>}</Label>
                <Input
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={`Enter ${item.title}`}
                    />
              </div>
            )}
          />
        );

        case "dropdown":
            return (
              <Controller
                key={key}
                name={item.title}
                control={control}
                rules={{ required: item.required }}
                render={({ field, fieldState }) => {
                  const { error, isTouched } = fieldState;
          
                  let inputClasses =
                    "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30";
          
                  if (error) {
                    inputClasses +=
                      " border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800";
                  } else if (isTouched) {
                    inputClasses +=
                      " border-gray-300 focus:border-blue-300 focus:ring-blue-500/20 dark:text-blue-400 dark:border-blue-500 dark:focus:border-blue-800";
                  } else {
                    inputClasses +=
                      " bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800";
                  }
          
                  return (
                    <div className="mb-5">
                      <Label>
                        {item.title}
                        {item.required && <span className="text-red-500">*</span>}
                      </Label>
                      <select {...field} className={inputClasses}>
                        <option value="">Select an option</option>
                        {item.options?.map((option: { value: string; text: string }, idx) => (
                          <option key={`${key}-opt-${idx}`} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                      {error && (
                        <p className="mt-1 text-sm text-error-500 dark:text-error-400">
                          {error.message || "This field is required."}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            );
          

      case "radio":
        return (
          <div key={key} className="mb-5">
            <Label>{item.title}{item.required && <span className="text-red-500">*</span>}</Label>
            <Controller
              name={item.title}
              control={control}
              rules={{ required: item.required }}
              render={({ field }) => (
                <div className="flex flex-wrap gap-4">
                  {item.options?.map((option, idx) => (
                    <Radio
                    key={`${key}-radio-${idx}`}
                    id={`${key}-radio-${idx}`}
                    name={field.name}
                    value={option.value}
                    label={option.text}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                  />
                  ))}
                </div>
              )}
            />
          </div>
        );

      case "checkbox":
        return (
          <div key={key} className="mb-5">
            <Label>{item.title}</Label>
            <Controller
              name={item.title}
              control={control}
              render={({ field }) => {
                const selectedValues: string[] = field.value || [];

                const toggleValue = (val: string) => {
                  field.onChange(
                    selectedValues.includes(val)
                      ? selectedValues.filter(v => v !== val)
                      : [...selectedValues, val]
                  );
                };

                return (
                  <div className="flex flex-wrap gap-3">
                    {item.options?.map((option, idx) => (
                      <Checkbox
                      key={`${key}-chk-${idx}`}
                      label={option.text}
                      checked={selectedValues.includes(option.value)}
                      onChange={() => toggleValue(option.value)}
                    />
                    ))}
                  </div>
                );
              }}
            />
          </div>
        );

      case "chips":
        return (
          <div key={key} className="mb-5">
            <Label>{item.title}</Label>
            <Controller
              name={item.title}
              control={control}
              render={({ field }) => (
                <MultiSelect
                label=""
                    options={item.options || []}
                    defaultSelected={field.value || []}
                    onChange={field.onChange}
                    />
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto no-scrollbar p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col justify-center flex-1 w-full mx-auto">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">{formJson.register.title}</h4>
        <p className="mb-6 text-gray-600">{formJson.register.subtitle}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {formJson.register.group.map((group, groupIdx) => (
              <div key={`group-${groupIdx}`} className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">{group.title}</h5>
                {chunkArray(group.items, 2).map((chunk, chunkIdx) => (
                  <div
                    className="grid grid-cols-1 gap-x-6 lg:grid-cols-2"
                    key={`group-${groupIdx}-row-${chunkIdx}`}
                  >
                    {chunk.map((item, itemIdx) => (
                      <div className="sm:col-span-1" key={`${item.title}-${itemIdx}`}>
                        {renderField(item as FormField, itemIdx)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
  
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );  
};

export default GenerateView;
