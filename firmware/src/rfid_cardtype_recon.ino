#include <SPI.h>
#include <RFID.h>

#define SDA_PIN  10
#define RST_PIN 9

RFID rfid(SDA_PIN, RST_PIN);
void ShowCardType(unsigned char * type);
unsigned char status;
unsigned char str[MAX_LEN]; //MAX_LEN = 16 bytes

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.init();
  Serial.println("Ready to find card...");
}

// TODO: loop, if finds new tag, read and output the tag unique ID. 
// In loop(), use findCard() waiting for the card approaching. Once it detects card contact, this function will return MI_OK and save the card type data in parameter str.
void loop() {
  //Search card, return card types
  if (rfid.findCard(PICC_REQIDL, str) == MI_OK) {
    Serial.println("Find the card!");
    // Show card type
    ShowCardType(str);
    
    //Anti-collision detection, read card serial number
    if (rfid.anticoll(str) == MI_OK) {
      Serial.print("The card's number is : ");
      
      //Display card serial number
      for (int i = 0; i < 4; i++) {
        Serial.print(0x0F & (str[i] >> 4), HEX);
        Serial.print(0x0F & str[i], HEX);
        }
      
      Serial.println("");
      }
      
      //card selection (lock card to prevent redundant read, removing the line will make the sketch read cards continually)
      rfid.selectTag(str);
    }
  
  rfid.halt();
}

void ShowCardType(unsigned char * type) {
  Serial.print("Card type: ");
  if (type[0] == 0x04 && type[1] == 0x00) Serial.println("MFOne-S50");
  else if (type[0] == 0x02 && type[1] == 0x00) Serial.println("MFOne-S70");
  else if (type[0] == 0x44 && type[1] == 0x00) Serial.println("MF-UltraLight");
  else if (type[0] == 0x08 && type[1] == 0x00) Serial.println("MF-Pro");
  else if (type[0] == 0x44 && type[1] == 0x03) Serial.println("MF Desire");
  else Serial.println("Unknown");
}
  


