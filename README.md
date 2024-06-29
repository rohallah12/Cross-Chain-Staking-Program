<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Cross-Chain Staking Program</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0 20px;
        }
        header {
            text-align: center;
            padding: 50px 0;
        }
        h1 {
            color: #5d5c61;
        }
        .section {
            background: #fff;
            margin: 20px 0;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .section h2 {
            color: #379683;
        }
        .section p, .section ul {
            margin: 10px 0;
        }
        .section ul {
            list-style-type: none;
            padding-left: 20px;
        }
        .section ul li {
            background: #e4f9f5;
            margin: 5px 0;
            padding: 10px;
            border-radius: 5px;
        }
        .code {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
        .warning {
            color: #d9534f;
            font-weight: bold;
        }
    </style>
</head>
<body>
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
                <code class="code">sh setup.sh</code><br>
                This command will start two separate local chains with IDs 31337 (chainA) and 31336 (chainB).
            </li>
            <li><strong>Deploy contracts:</strong><br>
                <code class="code">yarn deploy</code><br>
                This will deploy the endpoint and staking contracts on both chains.
            </li>
            <li><strong>Run event listener:</strong><br>
                <code class="code">yarn listen</code><br>
                This command will start the event listeners.
            </li>
            <li><strong>Stake on chainB from chainA:</strong><br>
                <code class="code">yarn AB</code>
            </li>
            <li><strong>Stake on chainA from chainB:</strong><br>
                <code class="code">yarn BA</code>
            </li>
        </ul>
    </div>

    <div class="section warning">
        <h2>Warning!</h2>
        <p>This is a highly simplified example of a cross-chain staking program meant to demonstrate how such programs work in practice. The development of this program took approximately 45 minutes and it is not ready for production use.</p>
    </div>
</body>
</html>