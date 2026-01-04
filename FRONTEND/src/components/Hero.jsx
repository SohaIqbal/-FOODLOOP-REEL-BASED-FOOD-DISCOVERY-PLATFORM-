import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegCommentDots, FaBookmark } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);

  const [activeFoodId, setActiveFoodId] = useState(null);



  const [showComments, setShowComments] = useState(false);
const [newComment, setNewComment] = useState("");
const [comments, setComments] = useState([]);

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

//   useEffect(() => {

//   const fetchComments = async (activeFoodId) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:3000/api/food/comment/${activeFoodId}`,
//         { withCredentials: true }
//       );
//       setComments(res.data.comments);

//       console.log("Fetched comments:", res.data.comments);
//     } catch (error) {
//       console.error("Failed to fetch comments:", error);
//     }
//   };

//   fetchComments();
// }, [activeFoodId]);


useEffect(() => {
  console.log("Active Food ID changed:", activeFoodId);
  if (!activeFoodId) return; // 🔑 prevent undefined call

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/food/comment/${activeFoodId}`,
        { withCredentials: true }
      );
      setComments(res.data.comments);
      console.log("Fetched comments:", res.data.comments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  fetchComments();
}, [activeFoodId]);


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



// const handleComment = (id) => {
//   console.log("Comment on food:", id);
// };

const Home = () => {
  navigate('/hero');

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

const handleAddComment = async (id) => {
  if (!newComment.trim()) return;

  try {
    const res = await axios.post(
      'http://localhost:3000/api/food/comment',
      {
        foodId: id,        // make sure this exists
        content: newComment,
      },
      {
        withCredentials: true,
      }
    );

    setComments((prevComments) => [
      ...prevComments,
      {
        user: 'You',
        avatar: 'https://i.pravatar.cc/40',
        text: newComment,}])


            setFoods((prevFoods) =>
      prevFoods.map((f) =>
        f._id === id ? { ...f, commentcount: f.commentcount + 1 } : f
      )
    );
       
    setNewComment("");

    console.log("Comment added:", res.data);


       const response = await axios.get(
        `http://localhost:3000/api/food/comment/${id}`,
        { withCredentials: true }
      );
      setComments(response.data.comments);

   




  } catch (error) {
    console.error(
      "Error adding comment:",
      error.response?.data || error.message
    );
  }
};




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
    onClick={() => {
      setActiveFoodId(food._id);
     
      setShowComments(true);
    }}
    style={{ cursor: "pointer", textAlign: "center" }}
  >
    <FaRegCommentDots size={28} />
      <div style={{ fontSize: "12px", display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
     <p> Comments </p>
      <div>{food.commentcount}</div>
      </div>
  </div>

 {showComments && (
  <div
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "55%",
      backgroundColor: "#000",
      color: "white",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Header */}
    <div
      style={{
        padding: "12px",
        borderBottom: "1px solid #222",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontWeight: "600" }}>Comments</span>
      <span
        onClick={() => setShowComments(false)}
        style={{ cursor: "pointer", fontSize: "18px" }}
      >
        ✕
      </span>
    </div>

    {/* Comments */}
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "12px",
        width: "100%",
        height: "30%",
      }}
    >
      {comments.length === 0 ? (
        <p style={{ color: "#777", textAlign: "center" }}>
          Be the first to comment
        </p>
      ) : (
        comments.map((c, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            {/* Avatar */}
            <img
              src={c.avatar || "https://i.pravatar.cc/40"}
              alt="user"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            {/* Comment */}
            <div>
              <span style={{ fontWeight: "600", fontSize: "13px" }}>
                {c.user.fullname || 'Anonymous'}
              </span>
              <p style={{ margin: 0, fontSize: "20px", color: "white" }}>
                {c.content}
              </p>
            </div>
          </div>
        ))
      )}
    </div>

    {/* Input bar (STICKY like Insta) */}
    <div
      style={{
        padding: "10px",
        borderTop: "1px solid #222",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "#000",
        width: "100%",
      }}
    >
      {/* Your avatar */}
      <img
        src="https://i.pravatar.cc/40"
        alt="me"
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
        }}
      />

      {/* Input */}
     <input
  type="text"
  placeholder="Add a comment..."
  value={newComment}
  onChange={(e) => setNewComment(e.target.value)}
  style={{
    flex: 1,
    backgroundColor: "#1a1a1a", // FORCE background
    border: "1px solid #444",
    borderRadius: "20px",
    padding: "10px 14px",
    color: "#fff",              // FORCE text color
    caretColor: "#fff",         // FORCE cursor visibility
    outline: "none",
    fontSize: "14px",
    width: "100%",
  }}
/>


      {/* Post */}
      <button
        onClick={()=> handleAddComment(activeFoodId)

        }
        disabled={!newComment.trim()}
        style={{
          background: "transparent",
          border: "none",
          color: newComment.trim() ? "#0095f6" : "#555",
          fontWeight: "700",
          cursor: newComment.trim() ? "pointer" : "default",
            width: '100px',
        height: '40px',
        }}
      >
        Post
      </button>

      {/* <button
      style={{
        width: '100px',
        height: '30px',
      }}
      >
        Post
      </button> */}
    </div>
  </div>
)}



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
        <button onClick={Saved} style={{fontSize: '20px',backgroundColor:'#393E46'}}><FaBookmark/></button>
        <button onClick={Profile} style={{fontSize: '20px',backgroundColor:'#393E46'}}><FaUserAlt/></button>
      </div>


          
        </div>

        
      ))}

     


     
    </div>
  );
};

export default Hero;
          