import { BiRupee } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { checkoutDataContext } from '../App';

export const SubscriptionCard = ({ timing, price, type, id }) => {
  let checkoutContext = useContext(checkoutDataContext);
  let navigate = useNavigate();

  const checkout = () => {
    const data = {
      menuId: id,
      price: price,
    };
    checkoutContext.setCheckoutData(data);
    navigate('/checkout');
  };

  return (
    <div className="p-10 border-black border rounded-md text-center flex flex-col">
      <h5 className="text-lg md:text-xl font-semibold text-green-500">
        {timing === 28
          ? 'One Month'
          : timing === 1
          ? 'One Day'
          : `${timing} Days`}
      </h5>
      <p className="mt-3 text-sm h-12">
        {timing !== 1
          ? `You will get meals till ${timing}th day, starting from tomorrow.`
          : 'You will get meal just for Today.'}
      </p>
      <div className="flex items-center justify-center my-5">
        <BiRupee className="text-3xl" />
        <p className="text-3xl font-semibold">{price}</p>
      </div>
      <button
        className="bg-green-500 px-3 py-2 rounded-md shadow-lg shadow-green-500/50 
                font-semibold text-sm md:text-base w-full mt-auto"
        onClick={checkout}
      >
        Checkout
      </button>
    </div>
  );
};
