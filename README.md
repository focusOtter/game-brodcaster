# Game Broadcaster

![YouTube Thumbnail Add a heading](https://github.com/focusOtter/game-brodcaster/assets/5106417/5b5e5eca-af85-42be-add8-a9d7db87bd69)

Welcome to the Game Broadcaster repository, a full-stack monorepo designed for live game streaming enthusiasts. This repository integrates modern web technologies and AWS services to provide a seamless broadcasting experience.

- **YouTube Video**: For a detailed walkthrough, check out my [YouTube Video](https://youtu.be/s2ew8-D7SYY).
- **Blog Post**: Learn more about the integration of AWS AppSync and Amazon EventBridge in my [blog post](https://blog.focusotter.com/how-aws-appsync-and-amazon-eventbridge-unlock-real-time-data-across-domains)

## Overview

![image](https://github.com/focusOtter/game-brodcaster/assets/5106417/e9d9d73f-aa9e-4edc-89fc-f70aa0872d39)

Game Broadcaster is a fullstack application with a frontend built using NextJS and a backend orchestrated through the AWS Cloud Development Kit (CDK). It offers a UI styled with Tailwind and DaisyUI, and leverages the AWS Amplify JavaScript libraries for enhanced functionality.

Though this repo is setup to

### Key Features

- **Frontend**: Developed with NextJS, offering a fast, server-side rendered experience.
- **Backend**: Built using AWS CDK for efficient cloud infrastructure management.
- **Authentication**: Secured with Amazon Cognito.
- **API**: Managed through AWS AppSync.
- **Data Storage**: Utilizes DynamoDB for reliable and scalable storage.
- **Real-Time Data Handling**: Features a pipeline resolver in AppSync that integrates with DynamoDB and Amazon EventBridge for real-time data processing.

- **Fullstack Tutorial**: For learning other CRUD operations or the construction of a similar fullstack application, visit [Fullstack NextJS CDK Starter](https://github.com/focusOtter/fullstack-nextjs-cdk-starter/tree/main).

## Deployment

To deploy this application:

1. **Initial Setup**: Clone the repository and navigate to the root of the application.
2. **Install Dependencies**: Run `npm install` in the root directory.
3. **Backend Setup**: Change to the `_backend` directory and execute `npm install`.
4. **Deploy Backend**: Use the scripts in the backend's `package.json` or run `npx aws-cdk deploy` for deployment to AWS.

## Testing
<img width="1491" alt="image" src="https://github.com/focusOtter/game-brodcaster/assets/5106417/fa691f97-44fa-42a2-b0a5-89acfa11fca0">

When making requests in the AWS AppSync console, logs are captured in Cloudwatch. However, this repo is made to be deployed alongside it's consuming app. For that reason, the best way to test this out is to deploy both applications and run both frontend with `npm run dev`.

From there, make requests from one app and observe the event show up in real-time on the other.

## Contributions

Contributions to the Game Broadcaster project are welcome! Please submit an issue or [ping me online](https://focusotter.com)!
