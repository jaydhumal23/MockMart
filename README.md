### MockMart

# Mockmart

Mockmart is a modern e-commerce web application that provides a seamless shopping experience. It features user authentication, dynamic product listings, and a clean, responsive UI.

**Live Demo:** [https://mockmart-1jay.vercel.app](https://mockmart-1jay.vercel.app)

## Features

- **User Authentication:** Secure login and signup functionality powered by **Firebase Auth**.
- **Dynamic Products:** Real-time product fetching using the **Platzi Fake Store API**.
- **Modern UI:** A sleek, accessible, and responsive interface built with **shadcn/ui** and **Tailwind CSS**.
- **Cart Management:** Add to cart, update quantities, remove items.

## Tech Stack

- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Authentication:** Firebase Authentication
- **API:** Platzi Fake Store API
- **Deployment:** Vercel

## Local Machine Setup

### Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/your-username/mockmart.git](https://github.com/jaydhumal23/MockMart.git)
    cd mockmart
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a .env file in the root directory. You will need to add your Firebase configuration keys here.

    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

5.  **Open the app**
    Open [http://localhost:5173](http://localhost:5173)
