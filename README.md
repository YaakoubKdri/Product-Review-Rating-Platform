You can run the project using a **Split Terminal in VS Code**:

1.  **Open a terminal window** (`Terminal` > `New Terminal`).
2.  Navigate to your server directory and run the server scripts:
    ```bash
    cd server
    npx ts-node src/seed.ts
    npx ts-node src/server.ts
    ```
3.  **Split the terminal**: In the terminal panel, you should see a split button (often an icon that looks like a plus sign next to the terminal name or in the top-right corner of the terminal panel). Click this button to create a new terminal within the same panel.
4.  In the **new terminal window**, navigate to your client directory and simply run:
    ```bash
    cd ../client
    npm run dev
    ```