import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FoodPartnerProfile = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const partnerRes = await axios.get(`http://localhost:3000/api/foodpartner/${id}`, { withCredentials: true });
        setPartner(partnerRes.data.partner);

        // Fetch foods by this partner
        const foodsRes = await axios.get('http://localhost:3000/api/food/createfood', { withCredentials: true });
        const partnerFoods = foodsRes.data.foods.filter(food => food.foodpartner._id === id);
        setFoods(partnerFoods);
      } catch (error) {
        console.error('Error fetching partner:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartner();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  if (!partner) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Partner not found</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h1 style={{ margin: '0', color: '#333', fontSize: '2.5em' }}>{partner.name}</h1>
        <p style={{ color: '#666', fontSize: '1.2em', margin: '10px 0' }}>{partner.email}</p>
        <p style={{ color: '#666', fontSize: '1em' }}>{partner.phone} | {partner.address}</p>
      </div>

      {/* Foods Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Our Menu</h2>
        {foods.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No items available yet.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {foods.map((food) => (
              <div key={food._id} style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <video
                  src={food.video}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
                <div style={{ padding: '15px' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{food.name}</h3>
                  <p style={{ color: '#666', margin: '0' }}>{food.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodPartnerProfile;