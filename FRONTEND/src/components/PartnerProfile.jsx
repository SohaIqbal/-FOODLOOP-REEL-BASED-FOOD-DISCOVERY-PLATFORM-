import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartnerProfile = () => {
  const [partner, setPartner] = useState(null);
  const navigate = useNavigate();

  // Fetch partner profile from backend
   useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/foodpartner/me",
          { withCredentials: true ,
            
          }
          
        );
        setPartner(res.data.partner);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
  }, []);

  if (!partner) return <div>Loading profile...</div>;

  return (
    <div style={styles.container}>
      {/* Partner Image */}
      <img
        src={partner.avatar || "https://via.placeholder.com/150"} // fallback avatar
        alt="Partner"
        style={styles.avatar}
      />

      {/* Partner Info */}
      <h2>{partner.name}</h2>
      <p>{partner.email}</p>

      {/* Button to create food */}
      <button style={styles.button} onClick={() => navigate("/createfood")}>
        Create Food
      </button>
    </div>
  );
};

// Simple inline styles
const styles = {
  container: {
    width: "350px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "15px",
    objectFit: "cover",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PartnerProfile;
