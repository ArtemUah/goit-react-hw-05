import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../movies-api";
import css from '../MovieReviews/MovieReviews.module.css'

export default function MovieReviews () {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const {movieId} = useParams();
    useEffect(()=>{
    async function getReviews (id){
        setLoading(true)
        try {
            const chosenReview = await fetchReviews(id);
            setReviews(chosenReview.data.results);
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false);
        }
    };
    getReviews(movieId)
    },[movieId]);

    return (<div>
        {loading && <b>Is Loading...</b>}
        {error && <b>Error!</b>}
        {reviews.length === 0 && <b>We don't have any review for this movie.</b>}
        {reviews.length > 0 && 
        <ul>
            {reviews.map(review => {
                return(<li key={review.id}>
                    <b>{review.author}</b>
                    <p>{review.content}</p>
                </li>)
            })}
            </ul>}
    </div>)
}