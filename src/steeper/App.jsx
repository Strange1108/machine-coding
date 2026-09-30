import "./styles.css";
import CheckoutStepper from "./components/Steeper";

const CHECKOUT_STEPS = [
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

function App() {
    return (
        <div style={{ maxWidth: "600px", margin: "50px auto", padding: "24px", textAlign: "center" }}>
            <h2 style={{ marginBottom: "30px", fontSize: "24px" }}>Checkout</h2>
            <CheckoutStepper stepsConfig={CHECKOUT_STEPS} />
        </div>
    );
}

export default App;