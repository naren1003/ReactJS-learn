import { formatMoney } from "../../utils/money";
import axios from "axios";
import dayjs from "dayjs";

export function DeliveryOptions({deliveryOptions, cartItem ,loadCart}) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>
      {deliveryOptions.map((deliveryOptions) => {
        let priceString = 'Free Shipping';

        if (deliveryOptions.priceCents > 0) {
          priceString = `${formatMoney(deliveryOptions.priceCents)} - Shipping`
        }
        const updateDeliveryOption = async () => {
          await axios.put(`/api/cart-item/${cartItem.productId}` , {
            deliveryOptionsId:deliveryOptions.id
          });
          await loadCart();
        };
        return (
          <div key={deliveryOptions.id} className="delivery-option" onClick={updateDeliveryOption}>
            <input type="radio"
              checked={deliveryOptions.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-options-${cartItem.productId}`} />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOptions.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
              </div>
              <div className="delivery-option-price">
                {priceString}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}