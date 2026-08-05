#include <MFRC522.h>
#include <SPI.h>

#define SS_PIN 5
#define RST_PIN 33

MFRC522 mfrc522(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

// Usable data blocks (skips sector 0 and all trailer blocks)
byte dataBlocks[] = {
  4,5,6, 8,9,10, 12,13,14, 16,17,18, 20,21,22,
  24,25,26, 28,29,30, 32,33,34, 36,37,38, 40,41,42,
  44,45,46, 48,49,50, 52,53,54, 56,57,58, 60,61,62
};
const int numBlocks = sizeof(dataBlocks) / sizeof(dataBlocks[0]);
const int maxCapacity = numBlocks * 16; // ~720 bytes

void setup() {
  Serial.begin(9600);
  SPI.begin();
  mfrc522.PCD_Init();

  for (byte i = 0; i < 6; i++) key.keyByte[i] = 0xFF;

  Serial.println("=== RFID Writer ===");
  Serial.print("Max data capacity: ");
  Serial.print(maxCapacity);
  Serial.println(" bytes");
  Serial.println("Type JSON data and press Enter:");
}

void loop() {
  if (Serial.available()) {
    String input = Serial.readStringUntil('\n');
    input.trim();
    if (input.length() == 0) return;

    if (input.length() >= maxCapacity) {
      Serial.println("Error: data too long for card capacity!");
      return;
    }

    Serial.println("Now tap the card...");
    while (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
      delay(50);
    }

    Serial.println("Card detected, writing...");
    if (writeDataToCard(input)) {
      Serial.println("Write successful!");
      Serial.print("Read back: ");
      Serial.println(readDataFromCard());
    } else {
      Serial.println("Write failed.");
    }

    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();
    Serial.println("\nReady. Type next JSON:");
  }
}

bool writeDataToCard(String data) {
  byte buffer[maxCapacity];
  memset(buffer, 0, maxCapacity);
  data.getBytes(buffer, data.length() + 1); // includes null terminator

  int currentSector = -1;
  for (int i = 0; i < numBlocks; i++) {
    byte block = dataBlocks[i];
    int sector = block / 4;

    if (sector != currentSector) {
      auto status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, block, &key, &(mfrc522.uid));
      if (status != MFRC522::STATUS_OK) {
        Serial.print("Auth failed at block "); Serial.println(block);
        return false;
      }
      currentSector = sector;
    }

    byte blockData[16];
    memcpy(blockData, buffer + (i * 16), 16);

    auto status = mfrc522.MIFARE_Write(block, blockData, 16);
    if (status != MFRC522::STATUS_OK) {
      Serial.print("Write failed at block "); Serial.println(block);
      return false;
    }

    bool hasNull = false;
    for (int j = 0; j < 16; j++) if (blockData[j] == 0x00) { hasNull = true; break; }
    if (hasNull) break;
  }
  return true;
}

String readDataFromCard() {
  String result = "";
  int currentSector = -1;
  for (int i = 0; i < numBlocks; i++) {
    byte block = dataBlocks[i];
    int sector = block / 4;

    if (sector != currentSector) {
      auto status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, block, &key, &(mfrc522.uid));
      if (status != MFRC522::STATUS_OK) break;
      currentSector = sector;
    }

    byte buffer[18];
    byte size = sizeof(buffer);
    auto status = mfrc522.MIFARE_Read(block, buffer, &size);
    if (status != MFRC522::STATUS_OK) break;

    bool stop = false;
    for (int j = 0; j < 16; j++) {
      if (buffer[j] == 0x00) { stop = true; break; }
      result += (char)buffer[j];
    }
    if (stop) break;
  }
  return result;
}