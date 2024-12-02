import React from 'react';
import './css/TodoAppFeatures.css';
import { Link } from 'react-router-dom';

const TodoAppFeatures = () => {
  const features = [
    {
      title: "Create Accounts",
      description: "Easily create and manage your personal account to start organizing your tasks.",
      imageSrc: "../1.png", // Add your screenshot path here
      imageAlt: "Account creation screenshot"
    },
    {
      title: "Create Categories",
      description: "Organize your tasks by creating custom categories for better task management.",
      imageSrc: "../2.png", // Add your screenshot path here
      imageAlt: "Categories creation screenshot"
    },
    {
      title: "Create Tasks",
      description: "Add tasks within categories, set priorities, dates, and times for precise tracking.",
      imageSrc: "../3.png", // Add your screenshot path here
      imageAlt: "Task creation screenshot"
    },
    {
      title: "Priority Setting",
      description: "Assign priority levels to your tasks to focus on what matters most.",
      imageSrc: "../4.png", // Add your screenshot path here
      imageAlt: "Priority setting screenshot"
    },
    {
      title: "Date and Time Management",
      description: "Set specific dates and times for each task to stay on top of your schedule.",
      imageSrc: "../5.png", // Add your screenshot path here
      imageAlt: "Date and time setting screenshot"
    },
    {
      title: "Task Search",
      description: "Quickly find tasks by searching through their names across all categories.",
      imageSrc: "../6.png", // Add your screenshot path here
      imageAlt: "Task search screenshot"
    },
    {
      title: "Calendar View",
      description: "View days with scheduled tasks and easily identify your busy days.",
      imageSrc: "../7.png", // Add your screenshot path here
      imageAlt: "Calendar view screenshot"
    },
    {
      title: "Task Editing",
      description: "Modify task details, update priorities, or change dates with ease.",
      imageSrc: "", // Add your screenshot path here
      imageAlt: "Task editing screenshot"
    },
    {
      title: "Task Deletion",
      description: "Remove completed or unnecessary tasks to keep your list clean and focused.",
      imageSrc: "../8.png", // Add your screenshot path here
      imageAlt: "Task deletion screenshot"
    },
    {
      title: "Comprehensive Charts",
      description: "Gain insights with charts showing tasks by month, category, and completion status.",
      subFeatures: [
        "Monthly tasks by category",
        "Task status breakdown (Done/Pending/Undone)",
        "Categories ranked by number of tasks"
      ],
      imageSrc: "../9.png", // Add your screenshot path here
      imageAlt: "Charts and analytics screenshot"
    }
  ];

  return (
    <div>
      <div className="header">
    <h2>TaskHive</h2>

    <div className="right">
    <div className="links">
        <Link to='/features' className="link">Features</Link>
        <Link to='/aboutus' className="link">About Us</Link>
        <Link to='/contact' className="link">Contact Us</Link>
    </div>

    <div className="auth">
      <Link className="link" to='/login'>Log in</Link>
      <Link className="link red" to='/signup'>Start For Free</Link>
    </div>

    </div>
  </div>
    <div className="todo-features-container">
      <h1 className="todo-features-title"><span>TaskHive</span> Features</h1>
      <div className="todo-features-grid">
        {features.map((feature, index) => (
          <div key={index} className="todo-feature-card">
            <div className="todo-feature-header">
              <h2 className="todo-feature-card-title">{feature.title}</h2>
            </div>
            <div className="todo-feature-content">
              <div className="todo-feature-description">
                <p>{feature.description}</p>
                {feature.subFeatures && (
                  <ul className="todo-feature-subfeatures">
                    {feature.subFeatures.map((subFeature, subIndex) => (
                      <li key={subIndex}>{subFeature}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="todo-feature-image-container">
                <img 
                  src={feature.imageSrc || "/api/placeholder/400/300"} 
                  alt={feature.imageAlt} 
                  className="todo-feature-image"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TodoAppFeatures;