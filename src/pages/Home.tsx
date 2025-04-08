import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>나루콤의 포트폴리오</h1>
        <p className="subtitle">웹 개발자 & 디자이너</p>
      </section>

      <section className="featured">
        <h2>주요 기술 스택</h2>
        <div className="skills-grid">
          <div className="skill-item">
            <h3>Frontend</h3>
            <p>React, TypeScript, CSS</p>
          </div>
          <div className="skill-item">
            <h3>Backend</h3>
            <p>Node.js, Express, MongoDB</p>
          </div>
          <div className="skill-item">
            <h3>Design</h3>
            <p>Figma, Adobe XD</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>함께 일해보시겠습니까?</h2>
        <p>프로젝트 문의나 협업 제안을 환영합니다.</p>
        <Link to="/projects" className="cta-button">
          프로젝트 보기
        </Link>
      </section>
    </div>
  );
};

export default Home;
