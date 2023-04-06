import React from 'react';
import styles from './Modal.module.css';
import cover from '../../assets/1984.webp';

const Modal = ({ setShowModal, bookInfo }) => {
  console.log('Modal book info', bookInfo);
  const { title, author } = bookInfo.volumeInfo;
  return (
    <div
      onClick={() => {
        setShowModal(false);
      }}
      className={styles.modalBackground}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modalContainer}
      >
        <button
          className={styles.closeButton}
          onClick={() => {
            setShowModal(false);
          }}
        >
          X
        </button>
        <div className={styles.bookInfo}>
          <div className={styles.bookCover}>
            <img src={cover} alt="" />
          </div>
          <div className={styles.bookDetails}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.author}>{author}</p>
            <p className={styles.published}>2013-04-10</p>
            <button className={styles.more}>More</button>
          </div>
        </div>
        <div className={styles.bookDescription}>
          <p>
            The book contains the secrets of success, and it applies as much to most forms of life's
            endeavour as it does to sport When you understand that pressure is part and parcel of
            your life and that there are things you can do to control Wit, you will face up to it in
            a positive way and use it to your advantage.' -Rahul Dravid Rudi Webster, a doctor who
            has done pioneering work in the field of sports psychology, draws up a fail-safe recipe
            for on-the-ground performance optimization in this remarkable book. He ropes in some of
            the world's finest sportsmen to explain their own success techniques: Mahendra Singh
            Dhoni, Rahul Dravid, V.V.S. Laxman, Clive Lloyd, Dennis Lillee, Wasim Akram, Jacques
            Kallis and Sir Garry Sobers. They talk about the four interconnected pillars that
            performance in sport is built on: fitness, technique, strategy and mental skill - but,
            unanimously, they declare that the mental pillar is the most important. At the highest
            level of sport, it is this skill that determines how well the other components are
            combined and executed. Dr Webster's book aims to optimize every aspect of a player's
            form and performance. Through inventive techniques, especially visualization and mental
            rehearsal, he reinforces the practice of a physical skill so that it is learned more
            quickly and imprinted more powerfully in the mind - and thus better executed. Says ace
            cricketer V.V.S. Laxman, 'These two techniques help a player improve dramatically. Every
            young player should [...] make them an important
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
