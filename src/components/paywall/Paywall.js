import "./Paywall.css";
import { useNavigate, useLocation } from "react-router-dom";
import { requestProvider } from "webln";
import axios from "axios";
import { useEffect, useState } from "react";

function Paywall() {
  const [invoice, setInvoice] = useState("");
  const [payment, setPayment] = useState("");
  let navigate = useNavigate();

  const { state } = useLocation();


  useEffect(() => {
    fetchInvoice();
  }, []);

  useEffect(() => {
    if (payment !== "") {
      localStorage.setItem("paid", true);
      navigate(`/snake`);
    }
  }, [payment, navigate, state]);

  const navigateHome = () => {
    navigate("/");
  };

  const managePayment = async () => {
    const webln = await requestProvider();
    const payment = await webln.sendPayment(invoice);
    setPayment(payment);
  };

  const fetchInvoice = async () => {
    const apiKey = "6d7b331b1fc847cd9d42bfb63593bdde";
    const data = `{"out": false, "amount": 5, "memo": "Lightning lets get it", "unit": "sat", "webhook": "", "internal": false}`;
    const getInvoice = {
      method: "POST",
      headers: { "content-type": "application/json", "X-Api-Key": apiKey },
      data: data,
      url: "https://legend.lnbits.com/api/v1/payments",
    };
    await axios
      .request(getInvoice)
      .then(async function (res) {
        setInvoice(res.data.payment_request);
      })
      .catch(function (err) {
        console.log("error = " + err);
      });
  };

  return (
    <div className="paywallPage">
      <div className="paywallContainer">
        <div className="paywallTitle">
          <h1>¡Viva Bitcoin!</h1>
        </div>
        <div className="paywallText">
          ⚡️ Pay 25 sats to read Snake 🐍
        </div>
      </div>
      <div className="buttonLayout">
        {/* <button className="buttonStyle" onClick={navigateHome}>
          Go back
        </button> */}
        <button className="buttonStyle" onClick={managePayment}>
          Pay
        </button>
      </div>
    </div>
  );
}

export default Paywall;
