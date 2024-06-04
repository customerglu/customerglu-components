# @customerglu/react-web-sdk

[![npm version](https://badge.fury.io/js/@customerglu%2Freact-web-sdk.svg)](https://badge.fury.io/js/@customerglu%2Freact-web-sdk)

CustomerGlu enables growth teams to run gamified programs in minutes, using a low code builder. This package is the SDK for React Web apps.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install the package using npm or yarn:

```sh
npm install @customerglu/react-web-sdk
```

## Usage

Here’s a basic example of how to use the component in your project:

```jsx
import { CustomerGluComponent } from "@customerglu/react-web-sdk";
import animationData from "../path/to/lottie.json";

export default function App() {
  return (
    <div className="App">
      <div
        id="embedId"
        style={{
          margin: "10px",
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          height: "fit-content",
          width: "380px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <CustomerGluComponent
          writeKey="<YOUR-WRITE-KEY>"
          userId="<YOUR-USER-ID>"
          lottieJson={animationData}
        />
      </div>
    </div>
  );
}
```

### Props

| Prop Name    | Type   | Default                                                                                              | Description                                                                                                                                                                                 |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `writeKey`   | string | `''`                                                                                                 | **(Required)** This is the API Key provided by CustomerGlu, found in the developer console inside your CustomerGlu dashboard.                                                               |
| `userId`     | string | `''`                                                                                                 | This field is used to provide a user identifier whenever user logs in, in the app flow. This field is not mandatory, and SDK would assign an anonymous ID in case `userId` is not provided. |
| `lottieJson` | object | JSON loaded from [LottieFiles](https://lottiefiles.com/animations/continuous-wave-loader-7z1OZeEAaE) | This field is used to set a loader using Lottie JSON, the loader hides on successful loading of the SDK.                                                                                    |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### Development

To get started with development, clone the repository and install dependencies:

```sh
git clone https://github.com/customerglu/customerglu-components.git
cd customerglu-components
npm install
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
