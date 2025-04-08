import React from 'react';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <section className="about-header">
        <h1>소개</h1>
        <p className="intro">안녕하세요! 나루콤입니다.</p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>경력</h2>
          <div className="timeline">
            <div className="timeline-item">
              <h3>시니어 웹 개발자</h3>
              <p>2020 - 현재</p>
              <p>주요 프로젝트 및 성과 내용</p>
            </div>
            <div className="timeline-item">
              <h3>프리랜서 개발자</h3>
              <p>2018 - 2020</p>
              <p>다양한 웹 프로젝트 수행</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>기술 스택</h2>
          <div className="skills">
            <div className="skill-category">
              <h3>프론트엔드</h3>
              <ul>
                <li>React & React Native</li>
                <li>TypeScript</li>
                <li>Next.js</li>
                <li>CSS/SASS</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>백엔드</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>GraphQL</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="about-footer">
        <h2>연락처</h2>
        <p>이메일: example@email.com</p>
        <p>GitHub: github.com/narucom</p>
      </section>
    </div>
  );
};

export default About;
