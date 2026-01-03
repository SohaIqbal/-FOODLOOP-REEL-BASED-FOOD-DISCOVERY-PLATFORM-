import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    video: null
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        video: file
      }));
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('video', formData.video);
      // data.appent('likecount',formData.likecount);

      const response = await axios.post('http://localhost:3000/api/food/createfood', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        alert('Food item created successfully!');
        // const partnerId = response.data.food.foodpartner;
        navigate(`/hero`); // Redirect to food partner's profile to see the new item
      }
    } catch (error) {
      console.error('Error creating food:', error);
      if (error.response) {
        alert(error.response.data.message || 'Failed to create food item');
      } else {
        alert('Network error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#333',
          fontSize: '2.5em',
          fontWeight: '600',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          
        }}>
          Add Food Item
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#555',
              fontWeight: '500',
              fontSize: '1.1em'
            }}>
              Food Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid #e1e5e9',
                borderRadius: '10px',
                fontSize: '1em',
                transition: 'border-color 0.3s',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#fff',
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              placeholder="Enter food name"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#555',
              fontWeight: '500',
              fontSize: '1.1em'
            }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid #e1e5e9',
                borderRadius: '10px',
                fontSize: '1em',
                minHeight: '100px',
                resize: 'vertical',
                transition: 'border-color 0.3s',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              placeholder="Describe your food item"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#555',
              fontWeight: '500',
              fontSize: '1.1em'
            }}>
              Video *
            </label>
            <div
              style={{
                border: '2px dashed #667eea',
                borderRadius: '15px',
                padding: '40px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: formData.video ? 'rgba(102, 126, 234, 0.05)' : 'rgba(102, 126, 234, 0.02)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#764ba2';
                e.target.style.background = 'rgba(102, 126, 234, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.background = formData.video ? 'rgba(102, 126, 234, 0.05)' : 'rgba(102, 126, 234, 0.02)';
              }}
              onClick={() => document.getElementById('video-input').click()}
            >
              <input
                id="video-input"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                required
                style={{
                  position: 'absolute',
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }}
              />
              <div style={{ pointerEvents: 'none' }}>
                <div style={{
                  fontSize: '3em',
                  color: '#667eea',
                  marginBottom: '10px'
                }}>
                  📹
                </div>
                <div style={{
                  fontSize: '1.2em',
                  color: '#333',
                  fontWeight: '500',
                  marginBottom: '5px'
                }}>
                  {formData.video ? formData.video.name : 'Click to upload video'}
                </div>
                <div style={{
                  fontSize: '0.9em',
                  color: '#666'
                }}>
                  {formData.video ? 
                    `Selected: ${(formData.video.size / (1024 * 1024)).toFixed(2)} MB` : 
                    'MP4, MOV, AVI up to 100MB'
                  }
                </div>
              </div>
            </div>
          </div>

          {preview && (
            <div style={{
              marginTop: '20px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#333', marginBottom: '10px' }}>Video Preview</h3>
              <video
                src={preview}
                controls
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '15px 30px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '1.1em',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              marginTop: '10px',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            {loading ? 'Creating...' : 'Create Food Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;