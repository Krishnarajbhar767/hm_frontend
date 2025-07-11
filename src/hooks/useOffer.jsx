// src/hooks/useOffer.js
import { useState, useEffect } from "react";
import axiosInstance from "../utils/apiConnector";

/**
 * Module‑scoped cache.
 * null = not yet fetched;
 * false = fetched & no active offer;
 * number = fetched & that percent discount
 */
let cachedDiscount = null;
/** Shared promise so concurrent hook calls only fire one network request */
let fetchPromise = null;

/**
 * useOffer
 * — returns either a Number (discount%) or false
 * — only fetches /admin/offer once until a full page reload
 */
export function useOffer() {
    // initialize to cachedDiscount if already fetched, else false
    const [discount, setDiscount] = useState(
        cachedDiscount === null ? false : cachedDiscount
    );

    useEffect(() => {
        // if we've already fetched, do nothing
        if (cachedDiscount !== null) return;

        // start request if not already in flight
        if (!fetchPromise) {
            fetchPromise = axiosInstance
                .get("/offer/")
                .then((res) => {
                    // assume success returns a number, else treat as no offer
                    const d =
                        typeof res.data.discount === "number"
                            ? res.data
                            : false;

                    cachedDiscount = d.discount;
                    return d.discount;
                })
                .catch(() => {
                    // on any error, treat as no offer
                    cachedDiscount = false;
                    return false;
                });
        }

        // when the promise resolves, update local state
        fetchPromise.then((d) => {
            console.log(d);
            setDiscount(d);
        });
    }, []);

    return discount;
}
