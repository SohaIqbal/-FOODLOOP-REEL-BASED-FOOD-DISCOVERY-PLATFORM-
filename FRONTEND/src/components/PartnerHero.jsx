import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegCommentDots, FaBookmark } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

const PartnerHero = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  // const[like, setLike]= useState(false);  
 
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/food/createfood', { withCredentials: true });
        setFoods(response.data.foods);
        // console.log('Fetched foods:', response.data.foods);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };
    fetchFoods();
  },[] );

const handleLike = async (id) =>  {
  try {
    const response = await axios.post('http://localhost:3000/api/food/like',{foodId: id} ,{ withCredentials: true });


    
   
  console.log("Like response:", response.data);

  // setLike(!like);

 
    setFoods((prevFoods) =>
      prevFoods.map((food) =>
        food._id === id ? { ...food, likecount: response.data.food.likecount } : food
  
  
   
      )
    );}
  catch (error) {
    console.error("Error liking food:", error);

    
  }
  
};

 const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/foodpartner/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };


const handleSave = async(id) => {
  try {
    const response = await axios.post('http://localhost:3000/api/food/save',{foodId: id} ,{ withCredentials: true });
 
  console.log(`Save count is : ${response.data.food.savecount}`);

   setFoods((prevFoods) =>
      prevFoods.map((food) =>
        food._id === id ? { ...food, savecount: response.data.food.savecount } : food
  
  
   
      )
    );
  

    
  } catch (error) {
    console.error("Error saving food:", error);
  }
};



const handleComment = (id) => {
  console.log("Comment on food:", id);
};

const Home = () => {
  navigate('/partnerhero');

}
const Saved = () => {
  navigate('/saved');
  }
const Profile= () => {
  navigate('/userprofile');
}


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [foods]);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      overflowY: 'scroll',
      scrollSnapType: 'y mandatory',
      position: 'relative'
    }}>

      {foods.map((food, index) => (
        <div key={food._id} style={{
          height: '100vh',
          width: '100vw',
          scrollSnapAlign: 'start',
          position: 'relative'
        }}>
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={food.video}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            muted
            loop
            playsInline
            preload='metadata'
            
       
            onError={(e) => {
              console.error('Video error for:', food.video);
              console.error('Error details:', e.target.error);
            }}
          />
          
        

          {/* Right-side actions (Insta style) */}
<div
  style={{
    position: "absolute",
    right: "5%",
    bottom: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    color: "white",
    
  }}
>
  {/* Like */}
  <div
    onClick={() => handleLike(food._id)}
    style={{ cursor: "pointer", textAlign: "center" }}
  >
    <FaHeart size={28} />
    
    <div style={{ fontSize: "12px", display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
     <p> Likes </p>
      <div>{food.likecount}</div>
      </div>
    
  </div>

  

  {/* Comment */}
  <div
    onClick={() => handleComment(food._id)}
    style={{ cursor: "pointer", textAlign: "center" }}
  >
    <FaRegCommentDots size={28} />
    <div style={{ fontSize: "12px" }}>Comment</div>
  </div>

  {/* Save */}
  <div
    onClick={() => handleSave(food._id)}
    style={{ cursor: "pointer", textAlign: "center" }}
  >
    <FaBookmark size={26} />
       <div style={{ fontSize: "12px", display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
     <p> Save </p>
      <div>{food.savecount}</div>
      </div>
  </div>
</div>

          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            right: '10%',
            color: 'white',
            fontSize: '18px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            marginBottom: '10px'
          }}>
            {food.description}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            right: '10%',
            color: 'white',
            fontSize: '16px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
          }}>
          <Link to={`/foodpartner/${food.foodpartner._id}`} style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '20px',
            fontSize: '16px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            Visit Store
          </Link>
          </div>

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
        <button onClick={()=>{navigate('/createfood')}} style={{fontSize: '20px',backgroundColor:'#393E46'}}>Create Food </button>
        <button onClick={handleLogout} style={{fontSize: '20px',backgroundColor:'#393E46'}}>Logout</button>
      </div>


          
        </div>

        
      ))}

     


     
    </div>
  );
};

export default PartnerHero;
          