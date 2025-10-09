const moment = require("moment");
const { dolHR } = require("./methods");

const delinquency_notice = ({
  propertyFullAddress,
  loanAmount,
  delinquencyDate,
}) => `
    <h1 class="text-center display-6">NOTICE OF DELINQUENCY</h1>
    <hr />
    <p class="fw-bold">${moment(new Date(delinquencyDate)).format(
      "MMMM Do YYYY"
    )}</p>
    <p class="mb-5">Dear Customer,</p>
    <p>This notice is to inform you that your account, is in delinquency for the property located at ${propertyFullAddress} for the amount of <span class="bold">${dolHR(
  loanAmount
)}</span>. Please reach out to your loan officer at your earliest convenience.</p>
`;

const statement = ({ propertyFullAddress, payments, balance }) => `
  <h1 class="text-center display-6">STATEMENT</h1>
  <hr />
  <p>Property Address: <span class="fw-bold">${propertyFullAddress}</span/></p>
  <h5 class="text-center m-0">Payments</h5>
  <hr />
  <ul class="list-group list-group-flush">
    ${payments.map(
      ({ payDate, payAmount, payType }) => `
      <li class="list-group-item d-flex justify-content-between">
        <div class="flex-grow-1">
          <p class="fw-bold">${dolHR(payAmount)}</p>
          <p>${payType}</p>
        </div>
        <div class="text-end text-secondary">
          ${moment(payDate).format("MMMM Do YYYY, h:mm a")}
        </div>
      </li>
    `
    )}
  </ul>
  <p class="text-end">Ending Balance: <span class="fw-bold">${dolHR(
    balance
  )}</span></p>
`;

const receipt = ({ description, payAmount, payType }) => `
  <h1 class="text-center display-6">RECEIPT</h1>
  <hr />
  <div class="d-flex justify-content-between">
    <p class="fw-bold">${dolHR(payAmount)}</p>
    <p>${payType}</p>
  </div>
  <p class="fst-italic">${description}</p>
`;

module.exports = {
  delinquency_notice,
  statement,
  receipt,
};
