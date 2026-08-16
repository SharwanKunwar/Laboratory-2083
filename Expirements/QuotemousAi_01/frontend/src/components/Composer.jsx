import React, { useState } from 'react'
import axios from 'axios'

export default function Composer({ onPosted }) {
    const [content, setContent] = useState('')
    const [nickname, setNickname] = useState('')
    const [feeling, setFeeling] = useState('HAPPY')
    const [sending, setSending] = useState(false)

    async function submit() {
        if (content.trim().length < 3) return alert('Content too short')
        setSending(true)
        try {
            await axios.post('/api/quotes', { content, nickname, feeling })
            setContent('')
            onPosted()
        } catch (err) {
            alert(err?.response?.data || 'Post failed')
        } finally { setSending(false) }
    }

    return (
        <div className="composer">
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Share something..." />
            <div className="composer-row">
                <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Nickname (optional)" />
                <select value={feeling} onChange={e => setFeeling(e.target.value)}>
                    {['HAPPY', 'SAD', 'BROKEN', 'HOPEFUL', 'ANGRY', 'GRATEFUL', 'LONELY', 'PEACEFUL', 'NOSTALGIC', 'MOTIVATED'].map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <button disabled={sending} onClick={submit}>{sending ? 'Posting...' : 'Post'}</button>
            </div>
            <div className="charcount">{content.length}/500</div>
        </div>
    )
}
