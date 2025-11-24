'use client';
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const check = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setData(null);

    const cleanUsername = username.replace('@', '').trim();

    try {
      const res = await fetch(`/api/checker/${cleanUsername}`);

      const json = await res.json();

      if (res.ok && json.data) {
        // Success – you have tweets
        const tweets = json.data;
        const posts = tweets.length;
        const impressions = tweets.reduce((sum: number, t: any) => sum + (t.public_metrics?.impression_count || 0), 0);
        const er = posts > 0 ? (impressions / posts).toFixed(2) : '0';

        setData({
          username: cleanUsername,
          posts,
          impressions,
          er,
          estimatedRank: posts >= 10 ? 'Top 100' : posts >= 5 ? 'Top 500' : 'Unranked',
        });
      } else {
        setError(json.error || 'No recent posts found');
      }
    } catch (err) {
      setError('Failed to connect – check your internet or try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ color: '#000' }}>Zama Season 4 Rank Checker</h1>
      <p style={{ color: '#000' }}>Type your @username to check your real-time Zama stats!</p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          placeholder="e.g. barudkhanweb3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '12px', width: '300px', border: '1px solid #ccc', borderRadius: '8px 0 0 8px' }}
        />
        <button
          onClick={check}
          disabled={loading || !username}
          style={{ padding: '12px 20px', background: '#FFD700', color: '#000', border: 'none', borderRadius: '0 8px 8px 0', cursor: 'pointer' }}
        >
          {loading ? 'Checking...' : 'Check Rank'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div style={{ padding: '20px', background: '#1a1a1a', color: '#fff', borderRadius: '12px', border: '1px solid #FFD700' }}>
          <h2 style={{ color: '#FFD700' }}>@{data.username}</h2>
          <p><strong>Posts:</strong> {data.posts}</p>
          <p><strong>Impressions:</strong> {data.impressions.toLocaleString()}</p>
          <p><strong>ER (Avg Impressions/Post):</strong> {data.er}</p>
          <p><strong>Estimated Rank:</strong> {data.estimatedRank}</p>
        </div>
      )}
    </div>
  );
}
