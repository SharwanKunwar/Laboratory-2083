import React from 'react'
import QuoteCard from './QuoteCard'

export default function Feed({ posts, loading, onReacted }) {
    if (loading) return <div className="muted">Loading...</div>
    if (!posts || posts.length === 0) return <div className="muted">No posts yet</div>
    return (
        <div className="feed">
            {posts.map(p => <QuoteCard key={p.id} post={p} onReacted={onReacted} />)}
        </div>
    )
}
