# Crypto Ticker

Crypto Ticker is a React-based web application that displays live data of selected cryptocurrencies, including their prices, market values, and 24-hour percentage changes. The application uses Binance WebSocket API and Binance REST API to fetch and display real-time cryptocurrency data.

---

## 🚀 Features

- **Live Data Updates**: Displays real-time cryptocurrency data using the Binance WebSocket API.
- **24h Price Changes**: Fetches and calculates the percentage price changes for the past 24 hours using the Binance REST API.
- **Responsive Table**: Built with `@tanstack/react-table` to display data in a user-friendly table format.
- **Interactive Graphs**: Displays 24-hour price history using `recharts`.
- **Real-Time UI Updates**: Updates the UI seamlessly without unnecessary re-renders for improved performance.
- **Unit Testing**: Comprehensive tests for components and hooks using `@testing-library/react` and `vitest`.

---

## 🛠️ Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **@tanstack/react-query**: For managing server state and caching.
- **@tanstack/react-table**: For managing and displaying tabular data.
- **Recharts**: For rendering interactive and customizable charts.
- **Sass**: For styling with modular and reusable CSS.

### Backend

- **Binance WebSocket API**: For receiving live cryptocurrency data.
- **Binance REST API**: For fetching 24-hour historical price changes.

---

## 📦 Installation and Setup

### Prerequisites

- **Node.js** (version 18+)
- **npm** or **yarn**

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/selensr/crypto-ticker.git
   cd crypto-ticker
   ```
2. Install the dependencies:
   ```bash
    npm install
   ```
