import React, { useState, useEffect, Component } from 'react';
import Article from './Article';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// TODO: Refactor to Function Component & Hooks.
const List = (props) => {
   const [selected, setSelected] = useState(-1);
   const [loading, setLoading] = useState(true);
   const [articles, setArticles] = useState(null);

  const handleClick = id => setSelected(id);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const resp = await fetch(API_URL);
        const data = await resp.json();
        if(Array.isArray(data) && data.length > 0) {
          const top10 = data.slice(0, 10);
          const articles = top10.sort( (a, b) => {
               const A = a.title.toUpperCase();
               const B = b.title.toUpperCase();

               return A - B > 0 ? 1 : A - B === 0 ? 0 : -1;

          });
          setArticles(articles);
         
        }
        setLoading(false)
        } catch (error) {
          setLoading(false)
        }
    }, 0);

  }, [])

  return (
    <main>
      <h1>Articles list:</h1>
      {/* TODO: Limit to the first 10 and order the articles alphabetically. */}
      {!loading && articles == null && (<div>no found</div>)}
      {!loading && articles && articles.map(article => (
        <Article
          key={article.id}
          {...article}
          isSelected={article.id === selected}
          onClick={handleClick}
        />
      ))}
    </main>
  );

}


export default List;
