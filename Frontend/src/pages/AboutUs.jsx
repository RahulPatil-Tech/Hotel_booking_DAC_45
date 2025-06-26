import React from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  const teamMembers = [
    {
      image: 'src/assets/Khushi_photo.JPG',
      title: 'Khushi Nikare',
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
    <div className="container py-5">
      <motion.h2
        className="text-center mb-5 fw-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Meet Our Team
      </motion.h2>

      <div className="row justify-content-center g-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="col-md-6 col-lg-4 d-flex"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="card shadow-lg w-100 border-0"
              style={{ borderRadius: '20px', overflow: 'hidden' }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <img
                src={member.image}
                alt={member.title}
                className="card-img-top"
                style={{ height: '350px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-semibold">{member.title}</h5>
                <p className="card-text text-muted">{member.description}</p>
                <div className="d-flex justify-content-center gap-4 mt-3">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin fa-lg text-primary"></i>
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github fa-lg text-dark"></i>
                  </a>
                  <a href={member.pinterest} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-pinterest fa-lg text-danger"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
