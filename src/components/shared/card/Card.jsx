import React from "react";
import PropTypes from "prop-types";

function Card({ children, reverse }) {
  // return <div className={`card ${reverse && "reverse"}`}>{children}</div>;
  return (
    <div
      className="card"
      style={{
        backgroundColor: reverse ? "rgba(0,0,0,0.7)" : "#fff",
        color: reverse ? "#fff" : "#333",
      }}
    >
      {children}
    </div>
  );
}

Card.defaultProps = {
  reverse: false,
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
};
export default Card;
