import React, { useState } from 'react';
import './styles.css';
import numberWithCommas from '../../utils/numberWithCommas';
import { GameDetailss } from '../../interfaces/rootInterface';
import Moment from 'react-moment';
import { Modal, Button } from 'antd';
import BuyComponent from '../BuyComponent/BuyComponent';
import gamesApi from '../../api/gamesApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

interface Detail {
  game: GameDetailss;
}

function PriceGame({ game }: Detail) {
  const { idUser } = useSelector((state: RootState) => state.user) || {};
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showMessage = (message: string) => {
    alert(message);
    setIsModalVisible(false);
  };

  const onSubmitPayment = async card => {
    if (idUser) {
      const dataRequest = {
        card,
        newBill: {
          idGame: game.idGame,
          idUser,
        },
      };
      const response = await gamesApi.createNewBillGame(dataRequest);
      const { actions, cost, datePaygame, idBill, message } = response || {};
      if (idBill) {
        showMessage(
          `You bought ${actions === 'pay' ? 'bought' : 'refund'} success game ${
            game.nameGame
          } with $${cost} at ${datePaygame}`
        );
      } else if (message) {
        showMessage(message);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className='d-flex align-items-start column justify-content-end height-full'>
      <div className='width-full'>
        {game.discount !== null ? (
          <div className='d-flex align-items-end'>
            <div className='bgr-blue1 pd-4-12 border-radius-4'>
              <span>-{game.discount.percentDiscount}%</span>
            </div>
            <div className='m-left-right-8'>
              <span className='gray-2 fs-12 lh-16'>
                {numberWithCommas(game.cost)}
              </span>
            </div>
            <div className='m-left-8'>
              <span className='fs-12 lh-16'>
                {numberWithCommas(
                  (game.discount.percentDiscount / 100) * game.cost
                )}
              </span>
            </div>
          </div>
        ) : (
          <div className='d-flex align-items-end'>
            <div className='m-left-8'>
              <span className='fs-12 lh-16'>{numberWithCommas(game.cost)}</span>
            </div>
          </div>
        )}
        <div className='m-top-36'>
          <Button
            type='primary'
            className='bgr-blue1 pd-8-16 width-full border-radius-4 '
            onClick={showModal}>
            Buy Now
          </Button>
          <Modal
            wrapClassName='master-card'
            title={'Buy Game ' + game.nameGame}
            visible={isModalVisible}
            onOk={onSubmitPayment}
            onCancel={handleCancel}
            footer={null}>
            <BuyComponent onSubmitPayment={onSubmitPayment} />
          </Modal>
        </div>
        <div className='m-top-28 m-bottom-48'>
          <div className='pd-8-16 width-full border-radius-4 pointer transition-dot-3 hover-buy border-1'>
            <div className='d-flex'>
              <p className='m-0 center uppercase flex-1-1-auto'>
                add to wishlist
              </p>
              <span>
                <i className='fa fa-plus-circle'></i>
              </span>
            </div>
          </div>
        </div>
        <div>
          <div
            className={
              3 === 3
                ? 'd-flex border-top-bottom-gray pd-top-bottom-22 space-between'
                : 'd-flex border-top-gray pd-top-bottom-22 space-between'
            }>
            <p className='gray-3 m-0 fs-12 lh-21'>Developer</p>
            <p className='m-0 fs-12 lh-21'>{game.developer}</p>
          </div>
          <div
            className={
              3 === 3
                ? 'd-flex border-top-bottom-gray pd-top-bottom-22 space-between'
                : 'd-flex border-top-gray pd-top-bottom-22 space-between'
            }>
            <p className='gray-3 m-0 fs-12 lh-21'>Publisher</p>
            <p className='m-0 fs-12 lh-21'>{game.publisher}</p>
          </div>
          <div
            className={
              3 === 3
                ? 'd-flex border-top-bottom-gray pd-top-bottom-22 space-between'
                : 'd-flex border-top-gray pd-top-bottom-22 space-between'
            }>
            <p className='gray-3 m-0 fs-12 lh-21'>Release Date</p>
            <Moment format='DD-MM-yyyy'>{game.releaseDate}</Moment>
          </div>
          <div
            className={
              3 === 3
                ? 'd-flex border-top-bottom-gray pd-top-bottom-22 space-between'
                : 'd-flex border-top-gray pd-top-bottom-22 space-between'
            }>
            <p className='gray-3 m-0 fs-12 lh-21'>Plaform</p>
            <p className='m-0 fs-12 lh-21'>{game.plaform}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceGame;
