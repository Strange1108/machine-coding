import React, { useEffect, useState } from "react";

const InfiniteScroll = () => {
  const [images, setImages] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const callImageAPI = () => {
    fetch(`https://picsum.photos/v2/list?page=${pageNo}&limit=3`)
      .then((res) => {
        return res.json();
      })
      .then((arr) => setImages((oldImages) => [...oldImages, ...arr]));
  };

  useEffect(() => {
    callImageAPI();
  }, [pageNo]);
  return <Posts imageArray={images} setPageNo={setPageNo} />;
};

const Posts = ({ imageArray, setPageNo }) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.unobserve(lastImage[lastImage.length - 1]);
        setPageNo((pageNo) => pageNo + 1);
      }
    });

    const lastImage = document.querySelectorAll(".image-post");
    // const lastImage = document.querySelectorAll(".image-post");
    if (lastImage.length) {
      observer.observe(lastImage[lastImage.length - 1]);
    }
  }, [imageArray]);

  return (
    <div className="container">
      {imageArray.map((item, index) => {
        return (
          <img className="image-post" key={item.id} src={item.download_url} />
        );
      })}
    </div>
  );
};



export default function App() {
  return (
    <div className="App">
      <h1>Infinite Scroll in React</h1>
      <InfiniteScroll />
    </div>
  );
}
