#include <MFRC522.h>
#include <SPI.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define SS_PIN 5
#define RST_PIN 33

MFRC522 mfrc522(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

// WiFi credentials
const char *ssid = "[WIFI USERNAME]";
const char *password = "[WIFI PASSWORD]";

// Local server endpoint
const char *serverUrl = "http://[COMPUTER IP ADDRESS]:[PORT NUMBER]/sensor";

// Usable data blocks (skips sector 0 and all trailer blocks)
byte dataBlocks[] = {
    4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 20, 21, 22,
    24, 25, 26, 28, 29, 30, 32, 33, 34, 36, 37, 38, 40, 41, 42,
    44, 45, 46, 48, 49, 50, 52, 53, 54, 56, 57, 58, 60, 61, 62};
const int numBlocks = sizeof(dataBlocks) / sizeof(dataBlocks[0]);

// connect to wifi + init
void setup()
{
  Serial.begin(9600);
  delay(1000);
  SPI.begin();
  mfrc522.PCD_Init();

  for (byte i = 0; i < 6; i++)
    key.keyByte[i] = 0xFF;

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected!");
  Serial.println(WiFi.localIP());

  Serial.println("Tap a card to read + send its data...");
}

// detect rfid and send HTTP
void loop()
{
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial())
  {
    return;
  }

  String jsonData = readDataFromCard();
  Serial.print("Read from card: ");
  Serial.println(jsonData);

  if (jsonData.length() > 0)
  {
    sendToLocalServer(jsonData);
  }
  else
  {
    Serial.println("No data found on card (empty or unwritten).");
  }

  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();
  delay(1500);
}

String readDataFromCard()
{
  String result = "";
  int currentSector = -1;
  for (int i = 0; i < numBlocks; i++)
  {
    byte block = dataBlocks[i];
    int sector = block / 4;

    if (sector != currentSector)
    {
      auto status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, block, &key, &(mfrc522.uid));
      if (status != MFRC522::STATUS_OK)
        break;
      currentSector = sector;
    }

    byte buffer[18];
    byte size = sizeof(buffer);
    auto status = mfrc522.MIFARE_Read(block, buffer, &size);
    if (status != MFRC522::STATUS_OK)
      break;

    bool stop = false;
    for (int j = 0; j < 16; j++)
    {
      if (buffer[j] == 0x00)
      {
        stop = true;
        break;
      }
      result += (char)buffer[j];
    }
    if (stop)
      break;
  }
  return result;
}

void sendToLocalServer(String jsonPayload)
{
  // Ensure wifi connection
  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("WiFi not connected.");
    return;
  }

  // Create HTTP Client and choose correct server
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Accept", "application/json");

  int httpResponseCode = http.POST(jsonPayload);

  // If successful, print response. Else, print error code
  if (httpResponseCode > 0)
  {
    String response = http.getString();
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    Serial.println(response);
  }
  else
  {
    Serial.print("Error sending POST: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}