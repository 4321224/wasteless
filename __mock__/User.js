const Xendit = require("xendit-node");

class XenditInvoice {
  static createInvoice(externalID, amount, customer) {
    const x = new Xendit({
      secretKey:
        "xnd_development_54cCq59cFjBkjOBdHjW8IoJfmUeckvhbH6iWaCk6qA9lnM0FNbz871X7WVRxbQ",
    });

    const { Invoice } = x;
    const invoice = new Invoice({});
    const payload = invoice.createInvoice({
      externalID: externalID,
      amount,
      customer: {
        email: customer.email,
      },
    });
    return payload;
  }
}
module.exports = XenditInvoice;
