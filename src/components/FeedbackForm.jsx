import React from "react";
import { useState, useContext, useEffect } from "react";
// components
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

// context
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  // context state

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  // local state
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [rating, setRating] = useState(10);
  const [message, setMessage] = useState("");

  // useEffect for feedbackEdit - loads selected feedback into feedback form, enables submit button
  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  // local functions

  // listens for user text input on review form
  const handleTextChange = ({ target: { value } }) => {
    setText(value);

    // submission validation
    if (value === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (value !== "" && value.trim().length < 10) {
      setBtnDisabled(true);
      setMessage("Feedback must be at least 10 characters");
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
  };

  // adds feedback to FeedbackList upon submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };

      // checks if feedback is being edited
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
        setText("");
      }
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your experience?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review..."
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Submit
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
