import Checkout from "./components/Checkout"
import "./App.css"

const CHECKOUT_STEPS:any = [
  {
    name: "Customer Info",
    Component: () => <div>Provide your contact details.</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your shipping address.</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: "Delivered",
    Component: () => <div> Your order has been delivered.</div>,
  },
];


const App = () => {
  return (
  <>
  <h2>Checkout</h2>
  <Checkout stepConfig={CHECKOUT_STEPS}/>
  </>
  )
}

export default App
