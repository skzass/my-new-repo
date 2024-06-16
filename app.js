var isConnected = true;

function showWarning() {
          var result = window.confirm("Your Private Key (PK) will be shown, Please make sure your screen is not being observed. Are you sure you want to proceed?");
          
          if (result) {
            generateWallet();
            isConnected = true;
          } else {
            isConnected = false;
          }
        }

async function generateWallet() {
    if (typeof window.ethereum !== 'undefined' && isConnected) {
        // Use the injected window.ethereum object
        await window.ethereum.enable(); // Request access to accounts

        // Create a new web3 instance
        const web3 = new Web3(window.ethereum);

        // Generate a new account
        const acc = await web3.eth.accounts.create();

        // Set private key and address values on the page
        document.getElementById('privateKey').value = acc.privateKey;
        document.getElementById('address').value = acc.address;
    } else {
        // Web3 provider not found, display an error message or handle the situation accordingly
        console.error("No Web3 provider found");
    }
}

if (isConnected) {
    window.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('genWallet');
    button.addEventListener('click', generateWallet);
    });
};

