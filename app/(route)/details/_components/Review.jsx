import React, { useState, useEffect } from "react";
import {
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Rating,
  Box,
} from "@mui/material";

function MasterReviews({ master }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewsFetched, setReviewsFetched] = useState(false);

  useEffect(() => {
    if (master && master.id) {
      const fetchReviews = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            // `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER}/api/reviews/master/${master.id}`
            `http://localhost:8080/api/reviews/master/${master.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch");
          }
          const data = await response.json();
          setReviews(data || []);
          setReviewsFetched(true);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchReviews();
    }
  }, [master]);
  

  const fetchUser = async (clientId) => {
    try {
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER}/api/users/${clientId}`
        `http://localhost:8080/api/users/${clientId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      return { firstName: userData.firstName, lastName: userData.lastName };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return { firstName: "Unknown", lastName: "User" };
    }
  };

  useEffect(() => {
    if (reviewsFetched) {
      getUserNamesForReviews();
    }
  }, [reviewsFetched]);

  const getUserNamesForReviews = async () => {
    const updatedReviews = await Promise.all(
      reviews.map(async (review) => {
        const userData = await fetchUser(review.clientId);
        return { ...review, userData };
      })
    );
    setReviews(updatedReviews);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <Card key={review.id} variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {review.userData && review.userData.firstName}{" "}
                {review.userData && review.userData.lastName}
              </Typography>
              <Box display="flex" alignItems="center">
                <Rating value={review.rating} readOnly />
                <Typography variant="subtitle2" sx={{ marginLeft: 1 }}>
                  {review.rating} из 5
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {review.content}
              </Typography>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
}

export default MasterReviews;

