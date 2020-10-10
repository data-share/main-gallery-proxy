/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import RestaurantInfo from './components/RestaurantInfo';
import ReviewEntry from './components/ReviewEntry';

const Main = styled.div`
  overflow: hidden;
  padding: 0 1rem;
  margin-left: auto;
  margin-right: auto;
  width: 630px;
  display: block;
  font-family: Helvetica,Arial,sans-serif;
  line-height: 1.15;
  cursor: default !important;
  -webkit-box-direction: reverse;
  -webkit-font-smoothing: antialiased;
`;

const Wrapper1 = styled.div`
  margin: 0;
  padding: 0 0 4rem;
  max-width: inherit;
  width: inherit;
  transition: top 100ms ease-out;
`;

class ReviewModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      reviewsList: [],
    };
    this.getRestaurantInfo = this.getRestaurantInfo.bind(this);
    this.getReviewsList = this.getReviewsList.bind(this);
  }

  componentDidMount() {
    this.getRestaurantInfo();
    this.getReviewsList();
  }

  getRestaurantInfo(x = 1) {
    axios.get(`/api/restaurants/${x}`)
      .then((res) => {
        this.setState({
          restaurant: res.data[0],
        });
        // console.log('res data rest', res.data[0]);
        // console.log('rest', this.state.restaurant);
      })
      .catch((err) => {
        console.log('error with axios get request to restaurants table ', err);
      });
  }

  getReviewsList(x = 1) {
    axios.get(`/api/review_list/${x}`)
      .then((res) => {
        this.setState({
          reviewsList: res.data,
        });
        // console.log('res data review', res.data);
        // console.log('reviews', this.state.reviewsList);
      })
      .catch((err) => {
        console.log('error with axios get request to reviews table ', err);
      });
  }

  render() {
    const { restaurant } = this.state;
    const { reviewsList } = this.state;
    const reviewLength = reviewsList.length;

    return (

      <div>
        <Main>
          <Wrapper1>
            {/* <RestaurantInfo restaurant={restaurant} length={reviewLength} /> */}
            {reviewsList.map((review, index) => (
              <ReviewEntry review={review} key={index} />
            ))}
          </Wrapper1>
        </Main>
      </div>
    );
  }
}

ReactDOM.render(<ReviewModule />, document.getElementById('ReviewModule'));
