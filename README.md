# PPS Bathrooms

[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fppsbathrooms.org)](https://ppsbathrooms.org)
[![GitHub Contributors](https://img.shields.io/github/contributors/pps-bathrooms/ppsbathrooms)](https://github.com/pps-bathrooms/ppsbathrooms/graphs/contributors)

A real-time bathroom availability tracking system for Portland Public Schools (PPS). Currently serving Cleveland, Franklin, and Ida B Wells High Schools.

## 🚀 Features

-   **Real-time Status Updates**: Bathrooms are marked with color-coded indicators (green for open, red for closed)
-   **Interactive Map Interface**: Click on bathrooms or status boxes to update availability
-   **Account System**: Create an account to access personalized features
-   **Class Schedule Integration**: View optimal bathroom routes based on your class schedule
-   **Data Validation**: Secure confirmation system to maintain data accuracy
-   **Multi-School Support**: Currently available for three PPS high schools

## 🎯 Quick Start

Visit [ppsbathrooms.org](https://ppsbathrooms.org) to:

1. View real-time bathroom availability
2. [Create an account](https://ppsbathrooms.org/createaccount)
3. Set up your class schedule
4. Start contributing to the community

## 💻 Development Setup

### Prerequisites

-   Node.js (Latest LTS version recommended)
-   npm or yarn
-   MongoDB instance
-   API keys for required services

### Environment Configuration

Create a `config.json` file in the root directory with the following variables:

```json
{
    "URI": "mongodb-connection-string",
    "EMAIL_API": "your-email-api-key",
    "TRIVORY_API": "your-trivory-api-key",
    "DISCORD_TOKEN": "your-discord-bot-token",
    "DISCORD_ID": "your-discord-bot-id"
}
```

### Installation

1. Clone the repository

```bash
git clone https://github.com/ppsbathrooms/ppsbathrooms
```

2. Install dependencies

```bash
npm install
```

3. Start the server

```bash
cd src
node app.js
```

## 🤝 Contributing

### Becoming a Contributor

To join the team of bathroom status updaters:

1. Contact us through our [contact form](https://ppsbathrooms.org/contact)
2. Complete the verification process
3. Receive your confirmation password

### Development Contributions

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Team

-   Finn Price ([@finnmprice](https://www.github.com/finnmprice))
-   Luca Haverty ([@lucahaverty](https://www.github.com/lucahaverty))
-   Aidan Moellering ([@AidanMoellering](https://www.github.com/AidanMoellering))

## 📝 Feedback & Support

-   Email: contact@ppsbathrooms.org
-   Contact: [ppsbathrooms.org/contact](https://ppsbathrooms.org/contact)

---

<div align="center">
Made with ❤️ by PPS students for PPS students
</div>
