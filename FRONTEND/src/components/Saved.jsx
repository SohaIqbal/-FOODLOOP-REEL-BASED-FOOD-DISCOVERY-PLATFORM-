import React from 'react'
import { useEffect , useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import {  FaBookmark } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";


const Saved = () => {
const navigate = useNavigate();
    const [savedFoods, setSavedFoods] = useState([]);

    const Home = () => {
        navigate('/hero');
    }
    const saved = () => {
        navigate('/saved');
    }

    const Profile= () => {
  navigate('/userprofile');
}

    // useEffect(() => async() => {

    //     const response = await axios.get('http://localhost:3000/api/food/saved-videos', {withCredentials: true});
    //     if(!response.data.success){
    //         alert("Could not fetch saved videos");
    //         return;
    //     }
    //     console.log("Saved videos:", response.data);



    // }, [])


    useEffect(() => {
    const fetchSavedVideos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/food/saved-videos', { withCredentials: true });
        console.log("this is data", response.data.savedFoods);

        setSavedFoods(response.data.savedFoods);
      } catch (error) {
        console.error("Error fetching saved videos:", error);
      }
    };

    fetchSavedVideos();
  }, []);

  return (
    <div>
        <h2>Saved Videos</h2>
        {savedFoods.length === 0 ? (
            <p>No saved videos found.</p>
        ) : (
            <p>Here are your saved videos:</p>
        )}

{savedFoods
  .filter(item => item.food)   //only keep items where item.food in not null
  .map(item => (
    <video
      key={item._id}
      src={item.food.video}
      controls
      width="300"
    />
  ))}

    <div style={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        top: '95%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '50px',
        
      }}>
               <button onClick={Home}  style={{fontSize: '20px', backgroundColor:'#393E46'}}><IoHomeSharp/></button>
               <button onClick={saved} style={{fontSize: '20px',backgroundColor:'#393E46'}}><FaBookmark/></button>
               <button onClick={Profile} style={{fontSize: '20px',backgroundColor:'#393E46'}}><FaUserAlt/></button>
      </div>



    </div>
  )
}

export default Saved