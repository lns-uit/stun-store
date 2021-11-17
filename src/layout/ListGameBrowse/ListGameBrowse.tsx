import React, { useState } from 'react';
import Sort from '../../components/Sort/Sort';
import GamesBrowse from '../../components/GamesBrowse/GamesBrowse';
import FillterMobile from '../../components/Fillters/FillterMobile';
import Page from '../../components/Page/Page';
import '../../screens/Browse/styles.css'
import './styles.css';

interface Pages{
  page: number;
}

function ListGameBrowse({
  page
}:Pages) {
  return(
    <div className="flex-1-1-auto white">

      <div className="d-flex space-between">
          <Sort></Sort>
          <div className="fillter-mobile">
            <FillterMobile></FillterMobile>
          </div>
      </div>
      <Sort></Sort>
      <div className="d-flex gap-81 centers">
        <div className="pd-top-bottom-8 pd-left-right-20 bgr-gray3 border-radius-5 pointer">
          <p className="mr-0 fs-15 lh-18">
            Add to whitelist
          </p>
        </div>
        <div className="pd-top-bottom-8 pd-left-right-20 bgr-gray3 border-radius-5 pointer">
          <p className="mr-0 fs-15 lh-18">
            Remove from whitelist
          </p>
        </div>

      </div>
      <GamesBrowse page={page}></GamesBrowse>
      <Page page={page}></Page>
    </div>
  );
}

export default ListGameBrowse;
