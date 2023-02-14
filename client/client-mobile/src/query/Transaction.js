import { gql } from "@apollo/client";

export const GET_INVOICE = gql`
  mutation Mutation($invoicePayload: InvoicePayload) {
    payInvoice(InvoicePayload: $invoicePayload) {
      access_token
      error
      message
    }
  }
`;

export const POST_INVOICE = gql`
  mutation Mutation($balance: Int) {
    createInvoice(balance: $balance) {
      external_id
      invoice_url
      totalPrice
    }
  }
`;
