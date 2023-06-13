import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../appContext";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function SearchForm() {
  const context = useContext(UserContext);

  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight || isLoading) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      fetchData();
    }, 1000);
  };

  const fetchData = async () => {
    if (!isLoading) setIsLoading(true);
    const limit = 20;
    const offset = page * limit - limit;

    try {
      const response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${limit}&offset=${offset}`);
      const data = await response.json();
      setItems(prevItems => [...prevItems, ...data.data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    context.registerWord(query);
    setItems([]);
    fetchData();
  };

  const handleOpenLightbox = (index)  => {
    setImgIndex(index)
    setIsOpen(true)
  };

  return (
    <React.Fragment>
      <form className="form" onSubmit={handleSubmit}>
        {" "}
        <label className="label" htmlFor="query">
          {" "}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "cheeseburgers" or "cats"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      <div className="card-list">
        {items.map((item, index) => (
          <div className="card" key={index}>
            <img
              value={index}
              className="card-image"
              alt={item.title}
              src={item.images.original.url}
              width="50%"
              height="50%"
              onClick={() => handleOpenLightbox(index)}
            ></img>
          </div>
        ))}{" "}
      </div>
      {isLoading && <p className="loading">Loading...</p>}
      {isOpen && <Lightbox
        imageCaption={items[imgIndex].title}
        mainSrc={items[imgIndex].images.original.url}
        nextSrc={items[(imgIndex + 1) % items.length].images.original.url}
        prevSrc={items[(imgIndex + items.length - 1) % items.length].images.original.url}
        onCloseRequest={() => setIsOpen(false)}
        onMovePrevRequest={() => setImgIndex((imgIndex + items.length - 1) % items.length)}
        onMoveNextRequest={() => setImgIndex((imgIndex + 1) % items.length)}
      />}
    </React.Fragment>
  );
}
