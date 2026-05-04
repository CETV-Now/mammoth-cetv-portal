module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
const uri = process.env.MONGODB_URI;
const options = {};
let client;
let clientPromise;
if ("TURBOPACK compile-time truthy", 1) {
    let globalWithMongo = /*TURBOPACK member replacement*/ __turbopack_context__.g;
    if (!globalWithMongo._mongoClientPromise) {
        client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else //TURBOPACK unreachable
;
const __TURBOPACK__default__export__ = clientPromise;
}),
"[project]/app/api/playlists/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
;
;
;
async function GET(_req, { params }) {
    const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) {
        return Response.json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    const { id } = await params;
    let playlistId;
    try {
        playlistId = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id);
    } catch  {
        return Response.json({
            error: "Invalid playlist id"
        }, {
            status: 400
        });
    }
    const client = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"];
    const db = client.db(process.env.MONGODB_DB);
    const user = await db.collection("users").findOne({
        clerk_user_id: userId
    });
    if (!user) {
        return Response.json({
            error: "User not found"
        }, {
            status: 404
        });
    }
    const account = await db.collection("accounts").findOne({
        _id: user.account_id
    });
    if (!account) {
        return Response.json({
            error: "Account not found"
        }, {
            status: 404
        });
    }
    const playlist = await db.collection("playlists").findOne({
        _id: playlistId
    });
    if (!playlist) {
        return Response.json({
            error: "Playlist not found"
        }, {
            status: 404
        });
    }
    if (playlist.account_id.toString() !== account._id.toString()) {
        return Response.json({
            error: "Forbidden"
        }, {
            status: 403
        });
    }
    const assignedScreens = await db.collection("screens").find({
        account_id: account._id,
        playlist_id: playlistId
    }).toArray();
    const serializedContent = (playlist.content ?? []).map((item)=>({
            id: item.id ? item.id.toString() : null,
            name: item.name
        }));
    const serializedChannels = (playlist.channels ?? []).map((item)=>({
            id: item.id ? item.id.toString() : null,
            name: item.name
        }));
    return Response.json({
        _id: playlist._id.toString(),
        account_id: playlist.account_id.toString(),
        name: playlist.name,
        status: playlist.status,
        content: serializedContent,
        channels: serializedChannels,
        screen_ids: assignedScreens.map((s)=>s._id.toString()),
        created_at: playlist.created_at?.toISOString() ?? null,
        updated_at: playlist.updated_at?.toISOString() ?? null
    });
}
async function PATCH(req, { params }) {
    const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) {
        return Response.json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    const { id } = await params;
    let playlistId;
    try {
        playlistId = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id);
    } catch  {
        return Response.json({
            error: "Invalid playlist id"
        }, {
            status: 400
        });
    }
    const client = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"];
    const db = client.db(process.env.MONGODB_DB);
    const user = await db.collection("users").findOne({
        clerk_user_id: userId
    });
    if (!user) {
        return Response.json({
            error: "User not found"
        }, {
            status: 404
        });
    }
    const account = await db.collection("accounts").findOne({
        _id: user.account_id
    });
    if (!account) {
        return Response.json({
            error: "Account not found"
        }, {
            status: 404
        });
    }
    const playlist = await db.collection("playlists").findOne({
        _id: playlistId
    });
    if (!playlist) {
        return Response.json({
            error: "Playlist not found"
        }, {
            status: 404
        });
    }
    if (playlist.account_id.toString() !== account._id.toString()) {
        return Response.json({
            error: "Forbidden"
        }, {
            status: 403
        });
    }
    const body = await req.json();
    const now = new Date();
    if (body.action === "archive") {
        await db.collection("playlists").updateOne({
            _id: playlistId
        }, {
            $set: {
                status: "archived",
                updated_at: now
            }
        });
        return Response.json({
            success: true
        });
    }
    const { name, content, channels, screen_ids } = body;
    const contentItems = (content ?? []).map((item)=>({
            id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](item.id),
            name: item.name
        }));
    const channelItems = (channels ?? []).map((item)=>({
            id: item.id ? new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](item.id) : null,
            name: item.name
        }));
    await db.collection("playlists").updateOne({
        _id: playlistId
    }, {
        $set: {
            name,
            content: contentItems,
            channels: channelItems,
            updated_at: now
        }
    });
    const newScreenObjectIds = Array.isArray(screen_ids) && screen_ids.length > 0 ? screen_ids.map((sid)=>new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](sid)) : [];
    // Assign playlist to newly selected screens
    if (newScreenObjectIds.length > 0) {
        await db.collection("screens").updateMany({
            _id: {
                $in: newScreenObjectIds
            },
            account_id: account._id
        }, {
            $set: {
                playlist_id: playlistId,
                updated_at: now
            }
        });
    }
    // Remove playlist from screens that were deselected
    await db.collection("screens").updateMany({
        account_id: account._id,
        playlist_id: playlistId,
        ...newScreenObjectIds.length > 0 ? {
            _id: {
                $nin: newScreenObjectIds
            }
        } : {}
    }, {
        $set: {
            playlist_id: null,
            updated_at: now
        }
    });
    return Response.json({
        success: true
    });
}
async function DELETE(_req, { params }) {
    const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) {
        return Response.json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    const { id } = await params;
    let playlistId;
    try {
        playlistId = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id);
    } catch  {
        return Response.json({
            error: "Invalid playlist id"
        }, {
            status: 400
        });
    }
    const client = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"];
    const db = client.db(process.env.MONGODB_DB);
    const user = await db.collection("users").findOne({
        clerk_user_id: userId
    });
    if (!user) {
        return Response.json({
            error: "User not found"
        }, {
            status: 404
        });
    }
    const account = await db.collection("accounts").findOne({
        _id: user.account_id
    });
    if (!account) {
        return Response.json({
            error: "Account not found"
        }, {
            status: 404
        });
    }
    const playlist = await db.collection("playlists").findOne({
        _id: playlistId
    });
    if (!playlist) {
        return Response.json({
            error: "Playlist not found"
        }, {
            status: 404
        });
    }
    if (playlist.account_id.toString() !== account._id.toString()) {
        return Response.json({
            error: "Forbidden"
        }, {
            status: 403
        });
    }
    await db.collection("playlists").deleteOne({
        _id: playlistId
    });
    const now = new Date();
    await db.collection("screens").updateMany({
        account_id: account._id,
        playlist_id: playlistId
    }, {
        $set: {
            playlist_id: null,
            updated_at: now
        }
    });
    return Response.json({
        success: true
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d95cce00._.js.map