import React from 'react';

const Projects: React.FC = () => {
  return (
    <div className="projects-container">
      <h1>프로젝트</h1>
      <div className="project-list">
        <div className="project-card">
          <h2>프로젝트 1</h2>
          <p>프로젝트 설명이 들어갈 자리입니다.</p>
        </div>
        <div className="project-card">
          <h2>프로젝트 2</h2>
          <p>프로젝트 설명이 들어갈 자리입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
