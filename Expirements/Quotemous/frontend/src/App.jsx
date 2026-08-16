import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Feed from './components/Feed'
import Composer from './components/Composer'

export default function App() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const load = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/api/quotes?page=0&size=50')
            setPosts(res.data)
        } finally { setLoading(false) }
    }

    useEffect(() => { load() }, [])

    const onPosted = (newPost) => { // refresh feed
        load()
    }

    return (
        <div className="app">
            <header className="app-header">Quotemous</header>
            <Composer onPosted={onPosted} />
            <main>
                <Feed posts={posts} loading={loading} onReacted={() => load()} />
            </main>
        </div>
    )
}
