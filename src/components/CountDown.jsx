import React, { useEffect, useState } from "react";
import "./countdown.css";

const CountDown = ({ submit, answer }) => {
  const [count, setCount] = useState(30);

  useEffect(() => {
    if (count === 0) {
      if (submit.isSubmitted) {
        return;
      }
    }
    const timer = setTimeout(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [count]);
  return (
    <div className="countdown-wrapper">
      <div
        className={`c100 p${Math.round((count / 30) * 100)} ${
          count > 10 ? "green" : "red-col"
        }  `}
      >
        <span>{count}</span>
        <div className="slice">
          <div className="bar"></div>
          <div className="fill"></div>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
