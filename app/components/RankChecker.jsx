"use client";
import { useState } from "react";


export default function RankChecker() {
const [username, setUsername] = useState("");
const [loading, setLoading] = useState(false);
const [result, setResult] = useState(null);
const [error, setError] = useState(null);


async function handleCheck(e) {
e.preventDefault();
setLoading(true);
setResult(null);
setError(null);


try {
const res = await fetch(`/api/twitter?username=${encodeURIComponent(username || "zama")}`);
const json = await res.json();
if (!res.ok) {
setError(json.error || JSON.stringify(json));
} else {
setResult(json);
}
} catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
}


return (
<div style={{ maxWidth: 720, margin: "24px auto", padding: 16 }}>
<h2>Zama Rank Checker — Simple</h2>
<form onSubmit={handleCheck} style={{ marginBottom: 12 }}>
<input
placeholder="Twitter username (without @) — e.g. zama"
value={username}
onChange={(e) => setUsername(e.target.value)}
style={{ padding: 8, width: "60%", marginRight: 8 }}
/>
<button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
{loading ? "Checking..." : "Check"}
</button>
</form>


{error && (
<div style={{ color: "#800", marginBottom: 12 }}>
<strong>Error:</strong> {String(error)}
</div>
)}


{result && (
}
