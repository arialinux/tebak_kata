import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    // Hanya protect route /admin
    if (url.pathname.startsWith("/admin")) {
        // Ambil cookie "auth" (string sederhana)
        const auth = req.cookies.get("auth")?.value || "";
        // VULNERABLE: pengecekan yang terlalu kaku/salah yang bisa dibypass
        // Contoh: mengira cookie harus persis "admin", tapi karena encoding atau
        // parsing, attacker bisa menyisipkan encoding yang lolos.
        if (!/^admin$/.test(auth)) {
            // redirect ke home
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/admin"]
};
