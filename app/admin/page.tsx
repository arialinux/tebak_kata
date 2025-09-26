export default function AdminPage() {
    // FLAG diambil dari environment variable VERCEL/Process env
    const flag = process.env.FLAG || "FGTE{example_flag}";

    return (
        <main style={{ padding: 32, fontFamily: 'system-ui, sans-serif' }}>
            <h1>Admin Panel</h1>
                <p>Congrats — kamu berhasil masuk ke admin panel.</p>
                <pre style={{ background: '#f4f4f4', padding: 12, borderRadius: 6 }}>{flag}</pre>
        </main>
    );
}
