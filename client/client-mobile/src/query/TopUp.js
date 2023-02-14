import { gql } from "@apollo/client";

export const TopUp = gql`
  mutation CreateInvoice($balance: Int) {
    createInvoice(balance: $balance) {
      external_id
      invoice_url
    }
  }
`;
