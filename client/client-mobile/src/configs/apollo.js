import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "../helpers/util";

const httpLink = createHttpLink({
  uri: "https://wasteless-orchestrator.up.railway.app/",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken("access_token");

  // console.log("DARI CONFIG APOLLLOOOO", token);
  return {
    headers: {
      ...headers,
      Authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
