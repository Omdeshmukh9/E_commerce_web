import React from 'react';
import './team.css'; // Import the custom CSS file

// Import local images
import tom from '../assets/images/Teams/tom.avif'; // Ensure these paths and file extensions are correct
import img1 from '../assets/images/Teams/img1.avif';
import img2 from '../assets/images/Teams/img2.avif';
import img3 from '../assets/images/Teams/img3.avif';

export default function MyTeams() {
  // Sample team data
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Frontend Developer',
      image: tom, // Use imported image variable
      description: 'Specializes in building beautiful and responsive user interfaces.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Backend Developer',
      image: img1, // Use imported image variable
      description: 'Expert in server-side logic and API integration.',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'UX/UI Designer',
      image: img2, // Use imported image variable
      description: 'Passionate about crafting user-centered designs.',
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Full Stack Developer',
      image: img3, // Use imported image variable
      description: 'Brings the best of both worlds with expertise in both frontend and backend.',
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Meet Our Team</h2>
      <div className="row justify-content-center">
        {teamMembers.map((member) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={member.id}>
            <div className="team-card">
              <div className="team-card-image">
                <img src={member.image} alt={member.name} className="img-fluid" />
              </div>
              <div className="team-card-info">
                <h5>{member.name}</h5>
                <p>{member.role}</p>
                <p className="description">{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
