#include <SPI.h>
#include <RFID.h>

#define SDA_PIN 10
#define RST_PIN 9

RFID rfid(SDA_PIN, RST_PIN);
unsigned char status;
unsigned char str[MAX_LEN]; // MAX_LEN = 16 bytes

void setup()
{
  Serial.begin(9600);
  SPI.begin();
  rfid.init();
  Serial.println("Ready to find card...");
}

// TODO: loop, if finds new tag, read and output the tag unique ID.
// In loop(), use findCard() waiting for the card approaching. Once it detects card contact, this function will return MI_OK and save the card type data in parameter str.
void loop()
{
  // Search card, return card types
  if (rfid.findCard(PICC_REQIDL, str) == MI_OK)
  {
    // Anti-collision detection, read card serial number
    if (rfid.anticoll(str) == MI_OK)
    {

      // Print the UID in a clean, standard Hex string format
      for (int i = 0; i < 4; i++)
      {
        if (str[i] < 0x10)
          Serial.print("0");
        Serial.print(str[i], HEX);
      }
      Serial.println(); 

      // Card selection to lock the card and prevent spamming reads
      rfid.selectTag(str);
    }
  }
  rfid.halt();
  delay(500);
}

void ShowCardType(unsigned char *type)
{
  Serial.print("Card type: ");
  if (type[0] == 0x04 && type[1] == 0x00)
    Serial.println("MFOne-S50");
  else if (type[0] == 0x02 && type[1] == 0x00)
    Serial.println("MFOne-S70");
  else if (type[0] == 0x44 && type[1] == 0x00)
    Serial.println("MF-UltraLight");
  else if (type[0] == 0x08 && type[1] == 0x00)
    Serial.println("MF-Pro");
  else if (type[0] == 0x44 && type[1] == 0x03)
    Serial.println("MF Desire");
  else
    Serial.println("Unknown");
}

/*68E546F3
F3E28604
78B208F3
35FFE9EA
451E7FEA
784B42F3
EAB04D32
35536B05*/
