import * as React from 'react';

import { View, Button, Text } from 'react-native';
import {
  generateOnMessageFunction,
  injectedJavaScript,
} from 'react-native-webview-utils';
import { WebView } from 'react-native-webview';

export default function App() {
  const ref = React.useRef<WebView | null>(null);
  const [lastMessage, setLastMessage] = React.useState();

  return (
    <View style={{ flex: 1, padding: 8, backgroundColor: '#DDD' }}>
      <WebView
        ref={ref}
        source={{ uri: 'https://1yep6.csb.app/' }}
        style={{ flex: 1 }}
        injectedJavaScript={injectedJavaScript}
        onMessage={(e) => {
          setLastMessage(JSON.parse(e.nativeEvent.data));
        }}
      ></WebView>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopColor: 'black',
          borderTopWidth: 10,
        }}
      >
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          {'Hello from React Native\n'}
        </Text>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>
          Last value received: {`${JSON.stringify(lastMessage)}`}
        </Text>
        <Button
          title="Send To Web"
          onPress={() => {
            ref.current?.injectJavaScript(
              generateOnMessageFunction({ Hello: 'from native' })
            );
          }}
        ></Button>
      </View>
    </View>
  );
}
