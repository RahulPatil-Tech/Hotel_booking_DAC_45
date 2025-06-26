import React from 'react';
import './AboutUs.css';
import './Gradient.css'; 
const AboutUs = () => {
  const teamMembers = [
    {
      image: 'src/assets/Khushi_photo.JPG',
      title: 'Khushi Nikhare',
      description: 'Full-stack developer with a passion for building beautiful, user-focused apps.',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      pinterest: 'https://pinterest.com/johndoe',
    },
    {
      image: 'src/assets/Rahul.jpeg',
      title: 'Rahul Patil',
      description: 'UI/UX designer who brings ideas to life with creativity and precision.',
      linkedin: 'https://linkedin.com/in/janesmith',
      github: 'https://github.com/janesmith',
      pinterest: 'https://pinterest.com/janesmith',
    },
    {
      image: 'src/assets/Yash.jpg',
      title: 'Yash Rathod',
      description: 'Backend wizard obsessed with performance and scalability.',
      linkedin: 'https://linkedin.com/in/alexbrown',
      github: 'https://github.com/alexbrown',
      pinterest: 'https://pinterest.com/alexbrown',
    },
  ];

  return (
    <div className="about-us-section gradient-bg py-5">
      <h2 className="text-center mb-5 section-title">Meet Our Team</h2>
      <div className="row justify-content-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="col-md-4 d-flex">
            <div className="card team-card shadow-sm mb-4 w-100">
              <img
                src={member.image}
                alt={member.title}
                className="card-img-top team-image"
              />
              <div className="card-body text-center">
                <h5 className="card-title">{member.title}</h5>
                <p className="card-text">{member.description}</p>
                <div className="d-flex justify-content-center gap-4 mt-3 social-icons">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin fa-lg"></i>
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github fa-lg"></i>
                  </a>
                  <a href={member.pinterest} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-pinterest fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
