import numeral from "numeral";
import propTypes from "prop-types";

export default function CurrencyFormat({ amount }) {
  return <div>{numeral(amount).format("$0,0.00")}</div>;
}

CurrencyFormat.propTypes = {
  amount: propTypes.number.isRequired,
};
