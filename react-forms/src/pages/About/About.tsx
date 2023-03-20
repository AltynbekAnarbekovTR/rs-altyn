import React from 'react';
import styles from './About.module.css';

function About() {
  return (
    <div className={styles.about}>
      <div className="container">
        <h1>About TinyFox</h1>
        <p data-testid="about">
          TinyFox works to connect readers with independent booksellers all over the world. ‍We
          believe local bookstores are essential community hubs that foster culture, curiosity, and
          a love of reading, and we are committed to helping them thrive. Every purchase on the site
          financially supports independent bookstores. Our platform gives independent bookstores
          tools to compete online and financial support to help them maintain their presence in
          local communities.
        </p>
      </div>
    </div>
  );
}

export default About;
