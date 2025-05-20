import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiMapPin, FiEdit, FiTrash, FiCheck, FiX } from "react-icons/fi";
import InputField from "../../../components/common/InputField";
import { useState, useEffect } from "react";

// Mock data with Indian addresses
const mockAddresses = [
    {
        id: 1,
        label: "Home",
        address: {
            street: "Flat 101, Sai Residency, Banjara Hills",
            city: "Hyderabad",
            state: "Telangana",
            postalCode: "500034",
            country: "India",
        },
        phone: "9876543210",
        isDefault: true,
    },
    {
        id: 2,
        label: "Work",
        address: {
            street: "Office No. 305, Prestige Towers, MG Road",
            city: "Bengaluru",
            state: "Karnataka",
            postalCode: "560001",
            country: "India",
        },
        phone: "8765432109",
        isDefault: false,
    },
];

function Addresses() {
    const [addresses, setAddresses] = useState(mockAddresses);
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
    const [editAddress, setEditAddress] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState(null);
    const [hasFormChanged, setHasFormChanged] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
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

    // Watch form values to detect changes
    const formValues = watch();

    useEffect(() => {
        if (editAddress) {
            const initialValues = {
                label: editAddress.label,
                street: editAddress.address.street,
                city: editAddress.address.city,
                state: editAddress.address.state,
                postalCode: editAddress.address.postalCode,
                country: editAddress.address.country,
                phone: editAddress.phone,
            };

            const hasChanged = Object.keys(initialValues).some(
                (key) => formValues[key] !== initialValues[key]
            );
            setHasFormChanged(hasChanged);
        } else {
            const hasValues = Object.values(formValues).some(
                (value) => value !== ""
            );
            setHasFormChanged(hasValues);
        }
    }, [formValues, editAddress]);

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
        setHasFormChanged(false);
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

    const handleDeleteClick = (id) => {
        setAddressToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setAddresses(addresses.filter((addr) => addr.id !== addressToDelete));
        setIsDeleteModalOpen(false);
        setAddressToDelete(null);
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setAddressToDelete(null);
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
        setHasFormChanged(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-8"
        >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiMapPin size={20} /> Saved Addresses
                </h2>
                <button
                    onClick={() => setIsAddressFormOpen(true)}
                    className="bg-gray-800 text-white px-4 py-2 text-xs sm:text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full sm:w-auto"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {addresses.map((address) => (
                        <motion.div
                            key={address.id}
                            whileHover={{ scale: 1.02 }}
                            className="relative h-48 p-4 sm:p-5 border border-gray-200 bg-white rounded-md shadow-sm space-y-2 overflow-hidden"
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
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                                {address.address.street}, {address.address.city}
                                , {address.address.state}{" "}
                                {address.address.postalCode},{" "}
                                {address.address.country}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Phone: {address.phone}
                            </p>
                            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                <button
                                    onClick={() => handleEdit(address)}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
                                >
                                    <FiEdit size={14} /> Edit
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteClick(address.id)
                                    }
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
                        className="bg-white bg-opacity-50 backdrop-blur-md p-4 sm:p-6 w-full max-w-md sm:max-w-lg my-4 sm:my-0 shadow-lg border border-gray-300 border-opacity-20 rounded-lg relative"
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
                                        pattern: {
                                            value: /^[6-9]\d{9}$/,
                                            message:
                                                "Enter a valid Indian phone number (10 digits, starting with 6-9)",
                                        },
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
                                        pattern: {
                                            value: /^\d{6}$/,
                                            message:
                                                "Enter a valid 6-digit postal code",
                                        },
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
                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="submit"
                                    disabled={!hasFormChanged}
                                    className={`px-4 py-2 text-xs sm:text-sm uppercase transition-colors duration-200 shadow-md w-full sm:w-auto ${
                                        hasFormChanged
                                            ? "bg-gray-800 text-white hover:bg-gray-700"
                                            : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    }`}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 text-xs sm:text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 glass bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white bg-opacity-50 backdrop-blur-md p-4 sm:p-6 w-full max-w-sm shadow-lg border border-gray-300 border-opacity-20 rounded-lg"
                    >
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                            Confirm Deletion
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base mb-6">
                            Are you sure you want to delete this address? This
                            action cannot be undone.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 text-white px-4 py-2 text-xs sm:text-sm uppercase hover:bg-red-700 transition-colors duration-200 shadow-md w-full sm:w-auto"
                            >
                                Delete
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-200 text-gray-800 px-4 py-2 text-xs sm:text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}

export default Addresses;
