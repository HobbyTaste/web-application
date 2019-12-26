import React, {Component} from 'react';
import style from './Navbar.module.css';

const Navbar = (props) => {
  return (
      <div>
          <input type="checkbox" id="hmt" className={style.hiddenMenuTicker} />

              <label className={style.btnMenu} htmlFor="hmt">
                  <span className={style.first}> </span>
                  <span className={style.second}> </span>
                  <span className={style.third}> </span>
              </label>

              <ul className={style.hiddenMenu}>
                  <li><a href="">Link 1</a></li>
                  <li><a href="">Link 2</a></li>
                  <li><a href="">Link 3</a></li>
              </ul>
      </div>
  );
};

export default Navbar;