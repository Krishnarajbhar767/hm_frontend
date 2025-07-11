import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import axiosInstance from "../../../utils/apiConnector";
import OfferForm from "./OfferForm";
import { toast } from "react-hot-toast";

/**
 * AdminOffers
 * — List existing offer (only one allowed)
 * — Create / Edit via modal
 * — Delete with confirmation
 */
export default function AdminOffers() {
    const [offer, setOffer] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [modalMode, setModalMode] = useState(null); // "create" | "edit" | null
    const [isDeleting, setIsDeleting] = useState(false);

    // Load the single offer on mount
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosInstance.get("/admin/offer");
                setOffer(data || null);
            } catch (err) {
                console.error(err);
                toast.error("Could not load offer.");
            } finally {
                setIsFetching(false);
            }
        })();
    }, []);

    /** Refreshes the offer from server */
    const reloadOffer = async () => {
        try {
            const { data } = await axiosInstance.get("/admin/offer");
            setOffer(data || null);
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * Handles both create and update
     * @param {object} formData
     */
    const onSave = async (formData) => {
        const isEdit = Boolean(offer);
        const toastId = toast.loading(isEdit ? "Updating…" : "Creating…");
        try {
            if (isEdit) {
                await axiosInstance.put(`/admin/offer/update`, formData);
                toast.success("Offer updated", { id: toastId });
            } else {
                await axiosInstance.post("/admin/offer/create", formData);
                toast.success("Offer created", { id: toastId });
            }
            setModalMode(null);
            reloadOffer();
        } catch (err) {
            console.error(err);
            toast.error("Failed to save.", { id: toastId });
        }
    };

    /** Deletes the current offer */
    const onDelete = async () => {
        setIsDeleting(true);
        const toastId = toast.loading("Deleting…");
        try {
            await axiosInstance.delete(`/admin/offer/${offer._id}`);
            toast.success("Offer deleted", { id: toastId });
            setOffer(null);
        } catch (err) {
            console.error(err);
            toast.error("Delete failed", { id: toastId });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Site Offer
                </h2>
                <button
                    onClick={() => setModalMode(offer ? "edit" : "create")}
                    className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    <FiPlus />
                    {offer ? "Edit" : "Add"}
                </button>
            </div>

            {/* Content */}
            {isFetching ? (
                <div className="animate-pulse space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
            ) : offer ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <strong>Discount:</strong> {offer.discount}%
                        </div>
                        <div>
                            <strong>Max Age:</strong> {offer.maxAge} hrs
                        </div>
                        <div>
                            <strong>Usage Limit:</strong> {offer.maxUsageLimit}
                        </div>
                        <div>
                            <strong>Status:</strong>{" "}
                            {offer.status ? "Active" : "Inactive"}
                        </div>
                        <div>
                            <strong>Created At:</strong>{" "}
                            {new Date(offer.createdAt).toLocaleString()}
                        </div>
                        <div>
                            {(() => {
                                const createdAt = new Date(
                                    offer.createdAt
                                ).getTime();
                                const maxAgeMs = offer.maxAge * 60 * 60 * 1000;
                                const isExpired =
                                    Date.now() > createdAt + maxAgeMs;
                                return (
                                    <>
                                        <strong>Expired:</strong>{" "}
                                        <span
                                            className={
                                                isExpired
                                                    ? "text-red-600"
                                                    : "text-green-600"
                                            }
                                        >
                                            {isExpired ? "Yes" : "No"}
                                        </span>
                                    </>
                                );
                            })()}
                        </div>
                    </div>

                    <button
                        onClick={() => setModalMode("delete")}
                        className="mt-4 flex items-center gap-1 text-red-600 hover:text-red-800"
                    >
                        <FiTrash2 /> Delete
                    </button>
                </motion.div>
            ) : (
                <p className="text-gray-600">No offer configured.</p>
            )}

            {/* Create/Edit Modal */}
            {modalMode === "create" || modalMode === "edit" ? (
                <div className="fixed inset-0 glass bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative"
                    >
                        <button
                            onClick={() => setModalMode(null)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            <FiX />
                        </button>
                        <h3 className="text-xl font-medium mb-4">
                            {offer ? "Edit Offer" : "Create Offer"}
                        </h3>
                        <OfferForm
                            defaultValues={offer || {}}
                            onSubmit={onSave}
                            onCancel={() => setModalMode(null)}
                        />
                    </motion.div>
                </div>
            ) : null}

            {/* Delete Confirmation */}
            {modalMode === "delete" && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white max-w-sm w-full rounded-lg shadow-lg p-6"
                    >
                        <h4 className="text-lg font-semibold mb-2">
                            Confirm Deletion
                        </h4>
                        <p className="mb-4 text-gray-700">
                            Are you sure you want to delete this offer? This
                            action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setModalMode(null)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting…" : "Delete"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
