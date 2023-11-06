import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Articles() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/articles')
            const articles = await response.json()
            setArticles(articles)
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1 className='wt-title'>
                Web technologies articles
            </h1>
            <p className="italic font-bold my-5">This page fetch data from the client side, not good for SEO.</p>
            <ul>
                {articles.map(article => (
                    <li key={article.slug} className="my-5">
                        <h2 className="font-bold mb-1">
                            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                        </h2>
                        <p>{article.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}