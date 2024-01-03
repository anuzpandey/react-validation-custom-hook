import React, {useState} from "react"
import InputField from "./components/InputField.tsx"
import SelectField from "./components/SelectField.tsx"
import CheckBoxField from "./components/CheckBoxField.tsx"
import RadioField from "./components/RadioField.tsx"

type FormData = {
    firstName: string
    lastName: string
    email: string
    country: string
    streetAddress: string
    notificationBy: string[]
    gender: string
}

export default function App() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        streetAddress: "",
        notificationBy: [],
        gender: "",
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target
        const value = target.value
        const name = target.name

        // Checkbox
        if (target.type === 'checkbox') {
            const checked = (target as HTMLInputElement).checked

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            let checkedValues = formData[name] as string[]

            if (checked) {
                checkedValues.push(value)
            } else {
                checkedValues = checkedValues.filter((item) => item !== value)
            }

            setFormData((prevState) => {
                return {
                    ...prevState,
                    [name]: checkedValues,
                }
            })

            return
        }

        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }


    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-8 md:px-12">

                <form className="">
                    <div className="space-y-12">

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <InputField
                                    className="sm:col-span-3"
                                    label="First name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    rules={{
                                        max_length: 10,
                                        min_length: 5,
                                        required: true,
                                    }}
                                />

                                <InputField
                                    className="sm:col-span-3"
                                    label="Last name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    rules={{
                                        max_length: 10,
                                        min_length: 5,
                                        required: true,
                                    }}
                                />

                                <InputField
                                    className="sm:col-span-6"
                                    label="Email address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    type="email"
                                    required
                                    rules={{
                                        email: true,
                                        required: true,
                                    }}
                                />

                                <SelectField
                                    className="sm:col-span-6"
                                    label="Country / Region"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    values={["United States", "Canada", "Mexico"]}
                                    required
                                />

                                <InputField
                                    className="sm:col-span-6"
                                    label="Street address"
                                    name="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={handleInputChange}
                                />


                                <CheckBoxField
                                    className="sm:col-span-6"
                                    label="Notification by"
                                    name="notificationBy"
                                    value={formData.notificationBy}
                                    onChange={handleInputChange}
                                    values={[
                                        {label: "Email", value: "by-email"},
                                        {label: "SMS", value: "by-sms"},
                                    ]}
                                />

                                <RadioField
                                    className="sm:col-span-6"
                                    label="Gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    values={[
                                        {label: "Male", value: "male"},
                                        {label: "Female", value: "female"},
                                        {label: "Others", value: "others"},
                                    ]}
                                />

                            </div>
                        </div>

                    </div>


                    <div className="mt-6 flex items-center justify-end gap-x-4">
                        <button
                            type="button"
                            className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
