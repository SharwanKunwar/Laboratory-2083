import React, { useState } from 'react'
import axios from 'axios'

export default function QuoteCard({ post, onReacted }) {
    const [localCounts, setLocalCounts] = useState(post.reactions || {})
    const reactedKey = 'reacted_v1'
    const reacted = new Set(JSON.parse(localStorage.getItem(reactedKey) || '[]'))

    async function react(type) {
        if (reacted.has(post.id)) return
        // optimistic
        setLocalCounts(c => ({ ...c, [type]: (c[type] || 0) + 1 }))
        reacted.add(post.id)
        localStorage.setItem(reactedKey, JSON.stringify(Array.from(reacted)))
        try {
            await axios.post(`/api/quotes/${post.id}/react`, { type })
            onReacted && onReacted()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="card">
            <div className="content">{post.content}</div>
            <div className="meta">— {post.nickname || 'Anonymous'} • <span className="feeling">{post.feeling}</span></div>
            <div className="reactions">
                {['LOVE', 'RELATE', 'INSPIRED', 'SAD'].map(t => (
                    <button key={t} className="react-btn" onClick={() => react(t)}>{t} {(localCounts[t] || 0)}</button>
                ))}
            </div>
        </div>
    )
}
