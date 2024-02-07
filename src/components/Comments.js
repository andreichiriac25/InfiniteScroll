import React, { useEffect, useState } from "react";

import useIntersectionObserver from "../hooks/useIntersectionObserver";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isIntersecting, setNodeRef] = useIntersectionObserver();

  useEffect(() => {
    if (!loading && isIntersecting) {
      setStep((prev) => prev + 10);
    }
  }, [isIntersecting, loading]);

  useEffect(() => {
    const getData = () => {
      setError("");

      if (loading) {
        return;
      }

      setLoading(true);

      try {
        setTimeout(async () => {
          const res = await fetch(
            "https://jsonplaceholder.typicode.com/comments"
          );
          const newComments = await res.json();

          setComments((prev) => [
            ...prev,
            ...newComments.slice(step, step + 10),
          ]);
          setLoading(false);
        }, 3000);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getData();
  }, [step]);

  return !error ? (
    <div>
      {comments.map((comm, index) =>
        index === comments.length - 1 ? (
          <div
            style={{ background: "red" }}
            className="comment last-item"
            ref={setNodeRef}
            key={index}
          >
            <h2>{comm.name}</h2>
            <div>{comm.email}</div>
            <p>{comm.body}</p>
            <br />
            <hr />
          </div>
        ) : (
          <div className="comment" key={index}>
            <h2>{comm.name}</h2>
            <div>{comm.email}</div>
            <p>{comm.body}</p>
            <br />
            <hr />
          </div>
        )
      )}
      {loading && <div>Loading...</div>}
    </div>
  ) : (
    <div>{error}</div>
  );
};

export default Comments;
