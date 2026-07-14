import serial
import json
import os
from datetime import datetime

# CONFIG
SERIAL_PORT = '/dev/cu.usbserial-10'
BAUD_RATE = 9600
JSON_FILE = os.path.join('firmware', 'src', 'cards.json') # relative path

def save_to_json(card_uid):
    #mockData format
    new_entry = {
        "uid": card_uid.upper(),
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "shipmentData": {
            "name": "testShipment",
            "contents": [
                { "id": "testItem1", "type": "item" },     
                { "id": "testContainer1", "type": "container" }
            ],
            "origin": "testOrigin",
            "dest": "testDest",
            "status": "detected",
            "deadline": "0000/00/00"
        }
    }
    os.makedirs(os.path.dirname(JSON_FILE), exist_ok=True)
    
    if os.path.exists(JSON_FILE):
        try:
            with open(JSON_FILE, 'r') as file:
                data = json.load(file)
                if not isinstance(data, list):
                    data = []
        except json.JSONDecodeError:
            data = []
    else:
        data = []
        
    data.append(new_entry)
    with open(JSON_FILE, 'w') as file:
        json.dump(data, file, indent=4)
    print(f" Saved shipment data for card {card_uid} to {JSON_FILE}!")

def main():
    print(f"Connecting to Arduino on {SERIAL_PORT}...")
    try:
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
        print("Listening for RFID cards... Press Ctrl+C to stop.")
        
        while True:
            if ser.in_waiting > 0:
                raw_data = ser.readline().decode('utf-8').strip()
                if raw_data:
                    print(f"Card Detected! UID: {raw_data}")
                    save_to_json(raw_data)
                    
    except serial.SerialException:
        print(f"Error: Could not open port {SERIAL_PORT}. Close other serial monitors!")
    except KeyboardInterrupt:
        print("\nStopping log script.")

if __name__ == "__main__":
    main()