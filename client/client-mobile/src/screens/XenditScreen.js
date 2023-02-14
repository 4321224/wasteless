import { WebView } from "react-native-webview";
import { SafeAreaView, View, Text } from "react-native";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { TopUp } from "../query/TopUp";

export default function XenditPayment({}) {
  //   const { token, invoiceId } = route.params;

  //   const [createInvoice, { loading, error, data }] = useMutation(TopUp);

  //   const uri = `https://checkout-staging.xendit.co/web/638edd5c1cea5504be4d2826`;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "https://checkout-staging.xendit.co/web/638edd5c1cea5504be4d2826",
        }}
      />
      <Button onPress={() => navigation.navigate("MyProfile")}>
        Top Up Now
      </Button>
    </SafeAreaView>
  );
}
