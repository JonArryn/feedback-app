import { createContext, useState, useEffect } from "react";

// CONFIG

const LOCAL_URL = "http://127.0.0.1:5000";

const FeedbackContext = createContext();

// feedback provider takes in {children} as props
// This provider export also wraps around everything returned in App.js
export const FeedbackProvider = ({ children }) => {
  // state that the provider holds
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  // model

  useEffect(() => {
    fetchFeedback();
  }, []);

  // fetch feedback

  const fetchFeedback = async () => {
    const response = await fetch(`${LOCAL_URL}/feedback`);
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  // context provider functions

  // delete feedback from FeedbackList component
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?"))
      await fetch(`${LOCAL_URL}/feedback/${id}`, { method: "DELETE" });
    // set feedback is required here to refresh the FeedbackList component
    setFeedback(
      feedback.filter((feedbackItem) => {
        return feedbackItem.id !== id;
      })
    );
  };

  // add feedback to FeedbackList component
  const addFeedback = async (newFeedback) => {
    const response = await fetch(`${LOCAL_URL}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  // edit existing FeedbackItem component from FeedbackList component
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };

  // update feedback item

  const updateFeedback = async (id, updateItem) => {
    const response = await fetch(`${LOCAL_URL}/ feedback/${id}`, {
      method: "PUT",
    });

    setFeedback(
      feedback.map((item) =>
        // this merges the currently iterated item with the updateItem assuming item.id === id, this will replace any existing properties in item with the properties in updateItem, any properties on updateItem that do not exist on item will be added to the returned object
        item.id === id ? { ...item, ...updateItem } : item
      )
    );
  };

  return (
    // returns .Provider
    <FeedbackContext.Provider
      // value property contains the different pieces of state that the children have access to
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        LOCAL_URL,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {/* .Provider wraps around children that it provides context/state to -  */}
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
