// Import libraries
import React, { useState } from "react";
import { Button, Text } from "rimble-ui";

// Import styles
import "./App.css";

// Import library used to verify zk proofs (zk-snarks)
// Install: npm install snarkjs
const snarkjs = require("snarkjs");

// The verification requieres the verification zkey from the server side (Verifier)
// And the public and proof files from the user (prover)
const verifyProof = async (_verificationkey: string, publicSignals: any, proof: any) => {
	const vkey_json = await fetch(_verificationkey).then(function (res) {
		return res.json();
	});

	// Actually call the Snarkjs API
	const res = await snarkjs.groth16.verify(vkey_json, publicSignals, proof);
	return res;
};

function App() {
	const [proof, setProof] = useState("");
	const [signals, setSignals] = useState("");
	const [credential, setCredential] = useState(null);
	const [isValid, setIsValid] = useState(false);
	const [error, setError] = useState("");

	// Retrieve verification key from server
	let verificationKeyFile = "http://localhost:8000/vkey.json";

	const runProofs = () => {
		verifyProof(verificationKeyFile, signals, proof).then((_isValid) => {
			setIsValid(_isValid);
			setProof(proof);
			setSignals(signals);
			if (_isValid) {
				console.log("Valid credentials");
			}
		});
	};

	// Function to handle file uploads
	// So the user (prover) can upload the credential file containing the proof
	// and public inputs
	const handleFileUpload = (event) => {
		const credential_file = event.target.files[0];

		if (credential_file) {
			// Read and parse the credential file
			const credential_reader = new FileReader();
			credential_reader.onload = (event) => {
			try {
				if(event.target != null && event.target.result != null) {
					const json = JSON.parse(event.target.result as string);
					setProof(json.proof);
					setSignals(json.public);
					setCredential(json);
				}
				return;
			} catch (error) {
				setError(error as string);
				console.log("Error parsing JSON file: "+error);
			}
			};
			credential_reader.readAsText(credential_file);
		} else {
			console.log("Please upload only JSON files.");
		}
	};

	return (
		<div>
			<h1>Por favor, suba su archivo credential.json</h1>
			<div>
				Result: {credential && <Text> {isValid ? "Usuario logueado correctamente" : "Por favor enviar credenciales"}</Text>}
			</div>
			<div>
				{/* Input for uploading two files */}
				<input type="file" accept=".json" multiple onChange={handleFileUpload} className="App-header"/>
			</div>
			<div>
				{/* Display error message if any */}
				{error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
				<header className="App-header">
					<Button.Outline onClick={runProofs}>Comprobar Credenciales ZK</Button.Outline>
				</header>
			</div>
		</div>
	);
}

export default App;
