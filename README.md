# AI Projects Milestone Tracker

AI Projects Milestone Tracker is a full-stack application designed for AI teams to seamlessly track and manage the progress of their AI projects. Built on the Internet Computer (ICP) and powered by Motoko, this platform combines decentralized technology with a user-friendly interface to ensure efficient project management.

## Key Features

- **Milestone Management**: Define, update, and track project milestones with ease.
- **Status Options**: Predefined milestone statuses to standardize progress tracking.
- **Completion Tracking**: Manually set and view milestone completion dates.
- **Decentralized Backend**: Powered by Motoko, leveraging ICP's decentralized architecture for reliability and scalability.
- **Dynamic Frontend**: React-based interface providing an intuitive user experience.

---

## Getting Started

### Prerequisites

To run this project, ensure you have the following tools installed:

- **DFX SDK**: Internet Computer SDK for development and deployment. [Install DFX](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- **Node.js**: JavaScript runtime for frontend development.
- **npm**: Package manager for JavaScript.

### Project Structure

The project is organized as follows:

```
AI-Milestone-Tracker/
├── src/
│   ├── declarations/      # Auto-generated type declarations
│   ├── aitracker_backend/ # Backend canister code
│   │   ├── main.mo        # Core backend logic
│   │   └── types.mo       # Type definitions
│   └── aitracker_frontend/ # Frontend application
│       ├── src/           # React components and pages
│       ├── assets/        # Static assets
│       └── package.json   # Frontend dependencies
├── dfx.json               # Project configuration
├── package.json           # Root package.json
└── README.md              # Project documentation
```

---

## Running the Project Locally

### Step 1: Start the Replica

Start the local ICP replica to emulate the Internet Computer environment:

```bash
dfx start --clean --background
```

### Step 2: Deploy the Canisters

Deploy both backend and frontend canisters to the local replica:

```bash
dfx deploy
```

Once deployment is complete, your application will be available at:

```plaintext
http://localhost:4943?canisterId=<frontend_canister_id>
```

### Step 3: Start the Frontend

For frontend development, start the React development server:

```bash
npm start
```

This will start a server at `http://localhost:8080`, proxying API requests to the replica.

---

## Interacting with the Backend

The backend canister, written in Motoko, provides core functionality for managing milestones. Use the following commands to interact with the backend:

### Viewing the Backend Candid Interface

You can inspect the backend's Candid interface using:

```bash
dfx canister call <backend_canister_id> __get_candid_interface_tmp_hack
```

### Adding a Milestone via Candid

Use the Candid interface to add a new milestone:

```bash
dfx canister call <backend_canister_id> addMilestone '("Milestone Title", "Status", "Completion Date")'
```

---

## Deployment to the Internet Computer

Deploying to the ICP mainnet follows similar steps:

1. Update the `dfx.json` file to set the network to `ic`:

    ```json
    {
      "networks": {
        "ic": {
          "providers": ["https://ic0.app"],
          "type": "persistent"
        }
      }
    }
    ```

2. Deploy the canisters to the mainnet:

    ```bash
    dfx deploy --network ic
    ```

3. Access your app at the generated ICP URL.

---

## Technical Details

### Backend: Motoko
- **Language**: Motoko
- **Key Components**:
  - Canister storage for milestone data.
  - CRUD operations for managing milestones.

### Frontend: React
- **Framework**: React
- **Routing**: React Router
- **State Management**: Context API/State Hooks

### ICP Advantages
- **Scalability**: Operates seamlessly on a global decentralized network.
- **Security**: Leverages cryptographic guarantees for data integrity.
- **Cost Efficiency**: Offers low hosting costs for decentralized applications.

---

## Useful Commands

```bash
# Start the ICP replica
$ dfx start --clean --background

# Deploy canisters
$ dfx deploy

# View canister details
$ dfx canister info <canister_name>

# Call canister methods
$ dfx canister call <canister_name> <method_name>
```

---

## Resources

- [Internet Computer Documentation](https://internetcomputer.org/docs/current/developer-docs/)
- [Motoko Programming Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [React Documentation](https://react.dev)

---

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

## License

This project is licensed under the MIT License. See `LICENSE` for details.
