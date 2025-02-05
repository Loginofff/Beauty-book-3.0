import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

function MasterRating({ master }) {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://beautybook-production.up.railway.app/api/reviews/rating/${master.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRating(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    if (master && master.id) {
      fetchData();
    }
  }, [master]);

  return (
    <div>
      {rating !== null && (
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating name="read-only" value={rating} readOnly />
        </Box>
      )}
    </div>
  );
}

export default MasterRating;

