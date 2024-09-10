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
          userId="<YOUR-USER-ID>"
          gluToken="<USER-GLU_TOKEN>"
          region="<REGION>"
        >
          <Loader /> // you can render your loading component
        <CustomerGluComponent />
      </div>
    </div>
  );
}
```

> Note: `id` of the div is configured from the CustomerGlu dashboard while creating the nudge for the particular campaign.

### Props

| Prop Name  | Type   | Default | Description                                                                                                                                                                                 |
| ---------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `userId`   | string | `''`    | This field is used to provide a user identifier whenever user logs in, in the app flow. This field is not mandatory, and SDK would assign an anonymous ID in case `userId` is not provided. |
| `gluToken` | string |         | **(Required)** This can be generated by the API provided by CustomerGlu.                                                                                                                    |
| `children` | node   |         | A loader component that is displayed while the SDK is being initialized.                                                                                                                    |
| `region` | string   |     `'in'`   | The datacenter location for your CustomerGlu account. We support 2 datacenter locations: `'in'` or `'us'`  |

## Enable Activity Processing

For enabling the Activity Processing for the user we need to enable it from the following method:

```jsx
import { gluEnableActivityProcessing } from "@customerglu/react-web-sdk";

    gluEnableActivityProcessing("<USER-GLU_TOKEN>","<CAMPAIGN_ID>")

```
### Function Arguments

| Argument Name  | Type   | Default | Description                                                                                                                                                                                 |
| ---------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `USER-GLU_TOKEN`   | string | `''`    | **(Required)** This can be generated by the API provided by CustomerGlu|
| `CAMPAIGN_ID` | string |   `''`     | **(Required)** CampaignId can be obtained from the dashboard for the campaign where you want to enable activity processing..                


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### Development

To get started with development, clone the repository and install dependencies:

```sh
git clone https://github.com/customerglu/customerglu-components.git
cd customerglu-components
npm install
```

## Changelog

#### Version 1.5.1

- Added `gluEnableActivityProcessing` method for enabling the activity completion.

#### Version 1.5.0

- Improved resource management for better performance and efficiency.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
