import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiMapPin, FiEdit, FiTrash, FiCheck, FiX } from "react-icons/fi";
import InputField from "../../../components/common/InputField";
import { useState } from "react";

// Mock data with updated address structure
const mockAddresses = [
    {
        id: 1,
        label: "Home",
        address: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "USA",
        },
        phone: "555-123-4567",
        isDefault: true,
    },
    {
        id: 2,
        label: "Work",
        address: {
            street: "456 Office Rd",
            city: "Los Angeles",
            state: "CA",
            postalCode: "90001",
            country: "USA",
        },
        phone: "555-987-6543",
        isDefault: false,
    },
];

function Addresses() {
    const [addresses, setAddresses] = useState(mockAddresses);
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
    const [editAddress, setEditAddress] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            label: "",
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            phone: "",
        },
    });

    const onSubmit = (data) => {
        const formattedData = {
            label: data.label,
            address: {
                street: data.street,
                city: data.city,
                state: data.state,
                postalCode: data.postalCode,
                country: data.country,
            },
            phone: data.phone,
        };

        if (editAddress) {
            setAddresses(
                addresses.map((addr) =>
                    addr.id === editAddress.id
                        ? { ...addr, ...formattedData }
                        : addr
                )
            );
        } else {
            setAddresses([
                ...addresses,
                {
                    id: addresses.length + 1,
                    ...formattedData,
                    isDefault: false,
                },
            ]);
        }
        reset();
        setEditAddress(null);
        setIsAddressFormOpen(false);
    };

    const handleEdit = (address) => {
        setEditAddress(address);
        reset({
            label: address.label,
            street: address.address.street,
            city: address.address.city,
            state: address.address.state,
            postalCode: address.address.postalCode,
            country: address.address.country,
            phone: address.phone,
        });
        setIsAddressFormOpen(true);
    };

    const handleDelete = (id) => {
        setAddresses(addresses.filter((addr) => addr.id !== id));
    };

    const handleSetDefault = (id) => {
        setAddresses(
            addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
            }))
        );
    };

    const closeModal = () => {
        setIsAddressFormOpen(false);
        setEditAddress(null);
        reset();
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 sm:space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiMapPin size={20} /> Saved Addresses
                </h2>
                <button
                    onClick={() => setIsAddressFormOpen(true)}
                    className="bg-gray-800 text-white px-4 py-2 text-xs sm:text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md"
                >
                    Add Address
                </button>
            </div>
            {addresses.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-600 text-sm sm:text-base mb-2">
                        No addresses saved
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                        Add an address to see it here
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {addresses.map((address) => (
                        <motion.div
                            key={address.id}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 border border-gray-200 bg-white rounded-md shadow-sm space-y-2"
                        >
                            <div className="flex justify-between items-center">
                                <p className="text-sm sm:text-base font-medium text-gray-800">
                                    {address.label}
                                </p>
                                {address.isDefault && (
                                    <span className="flex items-center gap-1 text-green-600 text-xs sm:text-sm">
                                        <FiCheck size={16} /> Default
                                    </span>
                                )}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">
                                {address.address.street}, {address.address.city}
                                , {address.address.state}{" "}
                                {address.address.postalCode},{" "}
                                {address.address.country}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Phone: {address.phone}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(address)}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
                                >
                                    <FiEdit size={14} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(address.id)}
                                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-xs sm:text-sm"
                                >
                                    <FiTrash size={14} /> Delete
                                </button>
                                {!address.isDefault && (
                                    <button
                                        onClick={() =>
                                            handleSetDefault(address.id)
                                        }
                                        className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-xs sm:text-sm"
                                    >
                                        Set Default
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
            {isAddressFormOpen && (
                <div className="fixed inset-0 glass bg-opacity-30 flex items-start sm:items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white bg-opacity-50  backdrop-blur-md p-4 sm:p-6 w-full max-w-md sm:max-w-lg my-4 sm:my-0 shadow-lg border border-gray-300 border-opacity-20 relative"
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            <FiX size={20} />
                        </button>
                        <h3 className="text-lg sm:text-xl font-semibold uppercase text-gray-800 mb-4 tracking-wide">
                            {editAddress ? "Edit Address" : "Add Address"}
                        </h3>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField
                                    label="Label"
                                    name="label"
                                    register={register}
                                    errors={errors}
                                    rules={{ required: "Label is required" }}
                                />
                                <InputField
                                    label="Phone"
                                    name="phone"
                                    type="tel"
                                    register={register}
                                    errors={errors}
                                    rules={{
                                        required: "Phone number is required",
                                    }}
                                />
                            </div>
                            <InputField
                                label="Street"
                                name="street"
                                register={register}
                                errors={errors}
                                rules={{ required: "Street is required" }}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField
                                    label="City"
                                    name="city"
                                    register={register}
                                    errors={errors}
                                    rules={{ required: "City is required" }}
                                />
                                <InputField
                                    label="State"
                                    name="state"
                                    register={register}
                                    errors={errors}
                                    rules={{ required: "State is required" }}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField
                                    label="Postal Code"
                                    name="postalCode"
                                    register={register}
                                    errors={errors}
                                    rules={{
                                        required: "Postal code is required",
                                    }}
                                />
                                <InputField
                                    label="Country"
                                    name="country"
                                    register={register}
                                    errors={errors}
                                    rules={{ required: "Country is required" }}
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}

export default Addresses;
