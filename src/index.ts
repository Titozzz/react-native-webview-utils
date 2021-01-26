declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    WebViewBridge?: {
      send: (message: string) => void;
      onMessage: (data: JSON) => void;
      appVersion: string;
      ready: boolean;
    };
  }
}

export const injectedJavaScript = `(function() {
  if (!window.WebViewBridge) {
    window.WebViewBridge = {
      onMessage: function() {
        return null;
      },
      send: function(data) {
        window.ReactNativeWebView.postMessage(data);
      },
      ready: false
    };
    var event = new Event('WebViewBridge');
    window.dispatchEvent(event);
  }
})()`;

export const generateOnMessageFunction = (data: any) =>
  `(function() {
    var messageMe = function() {
      window.WebViewBridge.onMessage(${JSON.stringify(data)});
    };

    if (window.WebViewBridge && window.WebViewBridge.ready) {
      messageMe();
    } else {
      window.addEventListener('WebViewBridgeReady', messageMe, {once: true});
    }
  })()`;
  
export const sendMessageToReactNative = (message: any) => {
  if (window.WebViewBridge) {
    window.WebViewBridge.send(JSON.stringify(message));
  } else {
    window.addEventListener('WebViewBridge', () => window.WebViewBridge?.send(JSON.stringify(message)), {once: true});
  }
};

type OnMessageFunction = (data: JSON) => void;

const setupWebViewBridge = (onMessage?: OnMessageFunction) => {
  if (window.WebViewBridge) {
    if (onMessage) {
      window.WebViewBridge.onMessage = onMessage;
    }
    window.WebViewBridge.ready = true;
    const event = new Event('WebViewBridgeReady');
    window.dispatchEvent(event);
  }
};

export const initializeWebViewBridge = (onMessage?: OnMessageFunction) => {
  if (window.WebViewBridge) {
    setupWebViewBridge(onMessage);
  } else {
    window.addEventListener('WebViewBridge', () => setupWebViewBridge(onMessage), {once: true} );
  }
};
