(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-sm font-medium leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/onboarding/components/step-location.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepLocation",
    ()=>StepLocation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$googlemaps$2f$js$2d$api$2d$loader$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@googlemaps/js-api-loader/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function StepLocation({ onComplete }) {
    _s();
    const [locationName, setLocationName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [addressInput, setAddressInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [predictions, setPredictions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [addressData, setAddressData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAddressSelected, setIsAddressSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mapsReady, setMapsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const autocompleteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const geocoderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StepLocation.useEffect": ()=>{
            const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$googlemaps$2f$js$2d$api$2d$loader$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Loader"]({
                apiKey: ("TURBOPACK compile-time value", "AIzaSyBsMBEZ4koZgET_TgXWIZgokptANLyiKgQ"),
                version: "weekly",
                libraries: [
                    "places"
                ]
            });
            loader.load().then({
                "StepLocation.useEffect": ()=>{
                    autocompleteRef.current = new google.maps.places.AutocompleteService();
                    geocoderRef.current = new google.maps.Geocoder();
                    setMapsReady(true);
                }
            }["StepLocation.useEffect"]);
        }
    }["StepLocation.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StepLocation.useEffect": ()=>{
            if (!mapsReady || !autocompleteRef.current || !addressInput || isAddressSelected) {
                if (!addressInput) setPredictions([]);
                return;
            }
            autocompleteRef.current.getPlacePredictions({
                input: addressInput,
                types: [
                    "address"
                ]
            }, {
                "StepLocation.useEffect": (results, status)=>{
                    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                        setPredictions(results.map({
                            "StepLocation.useEffect": (r)=>({
                                    place_id: r.place_id,
                                    description: r.description
                                })
                        }["StepLocation.useEffect"]));
                    } else {
                        setPredictions([]);
                    }
                }
            }["StepLocation.useEffect"]);
        }
    }["StepLocation.useEffect"], [
        addressInput,
        mapsReady,
        isAddressSelected
    ]);
    function selectPrediction(prediction) {
        setIsAddressSelected(true);
        setAddressInput(prediction.description);
        setPredictions([]);
        if (!geocoderRef.current) return;
        geocoderRef.current.geocode({
            placeId: prediction.place_id
        }, (results, status)=>{
            if (status !== "OK" || !results?.[0]) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Could not load address details. Please try another address.");
                return;
            }
            const result = results[0];
            const get = (type)=>result.address_components.find((c)=>c.types.includes(type))?.long_name ?? "";
            const getShort = (type)=>result.address_components.find((c)=>c.types.includes(type))?.short_name ?? "";
            setAddressData({
                address: [
                    get("street_number"),
                    get("route")
                ].filter(Boolean).join(" "),
                city: get("locality") || get("sublocality") || get("administrative_area_level_2"),
                state: getShort("administrative_area_level_1"),
                zip: get("postal_code"),
                lat: result.geometry.location.lat(),
                long: result.geometry.location.lng()
            });
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!locationName.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please enter a location name.");
            return;
        }
        if (!addressData) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please select an address from the suggestions.");
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/onboarding/location", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: locationName.trim(),
                    ...addressData,
                    geo_point: {
                        type: "Point",
                        coordinates: [
                            addressData.long,
                            addressData.lat
                        ]
                    }
                })
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error ?? "Failed to save location");
            }
            const data = await res.json();
            onComplete(data.screenId);
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err instanceof Error ? err.message : "Something went wrong");
        } finally{
            setIsSubmitting(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold",
                        children: "Add Your Location"
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-location.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground mt-1",
                        children: "Tell us about the location where you'll install your CETV screen."
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-location.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/onboarding/components/step-location.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        htmlFor: "locationName",
                        children: "Location Name"
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-location.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        id: "locationName",
                        placeholder: "e.g. Main Street Cafe",
                        value: locationName,
                        onChange: (e)=>setLocationName(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-location.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/onboarding/components/step-location.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        htmlFor: "address",
                        children: "Address"
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-location.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        id: "address",
                        placeholder: mapsReady ? "Start typing your address..." : "Loading...",
                        value: addressInput,
                        disabled: !mapsReady,
                        autoComplete: "off",
                        onChange: (e)=>{
                            setAddressInput(e.target.value);
                            setAddressData(null);
                            setIsAddressSelected(false);
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-location.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    addressData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground",
                        children: [
                            addressData.address,
                            addressData.city,
                            addressData.state,
                            addressData.zip
                        ].filter(Boolean).join(", ")
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-location.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this),
                    predictions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "absolute z-50 w-full bg-popover border border-border rounded-md shadow-md mt-1 max-h-60 overflow-auto",
                        children: predictions.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground",
                                onMouseDown: ()=>selectPrediction(p),
                                children: p.description
                            }, p.place_id, false, {
                                fileName: "[project]/app/onboarding/components/step-location.tsx",
                                lineNumber: 175,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-location.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/onboarding/components/step-location.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "submit",
                className: "w-full",
                disabled: isSubmitting || !mapsReady,
                children: isSubmitting ? "Saving..." : "Continue"
            }, void 0, false, {
                fileName: "[project]/app/onboarding/components/step-location.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/onboarding/components/step-location.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
_s(StepLocation, "EvvhSDMM9SA5GB3U4p81GtLtH7g=");
_c = StepLocation;
var _c;
__turbopack_context__.k.register(_c, "StepLocation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border bg-card text-card-foreground shadow", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 4,
        columnNumber: 119
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 125
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 10,
        columnNumber: 124
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 13,
        columnNumber: 130
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 16,
        columnNumber: 126
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 19,
        columnNumber: 125
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
const CardAction = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c12 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute right-6 top-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 22,
        columnNumber: 125
    }, ("TURBOPACK compile-time value", void 0)));
_c13 = CardAction;
CardAction.displayName = "CardAction";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
__turbopack_context__.k.register(_c12, "CardAction$React.forwardRef");
__turbopack_context__.k.register(_c13, "CardAction");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/onboarding/components/step-ad-mode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepAdMode",
    ()=>StepAdMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function StepAdMode({ onComplete }) {
    _s();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ad-supported");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function handleSubmit(mode) {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/onboarding/ad-mode", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    adServingMode: mode
                })
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error ?? "Failed to save ad mode");
            }
            onComplete();
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err instanceof Error ? err.message : "Something went wrong");
        } finally{
            setIsSubmitting(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold",
                        children: "Select Ad Serving Mode"
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground mt-1",
                        children: "Choose how your screen will display content."
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("cursor-pointer transition-all", selected === "ad-supported" ? "ring-2 ring-primary" : "hover:border-primary/50"),
                        onClick: ()=>setSelected("ad-supported"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold",
                                            children: "Ad Supported"
                                        }, void 0, false, {
                                            fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                                            lineNumber: 54,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5",
                                            children: "Recommended"
                                        }, void 0, false, {
                                            fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "Free. Ads play between your content. Access to licensed content channels."
                                }, void 0, false, {
                                    fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-bold mt-3",
                                    children: "Free"
                                }, void 0, false, {
                                    fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("cursor-pointer transition-all", selected === "ad-free" ? "ring-2 ring-primary" : "hover:border-primary/50"),
                        onClick: ()=>setSelected("ad-free"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold mb-2",
                                    children: "Ad Free"
                                }, void 0, false, {
                                    fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "No ads. Licensed content not available. Subscription billed when device is installed."
                                }, void 0, false, {
                                    fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-bold mt-3",
                                    children: [
                                        "$5",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-normal text-muted-foreground",
                                            children: "/month per screen"
                                        }, void 0, false, {
                                            fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                                            lineNumber: 72,
                                            columnNumber: 53
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        className: "flex-1",
                        disabled: isSubmitting,
                        onClick: ()=>handleSubmit("ad-supported"),
                        children: "Skip (Ad Supported)"
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        className: "flex-1",
                        disabled: isSubmitting,
                        onClick: ()=>handleSubmit(selected),
                        children: isSubmitting ? "Saving..." : "Continue"
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/onboarding/components/step-ad-mode.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(StepAdMode, "7bQjvefAFdItgn06ZgICoFet5Sg=");
_c = StepAdMode;
var _c;
__turbopack_context__.k.register(_c, "StepAdMode");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/checkbox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Checkbox({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "checkbox",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "checkbox-indicator",
            className: "flex items-center justify-center text-current transition-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                className: "size-3.5"
            }, void 0, false, {
                fileName: "[project]/components/ui/checkbox.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/checkbox.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/checkbox.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = Checkbox;
;
var _c;
__turbopack_context__.k.register(_c, "Checkbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/onboarding/components/step-channels.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepChannels",
    ()=>StepChannels
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const CHANNELS = [
    {
        id: "sports",
        label: "Sports"
    },
    {
        id: "news",
        label: "News"
    },
    {
        id: "fail-reels",
        label: "Fail Reels"
    }
];
function StepChannels({ screenId, onComplete }) {
    _s();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    function toggleChannel(id) {
        setSelected((prev)=>prev.includes(id) ? prev.filter((c)=>c !== id) : [
                ...prev,
                id
            ]);
    }
    async function handleSubmit(channels) {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/onboarding/channels", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    channels,
                    screenId
                })
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error ?? "Failed to save channels");
            }
            onComplete();
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err instanceof Error ? err.message : "Something went wrong");
        } finally{
            setIsSubmitting(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold",
                        children: "Select Licensed Content Channels"
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-channels.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground mt-1",
                        children: "Choose the channels you'd like to include in your content mix."
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-channels.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/onboarding/components/step-channels.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: CHANNELS.map((channel)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer",
                        onClick: ()=>toggleChannel(channel.id),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                id: channel.id,
                                checked: selected.includes(channel.id),
                                onCheckedChange: ()=>toggleChannel(channel.id)
                            }, void 0, false, {
                                fileName: "[project]/app/onboarding/components/step-channels.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: channel.id,
                                className: "cursor-pointer text-sm font-medium",
                                children: channel.label
                            }, void 0, false, {
                                fileName: "[project]/app/onboarding/components/step-channels.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this)
                        ]
                    }, channel.id, true, {
                        fileName: "[project]/app/onboarding/components/step-channels.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/onboarding/components/step-channels.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        className: "flex-1",
                        disabled: isSubmitting,
                        onClick: ()=>handleSubmit([]),
                        children: "Skip"
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-channels.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        className: "flex-1",
                        disabled: isSubmitting,
                        onClick: ()=>handleSubmit(selected),
                        children: isSubmitting ? "Saving..." : "Continue"
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-channels.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/onboarding/components/step-channels.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/onboarding/components/step-channels.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(StepChannels, "8pIqFh+g5Ty3ykgrmQGLXrnt15I=");
_c = StepChannels;
var _c;
__turbopack_context__.k.register(_c, "StepChannels");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/onboarding/components/step-device-order.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepDeviceOrder",
    ()=>StepDeviceOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@stripe/stripe-js/lib/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@stripe/stripe-js/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const stripePromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadStripe"])(("TURBOPACK compile-time value", "pk_test_51KmIySF2BS3eQiUkpr89qBGCglolGnaV5id6WS9BzKocV2dzHcybIjCZx0sqDpCL0lg6UyYu7de5EzNRpLphleEZ00k0jozCZd"));
function OrderForm({ locationData }) {
    _s();
    const stripe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStripe"])();
    const elements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useElements"])();
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shippingAddress, setShippingAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        line1: locationData.address ?? "",
        city: locationData.city ?? "",
        state: locationData.state ?? "",
        zip: locationData.zip ?? ""
    });
    function updateField(field, value) {
        setShippingAddress((prev)=>({
                ...prev,
                [field]: value
            }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardElement"]);
        if (!cardElement) {
            return;
        }
        setIsSubmitting(true);
        try {
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: {
                    address: {
                        line1: shippingAddress.line1,
                        city: shippingAddress.city,
                        state: shippingAddress.state,
                        postal_code: shippingAddress.zip
                    }
                }
            });
            if (error) {
                throw new Error(error.message);
            }
            const res = await fetch("/api/onboarding/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    shippingAddress,
                    paymentMethodId: paymentMethod?.id,
                    screenId: locationData.screenId,
                    locationId: locationData.locationId
                })
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error ?? "Failed to place order");
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Order placed! Your device is on the way.");
            window.location.href = "/dashboard";
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err instanceof Error ? err.message : "Something went wrong");
        } finally{
            setIsSubmitting(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold",
                        children: "Order Your Device"
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground mt-1",
                        children: "Enter your shipping address and payment details to complete your order."
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-medium",
                        children: "Shipping Address"
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "line1",
                                children: "Street Address"
                            }, void 0, false, {
                                fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                id: "line1",
                                value: shippingAddress.line1,
                                onChange: (e)=>updateField("line1", e.target.value),
                                placeholder: "123 Main St",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-1 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "city",
                                        children: "City"
                                    }, void 0, false, {
                                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "city",
                                        value: shippingAddress.city,
                                        onChange: (e)=>updateField("city", e.target.value),
                                        placeholder: "Phoenix",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "state",
                                        children: "State"
                                    }, void 0, false, {
                                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "state",
                                        value: shippingAddress.state,
                                        onChange: (e)=>updateField("state", e.target.value),
                                        placeholder: "AZ",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "zip",
                                        children: "ZIP"
                                    }, void 0, false, {
                                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "zip",
                                        value: shippingAddress.zip,
                                        onChange: (e)=>updateField("zip", e.target.value),
                                        placeholder: "85001",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-medium",
                        children: "Payment Information"
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground",
                        children: "Your card will be saved for future billing when the device is installed."
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-input rounded-md px-3 py-2.5 bg-transparent",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardElement"], {
                            options: {
                                style: {
                                    base: {
                                        fontSize: "14px",
                                        color: "#000",
                                        "::placeholder": {
                                            color: "#a1a1aa"
                                        }
                                    }
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "submit",
                className: "w-full",
                disabled: isSubmitting || !stripe,
                children: isSubmitting ? "Placing Order..." : "Place Order"
            }, void 0, false, {
                fileName: "[project]/app/onboarding/components/step-device-order.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_s(OrderForm, "Uv/Kb//Ee2CmJfzd93t5KgCWcAU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStripe"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useElements"]
    ];
});
_c = OrderForm;
function StepDeviceOrder() {
    _s1();
    const [locationData, setLocationData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StepDeviceOrder.useEffect": ()=>{
            fetch("/api/onboarding/location-data").then({
                "StepDeviceOrder.useEffect": (r)=>r.json()
            }["StepDeviceOrder.useEffect"]).then({
                "StepDeviceOrder.useEffect": (data)=>{
                    setLocationData(data);
                    setLoading(false);
                }
            }["StepDeviceOrder.useEffect"]).catch({
                "StepDeviceOrder.useEffect": ()=>setLoading(false)
            }["StepDeviceOrder.useEffect"]);
        }
    }["StepDeviceOrder.useEffect"], []);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-8 text-center text-muted-foreground text-sm",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/app/onboarding/components/step-device-order.tsx",
            lineNumber: 194,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Elements"], {
        stripe: stripePromise,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrderForm, {
            locationData: locationData
        }, void 0, false, {
            fileName: "[project]/app/onboarding/components/step-device-order.tsx",
            lineNumber: 199,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/onboarding/components/step-device-order.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_s1(StepDeviceOrder, "MHKyki2NdTfDTDxBKt/zz3NlcZE=");
_c1 = StepDeviceOrder;
var _c, _c1;
__turbopack_context__.k.register(_c, "OrderForm");
__turbopack_context__.k.register(_c1, "StepDeviceOrder");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/onboarding/components/onboarding-wizard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OnboardingWizard",
    ()=>OnboardingWizard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$onboarding$2f$components$2f$step$2d$location$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/onboarding/components/step-location.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$onboarding$2f$components$2f$step$2d$ad$2d$mode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/onboarding/components/step-ad-mode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$onboarding$2f$components$2f$step$2d$channels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/onboarding/components/step-channels.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$onboarding$2f$components$2f$step$2d$device$2d$order$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/onboarding/components/step-device-order.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const STEP_LABELS = [
    "Add Location",
    "Ad Serving Mode",
    "Select Channels",
    "Order Device"
];
function OnboardingWizard({ step: initialStep, account }) {
    _s();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialStep);
    const [screenId, setScreenId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    function advance() {
        setStep((s)=>s + 1);
    }
    function completeLocation(newScreenId) {
        setScreenId(newScreenId);
        advance();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto px-4 py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-semibold tracking-tight",
                            children: "Welcome to CETV Portal"
                        }, void 0, false, {
                            fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground mt-1",
                            children: "Let's get your location set up."
                        }, void 0, false, {
                            fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center mb-10 gap-2",
                    children: STEP_LABELS.map((label, index)=>{
                        const stepNum = index + 1;
                        const isComplete = stepNum < step;
                        const isCurrent = stepNum === step;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `size-8 rounded-full flex items-center justify-center text-sm font-medium ${isComplete ? "bg-primary text-primary-foreground" : isCurrent ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2" : "bg-muted text-muted-foreground"}`,
                                            children: isComplete ? "✓" : stepNum
                                        }, void 0, false, {
                                            fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                                            lineNumber: 57,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-xs whitespace-nowrap ${isCurrent ? "text-foreground font-medium" : "text-muted-foreground"}`,
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                                            lineNumber: 68,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                                    lineNumber: 56,
                                    columnNumber: 17
                                }, this),
                                index < STEP_LABELS.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `h-px w-12 mx-2 mb-5 ${isComplete ? "bg-primary" : "bg-border"}`
                                }, void 0, false, {
                                    fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                                    lineNumber: 73,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, stepNum, true, {
                            fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                            lineNumber: 55,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-card rounded-xl border shadow p-6",
                    children: [
                        step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$onboarding$2f$components$2f$step$2d$location$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepLocation"], {
                            onComplete: completeLocation
                        }, void 0, false, {
                            fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                            lineNumber: 81,
                            columnNumber: 26
                        }, this),
                        step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$onboarding$2f$components$2f$step$2d$ad$2d$mode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepAdMode"], {
                            onComplete: advance
                        }, void 0, false, {
                            fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                            lineNumber: 82,
                            columnNumber: 26
                        }, this),
                        step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$onboarding$2f$components$2f$step$2d$channels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepChannels"], {
                            screenId: screenId,
                            onComplete: advance
                        }, void 0, false, {
                            fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                            lineNumber: 83,
                            columnNumber: 26
                        }, this),
                        step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$onboarding$2f$components$2f$step$2d$device$2d$order$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepDeviceOrder"], {}, void 0, false, {
                            fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                            lineNumber: 84,
                            columnNumber: 26
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/onboarding/components/onboarding-wizard.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(OnboardingWizard, "yM3ldh2RGRc5tjJ6KXz3kcHKyyc=");
_c = OnboardingWizard;
var _c;
__turbopack_context__.k.register(_c, "OnboardingWizard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/@googlemaps/js-api-loader/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ __turbopack_context__.s([
    "DEFAULT_ID",
    ()=>DEFAULT_ID,
    "Loader",
    ()=>Loader,
    "LoaderStatus",
    ()=>LoaderStatus
]);
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}
var fastDeepEqual;
var hasRequiredFastDeepEqual;
function requireFastDeepEqual() {
    if (hasRequiredFastDeepEqual) return fastDeepEqual;
    hasRequiredFastDeepEqual = 1;
    // do not edit .js files directly - edit src/index.jst
    fastDeepEqual = function equal(a, b) {
        if (a === b) return true;
        if (a && b && typeof a == 'object' && typeof b == 'object') {
            if (a.constructor !== b.constructor) return false;
            var length, i, keys;
            if (Array.isArray(a)) {
                length = a.length;
                if (length != b.length) return false;
                for(i = length; i-- !== 0;)if (!equal(a[i], b[i])) return false;
                return true;
            }
            if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
            if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
            if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
            keys = Object.keys(a);
            length = keys.length;
            if (length !== Object.keys(b).length) return false;
            for(i = length; i-- !== 0;)if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
            for(i = length; i-- !== 0;){
                var key = keys[i];
                if (!equal(a[key], b[key])) return false;
            }
            return true;
        }
        // true if both NaN, false otherwise
        return a !== a && b !== b;
    };
    return fastDeepEqual;
}
var fastDeepEqualExports = requireFastDeepEqual();
var isEqual = /*@__PURE__*/ getDefaultExportFromCjs(fastDeepEqualExports);
/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at.
 *
 *      Http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const DEFAULT_ID = "__googleMapsScriptId";
/**
 * The status of the [[Loader]].
 */ var LoaderStatus;
(function(LoaderStatus) {
    LoaderStatus[LoaderStatus["INITIALIZED"] = 0] = "INITIALIZED";
    LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
    LoaderStatus[LoaderStatus["SUCCESS"] = 2] = "SUCCESS";
    LoaderStatus[LoaderStatus["FAILURE"] = 3] = "FAILURE";
})(LoaderStatus || (LoaderStatus = {}));
/**
 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
 * dynamically using
 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 * It works by dynamically creating and appending a script node to the the
 * document head and wrapping the callback function so as to return a promise.
 *
 * ```
 * const loader = new Loader({
 *   apiKey: "",
 *   version: "weekly",
 *   libraries: ["places"]
 * });
 *
 * loader.load().then((google) => {
 *   const map = new google.maps.Map(...)
 * })
 * ```
 */ class Loader {
    /**
     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
     * using this library, instead the defaults are set by the Google Maps
     * JavaScript API server.
     *
     * ```
     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
     * ```
     */ constructor({ apiKey, authReferrerPolicy, channel, client, id = DEFAULT_ID, language, libraries = [], mapIds, nonce, region, retries = 3, url = "https://maps.googleapis.com/maps/api/js", version }){
        this.callbacks = [];
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.apiKey = apiKey;
        this.authReferrerPolicy = authReferrerPolicy;
        this.channel = channel;
        this.client = client;
        this.id = id || DEFAULT_ID; // Do not allow empty string
        this.language = language;
        this.libraries = libraries;
        this.mapIds = mapIds;
        this.nonce = nonce;
        this.region = region;
        this.retries = retries;
        this.url = url;
        this.version = version;
        if (Loader.instance) {
            if (!isEqual(this.options, Loader.instance.options)) {
                throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
            }
            return Loader.instance;
        }
        Loader.instance = this;
    }
    get options() {
        return {
            version: this.version,
            apiKey: this.apiKey,
            channel: this.channel,
            client: this.client,
            id: this.id,
            libraries: this.libraries,
            language: this.language,
            region: this.region,
            mapIds: this.mapIds,
            nonce: this.nonce,
            url: this.url,
            authReferrerPolicy: this.authReferrerPolicy
        };
    }
    get status() {
        if (this.errors.length) {
            return LoaderStatus.FAILURE;
        }
        if (this.done) {
            return LoaderStatus.SUCCESS;
        }
        if (this.loading) {
            return LoaderStatus.LOADING;
        }
        return LoaderStatus.INITIALIZED;
    }
    get failed() {
        return this.done && !this.loading && this.errors.length >= this.retries + 1;
    }
    /**
     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
     *
     * @ignore
     * @deprecated
     */ createUrl() {
        let url = this.url;
        url += `?callback=__googleMapsCallback&loading=async`;
        if (this.apiKey) {
            url += `&key=${this.apiKey}`;
        }
        if (this.channel) {
            url += `&channel=${this.channel}`;
        }
        if (this.client) {
            url += `&client=${this.client}`;
        }
        if (this.libraries.length > 0) {
            url += `&libraries=${this.libraries.join(",")}`;
        }
        if (this.language) {
            url += `&language=${this.language}`;
        }
        if (this.region) {
            url += `&region=${this.region}`;
        }
        if (this.version) {
            url += `&v=${this.version}`;
        }
        if (this.mapIds) {
            url += `&map_ids=${this.mapIds.join(",")}`;
        }
        if (this.authReferrerPolicy) {
            url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
        }
        return url;
    }
    deleteScript() {
        const script = document.getElementById(this.id);
        if (script) {
            script.remove();
        }
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     * @deprecated, use importLibrary() instead.
     */ load() {
        return this.loadPromise();
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     *
     * @ignore
     * @deprecated, use importLibrary() instead.
     */ loadPromise() {
        return new Promise((resolve, reject)=>{
            this.loadCallback((err)=>{
                if (!err) {
                    resolve(window.google);
                } else {
                    reject(err.error);
                }
            });
        });
    }
    importLibrary(name) {
        this.execute();
        return google.maps.importLibrary(name);
    }
    /**
     * Load the Google Maps JavaScript API script with a callback.
     * @deprecated, use importLibrary() instead.
     */ loadCallback(fn) {
        this.callbacks.push(fn);
        this.execute();
    }
    /**
     * Set the script on document.
     */ setScript() {
        var _a, _b;
        if (document.getElementById(this.id)) {
            // TODO wrap onerror callback for cases where the script was loaded elsewhere
            this.callback();
            return;
        }
        const params = {
            key: this.apiKey,
            channel: this.channel,
            client: this.client,
            libraries: this.libraries.length && this.libraries,
            v: this.version,
            mapIds: this.mapIds,
            language: this.language,
            region: this.region,
            authReferrerPolicy: this.authReferrerPolicy
        };
        // keep the URL minimal:
        Object.keys(params).forEach(// eslint-disable-next-line @typescript-eslint/no-explicit-any
        (key)=>!params[key] && delete params[key]);
        if (!((_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.importLibrary)) {
            // tweaked copy of https://developers.google.com/maps/documentation/javascript/load-maps-js-api#dynamic-library-import
            // which also sets the base url, the id, and the nonce
            /* eslint-disable */ ((g)=>{
                // @ts-ignore
                let h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
                // @ts-ignore
                b = b[c] || (b[c] = {});
                // @ts-ignore
                const d = b.maps || (b.maps = {}), r = new Set(), e = new URLSearchParams(), u = ()=>// @ts-ignore
                    h || (h = new Promise((f, n)=>__awaiter(this, void 0, void 0, function*() {
                            var _a;
                            yield a = m.createElement("script");
                            a.id = this.id;
                            e.set("libraries", [
                                ...r
                            ] + "");
                            // @ts-ignore
                            for(k in g)e.set(k.replace(/[A-Z]/g, (t)=>"_" + t[0].toLowerCase()), g[k]);
                            e.set("callback", c + ".maps." + q);
                            a.src = this.url + `?` + e;
                            d[q] = f;
                            a.onerror = ()=>h = n(Error(p + " could not load."));
                            // @ts-ignore
                            a.nonce = this.nonce || ((_a = m.querySelector("script[nonce]")) === null || _a === void 0 ? void 0 : _a.nonce) || "";
                            m.head.append(a);
                        })));
                // @ts-ignore
                d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n)=>r.add(f) && u().then(()=>d[l](f, ...n));
            })(params);
        /* eslint-enable */ }
        // While most libraries populate the global namespace when loaded via bootstrap params,
        // this is not the case for "marker" when used with the inline bootstrap loader
        // (and maybe others in the future). So ensure there is an importLibrary for each:
        const libraryPromises = this.libraries.map((library)=>this.importLibrary(library));
        // ensure at least one library, to kick off loading...
        if (!libraryPromises.length) {
            libraryPromises.push(this.importLibrary("core"));
        }
        Promise.all(libraryPromises).then(()=>this.callback(), (error)=>{
            const event = new ErrorEvent("error", {
                error
            }); // for backwards compat
            this.loadErrorCallback(event);
        });
    }
    /**
     * Reset the loader state.
     */ reset() {
        this.deleteScript();
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.onerrorEvent = null;
    }
    resetIfRetryingFailed() {
        if (this.failed) {
            this.reset();
        }
    }
    loadErrorCallback(e) {
        this.errors.push(e);
        if (this.errors.length <= this.retries) {
            const delay = this.errors.length * Math.pow(2, this.errors.length);
            console.error(`Failed to load Google Maps script, retrying in ${delay} ms.`);
            setTimeout(()=>{
                this.deleteScript();
                this.setScript();
            }, delay);
        } else {
            this.onerrorEvent = e;
            this.callback();
        }
    }
    callback() {
        this.done = true;
        this.loading = false;
        this.callbacks.forEach((cb)=>{
            cb(this.onerrorEvent);
        });
        this.callbacks = [];
    }
    execute() {
        this.resetIfRetryingFailed();
        if (this.loading) {
            // do nothing but wait
            return;
        }
        if (this.done) {
            this.callback();
        } else {
            // short circuit and warn if google.maps is already loaded
            if (window.google && window.google.maps && window.google.maps.version) {
                console.warn("Google Maps already loaded outside @googlemaps/js-api-loader. " + "This may result in undesirable behavior as options and script parameters may not match.");
                this.callback();
                return;
            }
            this.loading = true;
            this.setScript();
        }
    }
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/node_modules/@radix-ui/react-label/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/primitive.tsx
__turbopack_context__.s([
    "Primitive",
    ()=>Primitive,
    "Root",
    ()=>Root,
    "dispatchDiscreteCustomEvent",
    ()=>dispatchDiscreteCustomEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
var NODES = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul"
];
var Primitive = NODES.reduce((primitive, node)=>{
    const Slot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSlot"])(`Primitive.${node}`);
    const Node = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
        const { asChild, ...primitiveProps } = props;
        const Comp = asChild ? Slot : node;
        if (typeof window !== "undefined") {
            window[Symbol.for("radix-ui")] = true;
        }
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Comp, {
            ...primitiveProps,
            ref: forwardedRef
        });
    });
    Node.displayName = `Primitive.${node}`;
    return {
        ...primitive,
        [node]: Node
    };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
    if (target) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"](()=>target.dispatchEvent(event));
}
var Root = Primitive;
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label,
    "Root",
    ()=>Root
]);
// src/label.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
"use client";
;
;
;
var NAME = "Label";
var Label = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Primitive"].label, {
        ...props,
        ref: forwardedRef,
        onMouseDown: (event)=>{
            const target = event.target;
            if (target.closest("button, input, select, textarea")) return;
            props.onMouseDown?.(event);
            if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
        }
    });
});
Label.displayName = NAME;
var Root = Label;
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/node_modules/@radix-ui/react-use-previous/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// packages/react/use-previous/src/use-previous.tsx
__turbopack_context__.s([
    "usePrevious",
    ()=>usePrevious
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function usePrevious(value) {
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]({
        value,
        previous: value
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "usePrevious.useMemo": ()=>{
            if (ref.current.value !== value) {
                ref.current.previous = ref.current.value;
                ref.current.value = value;
            }
            return ref.current.previous;
        }
    }["usePrevious.useMemo"], [
        value
    ]);
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox,
    "CheckboxIndicator",
    ()=>CheckboxIndicator,
    "Indicator",
    ()=>CheckboxIndicator,
    "Root",
    ()=>Checkbox,
    "createCheckboxScope",
    ()=>createCheckboxScope,
    "unstable_BubbleInput",
    ()=>CheckboxBubbleInput,
    "unstable_CheckboxBubbleInput",
    ()=>CheckboxBubbleInput,
    "unstable_CheckboxProvider",
    ()=>CheckboxProvider,
    "unstable_CheckboxTrigger",
    ()=>CheckboxTrigger,
    "unstable_Provider",
    ()=>CheckboxProvider,
    "unstable_Trigger",
    ()=>CheckboxTrigger
]);
// src/checkbox.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-context/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/primitive/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$controllable$2d$state$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$previous$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-use-previous/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$size$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-use-size/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$presence$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-presence/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContextScope"])(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
    const { __scopeCheckbox, checked: checkedProp, children, defaultChecked, disabled, form, name, onCheckedChange, required, value = "on", // @ts-expect-error
    internal_do_not_use_render } = props;
    const [checked, setChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$controllable$2d$state$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControllableState"])({
        prop: checkedProp,
        defaultProp: defaultChecked ?? false,
        onChange: onCheckedChange,
        caller: CHECKBOX_NAME
    });
    const [control, setControl] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [bubbleInput, setBubbleInput] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const hasConsumerStoppedPropagationRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const isFormControl = control ? !!form || !!control.closest("form") : // We set this to true by default so that events bubble to forms without JS (SSR)
    true;
    const context = {
        checked,
        disabled,
        setChecked,
        control,
        setControl,
        name,
        form,
        value,
        hasConsumerStoppedPropagationRef,
        required,
        defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
        isFormControl,
        bubbleInput,
        setBubbleInput
    };
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CheckboxProviderImpl, {
        scope: __scopeCheckbox,
        ...context,
        children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    });
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef)=>{
    const { control, value, disabled, checked, required, setControl, setChecked, hasConsumerStoppedPropagationRef, isFormControl, bubbleInput } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useComposedRefs"])(forwardedRef, setControl);
    const initialCheckedStateRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](checked);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "CheckboxTrigger.useEffect": ()=>{
            const form = control?.form;
            if (form) {
                const reset = {
                    "CheckboxTrigger.useEffect.reset": ()=>setChecked(initialCheckedStateRef.current)
                }["CheckboxTrigger.useEffect.reset"];
                form.addEventListener("reset", reset);
                return ({
                    "CheckboxTrigger.useEffect": ()=>form.removeEventListener("reset", reset)
                })["CheckboxTrigger.useEffect"];
            }
        }
    }["CheckboxTrigger.useEffect"], [
        control,
        setChecked
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Primitive"].button, {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeEventHandlers"])(onKeyDown, (event)=>{
            if (event.key === "Enter") event.preventDefault();
        }),
        onClick: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeEventHandlers"])(onClick, (event)=>{
            setChecked((prevChecked)=>isIndeterminate(prevChecked) ? true : !prevChecked);
            if (bubbleInput && isFormControl) {
                hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
                if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
        })
    });
});
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeCheckbox, name, checked, defaultChecked, required, disabled, value, onCheckedChange, form, ...checkboxProps } = props;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CheckboxProvider, {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CheckboxTrigger, {
                        ...checkboxProps,
                        ref: forwardedRef,
                        __scopeCheckbox
                    }),
                    isFormControl && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CheckboxBubbleInput, {
                        __scopeCheckbox
                    })
                ]
            })
    });
});
Checkbox.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$presence$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Presence"], {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Primitive"].span, {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: {
                pointerEvents: "none",
                ...props.style
            }
        })
    });
});
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ __scopeCheckbox, ...props }, forwardedRef)=>{
    const { control, hasConsumerStoppedPropagationRef, checked, defaultChecked, required, disabled, name, value, form, bubbleInput, setBubbleInput } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useComposedRefs"])(forwardedRef, setBubbleInput);
    const prevChecked = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$previous$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrevious"])(checked);
    const controlSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$size$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"])(control);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "CheckboxBubbleInput.useEffect": ()=>{
            const input = bubbleInput;
            if (!input) return;
            const inputProto = window.HTMLInputElement.prototype;
            const descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked");
            const setChecked = descriptor.set;
            const bubbles = !hasConsumerStoppedPropagationRef.current;
            if (prevChecked !== checked && setChecked) {
                const event = new Event("click", {
                    bubbles
                });
                input.indeterminate = isIndeterminate(checked);
                setChecked.call(input, isIndeterminate(checked) ? false : checked);
                input.dispatchEvent(event);
            }
        }
    }["CheckboxBubbleInput.useEffect"], [
        bubbleInput,
        prevChecked,
        checked,
        hasConsumerStoppedPropagationRef
    ]);
    const defaultCheckedRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Primitive"].input, {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
            ...props.style,
            ...controlSize,
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0,
            // We transform because the input is absolutely positioned but we have
            // rendered it **after** the button. This pulls it back to sit on top
            // of the button.
            transform: "translateX(-100%)"
        }
    });
});
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
    return typeof value === "function";
}
function isIndeterminate(checked) {
    return checked === "indeterminate";
}
function getState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.559.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Check
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20 6 9 17l-5-5",
            key: "1gmf2c"
        }
    ]
];
const Check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("check", __iconNode);
;
 //# sourceMappingURL=check.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)");
}),
"[project]/node_modules/@stripe/stripe-js/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadStripe",
    ()=>loadStripe
]);
var RELEASE_TRAIN = 'v3';
var runtimeVersionToUrlVersion = function runtimeVersionToUrlVersion(version) {
    return version === 3 ? 'v3' : version;
};
var ORIGIN = 'https://js.stripe.com';
var STRIPE_JS_URL = "".concat(ORIGIN, "/v3");
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var STRIPE_JS_URL_REGEX = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = 'loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used';
var isStripeJSURL = function isStripeJSURL(url) {
    return V3_URL_REGEX.test(url) || STRIPE_JS_URL_REGEX.test(url);
};
var findScript = function findScript() {
    var scripts = document.querySelectorAll("script[src^=\"".concat(ORIGIN, "\"]"));
    for(var i = 0; i < scripts.length; i++){
        var script = scripts[i];
        if (!isStripeJSURL(script.src)) {
            continue;
        }
        return script;
    }
    return null;
};
var injectScript = function injectScript(params) {
    var queryString = params && !params.advancedFraudSignals ? '?advancedFraudSignals=false' : '';
    var script = document.createElement('script');
    script.src = "".concat(STRIPE_JS_URL).concat(queryString);
    var headOrBody = document.head || document.body;
    if (!headOrBody) {
        throw new Error('Expected document.body not to be null. Stripe.js requires a <body> element.');
    }
    headOrBody.appendChild(script);
    return script;
};
var registerWrapper = function registerWrapper(stripe, startTime) {
    if (!stripe || !stripe._registerWrapper) {
        return;
    }
    stripe._registerWrapper({
        name: 'stripe-js',
        version: "5.10.0",
        startTime: startTime
    });
};
var stripePromise$1 = null;
var onErrorListener = null;
var onLoadListener = null;
var onError = function onError(reject) {
    return function(cause) {
        reject(new Error('Failed to load Stripe.js', {
            cause: cause
        }));
    };
};
var onLoad = function onLoad(resolve, reject) {
    return function() {
        if (window.Stripe) {
            resolve(window.Stripe);
        } else {
            reject(new Error('Stripe.js not available'));
        }
    };
};
var loadScript = function loadScript(params) {
    // Ensure that we only attempt to load Stripe.js at most once
    if (stripePromise$1 !== null) {
        return stripePromise$1;
    }
    stripePromise$1 = new Promise(function(resolve, reject) {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            // Resolve to null when imported server side. This makes the module
            // safe to import in an isomorphic code base.
            resolve(null);
            return;
        }
        if (window.Stripe && params) {
            console.warn(EXISTING_SCRIPT_MESSAGE);
        }
        if (window.Stripe) {
            resolve(window.Stripe);
            return;
        }
        try {
            var script = findScript();
            if (script && params) {
                console.warn(EXISTING_SCRIPT_MESSAGE);
            } else if (!script) {
                script = injectScript(params);
            } else if (script && onLoadListener !== null && onErrorListener !== null) {
                var _script$parentNode;
                // remove event listeners
                script.removeEventListener('load', onLoadListener);
                script.removeEventListener('error', onErrorListener); // if script exists, but we are reloading due to an error,
                // reload script to trigger 'load' event
                (_script$parentNode = script.parentNode) === null || _script$parentNode === void 0 ? void 0 : _script$parentNode.removeChild(script);
                script = injectScript(params);
            }
            onLoadListener = onLoad(resolve, reject);
            onErrorListener = onError(reject);
            script.addEventListener('load', onLoadListener);
            script.addEventListener('error', onErrorListener);
        } catch (error) {
            reject(error);
            return;
        }
    }); // Resets stripePromise on error
    return stripePromise$1["catch"](function(error) {
        stripePromise$1 = null;
        return Promise.reject(error);
    });
};
var initStripe = function initStripe(maybeStripe, args, startTime) {
    if (maybeStripe === null) {
        return null;
    }
    var pk = args[0];
    var isTestKey = pk.match(/^pk_test/); // @ts-expect-error this is not publicly typed
    var version = runtimeVersionToUrlVersion(maybeStripe.version);
    var expectedVersion = RELEASE_TRAIN;
    if (isTestKey && version !== expectedVersion) {
        console.warn("Stripe.js@".concat(version, " was loaded on the page, but @stripe/stripe-js@").concat("5.10.0", " expected Stripe.js@").concat(expectedVersion, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
    }
    var stripe = maybeStripe.apply(undefined, args);
    registerWrapper(stripe, startTime);
    return stripe;
}; // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var stripePromise;
var loadCalled = false;
var getStripePromise = function getStripePromise() {
    if (stripePromise) {
        return stripePromise;
    }
    stripePromise = loadScript(null)["catch"](function(error) {
        // clear cache on error
        stripePromise = null;
        return Promise.reject(error);
    });
    return stripePromise;
}; // Execute our own script injection after a tick to give users time to do their
// own script injection.
Promise.resolve().then(function() {
    return getStripePromise();
})["catch"](function(error) {
    if (!loadCalled) {
        console.warn(error);
    }
});
var loadStripe = function loadStripe() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    loadCalled = true;
    var startTime = Date.now(); // if previous attempts are unsuccessful, will re-load script
    return getStripePromise().then(function(maybeStripe) {
        return initStripe(maybeStripe, args, startTime);
    });
};
;
}),
"[project]/node_modules/@stripe/stripe-js/lib/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@stripe/stripe-js/dist/index.mjs [app-client] (ecmascript)");
;
}),
"[project]/node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

(function(global, factory) {
    ("TURBOPACK compile-time truthy", 1) ? factory(exports, __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)")) : "TURBOPACK unreachable";
})(/*TURBOPACK member replacement*/ __turbopack_context__.e, function(exports1, React) {
    'use strict';
    function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) {
                symbols = symbols.filter(function(sym) {
                    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                });
            }
            keys.push.apply(keys, symbols);
        }
        return keys;
    }
    function _objectSpread2(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
                ownKeys(Object(source), true).forEach(function(key) {
                    _defineProperty(target, key, source[key]);
                });
            } else if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
                ownKeys(Object(source)).forEach(function(key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                });
            }
        }
        return target;
    }
    function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }
        return _typeof(obj);
    }
    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }
        return obj;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null) return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;
        for(i = 0; i < sourceKeys.length; i++){
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            target[key] = source[key];
        }
        return target;
    }
    function _objectWithoutProperties(source, excluded) {
        if (source == null) return {};
        var target = _objectWithoutPropertiesLoose(source, excluded);
        var key, i;
        if (Object.getOwnPropertySymbols) {
            var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
            for(i = 0; i < sourceSymbolKeys.length; i++){
                key = sourceSymbolKeys[i];
                if (excluded.indexOf(key) >= 0) continue;
                if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
                target[key] = source[key];
            }
        }
        return target;
    }
    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }
    function _iterableToArrayLimit(arr, i) {
        var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);
        if (_i == null) return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
            for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally{
            try {
                if (!_n && _i["return"] != null) _i["return"]();
            } finally{
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
        return arr2;
    }
    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function getDefaultExportFromCjs(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }
    var propTypes = {
        exports: {}
    };
    /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var ReactPropTypesSecret_1;
    var hasRequiredReactPropTypesSecret;
    function requireReactPropTypesSecret() {
        if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
        hasRequiredReactPropTypesSecret = 1;
        var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
        ReactPropTypesSecret_1 = ReactPropTypesSecret;
        return ReactPropTypesSecret_1;
    }
    /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var factoryWithThrowingShims;
    var hasRequiredFactoryWithThrowingShims;
    function requireFactoryWithThrowingShims() {
        if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
        hasRequiredFactoryWithThrowingShims = 1;
        var ReactPropTypesSecret = requireReactPropTypesSecret();
        function emptyFunction() {}
        function emptyFunctionWithReset() {}
        emptyFunctionWithReset.resetWarningCache = emptyFunction;
        factoryWithThrowingShims = function() {
            function shim(props, propName, componentName, location, propFullName, secret) {
                if (secret === ReactPropTypesSecret) {
                    // It is still safe when called from React.
                    return;
                }
                var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
                err.name = 'Invariant Violation';
                throw err;
            }
            shim.isRequired = shim;
            function getShim() {
                return shim;
            }
            // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
            var ReactPropTypes = {
                array: shim,
                bool: shim,
                func: shim,
                number: shim,
                object: shim,
                string: shim,
                symbol: shim,
                any: shim,
                arrayOf: getShim,
                element: shim,
                elementType: shim,
                instanceOf: getShim,
                node: shim,
                objectOf: getShim,
                oneOf: getShim,
                oneOfType: getShim,
                shape: getShim,
                exact: getShim,
                checkPropTypes: emptyFunctionWithReset,
                resetWarningCache: emptyFunction
            };
            ReactPropTypes.PropTypes = ReactPropTypes;
            return ReactPropTypes;
        };
        return factoryWithThrowingShims;
    }
    /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ {
        // By explicitly using `prop-types` you are opting into new production behavior.
        // http://fb.me/prop-types-in-prod
        propTypes.exports = requireFactoryWithThrowingShims()();
    }
    var propTypesExports = propTypes.exports;
    var PropTypes = /*@__PURE__*/ getDefaultExportFromCjs(propTypesExports);
    var useAttachEvent = function useAttachEvent(element, event, cb) {
        var cbDefined = !!cb;
        var cbRef = React.useRef(cb); // In many integrations the callback prop changes on each render.
        // Using a ref saves us from calling element.on/.off every render.
        React.useEffect({
            "useAttachEvent.useEffect": function() {
                cbRef.current = cb;
            }
        }["useAttachEvent.useEffect"], [
            cb
        ]);
        React.useEffect({
            "useAttachEvent.useEffect": function() {
                if (!cbDefined || !element) {
                    return ({
                        "useAttachEvent.useEffect": function() {}
                    })["useAttachEvent.useEffect"];
                }
                var decoratedCb = function decoratedCb() {
                    if (cbRef.current) {
                        cbRef.current.apply(cbRef, arguments);
                    }
                };
                element.on(event, decoratedCb);
                return ({
                    "useAttachEvent.useEffect": function() {
                        element.off(event, decoratedCb);
                    }
                })["useAttachEvent.useEffect"];
            }
        }["useAttachEvent.useEffect"], [
            cbDefined,
            event,
            element,
            cbRef
        ]);
    };
    var usePrevious = function usePrevious(value) {
        var ref = React.useRef(value);
        React.useEffect({
            "usePrevious.useEffect": function() {
                ref.current = value;
            }
        }["usePrevious.useEffect"], [
            value
        ]);
        return ref.current;
    };
    var isUnknownObject = function isUnknownObject(raw) {
        return raw !== null && _typeof(raw) === 'object';
    };
    var isPromise = function isPromise(raw) {
        return isUnknownObject(raw) && typeof raw.then === 'function';
    }; // We are using types to enforce the `stripe` prop in this lib,
    // but in an untyped integration `stripe` could be anything, so we need
    // to do some sanity validation to prevent type errors.
    var isStripe = function isStripe(raw) {
        return isUnknownObject(raw) && typeof raw.elements === 'function' && typeof raw.createToken === 'function' && typeof raw.createPaymentMethod === 'function' && typeof raw.confirmCardPayment === 'function';
    };
    var PLAIN_OBJECT_STR = '[object Object]';
    var isEqual = function isEqual(left, right) {
        if (!isUnknownObject(left) || !isUnknownObject(right)) {
            return left === right;
        }
        var leftArray = Array.isArray(left);
        var rightArray = Array.isArray(right);
        if (leftArray !== rightArray) return false;
        var leftPlainObject = Object.prototype.toString.call(left) === PLAIN_OBJECT_STR;
        var rightPlainObject = Object.prototype.toString.call(right) === PLAIN_OBJECT_STR;
        if (leftPlainObject !== rightPlainObject) return false; // not sure what sort of special object this is (regexp is one option), so
        // fallback to reference check.
        if (!leftPlainObject && !leftArray) return left === right;
        var leftKeys = Object.keys(left);
        var rightKeys = Object.keys(right);
        if (leftKeys.length !== rightKeys.length) return false;
        var keySet = {};
        for(var i = 0; i < leftKeys.length; i += 1){
            keySet[leftKeys[i]] = true;
        }
        for(var _i = 0; _i < rightKeys.length; _i += 1){
            keySet[rightKeys[_i]] = true;
        }
        var allKeys = Object.keys(keySet);
        if (allKeys.length !== leftKeys.length) {
            return false;
        }
        var l = left;
        var r = right;
        var pred = function pred(key) {
            return isEqual(l[key], r[key]);
        };
        return allKeys.every(pred);
    };
    var extractAllowedOptionsUpdates = function extractAllowedOptionsUpdates(options, prevOptions, immutableKeys) {
        if (!isUnknownObject(options)) {
            return null;
        }
        return Object.keys(options).reduce(function(newOptions, key) {
            var isUpdated = !isUnknownObject(prevOptions) || !isEqual(options[key], prevOptions[key]);
            if (immutableKeys.includes(key)) {
                if (isUpdated) {
                    console.warn("Unsupported prop change: options.".concat(key, " is not a mutable property."));
                }
                return newOptions;
            }
            if (!isUpdated) {
                return newOptions;
            }
            return _objectSpread2(_objectSpread2({}, newOptions || {}), {}, _defineProperty({}, key, options[key]));
        }, null);
    };
    var INVALID_STRIPE_ERROR$2 = 'Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.'; // We are using types to enforce the `stripe` prop in this lib, but in a real
    // integration `stripe` could be anything, so we need to do some sanity
    // validation to prevent type errors.
    var validateStripe = function validateStripe(maybeStripe) {
        var errorMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INVALID_STRIPE_ERROR$2;
        if (maybeStripe === null || isStripe(maybeStripe)) {
            return maybeStripe;
        }
        throw new Error(errorMsg);
    };
    var parseStripeProp = function parseStripeProp(raw) {
        var errorMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INVALID_STRIPE_ERROR$2;
        if (isPromise(raw)) {
            return {
                tag: 'async',
                stripePromise: Promise.resolve(raw).then(function(result) {
                    return validateStripe(result, errorMsg);
                })
            };
        }
        var stripe = validateStripe(raw, errorMsg);
        if (stripe === null) {
            return {
                tag: 'empty'
            };
        }
        return {
            tag: 'sync',
            stripe: stripe
        };
    };
    var registerWithStripeJs = function registerWithStripeJs(stripe) {
        if (!stripe || !stripe._registerWrapper || !stripe.registerAppInfo) {
            return;
        }
        stripe._registerWrapper({
            name: 'react-stripe-js',
            version: "3.10.0"
        });
        stripe.registerAppInfo({
            name: 'react-stripe-js',
            version: "3.10.0",
            url: 'https://stripe.com/docs/stripe-js/react'
        });
    };
    var ElementsContext = /*#__PURE__*/ React.createContext(null);
    ElementsContext.displayName = 'ElementsContext';
    var parseElementsContext = function parseElementsContext(ctx, useCase) {
        if (!ctx) {
            throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(useCase, " in an <Elements> provider."));
        }
        return ctx;
    };
    /**
   * The `Elements` provider allows you to use [Element components](https://stripe.com/docs/stripe-js/react#element-components) and access the [Stripe object](https://stripe.com/docs/js/initializing) in any nested component.
   * Render an `Elements` provider at the root of your React app so that it is available everywhere you need it.
   *
   * To use the `Elements` provider, call `loadStripe` from `@stripe/stripe-js` with your publishable key.
   * The `loadStripe` function will asynchronously load the Stripe.js script and initialize a `Stripe` object.
   * Pass the returned `Promise` to `Elements`.
   *
   * @docs https://docs.stripe.com/sdks/stripejs-react?ui=elements#elements-provider
   */ var Elements = function Elements(_ref) {
        var rawStripeProp = _ref.stripe, options = _ref.options, children = _ref.children;
        var parsed = React.useMemo({
            "Elements.useMemo[parsed]": function() {
                return parseStripeProp(rawStripeProp);
            }
        }["Elements.useMemo[parsed]"], [
            rawStripeProp
        ]); // For a sync stripe instance, initialize into context
        var _React$useState = React.useState({
            "Elements.useState[_React$useState]": function() {
                return {
                    stripe: parsed.tag === 'sync' ? parsed.stripe : null,
                    elements: parsed.tag === 'sync' ? parsed.stripe.elements(options) : null
                };
            }
        }["Elements.useState[_React$useState]"]), _React$useState2 = _slicedToArray(_React$useState, 2), ctx = _React$useState2[0], setContext = _React$useState2[1];
        React.useEffect({
            "Elements.useEffect": function() {
                var isMounted = true;
                var safeSetContext = function safeSetContext(stripe) {
                    setContext({
                        "Elements.useEffect.safeSetContext": function(ctx) {
                            // no-op if we already have a stripe instance (https://github.com/stripe/react-stripe-js/issues/296)
                            if (ctx.stripe) return ctx;
                            return {
                                stripe: stripe,
                                elements: stripe.elements(options)
                            };
                        }
                    }["Elements.useEffect.safeSetContext"]);
                }; // For an async stripePromise, store it in context once resolved
                if (parsed.tag === 'async' && !ctx.stripe) {
                    parsed.stripePromise.then({
                        "Elements.useEffect": function(stripe) {
                            if (stripe && isMounted) {
                                // Only update Elements context if the component is still mounted
                                // and stripe is not null. We allow stripe to be null to make
                                // handling SSR easier.
                                safeSetContext(stripe);
                            }
                        }
                    }["Elements.useEffect"]);
                } else if (parsed.tag === 'sync' && !ctx.stripe) {
                    // Or, handle a sync stripe instance going from null -> populated
                    safeSetContext(parsed.stripe);
                }
                return ({
                    "Elements.useEffect": function() {
                        isMounted = false;
                    }
                })["Elements.useEffect"];
            }
        }["Elements.useEffect"], [
            parsed,
            ctx,
            options
        ]); // Warn on changes to stripe prop
        var prevStripe = usePrevious(rawStripeProp);
        React.useEffect({
            "Elements.useEffect": function() {
                if (prevStripe !== null && prevStripe !== rawStripeProp) {
                    console.warn('Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.');
                }
            }
        }["Elements.useEffect"], [
            prevStripe,
            rawStripeProp
        ]); // Apply updates to elements when options prop has relevant changes
        var prevOptions = usePrevious(options);
        React.useEffect({
            "Elements.useEffect": function() {
                if (!ctx.elements) {
                    return;
                }
                var updates = extractAllowedOptionsUpdates(options, prevOptions, [
                    'clientSecret',
                    'fonts'
                ]);
                if (updates) {
                    ctx.elements.update(updates);
                }
            }
        }["Elements.useEffect"], [
            options,
            prevOptions,
            ctx.elements
        ]); // Attach react-stripe-js version to stripe.js instance
        React.useEffect({
            "Elements.useEffect": function() {
                registerWithStripeJs(ctx.stripe);
            }
        }["Elements.useEffect"], [
            ctx.stripe
        ]);
        return /*#__PURE__*/ React.createElement(ElementsContext.Provider, {
            value: ctx
        }, children);
    };
    Elements.propTypes = {
        stripe: PropTypes.any,
        options: PropTypes.object
    };
    var useElementsContextWithUseCase = function useElementsContextWithUseCase(useCaseMessage) {
        var ctx = React.useContext(ElementsContext);
        return parseElementsContext(ctx, useCaseMessage);
    };
    /**
   * @docs https://stripe.com/docs/stripe-js/react#useelements-hook
   */ var useElements = function useElements() {
        var _useElementsContextWi = useElementsContextWithUseCase('calls useElements()'), elements = _useElementsContextWi.elements;
        return elements;
    };
    /**
   * @docs https://stripe.com/docs/stripe-js/react#elements-consumer
   */ var ElementsConsumer = function ElementsConsumer(_ref2) {
        var children = _ref2.children;
        var ctx = useElementsContextWithUseCase('mounts <ElementsConsumer>'); // Assert to satisfy the busted React.FC return type (it should be ReactNode)
        return children(ctx);
    };
    ElementsConsumer.propTypes = {
        children: PropTypes.func.isRequired
    };
    var _excluded$1 = [
        "on",
        "session"
    ];
    var CheckoutSdkContext = /*#__PURE__*/ React.createContext(null);
    CheckoutSdkContext.displayName = 'CheckoutSdkContext';
    var parseCheckoutSdkContext = function parseCheckoutSdkContext(ctx, useCase) {
        if (!ctx) {
            throw new Error("Could not find CheckoutProvider context; You need to wrap the part of your app that ".concat(useCase, " in an <CheckoutProvider> provider."));
        }
        return ctx;
    };
    var CheckoutContext = /*#__PURE__*/ React.createContext(null);
    CheckoutContext.displayName = 'CheckoutContext';
    var extractCheckoutContextValue = function extractCheckoutContextValue(checkoutSdk, sessionState) {
        if (!checkoutSdk) {
            return null;
        }
        checkoutSdk.on;
        checkoutSdk.session;
        var actions = _objectWithoutProperties(checkoutSdk, _excluded$1);
        if (!sessionState) {
            return Object.assign(checkoutSdk.session(), actions);
        }
        return Object.assign(sessionState, actions);
    };
    var INVALID_STRIPE_ERROR$1 = 'Invalid prop `stripe` supplied to `CheckoutProvider`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.';
    var CheckoutProvider = function CheckoutProvider(_ref) {
        var rawStripeProp = _ref.stripe, options = _ref.options, children = _ref.children;
        var parsed = React.useMemo({
            "CheckoutProvider.useMemo[parsed]": function() {
                return parseStripeProp(rawStripeProp, INVALID_STRIPE_ERROR$1);
            }
        }["CheckoutProvider.useMemo[parsed]"], [
            rawStripeProp
        ]); // State used to trigger a re-render when sdk.session is updated
        var _React$useState = React.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), session = _React$useState2[0], setSession = _React$useState2[1];
        var _React$useState3 = React.useState({
            "CheckoutProvider.useState[_React$useState3]": function() {
                return {
                    stripe: parsed.tag === 'sync' ? parsed.stripe : null,
                    checkoutSdk: null
                };
            }
        }["CheckoutProvider.useState[_React$useState3]"]), _React$useState4 = _slicedToArray(_React$useState3, 2), ctx = _React$useState4[0], setContext = _React$useState4[1];
        var safeSetContext = function safeSetContext(stripe, checkoutSdk) {
            setContext(function(ctx) {
                if (ctx.stripe && ctx.checkoutSdk) {
                    return ctx;
                }
                return {
                    stripe: stripe,
                    checkoutSdk: checkoutSdk
                };
            });
        }; // Ref used to avoid calling initCheckout multiple times when options changes
        var initCheckoutCalledRef = React.useRef(false);
        React.useEffect({
            "CheckoutProvider.useEffect": function() {
                var isMounted = true;
                if (parsed.tag === 'async' && !ctx.stripe) {
                    parsed.stripePromise.then({
                        "CheckoutProvider.useEffect": function(stripe) {
                            if (stripe && isMounted && !initCheckoutCalledRef.current) {
                                // Only update context if the component is still mounted
                                // and stripe is not null. We allow stripe to be null to make
                                // handling SSR easier.
                                initCheckoutCalledRef.current = true;
                                stripe.initCheckout(options).then({
                                    "CheckoutProvider.useEffect": function(checkoutSdk) {
                                        if (checkoutSdk) {
                                            safeSetContext(stripe, checkoutSdk);
                                            checkoutSdk.on('change', setSession);
                                        }
                                    }
                                }["CheckoutProvider.useEffect"]);
                            }
                        }
                    }["CheckoutProvider.useEffect"]);
                } else if (parsed.tag === 'sync' && parsed.stripe && !initCheckoutCalledRef.current) {
                    initCheckoutCalledRef.current = true;
                    parsed.stripe.initCheckout(options).then({
                        "CheckoutProvider.useEffect": function(checkoutSdk) {
                            if (checkoutSdk) {
                                safeSetContext(parsed.stripe, checkoutSdk);
                                checkoutSdk.on('change', setSession);
                            }
                        }
                    }["CheckoutProvider.useEffect"]);
                }
                return ({
                    "CheckoutProvider.useEffect": function() {
                        isMounted = false;
                    }
                })["CheckoutProvider.useEffect"];
            }
        }["CheckoutProvider.useEffect"], [
            parsed,
            ctx,
            options,
            setSession
        ]); // Warn on changes to stripe prop
        var prevStripe = usePrevious(rawStripeProp);
        React.useEffect({
            "CheckoutProvider.useEffect": function() {
                if (prevStripe !== null && prevStripe !== rawStripeProp) {
                    console.warn('Unsupported prop change on CheckoutProvider: You cannot change the `stripe` prop after setting it.');
                }
            }
        }["CheckoutProvider.useEffect"], [
            prevStripe,
            rawStripeProp
        ]); // Apply updates to elements when options prop has relevant changes
        var prevOptions = usePrevious(options);
        var prevCheckoutSdk = usePrevious(ctx.checkoutSdk);
        React.useEffect({
            "CheckoutProvider.useEffect": function() {
                var _prevOptions$elements, _options$elementsOpti, _prevOptions$elements2, _options$elementsOpti2;
                // Ignore changes while checkout sdk is not initialized.
                if (!ctx.checkoutSdk) {
                    return;
                }
                var hasSdkLoaded = Boolean(!prevCheckoutSdk && ctx.checkoutSdk); // Handle appearance changes
                var previousAppearance = prevOptions === null || prevOptions === void 0 ? void 0 : (_prevOptions$elements = prevOptions.elementsOptions) === null || _prevOptions$elements === void 0 ? void 0 : _prevOptions$elements.appearance;
                var currentAppearance = options === null || options === void 0 ? void 0 : (_options$elementsOpti = options.elementsOptions) === null || _options$elementsOpti === void 0 ? void 0 : _options$elementsOpti.appearance;
                var hasAppearanceChanged = !isEqual(currentAppearance, previousAppearance);
                if (currentAppearance && (hasAppearanceChanged || hasSdkLoaded)) {
                    ctx.checkoutSdk.changeAppearance(currentAppearance);
                } // Handle fonts changes
                var previousFonts = prevOptions === null || prevOptions === void 0 ? void 0 : (_prevOptions$elements2 = prevOptions.elementsOptions) === null || _prevOptions$elements2 === void 0 ? void 0 : _prevOptions$elements2.fonts;
                var currentFonts = options === null || options === void 0 ? void 0 : (_options$elementsOpti2 = options.elementsOptions) === null || _options$elementsOpti2 === void 0 ? void 0 : _options$elementsOpti2.fonts;
                var hasFontsChanged = !isEqual(previousFonts, currentFonts);
                if (currentFonts && (hasFontsChanged || hasSdkLoaded)) {
                    ctx.checkoutSdk.loadFonts(currentFonts);
                }
            }
        }["CheckoutProvider.useEffect"], [
            options,
            prevOptions,
            ctx.checkoutSdk,
            prevCheckoutSdk
        ]); // Attach react-stripe-js version to stripe.js instance
        React.useEffect({
            "CheckoutProvider.useEffect": function() {
                registerWithStripeJs(ctx.stripe);
            }
        }["CheckoutProvider.useEffect"], [
            ctx.stripe
        ]);
        var checkoutContextValue = React.useMemo({
            "CheckoutProvider.useMemo[checkoutContextValue]": function() {
                return extractCheckoutContextValue(ctx.checkoutSdk, session);
            }
        }["CheckoutProvider.useMemo[checkoutContextValue]"], [
            ctx.checkoutSdk,
            session
        ]);
        if (!ctx.checkoutSdk) {
            return null;
        }
        return /*#__PURE__*/ React.createElement(CheckoutSdkContext.Provider, {
            value: ctx
        }, /*#__PURE__*/ React.createElement(CheckoutContext.Provider, {
            value: checkoutContextValue
        }, children));
    };
    CheckoutProvider.propTypes = {
        stripe: PropTypes.any,
        options: PropTypes.shape({
            fetchClientSecret: PropTypes.func.isRequired,
            elementsOptions: PropTypes.object
        }).isRequired
    };
    var useCheckoutSdkContextWithUseCase = function useCheckoutSdkContextWithUseCase(useCaseString) {
        var ctx = React.useContext(CheckoutSdkContext);
        return parseCheckoutSdkContext(ctx, useCaseString);
    };
    var useElementsOrCheckoutSdkContextWithUseCase = function useElementsOrCheckoutSdkContextWithUseCase(useCaseString) {
        var checkoutSdkContext = React.useContext(CheckoutSdkContext);
        var elementsContext = React.useContext(ElementsContext);
        if (checkoutSdkContext && elementsContext) {
            throw new Error("You cannot wrap the part of your app that ".concat(useCaseString, " in both <CheckoutProvider> and <Elements> providers."));
        }
        if (checkoutSdkContext) {
            return parseCheckoutSdkContext(checkoutSdkContext, useCaseString);
        }
        return parseElementsContext(elementsContext, useCaseString);
    };
    var useCheckout = function useCheckout() {
        // ensure it's in CheckoutProvider
        useCheckoutSdkContextWithUseCase('calls useCheckout()');
        var ctx = React.useContext(CheckoutContext);
        if (!ctx) {
            throw new Error('Could not find Checkout Context; You need to wrap the part of your app that calls useCheckout() in an <CheckoutProvider> provider.');
        }
        return ctx;
    };
    var _excluded = [
        "mode"
    ];
    var capitalized = function capitalized(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    var createElementComponent = function createElementComponent(type, isServer) {
        var displayName = "".concat(capitalized(type), "Element");
        var ClientElement = function ClientElement(_ref) {
            var id = _ref.id, className = _ref.className, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, onBlur = _ref.onBlur, onFocus = _ref.onFocus, onReady = _ref.onReady, onChange = _ref.onChange, onEscape = _ref.onEscape, onClick = _ref.onClick, onLoadError = _ref.onLoadError, onLoaderStart = _ref.onLoaderStart, onNetworksChange = _ref.onNetworksChange, onConfirm = _ref.onConfirm, onCancel = _ref.onCancel, onShippingAddressChange = _ref.onShippingAddressChange, onShippingRateChange = _ref.onShippingRateChange, onSavedPaymentMethodRemove = _ref.onSavedPaymentMethodRemove, onSavedPaymentMethodUpdate = _ref.onSavedPaymentMethodUpdate;
            var ctx = useElementsOrCheckoutSdkContextWithUseCase("mounts <".concat(displayName, ">"));
            var elements = 'elements' in ctx ? ctx.elements : null;
            var checkoutSdk = 'checkoutSdk' in ctx ? ctx.checkoutSdk : null;
            var _React$useState = React.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), element = _React$useState2[0], setElement = _React$useState2[1];
            var elementRef = React.useRef(null);
            var domNode = React.useRef(null); // For every event where the merchant provides a callback, call element.on
            // with that callback. If the merchant ever changes the callback, removes
            // the old callback with element.off and then call element.on with the new one.
            useAttachEvent(element, 'blur', onBlur);
            useAttachEvent(element, 'focus', onFocus);
            useAttachEvent(element, 'escape', onEscape);
            useAttachEvent(element, 'click', onClick);
            useAttachEvent(element, 'loaderror', onLoadError);
            useAttachEvent(element, 'loaderstart', onLoaderStart);
            useAttachEvent(element, 'networkschange', onNetworksChange);
            useAttachEvent(element, 'confirm', onConfirm);
            useAttachEvent(element, 'cancel', onCancel);
            useAttachEvent(element, 'shippingaddresschange', onShippingAddressChange);
            useAttachEvent(element, 'shippingratechange', onShippingRateChange);
            useAttachEvent(element, 'savedpaymentmethodremove', onSavedPaymentMethodRemove);
            useAttachEvent(element, 'savedpaymentmethodupdate', onSavedPaymentMethodUpdate);
            useAttachEvent(element, 'change', onChange);
            var readyCallback;
            if (onReady) {
                if (type === 'expressCheckout') {
                    // Passes through the event, which includes visible PM types
                    readyCallback = onReady;
                } else {
                    // For other Elements, pass through the Element itself.
                    readyCallback = function readyCallback() {
                        onReady(element);
                    };
                }
            }
            useAttachEvent(element, 'ready', readyCallback);
            React.useLayoutEffect({
                "createElementComponent.ClientElement.useLayoutEffect": function() {
                    if (elementRef.current === null && domNode.current !== null && (elements || checkoutSdk)) {
                        var newElement = null;
                        if (checkoutSdk) {
                            switch(type){
                                case 'payment':
                                    newElement = checkoutSdk.createPaymentElement(options);
                                    break;
                                case 'address':
                                    if ('mode' in options) {
                                        var mode = options.mode, restOptions = _objectWithoutProperties(options, _excluded);
                                        if (mode === 'shipping') {
                                            newElement = checkoutSdk.createShippingAddressElement(restOptions);
                                        } else if (mode === 'billing') {
                                            newElement = checkoutSdk.createBillingAddressElement(restOptions);
                                        } else {
                                            throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.");
                                        }
                                    } else {
                                        throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
                                    }
                                    break;
                                case 'expressCheckout':
                                    newElement = checkoutSdk.createExpressCheckoutElement(options);
                                    break;
                                case 'currencySelector':
                                    newElement = checkoutSdk.createCurrencySelectorElement();
                                    break;
                                case 'taxId':
                                    newElement = checkoutSdk.createTaxIdElement(options);
                                    break;
                                default:
                                    throw new Error("Invalid Element type ".concat(displayName, ". You must use either the <PaymentElement />, <AddressElement options={{mode: 'shipping'}} />, <AddressElement options={{mode: 'billing'}} />, or <ExpressCheckoutElement />."));
                            }
                        } else if (elements) {
                            newElement = elements.create(type, options);
                        } // Store element in a ref to ensure it's _immediately_ available in cleanup hooks in StrictMode
                        elementRef.current = newElement; // Store element in state to facilitate event listener attachment
                        setElement(newElement);
                        if (newElement) {
                            newElement.mount(domNode.current);
                        }
                    }
                }
            }["createElementComponent.ClientElement.useLayoutEffect"], [
                elements,
                checkoutSdk,
                options
            ]);
            var prevOptions = usePrevious(options);
            React.useEffect({
                "createElementComponent.ClientElement.useEffect": function() {
                    if (!elementRef.current) {
                        return;
                    }
                    var updates = extractAllowedOptionsUpdates(options, prevOptions, [
                        'paymentRequest'
                    ]);
                    if (updates && 'update' in elementRef.current) {
                        elementRef.current.update(updates);
                    }
                }
            }["createElementComponent.ClientElement.useEffect"], [
                options,
                prevOptions
            ]);
            React.useLayoutEffect({
                "createElementComponent.ClientElement.useLayoutEffect": function() {
                    return ({
                        "createElementComponent.ClientElement.useLayoutEffect": function() {
                            if (elementRef.current && typeof elementRef.current.destroy === 'function') {
                                try {
                                    elementRef.current.destroy();
                                    elementRef.current = null;
                                } catch (error) {}
                            }
                        }
                    })["createElementComponent.ClientElement.useLayoutEffect"];
                }
            }["createElementComponent.ClientElement.useLayoutEffect"], []);
            return /*#__PURE__*/ React.createElement("div", {
                id: id,
                className: className,
                ref: domNode
            });
        }; // Only render the Element wrapper in a server environment.
        var ServerElement = function ServerElement(props) {
            useElementsOrCheckoutSdkContextWithUseCase("mounts <".concat(displayName, ">"));
            var id = props.id, className = props.className;
            return /*#__PURE__*/ React.createElement("div", {
                id: id,
                className: className
            });
        };
        var Element = isServer ? ServerElement : ClientElement;
        Element.propTypes = {
            id: PropTypes.string,
            className: PropTypes.string,
            onChange: PropTypes.func,
            onBlur: PropTypes.func,
            onFocus: PropTypes.func,
            onReady: PropTypes.func,
            onEscape: PropTypes.func,
            onClick: PropTypes.func,
            onLoadError: PropTypes.func,
            onLoaderStart: PropTypes.func,
            onNetworksChange: PropTypes.func,
            onConfirm: PropTypes.func,
            onCancel: PropTypes.func,
            onShippingAddressChange: PropTypes.func,
            onShippingRateChange: PropTypes.func,
            onSavedPaymentMethodRemove: PropTypes.func,
            onSavedPaymentMethodUpdate: PropTypes.func,
            options: PropTypes.object
        };
        Element.displayName = displayName;
        Element.__elementType = type;
        return Element;
    };
    var isServer = typeof window === 'undefined';
    var EmbeddedCheckoutContext = /*#__PURE__*/ React.createContext(null);
    EmbeddedCheckoutContext.displayName = 'EmbeddedCheckoutProviderContext';
    var useEmbeddedCheckoutContext = function useEmbeddedCheckoutContext() {
        var ctx = React.useContext(EmbeddedCheckoutContext);
        if (!ctx) {
            throw new Error('<EmbeddedCheckout> must be used within <EmbeddedCheckoutProvider>');
        }
        return ctx;
    };
    var INVALID_STRIPE_ERROR = 'Invalid prop `stripe` supplied to `EmbeddedCheckoutProvider`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.';
    var EmbeddedCheckoutProvider = function EmbeddedCheckoutProvider(_ref) {
        var rawStripeProp = _ref.stripe, options = _ref.options, children = _ref.children;
        var parsed = React.useMemo({
            "EmbeddedCheckoutProvider.useMemo[parsed]": function() {
                return parseStripeProp(rawStripeProp, INVALID_STRIPE_ERROR);
            }
        }["EmbeddedCheckoutProvider.useMemo[parsed]"], [
            rawStripeProp
        ]);
        var embeddedCheckoutPromise = React.useRef(null);
        var loadedStripe = React.useRef(null);
        var _React$useState = React.useState({
            embeddedCheckout: null
        }), _React$useState2 = _slicedToArray(_React$useState, 2), ctx = _React$useState2[0], setContext = _React$useState2[1];
        React.useEffect({
            "EmbeddedCheckoutProvider.useEffect": function() {
                // Don't support any ctx updates once embeddedCheckout or stripe is set.
                if (loadedStripe.current || embeddedCheckoutPromise.current) {
                    return;
                }
                var setStripeAndInitEmbeddedCheckout = function setStripeAndInitEmbeddedCheckout(stripe) {
                    if (loadedStripe.current || embeddedCheckoutPromise.current) return;
                    loadedStripe.current = stripe;
                    embeddedCheckoutPromise.current = loadedStripe.current.initEmbeddedCheckout(options).then({
                        "EmbeddedCheckoutProvider.useEffect.setStripeAndInitEmbeddedCheckout": function(embeddedCheckout) {
                            setContext({
                                embeddedCheckout: embeddedCheckout
                            });
                        }
                    }["EmbeddedCheckoutProvider.useEffect.setStripeAndInitEmbeddedCheckout"]);
                }; // For an async stripePromise, store it once resolved
                if (parsed.tag === 'async' && !loadedStripe.current && (options.clientSecret || options.fetchClientSecret)) {
                    parsed.stripePromise.then({
                        "EmbeddedCheckoutProvider.useEffect": function(stripe) {
                            if (stripe) {
                                setStripeAndInitEmbeddedCheckout(stripe);
                            }
                        }
                    }["EmbeddedCheckoutProvider.useEffect"]);
                } else if (parsed.tag === 'sync' && !loadedStripe.current && (options.clientSecret || options.fetchClientSecret)) {
                    // Or, handle a sync stripe instance going from null -> populated
                    setStripeAndInitEmbeddedCheckout(parsed.stripe);
                }
            }
        }["EmbeddedCheckoutProvider.useEffect"], [
            parsed,
            options,
            ctx,
            loadedStripe
        ]);
        React.useEffect({
            "EmbeddedCheckoutProvider.useEffect": function() {
                // cleanup on unmount
                return ({
                    "EmbeddedCheckoutProvider.useEffect": function() {
                        // If embedded checkout is fully initialized, destroy it.
                        if (ctx.embeddedCheckout) {
                            embeddedCheckoutPromise.current = null;
                            ctx.embeddedCheckout.destroy();
                        } else if (embeddedCheckoutPromise.current) {
                            // If embedded checkout is still initializing, destroy it once
                            // it's done. This could be caused by unmounting very quickly
                            // after mounting.
                            embeddedCheckoutPromise.current.then({
                                "EmbeddedCheckoutProvider.useEffect": function() {
                                    embeddedCheckoutPromise.current = null;
                                    if (ctx.embeddedCheckout) {
                                        ctx.embeddedCheckout.destroy();
                                    }
                                }
                            }["EmbeddedCheckoutProvider.useEffect"]);
                        }
                    }
                })["EmbeddedCheckoutProvider.useEffect"];
            }
        }["EmbeddedCheckoutProvider.useEffect"], [
            ctx.embeddedCheckout
        ]); // Attach react-stripe-js version to stripe.js instance
        React.useEffect({
            "EmbeddedCheckoutProvider.useEffect": function() {
                registerWithStripeJs(loadedStripe);
            }
        }["EmbeddedCheckoutProvider.useEffect"], [
            loadedStripe
        ]); // Warn on changes to stripe prop.
        // The stripe prop value can only go from null to non-null once and
        // can't be changed after that.
        var prevStripe = usePrevious(rawStripeProp);
        React.useEffect({
            "EmbeddedCheckoutProvider.useEffect": function() {
                if (prevStripe !== null && prevStripe !== rawStripeProp) {
                    console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the `stripe` prop after setting it.');
                }
            }
        }["EmbeddedCheckoutProvider.useEffect"], [
            prevStripe,
            rawStripeProp
        ]); // Warn on changes to options.
        var prevOptions = usePrevious(options);
        React.useEffect({
            "EmbeddedCheckoutProvider.useEffect": function() {
                if (prevOptions == null) {
                    return;
                }
                if (options == null) {
                    console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot unset options after setting them.');
                    return;
                }
                if (options.clientSecret === undefined && options.fetchClientSecret === undefined) {
                    console.warn('Invalid props passed to EmbeddedCheckoutProvider: You must provide one of either `options.fetchClientSecret` or `options.clientSecret`.');
                }
                if (prevOptions.clientSecret != null && options.clientSecret !== prevOptions.clientSecret) {
                    console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the client secret after setting it. Unmount and create a new instance of EmbeddedCheckoutProvider instead.');
                }
                if (prevOptions.fetchClientSecret != null && options.fetchClientSecret !== prevOptions.fetchClientSecret) {
                    console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change fetchClientSecret after setting it. Unmount and create a new instance of EmbeddedCheckoutProvider instead.');
                }
                if (prevOptions.onComplete != null && options.onComplete !== prevOptions.onComplete) {
                    console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the onComplete option after setting it.');
                }
                if (prevOptions.onShippingDetailsChange != null && options.onShippingDetailsChange !== prevOptions.onShippingDetailsChange) {
                    console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the onShippingDetailsChange option after setting it.');
                }
                if (prevOptions.onLineItemsChange != null && options.onLineItemsChange !== prevOptions.onLineItemsChange) {
                    console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the onLineItemsChange option after setting it.');
                }
            }
        }["EmbeddedCheckoutProvider.useEffect"], [
            prevOptions,
            options
        ]);
        return /*#__PURE__*/ React.createElement(EmbeddedCheckoutContext.Provider, {
            value: ctx
        }, children);
    };
    var EmbeddedCheckoutClientElement = function EmbeddedCheckoutClientElement(_ref) {
        var id = _ref.id, className = _ref.className;
        var _useEmbeddedCheckoutC = useEmbeddedCheckoutContext(), embeddedCheckout = _useEmbeddedCheckoutC.embeddedCheckout;
        var isMounted = React.useRef(false);
        var domNode = React.useRef(null);
        React.useLayoutEffect({
            "EmbeddedCheckoutClientElement.useLayoutEffect": function() {
                if (!isMounted.current && embeddedCheckout && domNode.current !== null) {
                    embeddedCheckout.mount(domNode.current);
                    isMounted.current = true;
                } // Clean up on unmount
                return ({
                    "EmbeddedCheckoutClientElement.useLayoutEffect": function() {
                        if (isMounted.current && embeddedCheckout) {
                            try {
                                embeddedCheckout.unmount();
                                isMounted.current = false;
                            } catch (e) {
                            // Parent effects are destroyed before child effects, so
                            // in cases where both the EmbeddedCheckoutProvider and
                            // the EmbeddedCheckout component are removed at the same
                            // time, the embeddedCheckout instance will be destroyed,
                            // which causes an error when calling unmount.
                            }
                        }
                    }
                })["EmbeddedCheckoutClientElement.useLayoutEffect"];
            }
        }["EmbeddedCheckoutClientElement.useLayoutEffect"], [
            embeddedCheckout
        ]);
        return /*#__PURE__*/ React.createElement("div", {
            ref: domNode,
            id: id,
            className: className
        });
    }; // Only render the wrapper in a server environment.
    var EmbeddedCheckoutServerElement = function EmbeddedCheckoutServerElement(_ref2) {
        var id = _ref2.id, className = _ref2.className;
        // Validate that we are in the right context by calling useEmbeddedCheckoutContext.
        useEmbeddedCheckoutContext();
        return /*#__PURE__*/ React.createElement("div", {
            id: id,
            className: className
        });
    };
    var EmbeddedCheckout = isServer ? EmbeddedCheckoutServerElement : EmbeddedCheckoutClientElement;
    /**
   * @docs https://stripe.com/docs/stripe-js/react#usestripe-hook
   */ var useStripe = function useStripe() {
        var _useElementsOrCheckou = useElementsOrCheckoutSdkContextWithUseCase('calls useStripe()'), stripe = _useElementsOrCheckou.stripe;
        return stripe;
    };
    /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var AuBankAccountElement = createElementComponent('auBankAccount', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var CardElement = createElementComponent('card', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var CardNumberElement = createElementComponent('cardNumber', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var CardExpiryElement = createElementComponent('cardExpiry', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var CardCvcElement = createElementComponent('cardCvc', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var FpxBankElement = createElementComponent('fpxBank', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var IbanElement = createElementComponent('iban', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var IdealBankElement = createElementComponent('idealBank', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var P24BankElement = createElementComponent('p24Bank', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var EpsBankElement = createElementComponent('epsBank', isServer);
    var PaymentElement = createElementComponent('payment', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var ExpressCheckoutElement = createElementComponent('expressCheckout', isServer);
    /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   */ var CurrencySelectorElement = createElementComponent('currencySelector', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var PaymentRequestButtonElement = createElementComponent('paymentRequestButton', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var LinkAuthenticationElement = createElementComponent('linkAuthentication', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var AddressElement = createElementComponent('address', isServer);
    /**
   * @deprecated
   * Use `AddressElement` instead.
   *
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var ShippingAddressElement = createElementComponent('shippingAddress', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var PaymentMethodMessagingElement = createElementComponent('paymentMethodMessaging', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var AffirmMessageElement = createElementComponent('affirmMessage', isServer);
    /**
   * @docs https://stripe.com/docs/stripe-js/react#element-components
   */ var AfterpayClearpayMessageElement = createElementComponent('afterpayClearpayMessage', isServer);
    /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   */ var TaxIdElement = createElementComponent('taxId', isServer);
    exports1.AddressElement = AddressElement;
    exports1.AffirmMessageElement = AffirmMessageElement;
    exports1.AfterpayClearpayMessageElement = AfterpayClearpayMessageElement;
    exports1.AuBankAccountElement = AuBankAccountElement;
    exports1.CardCvcElement = CardCvcElement;
    exports1.CardElement = CardElement;
    exports1.CardExpiryElement = CardExpiryElement;
    exports1.CardNumberElement = CardNumberElement;
    exports1.CheckoutProvider = CheckoutProvider;
    exports1.CurrencySelectorElement = CurrencySelectorElement;
    exports1.Elements = Elements;
    exports1.ElementsConsumer = ElementsConsumer;
    exports1.EmbeddedCheckout = EmbeddedCheckout;
    exports1.EmbeddedCheckoutProvider = EmbeddedCheckoutProvider;
    exports1.EpsBankElement = EpsBankElement;
    exports1.ExpressCheckoutElement = ExpressCheckoutElement;
    exports1.FpxBankElement = FpxBankElement;
    exports1.IbanElement = IbanElement;
    exports1.IdealBankElement = IdealBankElement;
    exports1.LinkAuthenticationElement = LinkAuthenticationElement;
    exports1.P24BankElement = P24BankElement;
    exports1.PaymentElement = PaymentElement;
    exports1.PaymentMethodMessagingElement = PaymentMethodMessagingElement;
    exports1.PaymentRequestButtonElement = PaymentRequestButtonElement;
    exports1.ShippingAddressElement = ShippingAddressElement;
    exports1.TaxIdElement = TaxIdElement;
    exports1.useCheckout = useCheckout;
    exports1.useElements = useElements;
    exports1.useStripe = useStripe;
});
}),
]);

//# sourceMappingURL=_896f2c92._.js.map