import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserData } from '../redux/actions';
import { getExercises, getFood } from '../services/apiService';

const ProfilePage = ({ userData, setUserData }) => {
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const exercises = await getExercises();
        const food = await getFood();

        // Update Redux store with fetched data
        setUserData({ ...userData, exercises, food });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setUserData, userData]);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>User Name: {userData ? userData.name : 'Guest'}</p>
      {/* Display fetched data */}
      <p>Exercises: {userData && userData.exercises ? userData.exercises.length : 0}</p>
      <p>Food: {userData && userData.food ? userData.food.length : 0}</p>
      {/* Add more content as needed */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

const mapDispatchToProps = {
  setUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
