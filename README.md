    <header>
        <h1>Simple Cross-Chain Staking Program</h1>
    </header>

    <div class="section">
        <h2>Overview</h2>
        <p>This is a simplified example of a cross-chain staking program. Users can stake on another chain using an Endpoint contract. The process works as follows:</p>
        <ul>
            <li>The Endpoint contract emits a <code>MessageSent</code> event, which is caught by off-chain event listeners.</li>
            <li>After catching the event, the event listener initiates a transaction on the other side of the bridge.</li>
            <li>The Endpoint on the other part of the bridge is called with the <code>MessageSent</code> parameters.</li>
            <li>The target contract on the other chain must implement the <code>IMessageReceiver</code> interface to be callable from the endpoint.</li>
        </ul>
    </div>

    <div class="section">
        <h2>How to Run</h2>
        <p>Follow these steps to set up and run the program:</p>
        <ul>
            <li><strong>Deploy chains:</strong><br>
                <code>sh setup.sh</code><br>
                This command will start two separate local chains with IDs 31337 (chainA) and 31336 (chainB).
            </li>
            <li><strong>Deploy contracts:</strong><br>
                <code>yarn deploy</code><br>
                This will deploy the endpoint and staking contracts on both chains.
            </li>
            <li><strong>Run event listener:</strong><br>
                <code>yarn listen</code><br>
                This command will start the event listeners.
            </li>
            <li><strong>Stake on chainB from chainA:</strong><br>
                <code>yarn AB</code>
            </li>
            <li><strong>Stake on chainA from chainB:</strong><br>
                <code>yarn BA</code>
            </li>
        </ul>
    </div>

    <div class="section warning">
        <h2>Warning!</h2>
        <p>This is a highly simplified example of a cross-chain staking program meant to demonstrate how such programs work in practice. The development of this program took approximately 45 minutes and it is not ready for production use.</p>
    </div>