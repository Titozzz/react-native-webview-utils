# react-native-webview-utils

Set of utils for communication between webview and react-native

## Installation

```sh
npm install react-native-webview-utils
```
or
```sh
yarn add react-native-webview-utils
```

## Usage

Instantiate a WebView, get a ref on it and pass it injectedJavascript

```tsx
import React, { useRef } from 'react';
import { injectedJavascript, generateOnMessageFunction } from "react-native-webview-utils";

const Component = () => {
  const ref = useRef();

  return (
    <WebView 
      ref={ref}
      injectedJavascript={injectedJavascript}
    />
  );
}
```

Use the ref to send messages
```tsx
ref.current?.injectJavascript(generateOnMessageFunction(data));
```

## License

MIT
# react-native-webview-utils
