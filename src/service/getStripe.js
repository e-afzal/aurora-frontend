import { loadStripe } from "@stripe/stripe-js";
let stripe;
const getStripe = async () => {
  if (!stripe) {
    stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE);
  }
  return stripe;
};

export default getStripe;
