import serial
import requests
import json
import time

# CONFIG
SERIAL_PORT = '/dev/cu.usbserial-10'
BAUD_RATE = 9600
API_URL = 'http://localhost:3000/sensor'


testItem1 = {
    "id": "testItem1",
    "name": "Standard Test Item"
}

testContainer1 = {
    "id": "testContainer1",
    "name": "Standard Test Container"
}

is_incoming = True

def move_shipment(card_uid):
    global is_incoming
    
    status_str = "incoming" if is_incoming else "outgoing"
    
    shipment_data = {
        "rfid_uid": card_uid.upper(), 
        "name": "testShipment",
        "contents": [testItem1, testContainer1],
        "origin": "testOrigin",
        "dest": "testDest",
        "status": status_str,
        "deadline": "0000/00/00"
    }
    
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    print(f"\nSending POST to {API_URL} ({status_str.upper()} shipment for card {card_uid})...")
    
    try:
        response = requests.post(API_URL, json=payload, headers=headers)
        
        if response.status_code == 200 or response.status_code == 201:
            print("Successfully moved shipment! Response:", response.text)
            is_incoming = not is_incoming
        else:
            print(f"Error! Server responded with status: {response.status_code}")
            print("Response text:", response.text)
            
    except requests.exceptions.RequestException as e:
        print(f"Network Error: Could not connect to the server at {API_URL}.")
        print(f"Is your local server running on port 3000? (Details: {e})")

def main():
    print(f"Connecting to Arduino on {SERIAL_PORT}...")
    try:
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
        print("Listening for RFID cards... Scan a card to trigger API.")
        
        while True:
            if ser.in_waiting > 0:
                raw_data = ser.readline().decode('utf-8').strip()
                if raw_data:
                    print(f"\nPhysical Card Scanned! UID: {raw_data}")
                    move_shipment(raw_data)
                    # Small cooldown to prevent double-triggering
                    time.sleep(1)
                    
    except serial.SerialException:
        print(f"Error: Could not open port {SERIAL_PORT}. Close other serial monitors!")
    except KeyboardInterrupt:
        print("\nStopping API bridge script.")

if __name__ == "__main__":
    main()